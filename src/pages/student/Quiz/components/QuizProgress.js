import { Box, Chip, LinearProgress } from '@mui/material';
import { formatTime } from 'utils';

const QuizProgress = ({ length, progress, time }) => {
  return (
    <Box 
      component="div" 
      sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        width: 'auto', 
        alignItems: 'center', 
        mt: 2 }}
      >
      <Chip 
        label={formatTime(time)} 
        color={time < 30 ? 'error' : (time < 60 ? 'warning' : 'success')}
      />
     
      <LinearProgress
        variant="determinate"
        value={ progress / length * 100 }
        sx={{ height: 10, boxShadow: 1, flex: 1, mx: 2 }}
        color="secondary"
      />
      <Chip 
        label={`${progress} / ${length}`} 
        sx={{ bgcolor: 'secondary.light', color: 'text.light' }}
      />
    </Box>
  );
};

export default QuizProgress;