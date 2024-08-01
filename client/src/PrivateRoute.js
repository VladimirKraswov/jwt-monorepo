import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from './AuthService';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = AuthService.getCurrentUser();
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
