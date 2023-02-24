import { Accordion, AccordionDetails, AccordionSummary, Chip, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ClassGrade = ({ data }) => {
  return (
    <Accordion sx={{ minWidth: 400 }} disableGutters>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="h5">{data.class}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {data.count === -1 ? (
          <Typography variant="body1">
            No grades have been recorded for this class
          </Typography>
          ) : (
            <>
              <Chip 
                color={ data.average <= 50 ? 'error' : (data.average < 70 ? 'warning' : 'success')} 
                label={`${data.average}%`} 
              />
              <Typography variant="body1" display="inline" sx={{ ml: 1 }}>
                over {data.count} {data.count === 1 ? 'quiz' : 'quizzes'}
              </Typography>
            </>
          )}
      </AccordionDetails>
    </Accordion>
  );
};

export default ClassGrade;