import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthService from './AuthService';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';

function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      AuthService.refreshToken();
    }, 14 * 60 * 1000); // обновление токена каждые 14 минут
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
          <Route path="/admin" element={<PrivateRoute component={Dashboard} isAdminRoute />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
