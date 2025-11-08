import HttpClient from "./httpClient.js";

class OrderService {
  constructor() {
    this.httpClient = new HttpClient();
  }

  async createOrder(orderData) {
    return this.httpClient.post('/order/create', orderData);
  }

  async getUserOrders() {
    return this.httpClient.get('/order/user-orders');
  }

  async getAllOrders() {
    return this.httpClient.post('/order/list');
  }
}

export default new OrderService();