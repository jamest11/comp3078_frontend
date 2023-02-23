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
                sx={{ 
                  color: (location.pathname === '/instructor-profile' ? 'text.light' : 'text.dark'), 
                  ':hover': { color: 'text.light' 
                }}}
              >
                Profile
              </Button>
              <Button 
                component={Link} 
                to="/instructor-quizzes" 
                sx={{ 
                  color: (location.pathname === '/instructor-quizzes' ? 'text.light' : 'text.dark'), 
                  ':hover': { color: 'text.light' 
                }}}
              >
                Quizzes
              </Button>
              <Button 
                component={Link} 
                to="/instructor-grades" 
                sx={{ 
                  color: (location.pathname === '/instructor-grades' ? 'text.light' : 'text.dark'), 
                  ':hover': { color: 'text.light' 
                }}}
              >
                Grades
              </Button>
              <Button 
                component={Link} 
                to="/instructor-classes"
                sx={{ 
                  color: (location.pathname === '/instructor-classes' ? 'text.light' : 'text.dark'), 
                  ':hover': { color: 'text.light' 
                }}}
              >
                Classes
              </Button>
            </>
          ) : (
            <>
              <Button 
                component={Link} 
                to="/student-profile" 
                sx={{ 
                  color: (location.pathname === '/student-profile' ? 'text.light' : 'text.dark'), 
                  ':hover': { color: 'text.light' 
                }}}
              >
                Profile
              </Button>
              <Button 
                component={Link} 
                to="/student-quizzes" 
                sx={{ 
                  color: (location.pathname === '/student-quizzes' ? 'text.light' : 'text.dark'), 
                  ':hover': { color: 'text.light' 
                }}}
              >
                Quizzes
              </Button>
              <Button 
                component={Link} 
                to="/student-grades" 
                sx={{ 
                  color: (location.pathname === '/student-grades' ? 'text.light' : 'text.dark'), 
                  ':hover': { color: 'text.light' 
                }}}
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
              <Button 
                onClick={logout}
                sx={{ 
                  color: 'text.dark', 
                  ':hover': { color: 'text.light' 
                }}}
              >
                Logout
              </Button>
            )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;