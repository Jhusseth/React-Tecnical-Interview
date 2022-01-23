import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {logout } from "../util/firebase";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useNavigate();

  const token = sessionStorage.getItem('token');
  const userInfo = sessionStorage.getItem('userInfo');
  const expiresAt = sessionStorage.getItem('expiresAt');

  const [authState, setAuthState] = useState({
    token,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {}
  });

  const setAuthInfo = (user) => {
    sessionStorage.setItem('token', user.accessToken);
    sessionStorage.setItem(
      'userInfo',
      JSON.stringify({
        firstName: user.email,
        email: user.email,
        role: "user"
      })
    );
    sessionStorage.setItem('expiresAt', user.metadata.createdAt);

    setAuthState({
      token,
      userInfo,
      expiresAt
    });
  };

  const logOut = () => {
    setAuthState({});
    logout();
    sessionStorage.clear()
    history('/login');
  };

  const isAuthenticated = () => {
    if (!authState.token) {
      return false;
    }
    return (new Date().getTime() / 1000 < authState.expiresAt)
  };

  const isAdmin = () => {
    return authState.userInfo.role === 'admin';
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        logOut,
        isAuthenticated,
        isAdmin
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
