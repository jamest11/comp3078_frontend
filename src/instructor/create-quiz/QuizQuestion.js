import { Box, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

const QuizQuestion = ({ register, errors, index, remove}) => {

  return (
    <Box 
      component="div" 
      sx={{ 
        borderRadius: 2, 
        p: 2, 
        m: 2 ,
        backgroundColor: 'white'
      }}
      >
      <Typography variant="h5" sx={{ mb: 1 }}>Question {index + 1}</Typography>
      <div>
        <TextField
          variant="outlined"
          label="Question"
          rows={4}
          sx={{ m: 1, width: '62ch' }}
          multiline
          {...register(`questions.${index}.title`, {
            required: {
              value: true
            }
          })}
        />
      </div>
      <div>
        <TextField 
          variant="outlined"
          label="Option A"
          sx={{ m: 1, width: '30ch' }}
          {...register(`questions.${index}.r1`, {
            required: {
              value: true
            }
          })}
        />
        <TextField 
          variant="outlined"
          label="Option B"
          sx={{ m: 1, width: '30ch' }}
          {...register(`questions.${index}.r2`, {
            required: {
              value: true
            }
          })}
        />
      </div>
      <div>
        <TextField 
          variant="outlined"
          label="Option C"
          sx={{ m: 1, width: '30ch' }}
          {...register(`questions.${index}.r3`, {
            required: {
              value: true
            }
          })}
        />
        <TextField 
          variant="outlined"
          label="Option D"
          sx={{ m: 1, width: '30ch' }}
          {...register(`questions.${index}.r4`, {
            required: {
              value: true
            }
          })}
        />
      </div>
      <div>
        <FormControl required sx={{ m: 1, width: 190 }}>
          <InputLabel id="question-correct-response-label">Correct Response</InputLabel>
          <Select
            labelId="question-correct-response-label"
            label="Correct Response"
            id="question-correct-response"
            defaultValue=""
            {...register(`questions.${index}.a`, {
              required: {
                value: true
              }
            })}
          >
            <MenuItem value={'r1'}>A</MenuItem>
            <MenuItem value={'r2'}>B</MenuItem>
            <MenuItem value={'r3'}>C</MenuItem>
            <MenuItem value={'r4'}>D</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button variant="contained" onClick={() => remove(index)} sx={{ m: 1 }}>Remove</Button>
    </Box>
  );
};

export default QuizQuestion;