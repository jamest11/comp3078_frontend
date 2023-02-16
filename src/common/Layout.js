import { Box, Container, Paper, Typography } from '@mui/material';
import NavBar from './NavBar';
import { createTheme } from '@mui/material/styles';
import { deepPurple, blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: blue,
    background: {
      default: '#CACACA'
    }
  },
});


const Layout = ({ children }) => {
  return (
    <Box>
      <NavBar />
      <Container component="main">
        { children }
      </Container>
      <Paper sx={{ width: '100%', position: 'sticky', bottom: 0, height: 50 }}>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: 'center',
            display: "flex",
            height: 50
          }}
        >
          <Typography variant="caption" sx={{ textAlign: 'center' }}>T20 Quiztionnaire © 2023</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Layout;
export { theme };