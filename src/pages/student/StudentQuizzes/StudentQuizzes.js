
import { Box, Container, Grid } from '@mui/material';
import Title from 'components/Title';
import TitleDivider from 'components/TitleDivider';
import { useEffect, useState } from 'react';

import { studentApi } from 'services/api';
import Quiz from "./components/Quiz";


const StudentQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await studentApi.getStudentQuizzes();
      //console.log(res.data);
      setQuizzes(res.data);
    };

    fetchQuizzes();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Title>Upcoming Quizzes</Title>
      <TitleDivider />
      <Box  sx={{ overflow: 'auto', maxHeight: 400 }}>
        <Grid container>
          {quizzes.map((quiz, index) => (
            <Grid item xs={4}>
              <Quiz key={index} data={quiz} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default StudentQuizzes;