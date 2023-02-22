import { Typography } from '@mui/material';

const Subtitle = ({ children }) => {
  return (
    <Typography variant="h4" gutterBottom>
      {children}
    </Typography>
  );
};

export default Subtitle;