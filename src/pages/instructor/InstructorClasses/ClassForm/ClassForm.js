import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { emailValidatorRx } from 'utils';
import { instructorApi } from 'services/api';
import LoadingButton from 'components/LoadingButton';
import Subtitle from 'components/Subtitle';

const ClassForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { register, handleSubmit, setError, resetField, control, formState: { errors } } = useForm();
  
  const { append, fields } = useFieldArray({
    control,
    name: 'delStudents',
  });

  const editData = location.state?.class;

  useEffect(() => {
    if(editData) {
      resetField('delStudents');

      for(let i = 0; i < editData.students.length; i++) {
        append({ student: false });
      }
    }
  }, [editData, append, resetField]);

  const onSubmit = (data) => {
    let newStudents = [];

    if(data.newStudents.length > 0) {
      newStudents = data.newStudents.split(/\r?\n/).map(
        (student) => student.trim().replaceAll(',','')
      );
      for(let student of newStudents) {
        console.log(student);
        if(!student.match(emailValidatorRx)) {
          setError('newStudents', { type: 'validate', message: 'Invalid email for at least one student'});
          return;
        }
      }
    }
    
    setSubmitLoading(true);
    
    const delStudents = data.delStudents
      .filter((field) => field.student)
      .map((field) => field.student);

    if(editData) {
      instructorApi.updateClass({
        class: editData._id,
        newStudents,
        delStudents
      })
        .then((res) => navigate('..'))
        .catch(() => console.error('Server error'))
        .finally(() => setSubmitLoading(false));
    }
    else {
      instructorApi.createClass({
        title: data.title,
        students: newStudents
      })
        .then((res) => navigate('..'))
        .catch(() => console.error('Server error'))
        .finally(() => setSubmitLoading(false));
    }

    console.log(delStudents); 
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Box
        component={Paper}
        elevation={6}
        sx={{
          p: 4,
          mt: 6,
        }}
      >
        <Subtitle>{editData ? 'Edit' : 'New'} Class</Subtitle>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >
          <TextField
            variant="outlined"
            label="Class Title"
            size="small"
            spellCheck
            sx={{ width: '50ch' }}
            defaultValue={editData?.title ?? ''}
            error={!!errors.title}
            helperText={errors.title?.message?.toString()}
            {...register('title', { required: 'Class title is required'})}
          />

          <Typography variant="h5" sx={{ mt: 2 }} gutterBottom>Add Students</Typography>
          <TextField 
            variant="outlined"
            label="New Students"
            size="small"
            multiline
            fullWidth
            maxRows={12}
            helperText={!!errors.newStudents ? 
              errors.newStudents?.message?.toString() : 
              'Enter each student\'s email on a separate line'
            }
            error={!!errors.newStudents}
            {...register('newStudents')}
          />

          {editData ? (
            <>
              <Typography variant="h5" sx={{ mt: 2 }}>Remove Students</Typography>
              <Grid container>
                {fields.map((field, index) => (
                  <Grid item xs={12} md={6} lg={4} key={field.id}>
                    <FormControlLabel 
                      label={editData.students[index].email}
                      control={
                        <Checkbox 
                          checkedIcon={<DeleteForeverIcon />}
                          value={editData.students[index]._id}
                          {...register(`delStudents.${index}.student`)}
                        />
                      }

                    />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : null}
         
          <Stack sx={{ mt: 2 }} direction="row" spacing={2}>
            <LoadingButton
              variant="contained"
              color="primary"
              loading={submitLoading}
              size="small"
              onClick="submit"  
            >
              Save
            </LoadingButton>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              component={Link}
              to=".."
            >
              Cancel
            </Button>
          </Stack>
        </Box>   
      </Box>
    </Container>
  );
};

export default ClassForm;