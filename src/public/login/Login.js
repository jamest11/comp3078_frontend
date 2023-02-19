import { Box, Paper, Avatar, Typography, TextField,  Button, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import { useAuth } from 'security/AuthContextProvider';
import apiService from 'services/apiService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const { handleLogin } = useAuth();

  const onSubmit = (data) => {
    apiService.login(data)
      .then((res) => {
        handleLogin(res.data);
        if(res.data.user.userType === 'instructor') {
          navigate('/instructor-quizzes');
        }
        else if(res.data.user.userType === 'student') {
          navigate('/student-profile');
        }
      })
      .catch((err) => {
        setError('email', { type: 'server', message: 'Invalid credentials' });
        setError('password', { type: 'server', message: 'Invalid credentials' });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
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
          <Avatar sx={{ m: 1, backgroundColor: '#673ab7' }}>
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
              margin="normal"
              required
              fullWidth
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
              margin="normal"
              required
              fullWidth
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
  );
};

export default Login;