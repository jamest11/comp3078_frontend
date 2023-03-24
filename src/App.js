import {
  CssBaseline,
  ThemeProvider
} from '@mui/material';
import { theme } from 'components/Layout';
import { RouterProvider } from 'react-router-dom';
import AuthContextProvider from 'security/AuthContextProvider';
import router from './router';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
