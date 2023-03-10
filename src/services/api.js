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

const register = async (data) => {
  return axiosInstance.post('/auth/register', data);
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

const createClass = async (data) => {
  return axiosInstance.post('/instructor/create-class', data);
};

const updateClass = async (data) => {
  return axiosInstance.patch('/instructor/update-class', data);
};

const getInstructorQuizzes = async () => {
  return axiosInstance.get('/instructor/quizzes');
};

const getScheduledQuizzes = async (complete = 'all') => {
  return axiosInstance.get(`/instructor/scheduled-quizzes?filter=${complete}`);
};

const getClasses = async () => {
  return axiosInstance.get('/instructor/classes');
};

const getQuizGrades = async () => {
  return axiosInstance.get('/instructor/quiz-grades');
};

const getClassGrades = async () => {
  return axiosInstance.get('/instructor/class-grades');
};

const deleteScheduledQuiz = async (data) => {
  return axiosInstance.delete('/instructor/scheduled-quiz', { data });
};

const deleteQuiz = async (data) => {
  return axiosInstance.delete('/instructor/quiz', { data });
};

export const studentApi = { getStudentQuizzes, getStudentQuiz, submitQuiz, getStudentGrades };
export const authApi = { setAuthHeader, login, register };
export const instructorApi = { 
  createQuiz, 
  scheduleQuiz,
  updateClass,
  createClass,
  getScheduledQuizzes, 
  getInstructorQuizzes, 
  getClasses, 
  getQuizGrades, 
  getClassGrades,
  deleteScheduledQuiz,
  deleteQuiz
};