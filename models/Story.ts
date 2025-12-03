import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IStory extends Document {
  title: string;
  text: string;
  seller: string; // seller username
  productId?: mongoose.Types.ObjectId; // optional, max 1 product
  createdAt: Date;
  updatedAt: Date;
}

const StorySchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    seller: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', default: null },
  },
  { timestamps: true }
);

// Index for efficient querying by seller and chronological order
StorySchema.index({ seller: 1, createdAt: -1 });

const Story: Model<IStory> =
  (mongoose.models.Story as Model<IStory>) ||
  mongoose.model<IStory>('Story', StorySchema, 'stories');

export default Story;
