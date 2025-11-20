// lib/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

// During client-side bundling some modules may import this file.
// Avoid throwing an exception at import time in the browser; only enforce
// presence of the env var when running on the server (Node).
if (!MONGODB_URI && typeof window === 'undefined') {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// @ts-ignore global caching for dev to avoid multiple connections
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

