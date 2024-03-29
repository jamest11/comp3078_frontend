import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Container, Divider, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import Title from 'components/Title';
import TitleDivider from 'components/TitleDivider';
import { instructorApi } from 'services/api';

const InstructorClasses = () => {
  const [classes, setClasses] = useState([]);
  const [classGrades, setClassGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const [message, setMessage] = useState(location?.state?.message);

  const fetchGradesAndExport = (id) => {
    instructorApi.getInstructorGrades('class', id)
      .then((res) => navigate('export', { state: { data: res.data }}));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cRes = await instructorApi.getClasses();
        const cgRes = await instructorApi.getInstructorGrades('class');
        
        setClassGrades(cgRes.data);
        setClasses(cRes.data);
      } catch(error) {
        console.error('Server error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const ClassGrade = (id) => {
    const grade = classGrades.find((x) => x._id === id);

    if(grade && grade.count > 0){
      return (<Typography>{Math.round(grade.average * 100) / 100}% average</Typography>);
    }

    return null;
  }; 

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
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
                    <Grid item xs={12} sm={5}>
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
                    <Grid item xs container justifyContent="flex-end" gap={1}>
                      <Button 
                        variant="outlined" 
                        color="success" 
                        size="small"
                        onClick={() => navigate('edit', { state: { class: item }})}
                      >
                        Edit
                      </Button>
                      {ClassGrade(item._id) ? (
                        <Button 
                        variant="outlined" 
                        color="primary" 
                        size="small"
                        onClick={() => fetchGradesAndExport(item._id)}
                        >
                          Export Grades
                        </Button>
                      ) : null}

                      <Button 
                        variant="outlined" 
                        color="error" 
                        size="small"
                        onClick={() => navigate('delete-class', { state: { class: item }})}
                      >
                        Delete
                      </Button>
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
          component={Link}
          variant="contained" 
          color="success"
          to="create-class"
        >
          Create New Class
        </Button>
      </Stack>  
    </Container>
  );
};

export default InstructorClasses;