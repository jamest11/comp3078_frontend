import { Box, Paper, Stack, Typography } from '@mui/material';
import { formatDate } from 'utils';

const { useAuth } = require('security/AuthContextProvider');

const UserCard = () => {
  const { user } = useAuth();

  return (
    <Paper sx={{ px: 4, py: 2, width: 'fit-content', minWidth: 400 }}>
      <Typography variant="h5" gutterBottom>User Details</Typography>

      {user ? (
        <Stack spacing={1}>
          <Box>
            <Typography variant="body1" fontWeight="bold" display="inline">Name:&nbsp;</Typography>
            <Typography variant="body1" display="inline">{user.firstName} {user.lastName}</Typography>
          </Box>
          <Box>
            <Typography variant="body1" fontWeight="bold" display="inline">Email:&nbsp;</Typography>
            <Typography variant="body1" display="inline">{user.email}</Typography>
          </Box>
          <Box>
            <Typography variant="body1" fontWeight="bold" display="inline">User Type:&nbsp;</Typography>
            <Typography variant="body1" display="inline">{user.userType.charAt(0).toUpperCase() + user.userType.slice(1)}</Typography>
          </Box>
          <Box>
            <Typography variant="body1" fontWeight="bold" display="inline">Registered Since:&nbsp;</Typography>
            <Typography variant="body1" display="inline">{formatDate(user.createdAt)}</Typography>
          </Box>
        </Stack>
      ) : null}
    </Paper>
  );
};

export default UserCard;