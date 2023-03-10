import { Box, Button, Container, FormGroup, Paper, Typography } from '@mui/material';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { instructorApi } from 'services/api';
import Subtitle from 'components/Subtitle';

const DelScheduledQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const quiz = location.state?.quiz;

  const handleDelete = () => {
    instructorApi.deleteScheduledQuiz({ id: quiz._id })
      .then((res) => navigate('/instructor-quizzes'))
      .catch(console.error);
  };

  if(!quiz) {
    return (<Navigate to=".." replace />);
  }

  return (
    <Container maxWidth="sm">
      <Box
        component={Paper}
        elevation={6}
        sx={{
          p: 4,
          mt: 6,
        }}
      >
        <Subtitle>Delete Scheduled Quiz</Subtitle>
        <Typography variant="body1">
          Are you sure you want to remove the scheduled quiz <b>{quiz.quizTitle}</b> from class <b>{quiz.classTitle}</b>?
        </Typography>
        <br/>
        <Typography variant="body1">
          This will remove any grades for students who have already completed the quiz.
        </Typography>

        <FormGroup row sx={{ gap: 1, mt: 2}}>
          <Button 
            variant="contained" 
            color="error" 
            size="small"
            onClick={() => handleDelete()}
          >
            Confirm
          </Button>
          <Button 
            variant="contained" 
            size="small"
            onClick={() => navigate('..')}
          >
            Cancel
          </Button>
        </FormGroup>
      </Box>
    </Container>
  );
};

export default DelScheduledQuiz;