import { Container, Grid, LinearProgress, Alert, Link as MUILink, Typography, Stack, Pagination, TextField, MenuItem, IconButton, Box } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Title from 'components/Title';
import TitleDivider from 'components/TitleDivider';
import { studentApi } from 'services/api';
import Quiz from "./components/Quiz";

const PAGE_SIZE = 6;

const StudentQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [classNames, setClassNames] = useState([]);
  const [filter, setFilter]  = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    studentApi.getStudentQuizzes()
      .then((res) => setQuizzes(res.data))
      .catch((error) => console.error('Server error'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const names = [...new Set(quizzes.map((q) => q.classTitle))];
    names.sort();

    setClassNames(names);
  }, [quizzes]);

  useEffect(() => {
    setPage(1);
    if(filter === '') {
      setFilteredQuizzes(quizzes);
    }
    else {
      const filtered = quizzes.filter((quiz) => quiz.classTitle === filter);
      setFilteredQuizzes(filtered);
    }
  }, [quizzes, filter]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Title>Upcoming Quizzes</Title>
      <TitleDivider />
  
      {loading ? (
        <LinearProgress />
      ) : quizzes.length === 0 ? (
        <Alert severity="success" sx={{ maxWidth: 600 }}>
          <Typography variant="body1">
            You have completed all of your assigned quizzes. Great Work!
          </Typography>
          <Typography variant="body1">
            Click <MUILink component={Link} to="/student/grades">here</MUILink> to view your grades.
          </Typography>
        </Alert>
      ) : (
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <Pagination 
              count={Math.ceil(quizzes.length / PAGE_SIZE)} 
              page={page} 
              onChange={handlePageChange} 
            />

            <Box display="flex" alignItems="center">
              <TextField 
                sx={{ ml: 'auto', width: 200, backgroundColor: 'white', borderRadius: 1 }}
                select 
                size="small"
                label="Class Filter"
                value={filter}
                onChange={handleFilterChange}
              >
                {classNames.map((name, index) => (
                  <MenuItem key={index} value={name} dense>{name}</MenuItem>
                ))}
              </TextField>
              
              <IconButton onClick={() => setFilter('')} sx={{ p: 0.5 }}>
                <HighlightOffIcon />
              </IconButton>
            </Box>
          </Stack>
          <Grid container>
            {filteredQuizzes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((quiz, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Quiz data={quiz} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
      
    </Container>
  );
};

export default StudentQuizzes;