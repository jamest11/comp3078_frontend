import {
  Container,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  CssBaseline,
  ThemeProvider
} from '@mui/material';
import Layout, { theme } from './components/common/Layout';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>

      </Layout>
    </ThemeProvider>
  );
}

export default App;
