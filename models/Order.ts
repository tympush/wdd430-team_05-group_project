import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IOrder extends Document {
  orderNumber: string;
  userId?: string;
  name?: string;
  email?: string;
  address: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: String },
    name: { type: String },
    email: { type: String },
    address: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  },
  { timestamps: true }
);

// Prevent overwrite during dev/hot reload
const Order: Model<IOrder> = (mongoose.models.Order as Model<IOrder>) || mongoose.model<IOrder>('Order', OrderSchema, 'orders');

export default Order;
