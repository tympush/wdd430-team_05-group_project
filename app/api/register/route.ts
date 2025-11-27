import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { auth } from '@/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password, account_type } = body || {};

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await dbConnect();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    // Determine account_type: only allow non-default types when an admin is creating the account
    let finalType: 'user' | 'seller' | 'admin' = 'user';
    try {
      const session = await auth();
      const creatorType = session?.user?.account_type as string | undefined;
      if (creatorType === 'admin' && account_type && ['user', 'seller', 'admin'].includes(account_type)) {
        finalType = account_type as 'user' | 'seller' | 'admin';
      }
    } catch (e) {
      // ignore; default to 'user'
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword, account_type: finalType });

    return NextResponse.json({ ok: true, id: user._id.toString() });
  } catch (err: any) {
    console.error('Register error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
