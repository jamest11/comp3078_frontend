import { Box, Container, Typography, Divider, Chip, CircularProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import QuizProgress from './components/QuizProgress';
import QuizQuestion from './components/QuizQuestion';
import QuizResult from './components/QuizResult';
import { studentApi } from 'services/apiService';

const Quiz = () => {
  const location = useLocation();

  const data = location.state?.quizData;
  const questions = data?.quiz.questions;
  const responses = [];

  const [currIndex, setCurrIndex] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(questions ? questions[currIndex] : null);
  const [time, setTime] = useState(data?.quiz.timeLimit);
  const [complete, setComplete] = useState(false);

  const [graded, setGraded] = useState(false);
  const [grade, setGrade] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      if(!complete) {
        setTime((time) => time - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [complete]);

  useEffect(() => {
    if(time <= 0) {
      submitQuiz();
    }
  }, [time]);

  if(!data) {
    return (<Navigate to="/student-profile" replace />);
  }

  const submitQuiz = () => {
    setComplete(true);
    studentApi.submitQuiz({ id: data._id, responses })
      .then((res) => {
        setGrade({ correct: res.data.correct, total: res.data.total });
        setGraded(true);
      })
      .catch(console.error);
  };

  const submitQuestion = (res) => {
    responses.push(res);

    if(currIndex === questions.length - 1) {
      submitQuiz();
    }
    else {
      setCurrQuestion(questions[currIndex + 1]);
      setCurrIndex((currIndex) => currIndex + 1);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h4">{data.quiz.title}</Typography>
      <Divider sx={{ mt: 2, mb: 1, bgcolor: 'darkGray' }} />
      <Typography variant="h6">{data.class.title}</Typography>

      {complete ? 
        (graded ? (
          <QuizResult grade={grade} />
        ) : (
          <CircularProgress />
        )): (
        <>
          <Box component="div" sx={{ display: 'flex', flexDirection: 'row', width: 'auto', alignItems: 'center', mt: 2 }}>
            <Chip label={time} sx={{ bgcolor: 'lightGreen' }} />
            <QuizProgress progress={currIndex + 1} length={questions.length} />
            <Chip label={`${currIndex + 1} / ${questions.length}`} sx={{ bgcolor: 'lightBlue' }} />
          </Box>

          <QuizQuestion data={currQuestion} callback={submitQuestion} />
        </>
      )}

    </Container>
  );
};

export default Quiz;