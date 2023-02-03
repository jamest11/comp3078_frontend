import { AppBar, Toolbar, IconButton, Button, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Quiztionnaire
        </Typography>
        <Box sx={{ flex: 1, marginLeft: 5 }}>
          <Button href="/" color="inherit">Home</Button>
          <Button color="inherit">Grades</Button>
          <Button href="/quiz" color="inherit">Quizzes</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;