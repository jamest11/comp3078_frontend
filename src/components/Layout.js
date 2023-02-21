import { Box, Container, Paper, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { deepPurple, blue } from '@mui/material/colors';
import NavBar from './NavBar';
import Footer from './Footer';

const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: blue,
    background: {
      default: '#CACACA'
    }
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(',')
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          body: {
            backgroundImage: "url(squared_metal.png)"
          }
        }
      }
    }
  }
});


const Layout = ({ children }) => {
  return (
    <Box>
      <NavBar />
      <Container component="main">
        { children }
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
export { theme };