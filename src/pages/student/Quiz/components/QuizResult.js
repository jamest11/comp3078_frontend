import { Box, Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const QuizResult = ({ grade }) => {

  return (
    <Box component="div" sx={{ mt: 5 }}>
      <Typography variant="h6">Quiz Results</Typography>
      
      <Paper sx={{ width: 300, p: 2, }} elevation={2}>
        <Typography variant="body1">Score: {grade.correct} / {grade.total}</Typography>
        <Typography variant="body1">Percent: {`${(grade.correct / grade.total * 100).toFixed(1)}%`}</Typography>
      </Paper>
      <Button component={Link} to="/student-grades" variant="contained" color="success" sx={{ mt: 2 }}>Ok</Button>
    </Box>
  );
};

export default QuizResult;