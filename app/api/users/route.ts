import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { auth } from '@/auth';

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).account_type !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, account_type } = body || {};
    if (!id || !account_type || !['user', 'seller', 'admin'].includes(account_type)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    await dbConnect();
    const updated = await User.findByIdAndUpdate(id, { account_type }, { new: true }).lean();
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ ok: true, id: updated._id.toString(), account_type: updated.account_type });
  } catch (err: any) {
    console.error('Users PATCH error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).account_type !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const users = await User.find({}).lean();
    const sanitized = users.map((u: any) => ({ id: String(u._id), username: u.username, email: u.email, account_type: u.account_type ?? 'user' }));
    return NextResponse.json({ ok: true, users: sanitized });
  } catch (err: any) {
    console.error('Users GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
