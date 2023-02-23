import { Container, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';

import TitleDivider from 'components/TitleDivider';
import Subtitle from 'components/Subtitle';
import Title from 'components/Title';
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
      <Title>My Grades</Title>
      <TitleDivider />

      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Subtitle>All Grades</Subtitle>

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
          <Subtitle>Average Grades</Subtitle>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentGrades;