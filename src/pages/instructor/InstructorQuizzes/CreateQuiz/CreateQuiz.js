import { Container, Box, FormGroup, TextField, MenuItem, Button, Typography, Paper, FormHelperText } from '@mui/material';
import LoadingButton from 'components/LoadingButton';
import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import { instructorApi } from 'services/api';
import { formatTime } from 'utils';
import AddQuestionModal from './components/AddQuestionModal';
import QuizQuestion from './components/QuizQuestion';


const timeOptions = [60, 120, 180, 300, 600, 900, 1200, 1500];

const CreateQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const editData = location.state?.quiz;

  const { register, handleSubmit, control, formState: { errors, dirtyFields } } = useForm({
    defaultValues: {
      title: editData?.title ?? '',
      timeLimit: editData?.timeLimit ?? '',
      questions: editData?.questions ?? []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
    rules: { required: 'At least one question is required' }
  });

  const onSubmit = (data) => {
    setSubmitLoading(true);
    if(editData) {
      if(Object.keys(dirtyFields).length > 0) {
        instructorApi.updateQuiz(editData._id, data) 
          .then(() => navigate('..'))
          .catch(() => console.error('Server error'));
      }
      else {
        navigate('..');
      }
    }
    else {
      instructorApi.createQuiz(data)
        .then(() => navigate('..'))
        .catch(() => console.error('Server error'));
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2, pb: 2 }}>
      <AddQuestionModal open={showModal} setOpen={setShowModal} append={append} />

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Paper elevation={6}>
          <Typography variant="h4" sx={{ pt: 2, px: 2 }} gutterBottom>{editData? 'Edit Quiz' : 'New Quiz'}</Typography>
          {errors.questions?.root && (
            <FormHelperText sx={{ px:2, pb: 2 }} error>{errors.questions.root.message?.toString()}</FormHelperText>
          )}

          <FormGroup row sx={{ pb: 2, mx: 2, columnGap: 1 }}>
            <TextField
              sx={{ width: '60ch' }}
              variant="outlined"
              label="Quiz Title"
              size="small"
              spellCheck
              error={!!errors.title}
              helperText={errors.title?.message?.toString()}
              {...register('title', { required: 'Quiz title is required' })}
            />

            <Controller             
              control={control}
              name="timeLimit"
              rules={{ required: 'Select a time limit' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  select
                  label="Time Limit"
                  size="small"
                  error={!!error}
                  helperText={error?.message}
                  sx={{ width: 200 }}
                >
                  {timeOptions.map((option) => (
                    <MenuItem key={option} value={option}>{formatTime(option)}</MenuItem>
                  ))}
                </TextField>
              )}
            />
          </FormGroup>

          {fields.map((qField, index) => (
            <QuizQuestion key={qField.id} {... {control, register, errors, index, remove, qField }} />
          ))}

          <FormGroup row sx={{ gap: 2, mx: 2, py: 2 }}>
            <Button variant="contained" color="success" onClick={() => setShowModal(true)}>Add Question</Button>
            <LoadingButton
              variant="contained"
              color="primary"
              loading={submitLoading}
              size="small"
              onClick="submit"  
            >
              Save
            </LoadingButton>
            <Button variant="contained" color="secondary" component={Link} to="..">Cancel</Button>
          </FormGroup>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateQuiz;