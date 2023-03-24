import { Container, Typography, CircularProgress } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import QuizProgress from './components/QuizProgress';
import QuizQuestion from './components/QuizQuestion';
import QuizResult from './components/QuizResult';
import { studentApi } from 'services/api';
import TitleDivider from 'components/TitleDivider';

const Quiz = () => {
  const location = useLocation();

  const data = location.state?.quizData;
  const questions = data?.quiz.questions;
  const responses = useRef([]);

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

  const submitQuiz = useCallback(
    () => {
      setComplete(true);
      studentApi.submitQuiz({ id: data._id, responses: responses.current })
        .then((res) => {
          setGrade(res.data);
          setGraded(true);
        })
        .catch(() => console.error('Server error'));
    },
    [data._id]
  );

  useEffect(() => {
    if(time <= 0) {
      submitQuiz();
    }
  }, [time, submitQuiz]);

  if(!data) {
    return (<Navigate to="/student/quizzes" replace />);
  }

  const submitQuestion = (res) => {
    responses.current = [...responses.current, res];
    //console.log(responses.current);

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
      <TitleDivider />
      <Typography variant="h6">{data.class.title}</Typography>

      {complete ? 
        (graded ? (
          <QuizResult 
            grade={grade} 
            questions={questions} 
            responses={responses.current} 
          />
        ) : (
          <CircularProgress />
        )): (
        <>
          <QuizProgress progress={currIndex + 1} length={questions.length} time={time} />
          
          <QuizQuestion data={currQuestion} callback={submitQuestion} />
        </>
      )}

    </Container>
  );
};

export default Quiz;