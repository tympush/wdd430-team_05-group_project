import mongoose, { Document, Schema } from "mongoose";

interface IReview extends Document {
  rating: number;
  text: string;
  author: string;
  productId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    text: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    author: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ productId: 1, createdAt: -1 });

const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
