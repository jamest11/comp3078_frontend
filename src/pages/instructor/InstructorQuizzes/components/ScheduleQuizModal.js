import { Modal, Button, Box, FormGroup, TextField, MenuItem, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Controller, useForm } from 'react-hook-form';
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

const ScheduleQuizModal = ({ open, setOpen, quizzes, classes, callback, editData }) => {

  const { handleSubmit, reset, control } = useForm();

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    handleClose();

    if(editData) {
      instructorApi.updateScheduledQuiz(editData._id, data.dueDate)
      .then((res) => callback())
      .catch(console.error);
    }
    else {
      instructorApi.scheduleQuiz(data)
      .then((res) => callback())
      .catch(console.error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style} >
        <Typography variant="h5" gutterBottom>{editData ? 'Edit Scheduled Quiz' : 'Schedule Quiz'}</Typography>

        <Box 
          component="form"  
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Controller
            control={control}
            defaultValue={editData ? dayjs(editData.dueDate).format() : null}
            name="dueDate"
            rules={{
              required: 'Due date is required'
            }}
            render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  inputRef={ref}
                  label="Due Date"
                  disablePast
                  renderInput={(inputProps) => (
                    <TextField
                      {...inputProps}
                      onBlur={onBlur}
                      name={name}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      fullWidth
                    />
                  )}
                />
              </LocalizationProvider>  
            )}
          />
     
          <Controller             
            control={control}
            defaultValue={editData?.class_id ?? ''}
            name="class"
            rules={{
              required: 'Select a class'
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="Class"
                disabled={!!editData}
                error={!!error}
                helperText={error?.message}
                sx={{ my: 2 }}
              >
                {classes.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.title}
                  </MenuItem>
              ))}
              </TextField>
            )}
          />

          <Controller             
            control={control}
            defaultValue={editData?.quiz_id ?? ''}
            name="quiz"
            rules={{
              required: 'Select a quiz'
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="Quiz"
                disabled={!!editData}
                error={!!error}
                helperText={error?.message}
                sx={{ mb: 2 }}
              >
                {quizzes.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.title}
                  </MenuItem>
              ))}
              </TextField>
            )}
          />

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