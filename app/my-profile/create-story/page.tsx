import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongoose';
import Product from '@/models/Product';
import CreateStoryClient from './CreateStoryClient';

export default async function CreateStoryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const user = session.user as any;
  if (user.account_type !== 'seller' && user.account_type !== 'admin') {
    redirect('/');
  }

  try {
    await dbConnect();
    const products = await Product.find({ seller: user.name }).lean();
    const serializedProducts = JSON.parse(JSON.stringify(products));

    return (
      <div className="min-h-screen bg-[#F8F5F1] pt-24">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-[#3E3E3E]">Create Story</h1>
          <CreateStoryClient products={serializedProducts} sellerName={user.name} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="min-h-screen bg-[#F8F5F1] pt-24">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <p className="text-red-600">Error loading products. Please try again.</p>
        </div>
      </div>
    );
  }
}
