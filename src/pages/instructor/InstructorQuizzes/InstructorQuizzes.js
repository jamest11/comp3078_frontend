import { Box, Button, Container, Divider, Grid, LinearProgress } from '@mui/material';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { instructorApi } from 'services/api';
import Quiz from './components/Quiz';
import ScheduledQuiz from './components/ScheduledQuiz';
import ScheduleQuizModal from './components/ScheduleQuizModal';
import Subtitle from 'components/Subtitle';
import Title from 'components/Title';

const InstructorQuizzes = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [scheduledQuizzes, setScheduledQuizzes] = useState([]);
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [qLoading, setQLoading] = useState(true);
  const [sqLoading, setSqLoading] = useState(true);

  const fetchScheduledQuizzes = async () => {
    const res = await instructorApi.getScheduledQuizzes();

    setScheduledQuizzes(res.data);
    setSqLoading(false);
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await instructorApi.getInstructorQuizzes();
      
      setQuizzes(res.data);
      setQLoading(false);
    };

    const fetchClasses = async () => {
      const res = await instructorApi.getClasses();

      setClasses(res.data);
    };

    fetchQuizzes();
    fetchScheduledQuizzes();
    fetchClasses();
  }, []);

  const scheduleQuiz = () => {
    setShowModal(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <ScheduleQuizModal open={showModal} setOpen={setShowModal} quizzes={quizzes} classes={classes} callback={fetchScheduledQuizzes} />

      <Title>Quizzes</Title>
      <Divider  sx={{ my: 2, boxShadow: 1 }}/>
      <Grid container>
        <Grid item xs={6}>
          <Subtitle>Scheduled Quizzes</Subtitle>
        
          {sqLoading ? (
            <LinearProgress />
          ) : (
            <Box  sx={{ overflow: 'auto', maxHeight: 400 }}>
              {scheduledQuizzes.map((quiz, index) => (
                <ScheduledQuiz key={index} data={quiz} />
              ))}
            </Box>
          )}

          <Button 
            variant="contained" 
            color="success"
            sx={{ mt: 1 }} 
            onClick={scheduleQuiz}
          >
              Schedule Quiz
            </Button>
        </Grid>

        <Grid item xs={4}>
          <Subtitle>My Quizzes</Subtitle>

          {qLoading ? (
            <LinearProgress />
          ) : (
            <Box  sx={{ overflow: 'auto', maxHeight: 400 }}>
              {quizzes.map((quiz, index) => (
                <Quiz key={index} data={quiz} />
              ))}
            </Box>
          )}

          <Button 
            variant="contained" 
            color="success"
            sx={{ mt: 1 }} 
            onClick={() => navigate('/create-quiz')}
          >
            Create New Quiz
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorQuizzes;