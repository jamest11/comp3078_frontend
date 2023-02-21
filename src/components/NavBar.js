import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useAuth } from 'security/AuthContextProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, handleLogout } = useAuth();

  const logout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <QuestionMarkIcon />
        <Typography variant="h6" component="div">
          Quiztionnaire
        </Typography>
        <Box sx={{ flex: 1, marginLeft: 5 }}>
          { user ? user.userType === 'instructor' ? (
            <>
              <Button 
                variant={location.pathname === '/instructor-profile' ? 'navActive' : 'navInactive'}
              >
                Profile
              </Button>
              <Button 
                component={Link} 
                to="/instructor-quizzes" 
                variant={location.pathname === '/instructor-quizzes' ? 'navActive' : 'navInactive'}
              >
                Quizzes
              </Button>
              <Button 
                component={Link} 
                to="/instructor-grades" 
                variant={location.pathname === '/instructor-grades' ? 'navActive' : 'navInactive'}
              >
                Grades
              </Button>
            </>
          ) : (
            <>
              <Button 
                component={Link} 
                to="/student-profile" 
                variant={location.pathname === '/student-profile' ? 'navActive' : 'navInactive'}
              >
                Profile
              </Button>
              <Button 
                component={Link} 
                to="/student-quizzes" 
                variant={location.pathname === '/student-quizzes' ? 'navActive' : 'navInactive'}
              >
                Quizzes
              </Button>
              <Button 
                component={Link} 
                to="/student-grades" 
                variant={location.pathname === '/student-grades' ? 'navActive' : 'navInactive'}
              >
                Grades
              </Button>
            </>
          ) : (
            <>
            </>
          )}
        </Box>
        <Box>
            {user && (
              <Button color="inherit" onClick={logout}>Logout</Button>
            )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;