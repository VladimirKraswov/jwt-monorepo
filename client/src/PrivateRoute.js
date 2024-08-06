import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from './AuthService';

const PrivateRoute = ({ component: Component, isAdminRoute, ...rest }) => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  const isAdmin = currentUser.isAdmin;

  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
