import { Button, Container, Grid, LinearProgress, Stack, Pagination } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { instructorApi } from 'services/api';
import Subtitle from 'components/Subtitle';
import Title from 'components/Title';

import ScheduledQuiz from './components/ScheduledQuiz';
import ScheduleQuizModal from './components/ScheduleQuizModal';
import TitleDivider from 'components/TitleDivider';
import QuizContainer from './components/QuizContainer';

const PAGE_SIZE = 4;

const InstructorQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [scheduledQuizzes, setScheduledQuizzes] = useState([]);
  const [sqPage, setSqPage] = useState(1);
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const [loading, setLoading] = useState(true);

  const updateScheduledQuizzes = () => {
    instructorApi.getScheduledQuizzes('incomplete') 
      .then((res) => setScheduledQuizzes(res.data))
      .catch((error) => console.error('Server error'));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const qRes = await instructorApi.getInstructorQuizzes();
        const cRes = await instructorApi.getClasses();
        const sqRes = await instructorApi.getScheduledQuizzes('incomplete'); 
        
        setQuizzes(qRes.data);
        setScheduledQuizzes(sqRes.data);
        setClasses(cRes.data);
      } catch(error) {
        console.error('Server error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (event, value) => {
    setSqPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, pb: 2 }}>
      <ScheduleQuizModal 
        open={showModal} 
        setOpen={setShowModal} 
        quizzes={quizzes} 
        classes={classes} 
        callback={updateScheduledQuizzes} 
        editData={modalRef.current}  
      />

      <Title>Quizzes</Title>
      <TitleDivider />
      
      <Grid container spacing={1}>
        <Grid item sm={12} md={7}>
          <Subtitle>Scheduled Quizzes</Subtitle>
        
          {loading ? (
            <LinearProgress />
          ) : (
            <Stack spacing={1} sx={{ maxWidth: 500 }}>
              {scheduledQuizzes.slice((sqPage - 1) * PAGE_SIZE, sqPage * PAGE_SIZE).map((quiz, index) => (
                <ScheduledQuiz 
                  key={index} 
                  data={quiz} 
                  modalRef={modalRef} 
                  setShowModal={setShowModal}
                />
              ))}
              <Pagination 
                 count={Math.floor(scheduledQuizzes.length / PAGE_SIZE) > 0 ? Math.floor(scheduledQuizzes.length / PAGE_SIZE) : 1} 
                page={sqPage} 
                onChange={handlePageChange} 
              />
            </Stack>
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

        <Grid item sm={12} md={5}>
          <Subtitle>My Quizzes</Subtitle>

          <QuizContainer loading={loading} quizzes={quizzes} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorQuizzes;