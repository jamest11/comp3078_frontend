import { Button, LinearProgress, Pagination, Stack } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Quiz from './Quiz';

const PAGE_SIZE = 4;

const QuizContainer = ({ quizzes, loading }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
          <Stack spacing={1} sx={{ maxWidth: 500 }}>
            {quizzes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((quiz, index) => (
              <Quiz key={index} data={quiz} />
            ))}

            <Pagination 
              count={Math.floor(quizzes.length / PAGE_SIZE) > 0 ? Math.floor(quizzes.length / PAGE_SIZE) : 1} 
              page={page} 
              onChange={handlePageChange} 
            />
          </Stack>
      )}

      <Button 
        variant="contained" 
        color="success"
        sx={{ mt: 1 }} 
        onClick={() => navigate('create-quiz')}
      >
        Create New Quiz
      </Button>
    </>
  );
};

export default QuizContainer;