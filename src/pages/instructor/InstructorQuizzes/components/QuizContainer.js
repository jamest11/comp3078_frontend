import { Button, LinearProgress, Pagination, Stack, IconButton, Box, InputAdornment, OutlinedInput, FormControl, InputLabel } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Quiz from './Quiz';

const PAGE_SIZE = 4;

const QuizContainer = ({ quizzes, loading }) => {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);

  useEffect(() => {
    setFilteredQuizzes(quizzes);
    setPage(1);
    setFilter('');
  }, [quizzes]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const updateFilter = () => {
    setFilteredQuizzes(quizzes.filter((quiz) => quiz.title.toLowerCase().includes(filter.toLowerCase())));
    setPage(1);
  };

  const resetFilter = () => {
    setFilteredQuizzes(quizzes);
    setFilter('');
    setPage(1);
  };

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
          <Stack spacing={1} sx={{ maxWidth: 500 }}>
            <Pagination 
              count={Math.ceil(filteredQuizzes.length / PAGE_SIZE)} 
              page={page} 
              onChange={handlePageChange} 
            />
          
            {filteredQuizzes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((quiz, index) => (
              <Quiz key={index} data={quiz} />
            ))}

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Button 
                variant="contained" 
                color="success"
                component={Link}
                to="create-quiz"
              >
                Create Quiz
              </Button>

              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <FormControl size="small">
                  <InputLabel htmlFor="filter">Search</InputLabel>
                  <OutlinedInput 
                    type="text" 
                    id="filter"
                    value={filter}
                    onChange={handleFilterChange}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault();
                        updateFilter();
                      }
                    }}
                    endAdornment={
                      <InputAdornment position="end" onClick={updateFilter}>
                        <IconButton edge="end" onClick={updateFilter}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Search"
                    sx={{ backgroundColor: 'white', borderRadius: 1, width: 200 }}
                  />
                </FormControl>

                <IconButton onClick={resetFilter} sx={{ p: 0.5 }}>
                  <HighlightOffIcon />
                </IconButton>
              </Box>
            </Stack>
          </Stack>
      )}
    </>
  );
};

export default QuizContainer;