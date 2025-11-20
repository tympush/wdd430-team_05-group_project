import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Seller from '@/models/Seller';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = body || {};

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await dbConnect();

    const existing = await Seller.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const seller = await Seller.create({ username, email, password });

    return NextResponse.json({ ok: true, id: seller._id.toString() });
  } catch (err: any) {
    console.error('Register error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
