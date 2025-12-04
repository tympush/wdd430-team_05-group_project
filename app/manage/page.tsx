import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import ManageUsersClient from './ManageUsersClient';

export default async function ManagePage() {
  const session = await auth();
  if (!session?.user || session.user.account_type !== 'admin') {
    redirect('/login');
  }

  await dbConnect();
  const users = await User.find({}).lean();

  const sanitized = users.map((u: any) => ({
    id: String(u._id),
    username: u.username,
    email: u.email,
    account_type: u.account_type ?? 'user',
  }));

  return (
    <main className="mt-20 max-w-6xl mx-auto px-4 min-h-screen bg-[#F8F5F1] pb-12">
      <h1 className="text-2xl font-bold mb-6 text-[#3E3E3E]">Manage Users</h1>
      <ManageUsersClient initialUsers={sanitized} />
    </main>
  );
}
