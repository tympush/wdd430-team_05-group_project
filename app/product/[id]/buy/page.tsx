import dbConnect from '@/lib/mongoose';
import Product from '@/models/Product';
import { auth } from '@/auth';
import BuyClient from './BuyClient';
import { redirect } from 'next/navigation';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase"
};

type Props = { params: Promise<{ id: string }> };

export default async function BuyPage({ params }: Props) {
  const { id } = await params;
  if (!id) {
    redirect('/shop');
  }

  const session = await auth();
  if (!session?.user) {
    // redirect to login with callback
    redirect(`/login?callbackUrl=/product/${id}/buy`);
  }

  await dbConnect();
  const product = await Product.findById(id).lean();
  if (!product) redirect('/shop');

  const serialized = {
    _id: String(product._id),
    title: product.title || '',
    price: typeof product.price === 'number' ? product.price : Number(product.price ?? 0),
    image: product.image ?? null,
  };

  const user = {
    name: (session.user as any)?.name ?? null,
    email: (session.user as any)?.email ?? null,
  };

  return (
    <main className="mt-16 py-8 bg-[#F8F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Purchase — {serialized.title}</h1>
        {/* Client-side form expects product and user props */}
        <BuyClient product={serialized} user={user} />
      </div>
    </main>
  );
}
