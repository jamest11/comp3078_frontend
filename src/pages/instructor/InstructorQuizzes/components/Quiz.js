import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import LoadingButton from 'components/LoadingButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { instructorApi } from 'services/api';
import { formatTime } from 'utils';

const Quiz = ({ data }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchQuizAndEdit = async () => {
    setLoading(true);
    instructorApi.getInstructorQuizzes(data._id)
      .then((res) => {
        setLoading(false);
        navigate('/create-quiz', { state: { quiz: res.data }});
      })
      .catch(console.error);
  };

  return (
    <Box
      component={Paper}
      elevation={1}
      sx={{ p: 2, my: 1, mr: 2 }}
    >
      <Grid container>
        <Grid item xs={7}>
          <Typography variant="h6">{data.title}</Typography>
          <Typography variant="body1">{data.questionCount} Question(s)</Typography>
          <Typography variant="body1">{formatTime(data.timeLimit)} Time Limit</Typography>
        </Grid>
        <Grid 
          item 
          container 
          alignItems="center" 
          justifyContent="flex-end" 
          xs={5}
          gap={1}
        >
          <LoadingButton
            variant="outlined"
            color="primary"
            size="small"
            onClick={fetchQuizAndEdit}
            loading={loading}
          >
            Edit
          </LoadingButton>
          <Button 
            variant="outlined" 
            color="error" 
            size="small"
            onClick={() => navigate('/instructor-quizzes/delete-quiz', { state: { quiz: data }})}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Quiz;