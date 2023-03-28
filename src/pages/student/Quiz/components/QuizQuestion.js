import { Box, Button, FormControl, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { useState } from 'react';

const QuizQuestion = ({ data, submitQuestion }) => {
  const [res, setRes] = useState(-1);
  const [complete, setComplete] = useState(false);
  
  const handleSubmit = () => {
    submitQuestion(res);
    setRes(-1);
  };

  const handleChange = (event) => {
    setComplete(true);
    setRes(event.target.value);
  };


  return (
    <Box 
      component={Paper}
      elevation={2}
      sx={{ mt: 5, p: 2, width: 600 }}
    >
      <Typography>{data.q}</Typography>

      <Box component="div">
        <FormControl>
          <RadioGroup
            value={res}
            onChange={handleChange}
          >
            {data.r.map((value, index) => (
              <FormControlLabel key={index} value={index} control={<Radio />} label={value} />
            ))}
          </RadioGroup>
        </FormControl>
        <FormGroup row>
          <Button 
            variant="contained" 
            disabled={!complete} 
            onClick={handleSubmit} 
            color="success"
          >
            Submit
          </Button>
        </FormGroup>
      </Box>

    </Box>
  );
};

export default QuizQuestion;