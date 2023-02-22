import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

const ScheduledQuiz = ({ data }) => {
  return (
    <Box
      component={Paper}
      elevation={1}
      sx={{ px: 2, pt: 2, my: 1, mr: 2 }}
    >

      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h6">{data.quiz.title}</Typography>
          <Typography variant="body1" paragraph>{data.class.description} &emsp; <b>|</b> &emsp; {new Date(data.date).toLocaleDateString()}</Typography>
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
          <Button variant="outlined" color="error" size="small">Delete</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ScheduledQuiz;