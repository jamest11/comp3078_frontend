import {
  Container,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  CssBaseline,
  ThemeProvider
} from '@mui/material';
import Layout, { theme } from './components/common/Layout';
import { getQuiz } from './services/dummyApi';
import Quiz from './components/pages/Quiz';


function App() {

  const quiz = getQuiz();
  const course = 'Biology';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Quiz quizData={quiz} course={course} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
