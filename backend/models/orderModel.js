import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    contactAddress: { type: Object, required: true },
    status: { type: String, default: 'unpaid' },
    success: { type: Boolean, default: false },
    sessionId: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);

const orderModel = mongoose.model('order', orderSchema);
export default orderModel;
