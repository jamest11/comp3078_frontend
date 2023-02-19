import {
  CssBaseline,
  ThemeProvider
} from '@mui/material';
import Layout, { theme } from 'common/Layout';
import AuthContextProvider from 'security/AuthContextProvider';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
