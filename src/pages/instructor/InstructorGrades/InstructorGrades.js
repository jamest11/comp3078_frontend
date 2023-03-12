import { Container, Grid, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { instructorApi } from 'services/api';
import Title from 'components/Title';
import ClassGrade from './components/ClassGrade';
import QuizGradesTable from './components/QuizGradesTable';
import Subtitle from 'components/Subtitle';
import TitleDivider from 'components/TitleDivider';
import GradeDataGrid from './components/GradeDataGrid';

const InstructorGrades = () => {
  const [qgLoading, setQgLoading] = useState(true);
  const [cgLoading, setCgLoading] = useState(true);
  const [quizGrades, setQuizGrades] = useState([]);
  const [classGrades, setClassGrades] = useState([]);

  useEffect(() => {
    const fetchQuizGrades = async () => {
      const res = await instructorApi.getInstructorGrades('quiz');

      setQuizGrades(res.data);
      setQgLoading(false);
    };
    
    const fetchClassGrades = async () => {
      const res = await instructorApi.getInstructorGrades('class');

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

      <Grid container spacing={4}>
        <Grid item sm={12} md={8}>
          <Subtitle>Ongoing Quizzes</Subtitle>

          {/*<QuizGradesTable loading={qgLoading} quizGrades={quizGrades.filter(q => q.complete === false)} />*/}
          <GradeDataGrid quizGrades={quizGrades.filter(q => q.complete === false)} />

          <Typography variant="h5" sx={{ mt: 2 }} gutterBottom>Completed Quizzes</Typography>
          {/*<QuizGradesTable loading={qgLoading} quizGrades={quizGrades.filter(q => q.complete === true)} />*/}
          <GradeDataGrid quizGrades={quizGrades.filter(q => q.complete === true)} />
        </Grid>

        <Grid item sm={12} md={4}>
          <Subtitle>Average Class Grades</Subtitle>
          {cgLoading ? (
            <LinearProgress />
          ) : (
            <>
              {classGrades.map((grade, index) => (
                <ClassGrade key={index} data={grade} />
              ))}
            </>        
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorGrades;