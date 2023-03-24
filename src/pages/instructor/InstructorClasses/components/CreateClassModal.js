import {Modal, Button, Box, FormGroup, TextField, Typography} from '@mui/material';
import { useEffect} from 'react';
import { useForm } from 'react-hook-form';

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

const CreateClassModal = ({ open, setOpen, callback }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if(open) {
      reset();
    }
  }, [open, reset]);

  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    setOpen(false);
    instructorApi.createClass(data)
      .then((res) => callback())
      .catch(() => console.error('Server error'));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} >
        <Typography variant="h5" gutterBottom>Create New Class</Typography>

        <Box 
          component="form"  
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TextField 
            variant="outlined"
            label="Title"
            autoFocus
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message?.toString()}
            {...register('title', {
              required: {
                value: true,
                message: 'Class title is required'
              }
            })}
          />

          <FormGroup row sx={{ gap: 1, mt: 2 }}>
            <Button variant="contained" size="small" type="submit">Create</Button>
            <Button variant="contained" size="small" color="secondary" onClick={handleClose}>Cancel</Button>
          </FormGroup>

        </Box>
      </Box>
    </Modal>
  );
};

export default CreateClassModal;