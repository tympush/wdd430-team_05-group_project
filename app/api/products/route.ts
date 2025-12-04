import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";
import Review from "@/models/Review";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const distinct = url.searchParams.get("distinct");
    const q = (url.searchParams.get("q") ?? "").trim();
    const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
    const limit = Math.max(1, Number(url.searchParams.get("limit") ?? 16));
    const seller = url.searchParams.get("seller") ?? undefined;
    const category = url.searchParams.get("category") ?? undefined;
    const minPrice = url.searchParams.get("minPrice") ? Number(url.searchParams.get("minPrice")) : undefined;
    const maxPrice = url.searchParams.get("maxPrice") ? Number(url.searchParams.get("maxPrice")) : undefined;
    const sort = url.searchParams.get("sort") ?? undefined;

    if (distinct === "true") {
      const sellers = await Product.distinct("seller");
      const categories = await Product.distinct("category");
      return NextResponse.json({ sellers: (sellers || []).filter(Boolean), categories: (categories || []).filter(Boolean) }, { status: 200 });
    }

    const filter: any = {};
    if (q) filter.$or = [{ title: { $regex: q, $options: "i" } }, { description: { $regex: q, $options: "i" } }];
    if (seller) filter.seller = seller;
    if (category) filter.category = category;
    if (minPrice != null || maxPrice != null) filter.price = {};
    if (minPrice != null) filter.price.$gte = minPrice;
    if (maxPrice != null) filter.price.$lte = maxPrice;

    const total = await Product.countDocuments(filter);

    let sortObj: any = { createdAt: -1 };
    if (sort === "price_asc") sortObj = { price: 1 };
    else if (sort === "price_desc") sortObj = { price: -1 };
    else if (sort === "name_asc") sortObj = { title: 1 };
    else if (sort === "name_desc") sortObj = { title: -1 };

    const products = await Product.find(filter)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Compute average ratings for the returned products
    const productIds = (products as any[]).map((p) => p._id);
    let ratingsMap: Record<string, { avgRating: number; reviewCount: number }> = {};
    if (productIds.length) {
      const agg = await Review.aggregate([
        { $match: { productId: { $in: productIds } } },
        {
          $group: {
            _id: "$productId",
            avgRating: { $avg: "$rating" },
            reviewCount: { $sum: 1 },
          },
        },
      ]);
      ratingsMap = Object.fromEntries(
        agg.map((r: any) => [String(r._id), { avgRating: Number(r.avgRating) || 0, reviewCount: Number(r.reviewCount) || 0 }])
      );
    }

    const sanitized = (products as any[]).map((p) => ({
      _id: String(p._id),
      title: p.title,
      price: p.price,
      image: p.image || null,
      seller: p.seller || null,
      category: p.category || null,
      description: p.description || null,
      createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : undefined,
      updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : undefined,
      avgRating: ratingsMap[String(p._id)]?.avgRating ?? 0,
      reviewCount: ratingsMap[String(p._id)]?.reviewCount ?? 0,
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

    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });

    const { title, price, image, description, seller, category } = body;
    if (!title || price == null) return NextResponse.json({ ok: false, error: "title and price are required" }, { status: 400 });

    const product = new (await import("@/models/Product")).default({ title, price, image, description, seller, category });
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

    return NextResponse.json({ ok: true, product: sanitized }, { status: 201 });
  } catch (err: any) {
    console.error("[API POST /api/products] error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}



