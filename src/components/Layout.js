// @ts-nocheck
import { Box, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

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

const tooltipStyles = {
  wrapper: {
    backgroundColor: theme.palette.grey['200'],
    borderRadius: 4,
    padding: 4
  },
  title: {
    ...theme.typography.body2,
    fontWeight: theme.typography.fontWeightMedium
  },
  desc: {
    ...theme.typography.body2
  }
};

const Layout = () => {
  return (
    <Box>
      <NavBar />
      <Container component="main" sx={{ pb: 6 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
export { theme, tooltipStyles };