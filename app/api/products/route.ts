// app/api/products/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET(request: Request) {
  try {
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

    const sanitized = (products as any[]).map((p) => ({
      _id: String(p._id),
      title: p.title,
      price: p.price,
      image: p.image ?? null,
      description: p.description ?? null,
      createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : undefined,
      updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : undefined,
    }));

    return NextResponse.json({ products: sanitized, total, page, limit }, { status: 200 });
  } catch (err: any) {
    console.error("[API GET /api/products] error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    // parse body safely
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
    }

    const { title, price, image, description } = body;
    if (!title || price == null) {
      return NextResponse.json({ ok: false, error: "title and price are required" }, { status: 400 });
    }

    const product = new (await import("@/models/Product")).default({
      title,
      price,
      image,
      description,
    });

    await product.save();

    const sanitized = {
      _id: String(product._id),
      title: product.title,
      price: product.price,
      image: product.image ?? null,
      description: product.description ?? null,
      createdAt: product.createdAt?.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    };

    console.log("[API POST /api/products] created:", sanitized._id);
    return NextResponse.json({ ok: true, product: sanitized }, { status: 201 });
  } catch (err: any) {
    console.error("[API POST /api/products] error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}



