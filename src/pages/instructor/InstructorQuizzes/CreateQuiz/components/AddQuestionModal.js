import {Modal, Button, Box, FormGroup, TextField, Typography, MenuItem} from '@mui/material';
import { useEffect} from 'react';
import { Controller, useForm } from 'react-hook-form';

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

const AddQuestionModal = ({ open, setOpen, append }) => {
  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      questions: ''
    }
  });

  useEffect(() => {
    if(open) {
      reset();
    }
  }, [open, reset]);

  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    const r = Array(data.questions).fill('');
    append({ q: '', r, a: '' });
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} >
        <Typography variant="h5" gutterBottom>Add New Question</Typography>

        <Box 
          component="form"  
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Controller             
            control={control}
            name="questions"
            rules={{ required: 'Select an option' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="Number of responses"
                error={!!error}
                helperText={error?.message}
              >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </TextField>
            )}
          />

          <FormGroup row sx={{ gap: 1, mt: 2 }}>
            <Button variant="contained" size="small" type="submit">Add</Button>
            <Button variant="contained" size="small" color="secondary" onClick={handleClose}>Cancel</Button>
          </FormGroup>

        </Box>
      </Box>
    </Modal>
  );
};

export default AddQuestionModal;