import httpClient from "./httpClient.js";

const orderService = {
   async getAllOrders(params) {
     return httpClient.get(`/order/all-orders?${params}`);
   },
  // updateOrderStatus: (orderId, status) => API.put(`/order/${orderId}`, { status }),
};

export default orderService;
