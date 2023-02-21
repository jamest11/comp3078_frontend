import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: { post: { 'Content-Type': 'application/json' } }
});

const setAuthHeader = (token) => {
  if(token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

const login = async (data) => {
  return axiosInstance.post('/auth/login', data);
};

// Student API
const getStudentQuizzes = async () => {
  return axiosInstance.get('/student/quizzes');
};

const getStudentQuiz = async (id) => {
  return axiosInstance.get(`/student/quiz?id=${id}`);
};

const getStudentGrades = async () => {
  return axiosInstance.get('/student/grades');
};

const submitQuiz = async (data) => {
  return axiosInstance.post('/student/submit-quiz', data);
};

// Instructor API
const createQuiz = async (data) => {
  return axiosInstance.post('/instructor/create-quiz', data);
};

const scheduleQuiz = async (data) => {
  return axiosInstance.post('/instructor/schedule-quiz', data);
};

const getInstructorQuizzes = async () => {
  return axiosInstance.get('/instructor/quizzes');
};

const getScheduledQuizzes = async () => {
  return axiosInstance.get('/instructor/scheduled-quizzes');
};

const getClasses = async () => {
  return axiosInstance.get('/instructor/classes');
};

const getQuizGrades = async () => {
  return axiosInstance.get('/instructor/quiz-grades');
};

export const studentApi = { getStudentQuizzes, getStudentQuiz, submitQuiz, getStudentGrades };
export const authApi = { setAuthHeader, login };
export const instructorApi = { createQuiz, getInstructorQuizzes, scheduleQuiz, getScheduledQuizzes, getClasses, getQuizGrades };