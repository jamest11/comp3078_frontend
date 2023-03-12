import { Container, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, Typography, Link as MUILink } from '@mui/material';
import { useEffect, useState } from 'react';

import TitleDivider from 'components/TitleDivider';
import Subtitle from 'components/Subtitle';
import Title from 'components/Title';
import { studentApi } from 'services/api';
import { formatDate } from 'utils';
import { Link } from 'react-router-dom';
import GradeChart from './components/GradeChart';

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
        <Grid item xs={8}>
          <Subtitle>Quiz Grades</Subtitle>
            
          {loading ? (
            <LinearProgress />
          ) : grades.length === 0 ? (
            <Alert severity="info">
              <Typography variant="body1">
                You haven't completed any quizzes yet.
              </Typography>
              <Typography variant="body1">
                Click <MUILink component={Link} to="/student-quizzes">here</MUILink> to view your assigned quizzes.
              </Typography>
            </Alert>
          ) : (
            <TableContainer component={Paper}>
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
                      <TableCell>{grade.classTitle}</TableCell>
                      <TableCell>{grade.quizTitle}</TableCell>
                      <TableCell>{formatDate(grade.date)}</TableCell>
                      <TableCell>{grade.grade}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
        
        <Grid item xs={8}>
          <GradeChart data={grades} />
        </Grid>
        {/*<Grid item xs={4}>
          <Subtitle>Average Grades</Subtitle>
        </Grid>*/}
      </Grid>
    </Container>
  );
};

export default StudentGrades;