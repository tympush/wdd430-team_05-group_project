import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Message from '@/models/Message';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { name, email, subject, message } = await request.json();

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    if (!email || !email.trim()) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    if (!subject || !subject.trim()) {
      return NextResponse.json({ message: 'Subject is required' }, { status: 400 });
    }

    if (!message || !message.trim()) {
      return NextResponse.json({ message: 'Message is required' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Please provide a valid email address' }, { status: 400 });
    }

    // Save to database
    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return NextResponse.json({ message: 'Message sent successfully', data: newMessage }, { status: 201 });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json({ message: 'Failed to send message' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const messages = await Message.find().sort({ createdAt: -1 }).lean();

    const serialized = JSON.parse(JSON.stringify(messages));
    return NextResponse.json(serialized, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ message: 'Failed to fetch messages' }, { status: 500 });
  }
}
