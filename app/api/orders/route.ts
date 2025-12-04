import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { auth } from '@/auth';
import Order from '@/models/Order';
import Product from '@/models/Product';

function generateOrderNumber() {
  // numeric string: timestamp + 4 random digits
  return `${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: 'You must be logged in' }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });

    const { productId, address } = body;
    if (!productId || !address) return NextResponse.json({ message: 'productId and address required' }, { status: 400 });

    await dbConnect();

    const product = await Product.findById(productId).lean();
    if (!product) return NextResponse.json({ message: 'Product not found' }, { status: 404 });

    const user = session.user as any;

    // generate unique-ish order number (not cryptographically guaranteed)
    const orderNumber = generateOrderNumber();

    const order = await Order.create({
      orderNumber,
      userId: user?.id ?? undefined,
      name: user?.name ?? undefined,
      email: user?.email ?? undefined,
      address,
      productId,
    });

    const serialized = {
      _id: String(order._id),
      orderNumber: order.orderNumber,
      productId: String(order.productId),
      createdAt: order.createdAt?.toISOString(),
    };

    return NextResponse.json({ ok: true, order: serialized }, { status: 201 });
  } catch (err: any) {
    console.error('[API POST /api/orders] error:', err);
    return NextResponse.json({ ok: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}
