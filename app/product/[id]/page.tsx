import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";
import Review from "@/models/Review";
import ProductDetail from "@/app/components/ProductDetail";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import mongoose from "mongoose";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  await dbConnect();
  const product = await Product.findById(id).lean();

  return {
    title: product ? `${product.title} — Handcrafted Haven` : "Product — Handcrafted Haven",
    description: product?.description || "View product details",
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  if (!id) {
    redirect("/shop");
  }

  await dbConnect();
  const product = await Product.findById(id).lean();

  if (!product) {
    redirect("/shop");
  }

  // Fetch review aggregation
  const productObjectId = typeof product._id === 'string' 
    ? new mongoose.Types.ObjectId(product._id) 
    : product._id;

  const reviewStats = await Review.aggregate([
    { $match: { productId: productObjectId } },
    {
      $group: {
        _id: "$productId",
        avgRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  const stats = reviewStats[0] || { avgRating: 0, reviewCount: 0 };

  const serialized = {
    _id: product._id?.toString() || "",
    title: product.title || "",
    price: product.price || 0,
    image: product.image || null,
    description: product.description || "",
    seller: product.seller || null,
    category: product.category || null,
    createdAt: product.createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: product.updatedAt?.toISOString() || new Date().toISOString(),
    avgRating: stats.avgRating || 0,
    reviewCount: stats.reviewCount || 0,
  };

  return (
    <main className="mt-16 bg-[#F8F5F1]">
      <ProductDetail product={serialized} />
    </main>
  );
}
