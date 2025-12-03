import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongoose';
import Collection from '@/models/Collection';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: 'You must be logged in' }, { status: 401 });
    }

    const user = session.user as any;
    if (user.account_type !== 'seller' && user.account_type !== 'admin') {
      return NextResponse.json({ message: 'Only sellers can create collections' }, { status: 403 });
    }

    await dbConnect();

    const { name, productIds } = await request.json();

    if (!name || !name.trim()) {
      return NextResponse.json({ message: 'Collection name is required' }, { status: 400 });
    }

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ message: 'At least one product is required' }, { status: 400 });
    }

    const objectIds = productIds.map((id) => new mongoose.Types.ObjectId(id));

    const collection = await Collection.create({
      name: name.trim(),
      seller: user.name,
      productIds: objectIds,
    });

    return NextResponse.json(collection, { status: 201 });
  } catch (error) {
    console.error('Error creating collection:', error);
    return NextResponse.json({ message: 'Failed to create collection' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const sellerName = request.nextUrl.searchParams.get('seller');

    if (!sellerName) {
      return NextResponse.json({ message: 'Seller name is required' }, { status: 400 });
    }

    const collections = await Collection.find({ seller: sellerName })
      .sort({ createdAt: -1 })
      .populate('productIds')
      .lean();

    const serialized = JSON.parse(JSON.stringify(collections));
    return NextResponse.json(serialized, { status: 200 });
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json({ message: 'Failed to fetch collections' }, { status: 500 });
  }
}
