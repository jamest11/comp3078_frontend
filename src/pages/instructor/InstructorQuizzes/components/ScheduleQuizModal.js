import {Modal, Button, Box, FormGroup, TextField, FormControl, Select, MenuItem, InputLabel, Typography} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { instructorApi } from 'services/api';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  pt: 2,
  px: 4,
  pb: 3,
};

const ScheduleQuizModal = ({ open, setOpen, quizzes, classes, callback }) => {

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  const [dueDate, setDueDate] = useState(null);

  useEffect(() => {
    if(open) {
      reset();
      setDueDate(null);

      register('date', {
        required: {
          value: true,
          message: 'Due date is required'
        }
      });
    }
  }, [open, reset, register]);

  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    setOpen(false);
    instructorApi.scheduleQuiz(data)
      .then((res) => callback())
      .catch(console.error);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} >
        <Typography variant="h5" gutterBottom>Schedule Quiz</Typography>

        <Box 
          component="form"  
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
              disablePast
              label="Due Date"
              value={dueDate}
              onChange={(date) => {
                setValue('date', dayjs(date).format(), { shouldValidate: true });
                setDueDate(date);
              }}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  fullWidth
                  error={!!errors.date}
                  helperText={errors.date?.message?.toString()}
                />
              )}
            />
          </LocalizationProvider>      

          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel id="class-label" error={!!errors.class}>Class</InputLabel>
            <Select
              labelId="class-label"
              label="Class"
              defaultValue=""
              error={!!errors.class}
              {...register('class', { required: true })}
            >
              {classes.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.title}
                </MenuItem>
            ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="quiz-label" error={!!errors.quiz}>Quiz</InputLabel>
            <Select
              labelId="class-label"
              label="Quiz"
              defaultValue=""
              error={!!errors.quiz}
              {...register('quiz', { required: true })}
            >
              {quizzes.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.title}
                </MenuItem>
            ))}
            </Select>
          </FormControl>
          
          <FormGroup row sx={{ gap: 1 }}>
            <Button variant="contained" size="small" type="submit">Save</Button>
            <Button variant="contained" size="small" color="secondary" onClick={handleClose}>Cancel</Button>
          </FormGroup>

        </Box>
      </Box>
    </Modal>
  );
};

export default ScheduleQuizModal;