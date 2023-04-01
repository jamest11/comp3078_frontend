import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/',
  //baseURL: 'https://capstone-backend-36217.herokuapp.com/',
  headers: { post: { 'Content-Type': 'application/json' } },
  timeout: 3000
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

const verifyAccount = async (token) => {
  return axiosInstance.get(`/auth/verify/${token}`);
};

// Student API
const getStudentQuizzes = async () => {
  return axiosInstance.get('/student/quizzes');
};

const getStudentQuiz = async (id) => {
  return axiosInstance.get(`/student/quiz?id=${id}`);
};

const getStudentGrades = async (type='class') => {
  if(type === 'class') {
    return axiosInstance.get('/student/class-grades');  
  }
  return axiosInstance.get('/student/quiz-grades');
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

const updateScheduledQuiz = async (id, dueDate) => {
  return axiosInstance.patch('/instructor/update-scheduled-quiz', { id, dueDate});
};

const updateQuiz = async (id, data) => {
  return axiosInstance.patch('/instructor/update-quiz', { id, data });
};

const getInstructorQuiz = async (id) => {
  return axiosInstance.get(`/instructor/quiz?id=${id}`);
};

const getInstructorQuizzes = async () => {
  return axiosInstance.get(`/instructor/quizzes`);
};

const getScheduledQuizzes = async (complete='all') => {
  return axiosInstance.get(`/instructor/scheduled-quizzes?filter=${complete}`);
};

const getClasses = async () => {
  return axiosInstance.get('/instructor/classes');
};

const getInstructorGrades = async (type='class', id=null) => {
  if(type === 'class') {
    if(id) {
      return axiosInstance.get(`/instructor/class-grades-export?id=${id}`);
    }
    return axiosInstance.get('/instructor/class-grades');
  }
  return axiosInstance.get('/instructor/quiz-grades');
};

const deleteScheduledQuiz = async (data) => {
  return axiosInstance.delete('/instructor/scheduled-quiz', { data });
};

const deleteQuiz = async (data) => {
  return axiosInstance.delete('/instructor/quiz', { data });
};

const deleteClass = async (data) => {
  return axiosInstance.delete('/instructor/class', { data });
};

export const studentApi = { getStudentQuizzes, getStudentQuiz, submitQuiz, getStudentGrades };
export const authApi = { setAuthHeader, login, register, verifyAccount };
export const instructorApi = { 
  createQuiz, 
  createClass,
  scheduleQuiz,
  updateClass,
  updateScheduledQuiz,
  updateQuiz,
  getScheduledQuizzes, 
  getInstructorQuizzes, 
  getInstructorQuiz,
  getClasses, 
  getInstructorGrades,
  deleteScheduledQuiz,
  deleteQuiz,
  deleteClass
};