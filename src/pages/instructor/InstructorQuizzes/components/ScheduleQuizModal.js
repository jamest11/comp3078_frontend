import {Modal, Button, Box, Typography, FormGroup, TextField} from "@mui/material";

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

const ScheduleQuizModal = ({ open, setOpen, quizzes }) => {

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormGroup row sx={{ gap: 2, mt: 2, mb: 1, justifyContent: 'flex-end' }}>
          <TextField type="date" inputProps={{ min: '2018-01-01', max: '2018-12-31' }} />
        </FormGroup>
        <Button variant="contained" size="small" onClick={handleClose}>Cancel</Button>
      </Box>
    </Modal>
  );
};

export default ScheduleQuizModal;