import { Container, Grid, LinearProgress, Alert, Typography, Link as MUILink, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import TitleDivider from 'components/TitleDivider';
import Subtitle from 'components/Subtitle';
import Title from 'components/Title';
import { studentApi } from 'services/api';
import { Link } from 'react-router-dom';
import GradeChart from './components/GradeChart';
import GradeTable from './components/GradeTable';
import ClassGrade from './components/ClassGrade';

const StudentGrades = () => {
  const [loading, setLoading] = useState(true);
  const [quizGrades, setQuizGrades] = useState([]);
  const [classGrades, setClassGrades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const qgRes = await studentApi.getStudentGrades('quiz');
      const cgRes = await studentApi.getStudentGrades('class');

      setQuizGrades(qgRes.data);
      setClassGrades(cgRes.data);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Title>My Grades</Title>
      <TitleDivider />

      <Grid container spacing={2}>
        <Grid item sm={12} md={8}>
          <Subtitle>Quiz Grades</Subtitle>
          
          <Stack spacing={2}>      
            {loading ? (
              <LinearProgress />
            ) : quizGrades.length === 0 ? (
              <Alert severity="info">
                <Typography variant="body1">
                  You haven't completed any quizzes yet.
                </Typography>
                <Typography variant="body1">
                  Click <MUILink component={Link} to="/student-quizzes">here</MUILink> to view your assigned quizzes.
                </Typography>
              </Alert>
            ) : (
              <GradeTable grades={quizGrades} />
            )}

            <GradeChart data={quizGrades} />
          </Stack>  
        </Grid>

        <Grid item sm={8} md={4}>
          <Subtitle>Average Class Grades</Subtitle>
          {classGrades.map((grade, index) => (
            <ClassGrade key={index} data={grade} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentGrades;