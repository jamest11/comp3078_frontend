import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { formatDate } from 'utils';
import { useNavigate } from 'react-router-dom';

const ScheduledQuiz = ({ data, modalRef, setShowModal }) => {
  const navigate = useNavigate();

  return (
    <Box
      component={Paper}
      elevation={1}
      sx={{ px: 2, py: 1 }}
    >
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h6">{data.quizTitle}</Typography>
          <Typography variant="body2">{data.classTitle}</Typography>
          <Box>
            <Typography variant="body2" display="inline">
              Due {formatDate(data.dueDate)}
              &nbsp; | &nbsp;Progress:&nbsp;
            </Typography>
            <Typography display="inline" variant="body2" fontWeight="medium">
              {`${data.numComplete}/${data.numStudents}`}
            </Typography>
          </Box>

        </Grid>
        <Grid 
          item 
          container 
          alignItems="center" 
          justifyContent="flex-end" 
          xs={4} 
          gap={1} 
        >
          <Button 
            variant="outlined" 
            color="success" 
            size="small"
            onClick={() => {
              modalRef.current = data;
              setShowModal(true);
            }}
          >
            Edit
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            size="small"
            onClick={() => navigate('delete-scheduled-quiz', { state: { quiz: data }})}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ScheduledQuiz;