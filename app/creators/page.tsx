import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import Collection from '@/models/Collection';
import Story from '@/models/Story';
import Link from 'next/link';

export default async function CreatorsPage() {
  try {
    await dbConnect();

    // Find usernames that have at least one collection or story
    const collectionSellers: string[] = await Collection.distinct('seller');
    const storySellers: string[] = await Story.distinct('seller');

    const activeSellersSet = new Set<string>([...collectionSellers, ...storySellers]);
    const activeSellers = Array.from(activeSellersSet);

    if (activeSellers.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50 pt-24">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-2">Creators</h1>
            <p className="text-gray-600 mb-8">Discover talented artisans and their beautiful creations</p>
            <div className="text-center py-12">
              <p className="text-gray-500">No creators have posted collections or stories yet.</p>
            </div>
          </div>
        </div>
      );
    }

    // Get users who are active sellers (have posts) and are seller/admin
    const sellers = await User.find({
      username: { $in: activeSellers },
      account_type: { $in: ['seller', 'admin'] },
    })
      .select('username email')
      .sort({ createdAt: 1 })
      .lean();

    const serialized = JSON.parse(JSON.stringify(sellers));

    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2">Creators</h1>
          <p className="text-gray-600 mb-8">Discover talented artisans and their beautiful creations</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serialized.map((seller: any) => (
              <Link key={seller._id} href={`/creators/${encodeURIComponent(seller.username)}`}>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
                  <h2 className="text-xl font-bold mb-2">{seller.username}</h2>
                  <p className="text-gray-600 mb-4">{seller.email}</p>
                  <div className="text-amber-700 font-semibold">View Profile →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching sellers:', error);
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-red-600">Error loading creators. Please try again later.</p>
        </div>
      </div>
    );
  }
}
