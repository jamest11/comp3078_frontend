import { Container } from '@mui/material';
import Title from 'components/Title';
import TitleDivider from 'components/TitleDivider';

const StudentProfile = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Title>Profile</Title>
      <TitleDivider />
    </Container>
  );
};

export default StudentProfile;