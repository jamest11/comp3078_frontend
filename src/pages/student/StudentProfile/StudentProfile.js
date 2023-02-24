import { Box, Button, Container, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from 'utils';

import TitleDivider from 'components/TitleDivider';
import { useAuth } from 'security/AuthContextProvider';
import { studentApi } from 'services/api';
import Title from 'components/Title';


const StudentProfile = () => {
  const [quizzes, setQuizzes] = useState([]);  
  const { user, handleLogout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const res = await studentApi.getStudentQuizzes();

      setQuizzes(res.data);
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Title>Profile</Title>
      <TitleDivider />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h4">Upcoming Quizzes</Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <>
                  {quizzes.map((quiz, index) => (
                    <TableRow key={index}>
                      <TableCell>{quiz.quiz.title}</TableCell>
                      <TableCell>{quiz.class.title}</TableCell>
                      <TableCell>{formatDate(quiz.quiz.date)}</TableCell>  
                      <Button size="small" variant="contained">Take Quiz</Button>
                    </TableRow>
                  ))}
                </>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
   
        <Grid item xs={6}>   
          <Typography variant="h4" sx={{mr:30, mt:0, mb:2}} >Grades</Typography>
          <Paper sx={{ width: 300, p: 2, mt: 0, mb: 3 }} elevation={2}>
            <Typography variant="h5">Great Work!</Typography>
            <Box> The Average of your quizzes is %!</Box>
          </Paper>
          <Button component={Link} to="../StudentGrades" variant="contained" color="success">Grade History</Button>

        </Grid>

        <Grid item xs={4}>
          <Paper sx={{ p: 2, mt:4 }} elevation={2}>
            <Typography variant="h6">User Details

            <Button onClick={() => handleLogout()} sx={{ color: 'text.origin', ':hover': { color: 'text.light ' 
              }, ml:10  }} > Sign Out
            </Button>     
            
            </Typography>
            <Typography variant="body1">Name: {user.name}</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">User Type: {user.userType}</Typography>
            <Typography variant="body1"> Registered Since: {user.email}</Typography>
          </Paper> 
        </Grid>
    
        <Grid item xs={4}>
          <Paper sx={{ width: 250, p: 2, mb:2 }} elevation={2}>
            <Typography sx={{ mt: 0, ml:6 }} variant="h6">Site Navigation</Typography>
            <Divider sx={{ mt: 2, mb: 1, bgcolor: 'darkGray' }} />
            <Button sx={{ mt: 3, ml:8}} component={Link} to="../../instructor/InstructorQuizzes" variant="contained" color="success" >Quizzes</Button><br/><br/>
            <Button sx={{ mt: 1, ml:8 }} component={Link} to="../../instructor/InstructorGrades" variant="contained" color="success" >Grades</Button><br/><br/>
            <Button sx={{ mt: 1, ml:8 }} component={Link} to="../../instructor/CreateQuiz" variant="contained" color="success" >classes</Button><br/><br/>
          </Paper> 
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentProfile;