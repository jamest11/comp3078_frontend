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
          <Typography variant="h6">{data.quiz.title}</Typography>
          <Typography variant="body1">{data.class.title}</Typography>
          <Typography variant="body1">{formatTime(data.quiz.timeLimit)} Time Limit</Typography>
        </Grid>
        <Grid item container alignItems="center" justifyContent="flex-end" xs={6}>
          <Typography variant="body1">Due {formatDate(data.date)}</Typography>
          <Button variant="contained" color="primary" size="small" onClick={handleClick}>Take Quiz</Button>
        </Grid>
      </Grid>

    </Box>
  );
};

export default Quiz;