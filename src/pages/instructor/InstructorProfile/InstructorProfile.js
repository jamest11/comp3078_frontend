import { Button, ButtonGroup, Container, Grid, Paper, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import Subtitle from 'components/Subtitle';
import Title from 'components/Title';
import TitleDivider from 'components/TitleDivider';
import UserCard from 'components/UserCard';

const InstructorProfile = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Title>Profile</Title>
      <TitleDivider />
      <Grid container spacing={2}>
        <Grid item lg={6} md={12}>
          <Subtitle>Quick Links</Subtitle>
          <Paper sx={{ p: 3, width: 'fit-content' }}>
            <Stack direction="row" spacing={2}>
              <ButtonGroup variant="contained">
                <Button component={Link} to="quizzes">Quizzes</Button>
                <Button component={Link} to="quizzes/create-quiz">Create Quiz</Button>
              </ButtonGroup>
              <Button component={Link} to="classes" variant="contained">Classes</Button>
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

export default InstructorProfile;