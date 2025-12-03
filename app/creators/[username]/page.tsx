import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import Collection from '@/models/Collection';
import Story from '@/models/Story';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ username: string }>;
};

export default async function SellerProfilePage({ params }: Props) {
  const { username: rawUsername } = await params;
  const username = decodeURIComponent(rawUsername);
  
  try {
    await dbConnect();

    // Verify seller exists
    const seller = await User.findOne({ username }).lean();
    if (!seller || (seller.account_type !== 'seller' && seller.account_type !== 'admin')) {
      notFound();
    }

    // Fetch collections and stories
    const collections = await Collection.find({ seller: username })
      .sort({ createdAt: -1 })
      .populate('productIds')
      .lean();

    const stories = await Story.find({ seller: username })
      .sort({ createdAt: -1 })
      .populate('productId')
      .lean();

    const serializedCollections = JSON.parse(JSON.stringify(collections));
    const serializedStories = JSON.parse(JSON.stringify(stories));

    // Merge and sort by date (newest first)
    const merged = [
      ...serializedCollections.map((c: any) => ({ ...c, type: 'collection' })),
      ...serializedStories.map((s: any) => ({ ...s, type: 'story' })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Seller Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-4xl font-bold mb-2">{username}</h1>
            <p className="text-gray-600">{seller.email}</p>
            <Link href="/creators" className="text-amber-700 hover:text-amber-800 mt-4 inline-block">
              ← Back to Creators
            </Link>
          </div>

          {/* Collections & Stories */}
          {merged.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">This creator hasn't shared any collections or stories yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {merged.map((item: any) => (
                <div key={`${item.type}-${item._id}`} className="bg-white rounded-lg shadow-md p-6">
                  {item.type === 'collection' ? (
                    <CollectionCard collection={item} />
                  ) : (
                    <StoryCard story={item} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading seller profile:', error);
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-red-600">Error loading creator profile. Please try again later.</p>
        </div>
      </div>
    );
  }
}

function CollectionCard({ collection }: { collection: any }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded">Collection</span>
        <p className="text-sm text-gray-500">
          {new Date(collection.createdAt).toLocaleDateString()}
        </p>
      </div>
      <h2 className="text-2xl font-bold mb-4">{collection.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collection.productIds && collection.productIds.length > 0 ? (
          collection.productIds.map((product: any) => (
            <Link key={product._id} href={`/product/${product._id}`}>
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                {product.image && (
                  <div className="relative w-full h-40 bg-gray-200">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.title}</h3>
                  <p className="text-amber-700 font-bold">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No products in this collection.</p>
        )}
      </div>
    </div>
  );
}

function StoryCard({ story }: { story: any }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded">Story</span>
        <p className="text-sm text-gray-500">
          {new Date(story.createdAt).toLocaleDateString()}
        </p>
      </div>
      <h2 className="text-2xl font-bold mb-4">{story.title}</h2>
      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{story.text}</p>
      {story.productId && (
        <Link href={`/product/${story.productId._id}`}>
          <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition inline-block">
            {story.productId.image && (
              <div className="relative w-40 h-40 bg-gray-200">
                <Image
                  src={story.productId.image}
                  alt={story.productId.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold mb-1">{story.productId.title}</h3>
              <p className="text-amber-700 font-bold">${story.productId.price.toFixed(2)}</p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
