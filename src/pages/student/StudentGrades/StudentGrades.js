import { Container, Divider, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { studentApi } from 'services/api';
import { formatDate } from 'utils';

const StudentGrades = () => {
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await studentApi.getStudentGrades();
      setGrades(res.data);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>My Grades</Typography>
      <Divider  sx={{ my: 2, boxShadow: 2 }}/>

      <Grid container gap={4}>
        <Grid item xs={6}>
          <Typography variant="h5">All Grades</Typography>

          <TableContainer component={Paper}>
            {loading ? (
              <LinearProgress />
            ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Class</TableCell>
                  <TableCell>Quiz</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grades.map((grade, index) => (
                  <TableRow key={index}>
                    <TableCell>{grade.class}</TableCell>
                    <TableCell>{grade.quiz}</TableCell>
                    <TableCell>{formatDate(grade.date)}</TableCell>
                    <TableCell>{grade.grade}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>)}
          </TableContainer>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="h5">Average Grades</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentGrades;