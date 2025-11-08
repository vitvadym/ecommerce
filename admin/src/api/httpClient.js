import API from '../lib/api';

const httpClient = {
  async get(url, config) {
    return await API.get(url, config);
  },
  async post(url, data, config) {
    return await API.post(url, data, config);
  },
  async put(url, data, config) {
    return await API.put(url, data, config);
  },
  async delete(url, config) {
    return await API.delete(url, config);
  },
};

export default httpClient;
