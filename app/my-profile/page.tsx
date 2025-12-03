import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function MyProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const user = session.user as any;
  if (user.account_type !== 'seller' && user.account_type !== 'admin') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">My Profile</h1>
        <p className="text-gray-600 mb-8">Welcome, {user.name}!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/my-profile/create-collection">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <h2 className="text-xl font-bold mb-2">Create Collection</h2>
              <p className="text-gray-600">
                Organize your products into collections. Select multiple products to group them together.
              </p>
            </div>
          </Link>

          <Link href="/my-profile/create-story">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
              <h2 className="text-xl font-bold mb-2">Create Story</h2>
              <p className="text-gray-600">
                Share your story with customers. Include a title, description, and optionally one product.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
