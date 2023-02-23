import { Route, Routes } from 'react-router-dom';

import Quiz from 'pages/student/Quiz';
import StudentProfile from 'pages/student/StudentProfile';
import StudentQuizzes from 'pages/student/StudentQuizzes';
import StudentGrades from 'pages/student/StudentGrades';

import CreateQuiz from 'pages/instructor/CreateQuiz';
import InstructorQuizzes from 'pages/instructor/InstructorQuizzes';
import InstructorGrades from 'pages/instructor/InstructorGrades';
import InstructorClasses from 'pages/instructor/InstructorClasses';
import AddStudents from 'pages/instructor/AddStudents';

import Login from 'pages/public/Login';
import Register from 'pages/public/Register';

import PrivateRoute from 'security/PrivateRoute';


const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <PrivateRoute userType="any">
            <></>
          </PrivateRoute>
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