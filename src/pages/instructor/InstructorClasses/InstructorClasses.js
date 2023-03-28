import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Container, Divider, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Title from 'components/Title';
import TitleDivider from 'components/TitleDivider';
import { instructorApi } from 'services/api';
import CreateClassModal from './components/CreateClassModal';

const InstructorClasses = () => {
  const [classes, setClasses] = useState([]);
  const [classGrades, setClassGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [message, setMessage] = useState(location?.state?.message);

  const fetchClasses = () => {
    instructorApi.getClasses()
      .then((res) => setClasses(res.data))
      .catch((error) => console.error('Server error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const fetchClassGrades = () => {
      instructorApi.getInstructorGrades('class')
        .then((res) => setClassGrades(res.data))
        .catch((error) => console.error('Server error'));
    };

    fetchClasses();
    fetchClassGrades();
  }, []); 

  const ClassGrade = (id) => {
    const grade = classGrades.find((x) => x._id === id);

    if(grade && grade.count > 0){
      return (<Typography>{grade.average}% average</Typography>);
    }

    return null;
  }; 

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <CreateClassModal open={showModal} setOpen={setShowModal} callback={fetchClasses} />

      <Title>Classes</Title>
      <TitleDivider />

      {message && (
        <Alert 
          onClose={() => setMessage(undefined)} 
          severity={message.severity} 
          sx={{ mb: 2, maxWidth: 600 }}
        >
          {message.text}
        </Alert>
      )}

      <Box maxWidth="sm">
        {loading ? (
          <LinearProgress />
        ) : (
          <>
            {classes.map((item, index) => (
              <Accordion key={index} disableGutters>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography variant="h5">{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <Stack 
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={2}
                      >
                        <Typography>
                          {item.students.length} students
                        </Typography>
                      
                        {ClassGrade(item._id)}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} container justifyContent="flex-end" gap={1}>
                      <Button variant="outlined" color="primary" size="small">Details</Button>
                      <Button variant="outlined" color="success" size="small">Edit</Button>
                      <Button variant="outlined" color="error" size="small">Delete</Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </>
        )}
      </Box>

      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Button 
          variant="contained" 
          color="success"
          onClick={() => setShowModal(true)}
        >
          Create New Class
        </Button>
        <Button 
          variant="contained" 
          color="success"
          onClick={() => navigate('add-students')}
        >
          Add Students to Class
        </Button>
      </Stack>  
    </Container>
  );
};

export default InstructorClasses;