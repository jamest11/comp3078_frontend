import { Box, Button, Paper, Typography } from '@mui/material';

const QuizResult = ({ questions, responses }) => {

  let correct = 0;

  for(let i = 0; i < responses.length; i++) {
    if(responses[i] === questions[i].a) {
      correct++;
    }
  }

  return (
    <Box component="div" sx={{ mt: 5 }}>
      <Typography variant="h6">Quiz Results</Typography>
      
      <Paper sx={{ width: 300, p: 2, boxShadow: 1  }}>
        <p>Score: {`${correct} / ${questions.length}`}</p>
      </Paper>
      <Button href="/" variant="contained" color="success" sx={{ mt: 2 }}>Ok</Button>
    </Box>
  );
};

export default QuizResult;