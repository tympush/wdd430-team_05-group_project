import dbConnect from "@/lib/mongoose";
import Product from "@/models/Product";
import ProductCard from "./ProductCard";

export default async function FeaturedProducts({ limit = 6 }: { limit?: number }) {
  await dbConnect();
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  const serialized = products.map((p) => ({
    _id: p._id?.toString() || "",
    title: p.title || "",
    price: p.price || 0,
    image: p.image || null,
  }));

  return (
    <section className="py-12 bg-amber-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {serialized.length === 0 ? (
            <p className="text-gray-600">No products yet — add one to see it here.</p>
          ) : (
            serialized.map((p) => (
              <ProductCard key={p._id} title={p.title} price={p.price} image={p.image ?? null} productId={p._id} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}


