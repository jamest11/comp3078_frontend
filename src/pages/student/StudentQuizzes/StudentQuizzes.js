
import { Box, Container, Grid, LinearProgress, Alert, Link as MUILink, Typography } from '@mui/material';
import Title from 'components/Title';
import TitleDivider from 'components/TitleDivider';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { studentApi } from 'services/api';
import Quiz from "./components/Quiz";


const StudentQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentApi.getStudentQuizzes()
      .then((res) => setQuizzes(res.data))
      .catch((error) => console.error('Server error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Title>Upcoming Quizzes</Title>
      <TitleDivider />
  
      {loading ? (
        <LinearProgress />
      ) : quizzes.length === 0 ? (
        <Alert severity="success" sx={{ maxWidth: 600 }}>
          <Typography variant="body1">
            You have completed all of your assigned quizzes. Great Work!
          </Typography>
          <Typography variant="body1">
            Click <MUILink component={Link} to="/student/grades">here</MUILink> to view your grades.
          </Typography>
        </Alert>
      ) : (
        <Box  sx={{ overflow: 'auto', maxHeight: 500 }}>
          <Grid container>
            {quizzes.map((quiz, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Quiz data={quiz} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      
    </Container>
  );
};

export default StudentQuizzes;