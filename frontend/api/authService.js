import HttpClient from './httpClient.js';

class AuthService {
  constructor() {
    this.httpClient = new HttpClient();
  }
  async login(data) {
    return this.httpClient.post('/auth/login', data);
  }

  async register(data) {
    return this.httpClient.post('/auth/register', data);
  }

  async me() {
    return this.httpClient.get('/auth/me');
  }
}

export default new AuthService();
