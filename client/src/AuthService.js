import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

class AuthService {
  login(username, password) {
    return axios
      .post(`${API_URL}/login`, { username, password })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
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
          user.accessToken = response.data.accessToken;
          localStorage.setItem('user', JSON.stringify(user));
        }
        return response.data;
      });
  }
}

export default new AuthService();
