import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const QuizResult = ({ grade, questions, responses }) => {
  return (
    <Box sx={{ mt: 2 }}>      
      <Paper sx={{ maxWidth: 600, p: 2, mb: 1 }}>
        <Typography variant="h6" display="inline">
          Quiz Results: &nbsp; 
          <Typography variant="body1" display="inline">
            {grade.correct} / {grade.total} ({`${grade.grade}`}%)
          </Typography>
        </Typography>

        <Stack spacing={2} sx={{ mt: 1 }}>
          {questions.map((question, index) => (
            <Box key={index}>
              <Typography variant="body1" sx={{ pb: 0.5 }}>
                Q{index + 1}: {question.q}
              </Typography>
              <Typography variant="body2" display="flex" alignItems="center">
                {question.r[responses[index]] ?? 'Not answered'}&nbsp;
                {grade.details[index] ? 
                  (<CheckIcon color="success" />) :
                  (<ClearIcon color="error" />)}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Paper>

      <Button 
        component={Link} 
        to="/student/grades" 
        variant="contained" 
        color="success" 
        size="small"
      >
        Ok
      </Button>
    </Box>
  );
};

export default QuizResult;