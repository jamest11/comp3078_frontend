import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { useAuth } from 'security/AuthContextProvider';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const logout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Quiztionnaire
        </Typography>
        <Box sx={{ flex: 1, marginLeft: 5 }}>
          { user ? user.userType === 'instructor' ? (
            <>
              <Button component={Link} to="/instructor-quizzes" color="inherit">Quizzes</Button>
              <Button color="inherit" onClick={logout}>Logout</Button>    
            </>
          ) : (
            <>
              <Button component={Link} to="/student-profile" color="inherit">Home</Button>
              <Button component={Link} to="/student-quizzes" color="inherit">Quizzes</Button>
              <Button color="inherit" onClick={logout}>Logout</Button>            
            </>
          ) : (
            <>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;