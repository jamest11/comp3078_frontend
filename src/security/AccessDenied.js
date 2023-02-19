const { Container, Typography } = require("@mui/material");

const AccessDenied = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h4">Access Denied</Typography>
    </Container>
  );
};

export default AccessDenied;