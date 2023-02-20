import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { instructorApi } from 'services/api';
import Quiz from "./components/Quiz";
import ScheduledQuiz from "./components/ScheduledQuiz";
import ScheduleQuizModal from "./components/ScheduleQuizModal";


const InstructorQuizzes = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [scheduledQuizzes, setScheduledQuizzes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await instructorApi.getInstructorQuizzes();
      //console.log(res.data);
      setQuizzes(res.data);
    };

    const fetchScheduledQuizzes = async() => {
      const res = await instructorApi.getScheduledQuizzes();

      //console.log(res.data);
      setScheduledQuizzes(res.data);
    };

    fetchQuizzes();
    fetchScheduledQuizzes();
  }, []);

  const scheduleQuiz = () => {
    setShowModal(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <ScheduleQuizModal open={showModal} setOpen={setShowModal} quizzes={quizzes} />

      <Typography variant="h3">Quizzes</Typography>
      <Divider  sx={{ my: 2, boxShadow: 2 }}/>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h4">Scheduled Quizzes</Typography>
        
          <Box  sx={{ overflow: 'auto', maxHeight: 400 }}>
            {scheduledQuizzes.map((quiz, index) => (
              <ScheduledQuiz key={index} data={quiz} />
            ))}
          </Box>

          <Button variant="contained" color="success" sx={{ mt: 1 }} onClick={scheduleQuiz}>Schedule Quiz</Button>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="h4">My Quizzes</Typography>
          <Box  sx={{ overflow: 'auto', maxHeight: 400 }}>
            {quizzes.map((quiz, index) => (
              <Quiz key={index} data={quiz} />
            ))}
          </Box>
          <Button variant="contained" color="success" sx={{ mt: 1 }} onClick={() => navigate('/create-quiz')}>Create New Quiz</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorQuizzes;