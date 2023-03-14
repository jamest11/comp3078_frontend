import { Button, LinearProgress, Pagination, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instructorApi } from 'services/api';
import Quiz from './Quiz';

const QuizContainer = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const fetchQuizzes = async (page) => {
    const res = await instructorApi.getInstructorQuizzes({ page, pagination: true, limit: 5 });
    
    setQuizzes(res.data.docs);
    setTotalPages(res.data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuizzes(page);
  }, [page]);

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
          <Stack spacing={1} sx={{ maxWidth: 500 }}>
            {quizzes.map((quiz, index) => (
              <Quiz key={index} data={quiz} />
            ))}

            <Pagination count={totalPages} page={page} onChange={handlePageChange} />
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