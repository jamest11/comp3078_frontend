import { Box, Card, CardActions, CardContent, Chip, Collapse, IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

const ClassGrade = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ minWidth: 400 }}>
      <Box sx={{ display: 'flex', width: 1 }}>
        <CardContent>
          <Typography variant="h5">{data.class}</Typography>
        </CardContent>

        <CardActions sx={{ ml: 'auto' }} disableSpacing>
          <IconButton onClick={handleExpandClick} sx={{ ml: 'auto' }}>
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
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
                over {data.count} quizzes
              </Typography>
            </>
          )}
          
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ClassGrade;