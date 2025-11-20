// models/Product.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  image?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema({
  title: String,
  price: Number,
  image: String,
  public_id: String,
  description: String,
}, { timestamps: true });

// Prevent overwrite during dev/hot reload
const Product: Model<IProduct> =
  (mongoose.models.Product as Model<IProduct>) || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
