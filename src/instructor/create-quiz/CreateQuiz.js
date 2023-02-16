import { Container, Box, FormGroup, TextField, InputLabel, Select, MenuItem, Button, FormControl, Typography } from "@mui/material";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import QuizQuestion from "../../instructor/create-quiz/QuizQuestion";

const CreateQuiz = () => {
  const { register, handleSubmit, setError, getValues, control, formState: { errors } } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const addQuestion = () => {
    append({ title: '', r1: '', r2: '', r3: '', r4: '', a: '' });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h4" sx={{ m: 1 }}>Create New Quiz</Typography>
      <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
      >
        <FormGroup row sx={{ backgroundColor: 'white', p: 2, m: 2, borderRadius: 1}}>
          <TextField
            sx={{ m: 1 }}
            variant="outlined"
            label="Quiz Title"
            error={!!errors.title}
            {...register('title', {
              required: {
                value: true
              },
            })}
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
              {...register('timeLimit', {
                required: {
                  value: true
                }
              })}
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

        <FormGroup row sx={{ gap: 2, m: 2, p: 2, backgroundColor: 'white' }}>
        <Button variant="contained" onClick={addQuestion}>Add Question</Button>
          <Button type="submit" variant="contained" color="primary">Save</Button>
          <Button variant="contained" color="secondary">Cancel</Button>
        </FormGroup>
      </Box>
    </Container>
  );
};

export default CreateQuiz;