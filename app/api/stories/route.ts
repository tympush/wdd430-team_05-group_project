import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongoose';
import Story from '@/models/Story';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: 'You must be logged in' }, { status: 401 });
    }

    const user = session.user as any;
    if (user.account_type !== 'seller' && user.account_type !== 'admin') {
      return NextResponse.json({ message: 'Only sellers can create stories' }, { status: 403 });
    }

    await dbConnect();

    const { title, text, productId } = await request.json();

    if (!title || !title.trim()) {
      return NextResponse.json({ message: 'Story title is required' }, { status: 400 });
    }

    if (!text || !text.trim()) {
      return NextResponse.json({ message: 'Story text is required' }, { status: 400 });
    }

    const storyData: any = {
      title: title.trim(),
      text: text.trim(),
      seller: user.name,
    };

    if (productId) {
      storyData.productId = new mongoose.Types.ObjectId(productId);
    }

    const story = await Story.create(storyData);

    return NextResponse.json(story, { status: 201 });
  } catch (error) {
    console.error('Error creating story:', error);
    return NextResponse.json({ message: 'Failed to create story' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const sellerName = request.nextUrl.searchParams.get('seller');

    if (!sellerName) {
      return NextResponse.json({ message: 'Seller name is required' }, { status: 400 });
    }

    const stories = await Story.find({ seller: sellerName })
      .sort({ createdAt: -1 })
      .populate('productId')
      .lean();

    const serialized = JSON.parse(JSON.stringify(stories));
    return NextResponse.json(serialized, { status: 200 });
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json({ message: 'Failed to fetch stories' }, { status: 500 });
  }
}
