import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongoose";
import Review from "@/models/Review";
import mongoose from "mongoose";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const productId = url.searchParams.get("productId");
    const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
    const limit = Math.max(1, Number(url.searchParams.get("limit") ?? 3));

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const filter = { productId: new mongoose.Types.ObjectId(productId) };
    const total = await Review.countDocuments(filter);

    const reviews = await Review.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const serialized = reviews.map((r) => ({
      _id: r._id?.toString() || "",
      rating: r.rating,
      text: r.text,
      author: r.author,
      productId: r.productId?.toString() || "",
      createdAt: r.createdAt?.toISOString() || new Date().toISOString(),
    }));

    return NextResponse.json({ reviews: serialized, total, page, limit });
  } catch (err) {
    console.error("[GET /api/reviews] error:", err);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: "You must be logged in to review." }, { status: 401 });
    }

    const body = await request.json();
    const { productId, rating, text } = body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ message: "Rating must be between 1 and 5" }, { status: 400 });
    }

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ message: "Review text cannot be empty" }, { status: 400 });
    }

    if (text.length > 2000) {
      return NextResponse.json({ message: "Review text cannot exceed 2000 characters" }, { status: 400 });
    }

    await dbConnect();

    const review = await Review.create({
      productId: new mongoose.Types.ObjectId(productId),
      rating: Number(rating),
      text: text.trim(),
      author: session.user.name || session.user.email || "Anonymous",
    });

    const serialized = {
      _id: review._id?.toString() || "",
      rating: review.rating,
      text: review.text,
      author: review.author,
      productId: review.productId?.toString() || "",
      createdAt: review.createdAt?.toISOString() || new Date().toISOString(),
    };

    return NextResponse.json(serialized, { status: 201 });
  } catch (err) {
    console.error("[POST /api/reviews] error:", err);
    return NextResponse.json({ message: "Failed to save review" }, { status: 500 });
  }
}
