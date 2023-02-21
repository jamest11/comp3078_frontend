// @ts-nocheck
import { Box, Container } from '@mui/material';
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
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(',')
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          body: {
            backgroundImage: "url(notebook.png)"
          }
        }
      }
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'navInactive' },
          style: {
            color: '#bdbdbd'
          },
        },
        {
          props: { variant: 'navActive' },
          style: {
            color: '#FFFFFF'
          },
        },
      ],
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