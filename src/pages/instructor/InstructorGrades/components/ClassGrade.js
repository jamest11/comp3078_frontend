import { Accordion, AccordionDetails, AccordionSummary, Chip, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ClassGrade = ({ data }) => {
  return (
    <Accordion sx={{ minWidth: 400 }} disableGutters>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="h5">{data.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {data.count === 0 ? (
          <Typography variant="body2">
            No grades have been recorded for this class
          </Typography>
          ) : (
            <>
              <Chip 
                color={ data.average <= 50 ? 'error' : (data.average < 70 ? 'warning' : 'success')} 
                label={`${data.average}%`} 
              />
              <Typography variant="body2" display="inline" sx={{ ml: 1 }}>
                over {data.count} {data.count === 1 ? 'quiz' : 'quizzes'}
              </Typography>
            </>
          )}
      </AccordionDetails>
    </Accordion>
  );
};

export default ClassGrade;