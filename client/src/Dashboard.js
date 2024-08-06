import React from 'react';
import AuthService from './AuthService';

const Dashboard = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div>
      {currentUser && currentUser.isAdmin ? (
        <h1>Вы супер крутой админ</h1>
      ) : (
        <h1>Вы обычный смертный</h1>
      )}
    </div>
  );
};

export default Dashboard;
