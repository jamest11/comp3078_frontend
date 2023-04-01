import { Container } from '@mui/material';
import Title from 'components/Title';
import TitleDivider from 'components/TitleDivider';
import UserCard from 'components/UserCard';

const InstructorProfile = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Title>Profile</Title>
      <TitleDivider />

      <UserCard />
    </Container>
  );
};

export default InstructorProfile;