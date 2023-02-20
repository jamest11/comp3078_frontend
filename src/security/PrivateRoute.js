import { Navigate } from 'react-router-dom';
import { useAuth } from "./AuthContextProvider";

import AccessDenied from 'pages/public/AccessDenied';

const PrivateRoute = ({ userType, children }) => {
  const { token, user } = useAuth();

  if (!token) {
    return (<Navigate to="/login" />);
  }

  if(userType !== user.userType) {
    return (<AccessDenied />);
  }

  return children;
};

export default PrivateRoute;