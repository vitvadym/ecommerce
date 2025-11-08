import HttpClient from './httpClient.js';

class ProductService {
  constructor() {
    this.httpClient = new HttpClient();
  }

  async getAllProducts(params) {
    return this.httpClient.get(`/product/list?${params}`);
  }

  async getLatestProducts() {
    return this.httpClient.get('/product/latest');
  }

  async getBestSellingProducts() {
    return this.httpClient.get('/product/best-selling');
  }

  async getSingleProduct(productId) {
    return this.httpClient.get(`/product/${productId}`);
  }
}

export default new ProductService();
