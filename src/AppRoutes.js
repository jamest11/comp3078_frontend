import { createBrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import Quiz from 'pages/student/Quiz';
import StudentProfile from 'pages/student/StudentProfile';
import StudentQuizzes from 'pages/student/StudentQuizzes';
import StudentGrades from 'pages/student/StudentGrades';

import CreateQuiz from 'pages/instructor/CreateQuiz';
import InstructorQuizzes from 'pages/instructor/InstructorQuizzes';
import DelScheduledQuiz from 'pages/instructor/InstructorQuizzes/DelScheduledQuiz';
import DelQuiz from 'pages/instructor/InstructorQuizzes/DelQuiz';
import InstructorGrades from 'pages/instructor/InstructorGrades';
import InstructorClasses from 'pages/instructor/InstructorClasses';
import AddStudents from 'pages/instructor/AddStudents';

import Login from 'pages/public/Login';
import Register from 'pages/public/Register';
import UnknownPage from 'pages/public/UnknownPage';

import PrivateRoute from 'security/PrivateRoute';
import Layout from 'components/Layout';
import { authApi } from 'services/api';

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: () => {
      const token = localStorage.getItem('token');
      authApi.setAuthHeader(token);
      return null;
    },
    children: [
      {
        path: '/',
        element: <Navigate to="/login" replace />
      },
      {
        path: '*',
        element: <UnknownPage />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/student',
        element: (
          <PrivateRoute userType="student">
            <Outlet />
          </PrivateRoute>
        ),
        children: [
          {
            path: '',
            element: <StudentProfile/>
          },
          {
            path: 'quiz',
            element: <Quiz />
          },
          {
            path: 'quizzes',
            element: <StudentQuizzes />
          },
          {
            path: 'grades',
            element: <StudentGrades />
          }
        ]
      },
      {
        path: '/instructor',
        element: (
          <PrivateRoute userType="instructor">
            <Outlet />
          </PrivateRoute>
        ),
        children: [
          {
            path: 'quizzes',
            element: <InstructorQuizzes />,
            children: [
              {
                path: 'delete-scheduled-quiz',
                element: <DelScheduledQuiz />
              },
              {
                path: 'delete-quiz',
                element: <DelQuiz />
              },
              {
                path: 'create-quiz',
                element: <CreateQuiz />
              }
            ]
          },
          {
            path: 'grades',
            element: <InstructorGrades />
          },
          {
            path: 'classes',
            element: <InstructorClasses />,
            children: [
              {
                path: 'add-students',
                element: <AddStudents />
              }
            ]
          }
        ]
      }
    ]
  }
]);

const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/"
        element={
          <Navigate to="login" replace />
        }
      />
      <Route
        path="*"
        element={
          <UnknownPage />
        }
      />
      <Route
        path="/login"
        element={
          <Login />
        }
      />
      <Route
        path="/register"
        element={
          <Register />
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
        path="/student-grades"
        element={
          <PrivateRoute userType="student">
            <StudentGrades />
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
        path="/instructor-quizzes/delete-scheduled-quiz"
        element={
          <PrivateRoute userType="instructor">
            <DelScheduledQuiz />
          </PrivateRoute>
        }
      />
      <Route
        path="/instructor-quizzes/delete-quiz"
        element={
          <PrivateRoute userType="instructor">
            <DelQuiz />
          </PrivateRoute>
        }
      />
      <Route
        path="/instructor-classes"
        element={
          <PrivateRoute userType="instructor">
            <InstructorClasses />
          </PrivateRoute>
        }
      />
      <Route
        path="/instructor-grades"
        element={
          <PrivateRoute userType="instructor">
            <InstructorGrades />
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
      <Route
        path="/add-students"
        element={
          <PrivateRoute userType="instructor">
            <AddStudents />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
export { router };