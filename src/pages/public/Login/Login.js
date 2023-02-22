import { Box, Paper, Avatar, Typography, TextField,  Button, Container, FormGroup } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import { useAuth } from 'security/AuthContextProvider';
import { Navigate, useNavigate } from 'react-router-dom';

import { authApi } from 'services/api';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const { handleLogin, user } = useAuth();

  if(user && user.userType) {
    if(user.userType === 'instructor') {
      return (<Navigate to="/instructor-quizzes" replace />);
    }
    else if(user.userType === 'student') {
      return (<Navigate to="/student-quizzes" replace />);
    }
  }

  const onSubmit = (data) => {
    authApi.login(data)
      .then((res) => {
        handleLogin(res.data);
        if(res.data.user.userType === 'instructor') {
          navigate('/instructor-quizzes');
        }
        else if(res.data.user.userType === 'student') {
          navigate('/student-quizzes');
        }
      })
      .catch((err) => {
        setError('email', { type: 'server', message: 'Invalid credentials' });
        setError('password', { type: 'server', message: 'Invalid credentials' });
      });
  };

  return (
    <Container maxWidth="xs">
      <Box
        component={Paper}
        elevation={6}
        sx={{
          p: 6,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ mb: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box 
          component="form" 
          noValidate 
          sx={{ mt: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <TextField
            required
            fullWidth
            margin="normal"
            label="Email Address"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message?.toString()}
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required'
              }
            })}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message?.toString()}
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required'
              }
            })}
          />
          <FormGroup row sx={{ gap: 1, mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </FormGroup>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;