import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthService from './AuthService';
import PrivateRoute from './PrivateRoute';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(username, password).then(
      () => {
        setMessage('Login successful');
      },
      (error) => {
        setMessage('Login failed');
      }
    );
  };

  const handleLogout = () => {
    AuthService.logout();
    setMessage('Logged out');
  };

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
          <Route
            path="/login"
            element={
              <>
                <form onSubmit={handleLogin}>
                  <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <button type="submit">Login</button>
                </form>
                <button onClick={handleLogout}>Logout</button>
                <p>{message}</p>
              </>
            }
          />
          <Route path="/protected" element={<PrivateRoute component={() => <div>Protected Content</div>} />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
