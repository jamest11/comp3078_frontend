import { Container, Grid, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { instructorApi } from 'services/api';
import Title from 'components/Title';
import ClassGrade from './components/ClassGrade';
import Subtitle from 'components/Subtitle';
import TitleDivider from 'components/TitleDivider';
import GradeDataGrid from './components/GradeDataGrid';
import ClassGradesChart from './components/ClassGradesChart';

const InstructorGrades = () => {
  const [cgLoading, setCgLoading] = useState(true);
  const [quizGrades, setQuizGrades] = useState([]);
  const [classGrades, setClassGrades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const qgRes = await instructorApi.getInstructorGrades('quiz');
        const cgRes = await instructorApi.getInstructorGrades('class');

        setQuizGrades(qgRes.data);
        setClassGrades(cgRes.data);
      } catch(error) {
        console.error('Server error');
      } finally {
        setCgLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Title>Grades</Title>
      <TitleDivider />

      <Grid container spacing={4}>
        <Grid item sm={12} md={8}>
          <Subtitle>Ongoing Quizzes</Subtitle>

          <GradeDataGrid 
            quizGrades={quizGrades.filter(q => q.complete === false)} 
            variant="incomplete" 
          />

          <Typography variant="h5" sx={{ mt: 1 }} gutterBottom>Completed Quizzes</Typography>
          
          <GradeDataGrid 
            quizGrades={quizGrades.filter(q => q.complete === true)} 
            variant="complete" 
          />
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

          <ClassGradesChart data={classGrades} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorGrades;