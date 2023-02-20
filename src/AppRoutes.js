import { Route, Routes } from 'react-router-dom';

import Quiz from 'pages/student/Quiz';
import StudentProfile from 'pages/student/StudentProfile';
import StudentQuizzes from 'pages/student/StudentQuizzes';

import CreateQuiz from 'pages/instructor/CreateQuiz';
import InstructorQuizzes from 'pages/instructor/InstructorQuizzes';

import Login from 'pages/public/Login';

import PrivateRoute from 'security/PrivateRoute';


const AppRoutes = () => {
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
          <PrivateRoute userType="student">
            <Quiz />
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
        path="/student-quizzes"
        element={
          <PrivateRoute userType="student">
            <StudentQuizzes />
          </PrivateRoute>
        }
      />
      <Route
        path="/instructor-quizzes"
        element={
          <PrivateRoute userType="instructor">
            <InstructorQuizzes />
          </PrivateRoute>
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
    </Routes>
  );
};

export default AppRoutes;