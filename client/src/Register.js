import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './AuthService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    AuthService.register(username, password, isAdmin).then(
      () => {
        setMessage('Registration successful');
        window.location.href = '/login';
      },
      (error) => {
        setMessage('Registration failed');
      }
    );
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>
            <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
            Register as Admin
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
      <p>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
};

export default Register;
