// @ts-nocheck
import { Box, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import NavBar from './NavBar';
import Footer from './Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7'
    },
    secondary: {
      main: '#2196f3'
    },
    background: {
      default: '#cacaca'
    },
    text: {
      light: '#ffffff',
      dark: '#bdbdbd'
    },
    success: {
      main: '#43a047'
    },
    warning: {
      main: '#fb8c00'
    },
    error: {
      main: '#f44336'
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
    },
  }
});


const Layout = ({ children }) => {
  return (
    <Box>
      <NavBar />
      <Container component="main" sx={{ pb: 6 }}>
        { children }
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
export { theme };