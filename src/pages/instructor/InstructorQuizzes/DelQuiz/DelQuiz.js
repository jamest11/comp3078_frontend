import { Box, Button, Container, FormGroup, Paper, Typography } from '@mui/material';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { instructorApi } from 'services/api';
import Subtitle from 'components/Subtitle';

const DelQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const quiz = location.state?.quiz;

  const handleDelete = () => {
    instructorApi.deleteQuiz({ id: quiz._id })
      .then((res) => navigate('..'))
      .catch(() => console.error('Server error'));
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
        <Subtitle>Delete Quiz</Subtitle>
        <Typography variant="body1">
          Are you sure you want to remove the quiz <b>{quiz.title}</b>?
        </Typography>
        <br/>
        <Typography variant="body1">
          This will remove any scheduled quizzes associated with this quiz.
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

export default DelQuiz;