import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import { formatTime, formatDate } from 'utils';
import { studentApi } from 'services/api';

const Quiz = ({ data }) => {

  const navigate = useNavigate();

  const handleClick = (event) => {
    studentApi.getStudentQuiz(data._id)
      .then((res) => navigate('/quiz', { state: { quizData: res.data }}))
      //.then((res) => console.log(res.data))
      .catch(console.error);
  };

  return (
    <Box
      component={Paper}
      elevation={1}
      sx={{ p: 2, my: 1, mr: 2 }}
    >
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h6">{data.quizTitle}</Typography>
          <Typography variant="body1">{data.classTitle}</Typography>
          <Typography variant="body1">{data.questionCount} question(s)</Typography>
          <Typography variant="body1">{formatTime(data.timeLimit)} Time Limit</Typography>
        </Grid>
        <Grid item container alignItems="center" justifyContent="flex-end" xs={6}>
          <Typography variant="body1">Due {formatDate(data.dueDate)}</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="small" 
            onClick={handleClick}
            sx={{ ml: 1 }}          
          >
            Take Quiz
          </Button>
        </Grid>
      </Grid>

    </Box>
  );
};

export default Quiz;