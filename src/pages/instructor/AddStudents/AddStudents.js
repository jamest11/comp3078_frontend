import { Box, Button, Container, FormControl, FormGroup, InputLabel, LinearProgress, MenuItem, Paper, Select, TextField, Typography, FormHelperText } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { instructorApi } from 'services/api';
import { emailValidatorRx } from 'utils';

const AddStudents = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await instructorApi.getClasses();

      setClasses(res.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const onSubmit = (data) => {
    const students = data.students.split(/\r?\n/).map(
      (student) => student.trim().replaceAll(',','')
    );
    for(let student of students) {
      if(!student.match(emailValidatorRx)) {
        setError('students', { type: 'validate', message: 'Invalid email for at least one student'});
        return;
      }
    }

    instructorApi.updateClass({ class: data.class, students })
      .then(() => navigate('/instructor-classes'))
      //.then((res) => console.log(res.data))
      .catch(console.error);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Paper elevation={6}>
        <Typography variant="h4" sx={{ pt: 2, px: 4 }} gutterBottom>Add Students</Typography>

        {loading ? (
          <LinearProgress />
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
            sx={{ px: 4, pb: 2 }}
          >
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="class-label" error={!!errors.class}>Class</InputLabel>
              <Select
                labelId="class-label"
                label="Class"
                defaultValue=""
                error={!!errors.class}
                {...register('class', { 
                  required: {
                    value: true,
                    message: 'Select a class'
                  } 
                })}
              >
                {classes.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.title}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>{errors?.class?.message?.toString()}</FormHelperText>
            </FormControl>

            <TextField 
              variant="outlined"
              label="New Students"
              multiline
              fullWidth
              maxRows={12}
              helperText={!!errors.students ? 
                errors.students?.message?.toString() : 
                'Enter each student\'s email on a separate line'
              }
              error={!!errors.students}
              {...register('students', { 
                required: {
                  value: true,
                  message: 'A least one student must be added'
                }
              })}
            />

            <FormGroup row sx={{ gap: 1, mt: 2 }}>
              <Button type="submit" variant="contained">
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
          </FormGroup>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AddStudents;