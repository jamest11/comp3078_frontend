import { isAxiosError } from 'axios';
import { useAuth } from 'security/AuthContextProvider';

const { useRouteError, isRouteErrorResponse, Navigate } = require('react-router-dom');

function RootBoundary() {
  const error = useRouteError();
  const { handleLogout } = useAuth();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div>This page doesn't exist!</div>;
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this</div>;
    }

    if (error.status === 503) {
      return <div>Looks like our API is down</div>;
    }

    if (error.status === 418) {
      return <div>🫖</div>;
    }
    
    if(error.status === 0) {
      return <div>API request timed out</div>;
    }
  }
  if(isAxiosError(error)) {
    if(error.code === 'ECONNABORTED') {
      return <div>Error</div>;
    }

    if(error.response?.status === 401) {
      handleLogout();
      return <Navigate to="/login" />;
    }
  }
  console.log(error);

  return <div>Something went wrong</div>;
}

export default RootBoundary;