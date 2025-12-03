import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICollection extends Document {
  name: string;
  seller: string; // seller username
  productIds: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema = new Schema(
  {
    name: { type: String, required: true },
    seller: { type: String, required: true },
    productIds: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

// Index for efficient querying by seller
CollectionSchema.index({ seller: 1, createdAt: -1 });

const Collection: Model<ICollection> =
  (mongoose.models.Collection as Model<ICollection>) ||
  mongoose.model<ICollection>('Collection', CollectionSchema, 'collections');

export default Collection;
