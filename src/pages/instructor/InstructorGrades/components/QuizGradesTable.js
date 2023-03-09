import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { formatDate } from 'utils';

const QuizGradesTable = ({ quizGrades, loading }) => {
  return (
    <TableContainer component={Paper}>
      {loading ? (
        <LinearProgress />
      ) : (
      <Table size="small">
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
              <TableCell>{grade.classTitle}</TableCell>
              <TableCell>{grade.quizTitle}</TableCell>
              <TableCell>{formatDate(grade.date)}</TableCell>
              <TableCell>{grade.completed}</TableCell>
              <TableCell>{grade.average !== null ? `${grade.average}%` : 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>)}
    </TableContainer>
  );
};

export default QuizGradesTable;