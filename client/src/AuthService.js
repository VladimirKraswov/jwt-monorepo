import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

class AuthService {
  login(username, password) {
    return axios
      .post(`${API_URL}/login`, { username, password })
      .then(response => {
        if (response.data.accessToken) {
          const decodedToken = JSON.parse(atob(response.data.accessToken.split('.')[1]));
          const user = {
            ...response.data,
            isAdmin: decodedToken.isAdmin,
          };
          localStorage.setItem('user', JSON.stringify(user));
        }
        return response.data;
      });
  }

  register(username, password, isAdmin) {
    return axios
      .post(`${API_URL}/register`, { username, password, isAdmin })
      .then(response => {
        if (response.data.accessToken) {
          const decodedToken = JSON.parse(atob(response.data.accessToken.split('.')[1]));
          const user = {
            ...response.data,
            isAdmin: decodedToken.isAdmin,
          };
          localStorage.setItem('user', JSON.stringify(user));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  refreshToken() {
    const user = this.getCurrentUser();
    return axios
      .post(`${API_URL}/token`, { token: user.refreshToken })
      .then(response => {
        if (response.data.accessToken) {
          const decodedToken = JSON.parse(atob(response.data.accessToken.split('.')[1]));
          user.accessToken = response.data.accessToken;
          user.isAdmin = decodedToken.isAdmin;
          localStorage.setItem('user', JSON.stringify(user));
        }
        return response.data;
      });
  }
}

export default new AuthService();
