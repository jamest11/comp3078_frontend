import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: { post: { 'Content-Type': 'application/json' } }
});

const createQuiz = async (data) => {
  data.instructor = '63e9484d75a0d420004aa45a';
  return axiosInstance.post('/instructor/create-quiz', data);
};

const scheduleQuiz = async (data) => {
  //data.instructor = '63e9484d75a0d420004aa45a';
  data.quiz = '63efa2214551ab8d6a54c836';
  data.class = '63e952a670b1cd17fe35a5d6';
  return axiosInstance.post('/instructor/schedule-quiz', data);
};

const getQuizzes = async () => {
  return axiosInstance.get('/instructor/quizzes');
};

const getScheduledQuizzes = async () => {
  return axiosInstance.get('/instructor/scheduled-quizzes');
};


const exports = { createQuiz, getQuizzes, scheduleQuiz, getScheduledQuizzes };
export default exports;