import { Box, TextField, Typography, MenuItem, Paper, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Controller } from 'react-hook-form';

const responseField = {
  m: 1,
  width: '40ch'
};

const QuizQuestion = ({ control, register, errors, index, remove}) => {

  return (
    <Box 
      component={Paper} 
      elevation={1}
      sx={{ 
        px: 2,
        py: 1, 
        mx: 2,
      }}
      >
      <Box sx={{ display: 'flex', width: 1 }}>
          <Typography variant="h5">Question {index + 1}</Typography>
          <IconButton onClick={() => remove(index)} sx={{ ml: 'auto', mr: 1 }}>
            <ClearIcon color="primary" />
          </IconButton>
      </Box>

      <div>
        <TextField
          variant="outlined"
          label="Question"
          size="small"
          multiline
          spellCheck
          maxRows={4}
          sx={{ m: 1, width: '81ch' }}
          error={!!errors?.['questions']?.[index]?.['q']}
          {...register(`questions.${index}.q`, {
            required: true
          })}
        />
      </div>
      <div>
        <TextField 
          variant="outlined"
          label="Option A"
          size="small"
          multiline
          spellCheck
          maxRows={4}
          error={!!errors?.['questions']?.[index]?.['r1']}
          sx={responseField}
          {...register(`questions.${index}.r1`, {
            required: true
          })}
        />
        <TextField 
          variant="outlined"
          label="Option B"
          size="small"
          multiline
          spellCheck
          maxRows={4}
          error={!!errors?.['questions']?.[index]?.['r2']}
          sx={responseField}
          {...register(`questions.${index}.r2`, {
            required: true
          })}
        />
      </div>
      <div>
        <TextField 
          variant="outlined"
          label="Option C"
          size="small"
          multiline
          spellCheck
          maxRows={4}
          error={!!errors?.['questions']?.[index]?.['r3']}
          sx={responseField}
          {...register(`questions.${index}.r3`, {
            required: true
          })}
        />
        <TextField 
          variant="outlined"
          label="Option D"
          size="small"
          multiline
          spellCheck
          maxRows={4}
          error={!!errors?.['questions']?.[index]?.['r4']}
          sx={responseField}
          {...register(`questions.${index}.r4`, {
            required: true
          })}
        />
      </div>
      <div>
        <Controller             
          control={control}
          name={`questions.${index}.a`}
          rules={{ required: 'Select the correct answer' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              select
              label="Correct Response"
              size="small"
              error={!!error}
              helperText={error?.message}
              sx={{ m: 1, width: 190 }}
            >
              <MenuItem value={'r1'}>A</MenuItem>
              <MenuItem value={'r2'}>B</MenuItem>
              <MenuItem value={'r3'}>C</MenuItem>
              <MenuItem value={'r4'}>D</MenuItem>
            </TextField>
          )}
        />
      </div>
    </Box>
  );
};

export default QuizQuestion;