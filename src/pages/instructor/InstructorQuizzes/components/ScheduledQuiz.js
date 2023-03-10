import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { formatDate } from 'utils';
import { useNavigate } from 'react-router-dom';

const ScheduledQuiz = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Box
      component={Paper}
      elevation={1}
      sx={{ px: 2, pt: 2, my: 1, mr: 2 }}
    >
      <Grid container >
        <Grid item xs={8}>
          <Typography variant="h6">{data.quizTitle}</Typography>
          <Typography variant="body1" paragraph>{data.classTitle} &nbsp; <b>|</b> &nbsp; Due {formatDate(data.dueDate)}</Typography>
        </Grid>
        <Grid 
          item 
          container 
          alignItems="center" 
          justifyContent="flex-end" 
          xs={4} 
          gap={1}
          sx={{ pb: 1 }}  
        >
          <Button variant="outlined" color="success" size="small">Edit</Button>
          <Button 
            variant="outlined" 
            color="error" 
            size="small"
            onClick={() => navigate('/instructor-quizzes/delete-scheduled-quiz', { state: { quiz: data }})}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ScheduledQuiz;