import { Avatar, Box, Button, Container, FormControl, FormGroup, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from 'security/AuthContextProvider';
import { authApi } from 'services/api';
import { emailValidatorRx } from 'utils';

const Register = () => {
  const { register, handleSubmit, setError, getValues, setValue, formState: { errors } } = useForm();

  const { user } = useAuth();
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState(null);
  
  useEffect(() => {
    register('birthDate', {
      required: {
        value: true,
        message: 'Birth date is required'
      }
    });
  }, [register]);

  if(user && user.userType) {
    if(user.userType === 'instructor') {
      return (<Navigate to="/instructor-quizzes" replace />);
    }
    else if(user.userType === 'student') {
      return (<Navigate to="/student-quizzes" replace />);
    }
  }

  const onSubmit = (data) => {
    authApi.register(data)
      .then(() => navigate('/login'))
      .catch(console.error);
  };

  return (
    <Container maxWidth="sm">
      <Box
        component={Paper}
        elevation={6}
        sx={{
          p: 3,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          Register
        </Typography>

        <Box 
          component="form" 
          noValidate 
          sx={{ mt: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                autoFocus
                label="First Name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message?.toString()}
                {...register('firstName', {
                  required: {
                    value: true,
                    message: 'First name is required'
                  }
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Last Name"
                error={!!errors.lastName}
                helperText={errors.lastName?.message?.toString()}
                {...register('lastName', {
                  required: {
                    value: true,
                    message: 'Last name is required'
                  }
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth
                required
                label="Email Address"
                error={!!errors.email}
                helperText={errors.email?.message?.toString()}
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email address is required'
                  },
                  pattern: {
                    value: emailValidatorRx,
                    message: 'Invalid email address'
                  }
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth
                required
                type="password"
                label="Password"
                error={!!errors.password}
                helperText={errors.password?.message?.toString()}
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password in required'
                  },
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth
                required
                type="password"
                label="Confirm Password"
                error={!!errors.passwordConfirm}
                helperText={errors?.passwordConfirm?.message?.toString()}
                {...register('passwordConfirm', {
                  required: {
                    value: true,
                    message: 'Confirm password'
                  },
                  validate: (value) => value === getValues('password') || 'Passwords do not match'
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl required fullWidth>
                <InputLabel id="user-type-label" error={!!errors.userType}>User Type</InputLabel>
                <Select
                  labelId="user-type-label"
                  label="User Type"
                  defaultValue=""
                  error={!!errors.userType}
                  {...register('userType', {
                    required: {
                      value: true,
                      message: 'Select a user type',
                    }
                  })}
                >
                  <MenuItem value={'student'}>Student</MenuItem>
                  <MenuItem value={'instructor'}>Instructor</MenuItem>
                </Select>
                <FormHelperText error>{errors?.userType?.message?.toString()}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                  disableFuture
                  label="Birth Date"
                  value={birthDate}
                  onChange={(date) => {
                    setValue('birthDate', dayjs(date).format(), { shouldValidate: true });
                    setBirthDate(date);
                  }}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      fullWidth
                      required
                      error={!!errors.birthDate}
                      helperText={errors.birthDate?.message?.toString()}
                    />
                  )}
                />
              </LocalizationProvider>      
            </Grid>
            <Grid item xs={12}>
              <FormGroup row sx={{ gap: 1 }}>
                <Button type="submit" variant="contained">Submit</Button>
                <Button 
                  variant="contained" 
                  color="secondary"
                  onClick={() => navigate('/login')}
                >
                  Cancel
                </Button>
              </FormGroup>
            </Grid>
          </Grid>
        </Box>

      </Box>
    </Container>
  );
};

export default Register;