import {
  CssBaseline,
  ThemeProvider
} from '@mui/material';
import Layout, { theme } from './common/Layout';
import { getQuiz } from './services/dummyApi';
import Quiz from './student/quiz/Quiz';
import { Route, Routes } from 'react-router-dom';
import CreateQuiz from './instructor/create-quiz/CreateQuiz';
import StudentProfile from './student/profile/StudentProfile';
import Login from 'public/login/Login';
import Quizzes from 'instructor/quizzes/Quizzez';


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
          <Route
            path="/create-quiz"
            element={
              <CreateQuiz />
            }
          />
          <Route
            path="/student-profile"
            element={
              <StudentProfile />
            }
          />
          <Route
            path="/login"
            element={
              <Login />
            }
          />
          <Route
            path="/instructor-quizzes"
            element={
              <Quizzes />
            }
          />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
