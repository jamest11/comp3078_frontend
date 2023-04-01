import { Button, Container, Grid, LinearProgress, Stack, Pagination, TextField, MenuItem, IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [sqPage, setSqPage] = useState(1);
  const [sqFilter, setSqFilter] = useState('');
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const [loading, setLoading] = useState(true);

  const updateScheduledQuizzes = () => {
    setSqFilter('');
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

  useEffect(() => {
    setSqPage(1);
    if(sqFilter === '') {
      setFilteredQuizzes(scheduledQuizzes);
    }
    else {
      const filtered = scheduledQuizzes.filter((quiz) => quiz.classTitle === sqFilter);
      setFilteredQuizzes(filtered);
    }
  }, [scheduledQuizzes, sqFilter]);

  const handlePageChange = (event, value) => {
    setSqPage(value);
  };

  const handleFilterChange = (event) => {
    setSqFilter(event.target.value);
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
              <Stack direction="row" alignItems="center">
                <Pagination 
                  count={Math.ceil(filteredQuizzes.length / PAGE_SIZE)} 
                  page={sqPage} 
                  onChange={handlePageChange} 
                />
              </Stack>
              {filteredQuizzes.slice((sqPage - 1) * PAGE_SIZE, sqPage * PAGE_SIZE).map((quiz, index) => (
                <ScheduledQuiz 
                  key={index} 
                  data={quiz} 
                  modalRef={modalRef} 
                  setShowModal={setShowModal}
                />
              ))}

              <Stack direction="row" alignItems="center">
                <Button 
                  variant="contained" 
                  color="success"
                  onClick={() => {
                    modalRef.current = null;
                    setShowModal(true);
                  }}
                >
                  Schedule Quiz
                </Button>

                <TextField 
                  sx={{ ml: 'auto', width: 200, backgroundColor: 'white', borderRadius: 1 }}
                  select 
                  size="small"
                  label="Class Filter"
                  value={sqFilter}
                  onChange={handleFilterChange}
                >
                  {classes.map((item, index) => (
                    <MenuItem key={index} value={item.title} dense>{item.title}</MenuItem>
                  ))}
                </TextField>
                
                <IconButton onClick={() => setSqFilter('')} sx={{ p: 0.5 }}>
                  <HighlightOffIcon />
                </IconButton>
              </Stack>
            </Stack>
          )}
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