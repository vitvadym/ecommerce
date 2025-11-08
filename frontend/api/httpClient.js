import API from '../lib/api.js';

class HttpClient {
  async get(url, config = {}) {
    return API.get(url, config);
  }

  async post(url, data, config = {}) {
    return API.post(url, data, config);
  }

  async put(url, data, config = {}) {
    return API.put(url, data, config);
  }

  async delete(url, config = {}) {
    return API.delete(url, config);
  }
}

export default HttpClient;
