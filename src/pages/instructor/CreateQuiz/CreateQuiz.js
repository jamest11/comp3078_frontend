import { Container, Box, FormGroup, TextField, InputLabel, Select, MenuItem, Button, FormControl, Typography, Paper } from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { instructorApi } from 'services/api';
import QuizQuestion from './components/QuizQuestion';


const CreateQuiz = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = (data) => {
    instructorApi.createQuiz(data)
      .then(() => navigate('/instructor-quizzes'))
      .catch(console.error);
  };

  const addQuestion = () => {
    append({ q: '', r1: '', r2: '', r3: '', r4: '', a: '' });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Paper elevation={6}>
          <Typography variant="h4" sx={{ pt: 2, px: 2 }}>New Quiz</Typography>
          <FormGroup row sx={{ pt: 1, m: 2 }}>
            <TextField
              sx={{ m: 1 }}
              variant="outlined"
              label="Quiz Title"
              error={!!errors.title}
              {...register('title', { required: true })}
            />
            <FormControl required sx={{ m: 1 }}>
              <InputLabel id="quiz-time-limit-label">Time Limit</InputLabel>
              <Select
                sx={{ width: 200 }}
                labelId="quiz-time-limit-label"
                label="Time Limit"
                id="quiz-time-limit"
                defaultValue=""
                error={!!errors.timeLimit}
                {...register('timeLimit', { required: true })}
              >
                <MenuItem value={60}>1:00</MenuItem>
                <MenuItem value={300}>5:00</MenuItem>
                <MenuItem value={600}>10:00</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>

          {fields.map((item, index) => (
            <QuizQuestion key={item.id} index={index} register={register} errors={errors} remove={remove} />
          ))}

          <FormGroup row sx={{ gap: 2, m: 2, py: 2 }}>
            <Button variant="contained" onClick={addQuestion}>Add Question</Button>
            <Button type="submit" variant="contained" color="primary">Save</Button>
            <Button variant="contained" color="secondary">Cancel</Button>
          </FormGroup>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateQuiz;