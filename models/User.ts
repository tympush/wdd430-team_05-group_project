// models/User.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  account_type: 'user' | 'seller' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    account_type: { type: String, enum: ['user', 'seller', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

// Prevent overwrite during dev/hot reload
const User: Model<IUser> = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema, 'users');

export default User;
