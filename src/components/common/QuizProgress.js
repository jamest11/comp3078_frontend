import { LinearProgress } from '@mui/material';

const QuizProgress = ({ length, progress }) => {

  return (
    <LinearProgress
      variant="determinate"
      value={ progress / length * 100 }
      sx={{ height: 10, boxShadow: 1, flex: 1, mx: 2 }}
      color="secondary"
    />
  );
};

export default QuizProgress;