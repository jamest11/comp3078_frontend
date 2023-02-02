import { Box, Container } from '@mui/material';
import NavBar from './NavBar';
import { createTheme } from '@mui/material/styles';
import { deepPurple, blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: blue,
  },
});


const Layout = ({ children }) => {
  return (
    <Box>
      <NavBar />
      <Container component="main">
        { children }
      </Container>
    </Box>
  );
};

export default Layout;
export { theme };