import { Accordion, AccordionDetails, AccordionSummary, Chip, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ClassGrade = ({ data }) => {
  return (
    <Accordion sx={{ minWidth: 400 }} disableGutters>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="h5">{data.classTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails>
          <Chip 
            color={ data.average <= 50 ? 'error' : (data.average < 70 ? 'warning' : 'success')} 
            label={`${Number(data.average.toFixed(2))}%`} 
          />
          <Typography variant="body2" display="inline" sx={{ ml: 1 }}>
            over {data.scores.length} {data.scores.length === 1 ? 'quiz' : 'quizzes'}
          </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default ClassGrade;