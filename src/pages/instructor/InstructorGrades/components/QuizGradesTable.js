import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { formatDate } from 'utils';

const QuizGradesTable = ({ quizGrades, loading }) => {
  return (
    <TableContainer component={Paper}>
      {loading ? (
        <LinearProgress />
      ) : (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Class</TableCell>
            <TableCell>Quiz</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell># Completed</TableCell>
            <TableCell>Avg. Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizGrades.map((grade, index) => (
            <TableRow key={index}>
              <TableCell>{grade.class}</TableCell>
              <TableCell>{grade.quiz}</TableCell>
              <TableCell>{formatDate(grade.dueDate)}</TableCell>
              <TableCell>{grade.completed}</TableCell>
              <TableCell>{grade.average}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>)}
    </TableContainer>
  );
};

export default QuizGradesTable;