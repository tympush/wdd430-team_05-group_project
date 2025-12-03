import ClientShop from "./components/ClientShop";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";

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
};

export default async function ShopPage({ searchParams }: any) {
  const sp = (await searchParams) ?? {};
  const page = Math.max(1, Number(sp?.page ?? 1));
  const limit = Math.max(1, Number(sp?.limit ?? 12));
  const q = (sp?.q ?? "").toString().trim();

  await dbConnect();

  const filter = q ? { title: { $regex: q, $options: "i" } } : {};
  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

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
  }));

  return (
    <>
      <main className="min-h-screen bg-[#F8F5F1]">
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





