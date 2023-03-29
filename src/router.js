import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

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
import ClassForm from 'pages/instructor/InstructorClasses/ClassForm';
import ExportGrades from 'pages/instructor/InstructorClasses/ClassGradesPDF';

import Login from 'pages/public/Login';
import Register from 'pages/public/Register';
import UnknownPage from 'pages/public/UnknownPage';

import PrivateRoute from 'security/PrivateRoute';
import Layout from 'components/Layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
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
            index: true,
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
            children: [
              {
                index: true,
                element: <InstructorQuizzes />,
              },
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
            children: [
              {
                index: true,
                element: <InstructorClasses />,
              },
              {
                path: 'create-class',
                element: <ClassForm />
              },
              {
                path: 'edit',
                element: <ClassForm />
              },
              {
                path: 'export',
                element: <ExportGrades />
              }
            ]
          }
        ]
      }
    ]
  }
]);

export default router;