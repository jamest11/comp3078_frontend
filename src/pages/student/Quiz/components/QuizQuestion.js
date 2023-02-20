import { Box, Button, FormControl, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { useState } from 'react';

const QuizQuestion = ({ data, callback }) => {
  const [res, setRes] = useState('');
  const [complete, setComplete] = useState(false);

  const question = data.q;
  const options = { r1: data.r1, r2: data.r2, r3: data.r3, r4: data.r4 };

  const handleSubmit = () => {
    callback(res);
    setRes('');
  };

  const handleChange = (event) => {
    setComplete(true);
    setRes(event.target.value);
  };


  return (
    <Box component={Paper} sx={{ mt: 5, p: 2, width: 600 }} elevation={2}>
      <Typography>{question}</Typography>

      <Box component="div">
        <FormControl>
          <RadioGroup
            value={res}
            onChange={handleChange}
          >
            {Object.entries(options).map(([key,val]) => (
              <FormControlLabel key={key} value={key} control={<Radio />} label={val} />
            ))}
          </RadioGroup>
        </FormControl>
        <FormGroup row>
          <Button variant="contained" disabled={!complete} onClick={handleSubmit} color="success">Submit</Button>
        </FormGroup>
      </Box>

    </Box>
  );
};

export default QuizQuestion;