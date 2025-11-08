import httpClient from "./httpClient.js";

const authService = {
  async login(credentials) {
    return await httpClient.post('/auth/login', credentials);
    
  },
  async me() {
    return await httpClient.get('/auth/me');
  },
};

export default authService;
