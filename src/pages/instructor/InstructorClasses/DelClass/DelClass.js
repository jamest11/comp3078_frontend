import { Box, Button, Container, FormGroup, Paper, Typography } from '@mui/material';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { instructorApi } from 'services/api';
import Subtitle from 'components/Subtitle';

const DelClass = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const qClass = location.state?.class;

  const handleDelete = () => {
    instructorApi.deleteClass({ id: qClass._id })
      .then((res) => navigate('..'))
      .catch(() => console.error('Server error'));
  };

  if(!qClass) {
    return (<Navigate to=".." replace />);
  }

  return (
    <Container maxWidth="sm">
      <Box
        component={Paper}
        elevation={6}
        sx={{
          p: 4,
          mt: 6,
        }}
      >
        <Subtitle>Delete Quiz</Subtitle>
        <Typography variant="body1">
          Are you sure you want to delete the calss <b>{qClass.title}</b>?
        </Typography>
        <br/>
        <Typography variant="body1">
          This will delete any scheduled quizzes associated with this class.
        </Typography>

        <FormGroup row sx={{ gap: 1, mt: 2}}>
          <Button 
            variant="contained" 
            color="error" 
            size="small"
            onClick={() => handleDelete()}
          >
            Confirm
          </Button>
          <Button 
            variant="contained" 
            size="small"
            onClick={() => navigate('..')}
          >
            Cancel
          </Button>
        </FormGroup>
      </Box>
    </Container>
  );
};

export default DelClass;