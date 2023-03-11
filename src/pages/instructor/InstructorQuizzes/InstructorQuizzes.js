import { Box, Button, Container, Grid, LinearProgress } from '@mui/material';

import { useEffect, useRef, useState } from 'react';

import { instructorApi } from 'services/api';
import ScheduledQuiz from './components/ScheduledQuiz';
import ScheduleQuizModal from './components/ScheduleQuizModal';
import Subtitle from 'components/Subtitle';
import Title from 'components/Title';
import TitleDivider from 'components/TitleDivider';
import QuizContainer from './components/QuizContainer';

const InstructorQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [scheduledQuizzes, setScheduledQuizzes] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const [sqLoading, setSqLoading] = useState(true);

  const fetchScheduledQuizzes = async () => {
    //setSqLoading(true);
    const res = await instructorApi.getScheduledQuizzes('incomplete');

    setScheduledQuizzes(res.data);
    setSqLoading(false);
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await instructorApi.getInstructorQuizzes({ pagination: false });
      
      setQuizzes(res.data);
    };

    const fetchClasses = async () => {
      const res = await instructorApi.getClasses();

      setClasses(res.data);
    };

    fetchQuizzes();
    fetchScheduledQuizzes();
    fetchClasses();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <ScheduleQuizModal 
        open={showModal} 
        setOpen={setShowModal} 
        quizzes={quizzes} 
        classes={classes} 
        callback={fetchScheduledQuizzes} 
        editData={modalRef.current}  
      />

      <Title>Quizzes</Title>
      <TitleDivider />
      
      <Grid container>
        <Grid item xs={7}>
          <Subtitle>Scheduled Quizzes</Subtitle>
        
          {sqLoading ? (
            <LinearProgress />
          ) : (
            <Box sx={{ overflow: 'auto', maxHeight: 500, maxWidth: 500 }}>
              {scheduledQuizzes.map((quiz, index) => (
                <ScheduledQuiz 
                  key={index} 
                  data={quiz} 
                  modalRef={modalRef} 
                  setShowModal={setShowModal}
                />
              ))}
            </Box>
          )}

          <Button 
            variant="contained" 
            color="success"
            sx={{ mt: 1 }} 
            onClick={() => {
              modalRef.current = null;
              setShowModal(true);
            }}
          >
            Schedule Quiz
          </Button>
        </Grid>

        <Grid item xs={5}>
          <Subtitle>My Quizzes</Subtitle>

          <QuizContainer />
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorQuizzes;