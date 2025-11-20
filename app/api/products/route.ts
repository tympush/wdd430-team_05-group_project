// app/api/products/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET(request: Request) {
  await dbConnect();
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") ?? "").trim();
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const limit = Math.max(1, Number(url.searchParams.get("limit") ?? 12));

  const filter = q ? { title: { $regex: q, $options: "i" } } : {};
  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  // sanitize for JSON
  const sanitized = (products as any[]).map((p) => ({
    _id: String(p._id),
    title: p.title,
    price: p.price,
    image: p.image ?? null,
    description: p.description ?? null,
    createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : undefined,
    updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : undefined,
  }));

  return NextResponse.json({ products: sanitized, total, page, limit });
}


