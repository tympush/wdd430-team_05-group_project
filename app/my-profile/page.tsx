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
    <div className="min-h-screen bg-[#F8F5F1] pt-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-[#3E3E3E]">My Profile</h1>
        <p className="text-[#6E6E6E] mb-8">Welcome, {user.name}!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/my-profile/create-collection">
            <div className="bg-[#F5EFE6] rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer border border-[#E0B251]">
              <h2 className="text-xl font-bold mb-2 text-[#3E3E3E]">Create Collection</h2>
              <p className="text-[#6E6E6E]">
                Organize your products into collections. Select multiple products to group them together.
              </p>
            </div>
          </Link>

          <Link href="/my-profile/create-story">
            <div className="bg-[#F5EFE6] rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer border border-[#E0B251]">
              <h2 className="text-xl font-bold mb-2 text-[#3E3E3E]">Create Story</h2>
              <p className="text-[#6E6E6E]">
                Share your story with customers. Include a title, description, and optionally one product.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
