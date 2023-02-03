import {
  CssBaseline,
  ThemeProvider
} from '@mui/material';
import Layout, { theme } from './common/Layout';
import { getQuiz } from './services/dummyApi';
import Quiz from './student/quiz/Quiz';
import { Route, Routes } from 'react-router-dom';


function App() {

  const quiz = getQuiz();
  const course = 'Biology';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route
            path="/"
            elemement={
              <>
              </>
            }
          />
          <Route
            path="/quiz"
            element={
              <Quiz quizData={quiz} course={course} />
            }
          />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
