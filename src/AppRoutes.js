import { Navigate, Route, Routes } from 'react-router-dom';

import Quiz from 'pages/student/Quiz';
import StudentProfile from 'pages/student/StudentProfile';

import CreateQuiz from 'pages/instructor/CreateQuiz';
import Quizzes from 'pages/instructor/InstructorQuizzes';

import Login from 'pages/public/Login';

import { getQuiz } from 'services/dummyApi';
import { useAuth } from 'security/AuthContextProvider';
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