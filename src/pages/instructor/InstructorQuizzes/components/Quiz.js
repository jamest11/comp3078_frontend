import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { formatTime } from 'utils';

const Quiz = ({ data }) => {
  return (
    <Box
      component={Paper}
      elevation={1}
      sx={{ p: 2, my: 1, mr: 2 }}
    >
      <Grid container>
        <Grid item xs={7}>
          <Typography variant="h6">{data.title}</Typography>
          <Typography variant="body1">{data.questions.length} Question(s)</Typography>
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
          <Button variant="outlined" color="success" size="small">Edit</Button>
          <Button variant="outlined" color="error" size="small">Delete</Button>
        </Grid>
      </Grid>

    </Box>
  );
};

export default Quiz;