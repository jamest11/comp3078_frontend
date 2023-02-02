import { Box, Container, Typography, Divider, Chip } from '@mui/material';
import QuizProgress from '../common/QuizProgress';
import { useEffect, useState } from 'react';
import QuizQuestion from '../common/QuizQuestion';

const Quiz = ({ quizData, course }) => {
  const questions = quizData.questions;
  const responses = [];

  const [currIndex, setCurrIndex] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(questions[currIndex]);
  const [time, setTime] = useState(quizData.time);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const submitQuestion = (res) => {
    responses.push(res);

    if(currIndex === questions.length - 1) {

    }
    else {
      setCurrQuestion(questions[currIndex + 1]);
      setCurrIndex((currIndex) => currIndex + 1);
    }
  };

  const submitQuiz = () => {

  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h4">{quizData.title}</Typography>
      <Divider sx={{ mt: 2, mb: 1, bgcolor: 'darkGray' }} />
      <Typography variant="h6">{course}</Typography>

      <Box component="div" sx={{ display: 'flex', flexDirection: 'row', width: 'auto', alignItems: 'center', mt: 2 }}>
        <Chip label={time} sx={{ bgcolor: 'lightGreen' }} />
        <QuizProgress progress={currIndex + 1} length={questions.length} />
        <Chip label={`${currIndex + 1} / ${questions.length}`} sx={{ bgcolor: 'lightBlue' }} />
      </Box>

      <QuizQuestion data={currQuestion} callback={submitQuestion} />
    </Container>
  );
};

export default Quiz;