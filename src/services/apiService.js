import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: { post: { 'Content-Type': 'application/json' } }
});

const createQuiz = async (data) => {
  data.instructor = '63e9484d75a0d420004aa45a';
  return axiosInstance.post('/instructor/create-quiz', data);
};

const getQuizzes = async () => {
  return axiosInstance.get('/instructor/quizzes');
};

const exports = { createQuiz, getQuizzes };
export default exports;