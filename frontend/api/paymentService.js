import HttpClient from './httpClient.js';

class PaymentService {
  constructor() {
    this.httpClient = new HttpClient();
  }

  async createCheckoutSession(data) {
    return this.httpClient.post('/payment/checkout-session', data);
  }

  async checkoutSuccess(data) {
    return this.httpClient.post('/payment/checkout-success', data);
  }

  async checkoutCancel(data) {
    return this.httpClient.post('/payment/checkout-cancel', data);
  }

  async retryCheckout(data) {
    return this.httpClient.post('/payment/retry-checkout', data);
  }
}

export default new PaymentService();
