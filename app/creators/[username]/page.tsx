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
      <div className="min-h-screen bg-[#F8F5F1] pt-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Seller Header */}
          <div className="bg-[#F5EFE6] rounded-lg shadow-md p-6 mb-8 border border-[#C67C48]">
            <h1 className="text-4xl font-bold mb-2 text-[#3E3E3E]">{username}</h1>
            <p className="text-[#6E6E6E]">{seller.email}</p>
            <Link href="/creators" className="text-[#C67C48] hover:text-[#A65829] mt-4 inline-block font-medium">
              ← Back to Creators
            </Link>
          </div>

          {/* Collections & Stories */}
          {merged.length === 0 ? (
            <div className="bg-[#F5EFE6] rounded-lg shadow-md p-8 text-center border border-[#E0B251]">
              <p className="text-[#6E6E6E]">This creator hasn't shared any collections or stories yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {merged.map((item: any) => (
                <div key={`${item.type}-${item._id}`} className="bg-[#F5EFE6] rounded-lg shadow-md p-6 border border-[#C67C48]">
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
      <div className="min-h-screen bg-[#F8F5F1] pt-24">
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
        <span className="bg-[#E0B251] text-[#3E3E3E] text-xs font-semibold px-3 py-1 rounded">Collection</span>
        <p className="text-sm text-[#6E6E6E]">
          {new Date(collection.createdAt).toLocaleDateString()}
        </p>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-[#3E3E3E]">{collection.name}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {collection.productIds && collection.productIds.length > 0 ? (
          collection.productIds.map((product: any) => (
            <Link key={product._id} href={`/product/${product._id}`}>
              <div className="border border-[#C67C48] rounded-lg overflow-hidden hover:shadow-md transition bg-white">
                {product.image && (
                  <div className="relative w-full h-20 bg-gray-200">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-2">
                  <h3 className="font-semibold text-xs text-[#3E3E3E] line-clamp-2">{product.title}</h3>
                  <p className="text-[#C67C48] font-bold text-xs">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-[#6E6E6E]">No products in this collection.</p>
        )}
      </div>
    </div>
  );
}

function StoryCard({ story }: { story: any }) {
  return (
    <div>
      {story.productId && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#A6BBA1] text-white text-xs font-semibold px-3 py-1 rounded">Story</span>
              <p className="text-sm text-[#6E6E6E]">
                {new Date(story.createdAt).toLocaleDateString()}
              </p>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-[#3E3E3E]">{story.title}</h2>
            <p className="text-[#3E3E3E] whitespace-pre-wrap">{story.text}</p>
          </div>
          <Link href={`/product/${story.productId._id}`}>
            <div className="border border-[#C67C48] rounded-lg overflow-hidden hover:shadow-md transition bg-white h-full flex flex-col">
              {story.productId.image && (
                <div className="relative w-full h-48 bg-gray-200">
                  <Image
                    src={story.productId.image}
                    alt={story.productId.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-3 flex-1 flex flex-col justify-end">
                <h3 className="font-semibold mb-1 text-sm text-[#3E3E3E]">{story.productId.title}</h3>
                <p className="text-[#C67C48] font-bold text-sm">${story.productId.price.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        </div>
      )}
      {!story.productId && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#A6BBA1] text-white text-xs font-semibold px-3 py-1 rounded">Story</span>
            <p className="text-sm text-[#6E6E6E]">
              {new Date(story.createdAt).toLocaleDateString()}
            </p>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-[#3E3E3E]">{story.title}</h2>
          <p className="text-[#3E3E3E] whitespace-pre-wrap">{story.text}</p>
        </div>
      )}
    </div>
  );
}
