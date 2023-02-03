import { Box, Button, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Typography } from '@mui/material';
import { useState } from 'react';

const QuizQuestion = ({ data, callback }) => {
  const [res, setRes] = useState('');
  const [complete, setComplete] = useState(false);

  const handleSubmit = () => {
    callback(res);
    setRes('');
  };

  const handleChange = (event) => {
    setComplete(true);
    setRes(event.target.value);
  };


  return (
    <Box component="div" sx={{ mt: 5 }}>
      <Typography variant="body">{data.q}</Typography>

      <Box component="div">
        <FormControl>
          <RadioGroup
            value={res}
            onChange={handleChange}
          >
            {Object.entries(data.res).map(([key,val]) => (
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