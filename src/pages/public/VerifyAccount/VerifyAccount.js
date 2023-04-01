import { Alert, AlertTitle, Container, Typography, Link as MUILink } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useAuth } from 'security/AuthContextProvider';
import { authApi } from 'services/api';

import AccessDenied from 'pages/public/AccessDenied';

const VerifyAccount = () => {
  const { token } = useParams();
  const { user } = useAuth();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!user) {
      authApi.verifyAccount(token)
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [user, token]);

  if(user && user.userType) {
    return (<AccessDenied />);
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      {!loading && (error ? (
        <Alert severity="error">
          <AlertTitle>Verification Failed</AlertTitle>
          <Typography variant="body1">
            The verification link is invalid or the account has already been verified.
          </Typography>
          <Typography variant="body1">
            If the link has expired, you must re-register your account.
          </Typography>
          <Typography variant="body1">
            Click <MUILink component={Link} to="/login">here</MUILink> to go to the login page.
          </Typography>
        </Alert>
      ) : (
        <Alert severity="success">
          <AlertTitle>Account Verified</AlertTitle>
          <Typography variant="body1">
            Your account has been verified.
          </Typography>
          <Typography variant="body1">
            Click <MUILink component={Link} to="/login">here</MUILink> to go to the login page.
          </Typography>
        </Alert>
      ))}
    </Container>
  );
};

export default VerifyAccount;