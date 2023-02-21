import { Alert, AlertTitle, Container } from '@mui/material';

const AccessDenied = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Alert severity="error">
        <AlertTitle>Access Denied</AlertTitle>
        You do not have permission to view this page
      </Alert>
    </Container>
  );
};

export default AccessDenied;