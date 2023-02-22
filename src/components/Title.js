import { Typography } from '@mui/material';

const Title = ({ children }) => {
  return (
    <Typography variant="h3" gutterBottom>
      {children}
    </Typography>
  );
};

export default Title;