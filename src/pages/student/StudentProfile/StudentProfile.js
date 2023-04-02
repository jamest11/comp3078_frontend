import { Button, Container, Grid, Paper, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import TitleDivider from 'components/TitleDivider';
import Title from 'components/Title';
import Subtitle from 'components/Subtitle';
import UserCard from 'components/UserCard';

const StudentProfile = () => {
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
      </Grid>
    </Container>
  );
};

export default StudentProfile;