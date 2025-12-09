import ClientShop from "@/app/components/ClientShop";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";
import Review from "@/models/Review";
import mongoose from "mongoose";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop"
};

type SerializedProduct = {
  _id: string;
  title: string;
  price: number;
  image?: string | null;
  description?: string | null;
  seller?: string | null;
  category?: string | null;
  createdAt?: string;
  updatedAt?: string;
  avgRating?: number;
  reviewCount?: number;
};

export default async function ShopPage({ searchParams }: any) {
  const sp = (await searchParams) ?? {};
  const page = Math.max(1, Number(sp?.page ?? 1));
  const limit = Math.max(1, Number(sp?.limit ?? 16));
  const q = (sp?.q ?? "").toString().trim();
  const seller = sp?.seller || undefined;
  const category = sp?.category || undefined;
  const minPrice = sp?.minPrice ? Number(sp.minPrice) : undefined;
  const maxPrice = sp?.maxPrice ? Number(sp.maxPrice) : undefined;
  const sort = sp?.sort || undefined;

  await dbConnect();

  const filter: any = {};
  if (q) filter.$or = [{ title: { $regex: q, $options: "i" } }, { description: { $regex: q, $options: "i" } }];
  if (seller) filter.seller = seller;
  if (category) filter.category = category;
  if (minPrice != null || maxPrice != null) filter.price = {};
  if (minPrice != null) filter.price.$gte = minPrice;
  if (maxPrice != null) filter.price.$lte = maxPrice;

  let sortObj: any = { createdAt: -1 };
  if (sort === "price_asc") sortObj = { price: 1 };
  else if (sort === "price_desc") sortObj = { price: -1 };
  else if (sort === "name_asc") sortObj = { title: 1 };
  else if (sort === "name_desc") sortObj = { title: -1 };

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort(sortObj)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  // Compute average ratings for the returned products
  const productIds = (products as any[]).map((p) => p._id);
  let ratingsMap: Record<string, { avgRating: number; reviewCount: number }> = {};
  if (productIds.length) {
    const objectIds = productIds.map((id) => 
      typeof id === 'string' ? new mongoose.Types.ObjectId(id) : id
    );
    
    const agg = await Review.aggregate([
      { $match: { productId: { $in: objectIds } } },
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

  const sanitized: SerializedProduct[] = (products as any[]).map((p) => ({
    _id: String(p._id),
    title: p.title,
    price: typeof p.price === "number" ? p.price : Number(p.price ?? 0),
    image: p.image ?? null,
    seller: p.seller ?? null,
    category: p.category ?? null,
    description: p.description ?? null,
    createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : undefined,
    updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : undefined,
    avgRating: ratingsMap[String(p._id)]?.avgRating ?? 0,
    reviewCount: ratingsMap[String(p._id)]?.reviewCount ?? 0,
  }));

  return (
    <>
      <main className="bg-[#F8F5F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6 mt-20 text-[#3E3E3E]">Shop</h1>
          <ClientShop
            initialProducts={sanitized}
            initialTotal={total}
            initialPage={page}
            initialLimit={limit}
            initialQuery={q}
          />
        </div>
      </main>
    </>
  );
}





