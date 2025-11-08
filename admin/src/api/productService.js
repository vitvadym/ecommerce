import httpClient from './httpClient.js';

const productService = {
  async addProduct(productData) {
    return httpClient.post('/product/add', productData);
  },
  async getAllProducts(params) {
    return httpClient.get(`/product/list?${params}`);
  },
  async deleteProduct(productId) {
    return httpClient.delete(`/product/delete/${productId}`);
  },
};

export default productService;
