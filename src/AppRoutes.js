import { Navigate, Route, Routes } from 'react-router-dom';

import Quiz from './student/quiz/Quiz';
import StudentProfile from './student/profile/StudentProfile';

import CreateQuiz from './instructor/create-quiz/CreateQuiz';
import Quizzes from './instructor/quizzes/Quizzes';

import Login from './public/login/Login';

import { getQuiz } from './services/dummyApi';
import { useAuth } from './security/AuthContextProvider';
import PrivateRoute from 'security/PrivateRoute';


const AppRoutes = () => {

  const { user } = useAuth();
  const quiz = getQuiz();
  const course = 'Biology';

  return (
    <Routes>
      <Route
        path=""
        element={
          <></>
        }
      />
      <Route
        path="/login"
        element={
          <Login />
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
          <PrivateRoute userType="instructor">
            <CreateQuiz />
          </PrivateRoute>
        }
      />
      <Route
        path="/student-profile"
        element={
          <PrivateRoute userType="student">
            <StudentProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/instructor-quizzes"
        element={
          <PrivateRoute userType="instructor">
            <Quizzes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;