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
              <TableCell>{grade.total > 0 ? `${grade.completed} / ${grade.total}` : 'N/A'}</TableCell>
              <TableCell>{grade.completed > 0 ? `${grade.average}%` : 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>)}
    </TableContainer>
  );
};

export default QuizGradesTable;