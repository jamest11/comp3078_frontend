import { Alert, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import TitleDivider from 'components/TitleDivider';
import Title from 'components/Title';
import Subtitle from 'components/Subtitle';
import UserCard from 'components/UserCard';
import { useEffect, useState } from 'react';
import { studentApi } from 'services/api';

const StudentProfile = () => {
  const [grades, setGrades] = useState({});

  useEffect(() => {
    studentApi.getStudentGrades({ type: 'quiz', summary: true })
      .then((res) => setGrades(res.data))
      .catch((error) => console.error('Server error'));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Title>Profile</Title>
      <TitleDivider />
      <Grid container spacing={2}>
        <Grid item md="auto" sm={12}>
          <Subtitle>Quick Links</Subtitle>
          <Paper sx={{ p: 3, width: 'fit-content' }}>
            <Stack direction="row" spacing={2}>
              <Button component={Link} to="quizzes" variant="contained">Quizzes</Button>
              <Button component={Link} to="grades" variant="contained">Grades</Button>
            </Stack>
          </Paper>
        </Grid>
        <Grid item>
          <UserCard />
        </Grid>
        {!!grades['count'] && (
          <Grid item>
            <Alert icon={false} severity="success" sx={{ minWidth: 400, py: 2}}>
              <Typography variant="h5">Great Work!</Typography>
              <Typography variant="body1">The average score of your last {grades['count']} quizzes is {Math.round(grades['avg'] * 100) / 100}%</Typography>
            </Alert>
            <Button variant="contained" component={Link} to="grades" sx={{ mt: 1 }}>Grade History</Button>
          </Grid>  
        )}
        
      </Grid>
    </Container>
  );
};

export default StudentProfile;