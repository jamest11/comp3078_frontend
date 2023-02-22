import { Container, Grid, LinearProgress, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { instructorApi } from 'services/api';
import Title from 'components/Title';
import ClassGrade from './components/ClassGrade';
import QuizGradesTable from './components/QuizGradesTable';
import Subtitle from 'components/Subtitle';
import TitleDivider from 'components/TitleDivider';

const InstructorGrades = () => {
  const [qgLoading, setQgLoading] = useState(true);
  const [cgLoading, setCgLoading] = useState(true);
  const [quizGrades, setQuizGrades] = useState([]);
  const [classGrades, setClassGrades] = useState([]);

  useEffect(() => {
    const fetchQuizGrades = async () => {
      const res = await instructorApi.getQuizGrades();

      setQuizGrades(res.data);
      setQgLoading(false);
    };
    
    const fetchClassGrades = async () => {
      const res = await instructorApi.getClassGrades();

      setClassGrades(res.data);
      setCgLoading(false);
    };

    fetchQuizGrades();
    fetchClassGrades();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Title>Grades</Title>
      <TitleDivider />

      <Grid container columnGap={4}>
        <Grid item sm={10} md={7}>
          <Subtitle>Quiz Grades</Subtitle>

          <QuizGradesTable loading={qgLoading} quizGrades={quizGrades} />
        </Grid>

        <Grid item>
          <Subtitle>Average Class Grades</Subtitle>
          {cgLoading ? (
            <LinearProgress />
          ) : (
            <Stack spacing={1}>
              {classGrades.map((grade, index) => (
                <ClassGrade key={index} data={grade} />
              ))}
            </Stack>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorGrades;