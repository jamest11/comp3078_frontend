import { createContext, useContext, useState } from 'react';

import { authApi } from 'services/api';

const AuthContext = createContext(undefined);

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  if(token){
    authApi.setAuthHeader(token);
  }
  // create token service class w/ export

  const handleLogin = (data) => {
    if(data.jwt_token) {
      setToken(data.jwt_token);
      setUser(data.user);
      localStorage.setItem('token', data.jwt_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      authApi.setAuthHeader(data.jwt_token);
    }

  };

  const handleLogout = (msg) => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    authApi.setAuthHeader();
  };

  const checkAuth = (err) => {
    if(err.response?.status === 401) {
      handleLogout();
    }
    else{
      return Promise.reject(err);
    }
  };

  const value = {
    token,
    user, 
    handleLogin, 
    handleLogout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };
export default AuthContextProvider;