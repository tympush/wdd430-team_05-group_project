// models/Seller.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ISeller extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const SellerSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Prevent overwrite during dev/hot reload
const Seller: Model<ISeller> = (mongoose.models.Seller as Model<ISeller>) || mongoose.model<ISeller>('Seller', SellerSchema);

export default Seller;
