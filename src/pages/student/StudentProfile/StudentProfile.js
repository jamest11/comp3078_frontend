import { Container, Divider, Typography } from "@mui/material";

const StudentProfile = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h4">Profile</Typography>
      <Divider sx={{ my: 2 }}/>
    </Container>
  );
};

export default StudentProfile;