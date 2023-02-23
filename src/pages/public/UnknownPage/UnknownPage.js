import { Alert, AlertTitle, Container } from '@mui/material';

const UnknownPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Alert severity="error">
        <AlertTitle>404</AlertTitle>
        This page/route does not exist
      </Alert>
    </Container>
  );
};

export default UnknownPage;