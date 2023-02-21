import { Container, Divider, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { instructorApi } from 'services/api';
import { formatDate } from 'utils';

const InstructorGrades = () => {
  const [loading, setLoading] = useState(true);
  const [quizGrades, setQuizGrades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await instructorApi.getQuizGrades();

      setQuizGrades(res.data);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h3" gutterBottom>Grades</Typography>
      <Divider  sx={{ my: 2, boxShadow: 2 }}/>

      <Grid container columnGap={4}>
        <Grid item sm={10} md={7}>
          <Typography variant="h4" gutterBottom>Quiz Grades</Typography>

          <TableContainer component={Paper}>
            {loading ? (
              <LinearProgress />
            ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Class</TableCell>
                  <TableCell>Quiz</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell># Completed</TableCell>
                  <TableCell>Avg. Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quizGrades.map((grade, index) => (
                  <TableRow key={index}>
                    <TableCell>{grade.class}</TableCell>
                    <TableCell>{grade.quiz}</TableCell>
                    <TableCell>{formatDate(grade.dueDate)}</TableCell>
                    <TableCell>{grade.completed}</TableCell>
                    <TableCell>{grade.average}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>)}
          </TableContainer>
        </Grid>

        <Grid item>
          <Typography variant="h4" gutterBottom>Average Class Grades</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorGrades;