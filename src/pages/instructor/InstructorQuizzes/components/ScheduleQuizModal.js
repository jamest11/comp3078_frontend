import {Modal, Button, Box, FormGroup, TextField, FormControl, Select, MenuItem, InputLabel} from '@mui/material';
import { useForm } from 'react-hook-form';
import { instructorApi } from 'services/api';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  pt: 2,
  px: 4,
  pb: 3,
};

const ScheduleQuizModal = ({ open, setOpen, quizzes, classes, callback }) => {

  const { register, handleSubmit, formState: { errors } } = useForm();

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
      <Box 
        sx={style} 
        component="form"  
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <FormGroup row sx={{ gap: 2, mt: 2, mb: 1, justifyContent: 'flex-start' }}>
          <TextField 
            type="date" 
            name="dueDate" 
            helperText="Due Date"
            error={!!errors.date}
            {...register('date', { required: true })} 
          />
        </FormGroup>

        <FormControl required fullWidth sx={{ mb: 1 }}>
          <InputLabel id="class-label">Class</InputLabel>
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

        <FormControl required fullWidth sx={{ mb: 1 }}>
          <InputLabel id="quiz-label">Quiz</InputLabel>
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
          <Button variant="contained" size="small" onClick={handleClose}>Cancel</Button>
        </FormGroup>

      </Box>
    </Modal>
  );
};

export default ScheduleQuizModal;