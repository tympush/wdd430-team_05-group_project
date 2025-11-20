// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Note: we use request.formData() (Web API).
 * We convert the File to base64 and upload it with cloudinary.uploader.upload.
 * This avoids using formidable and accessing `req`.
 */
export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ ok: false, error: "Expected multipart/form-data" }, { status: 400 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ ok: false, error: "No file found in form data (field name must be 'file')" }, { status: 400 });
    }

    // obtain MIME type and arrayBuffer
    const mime = (file as any).type || "application/octet-stream";
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // convert to base64 data URI (Cloudinary accepts data URIs)
    const base64 = buffer.toString("base64");
    const dataUri = `data:${mime};base64,${base64}`;

    // upload to Cloudinary (adjust options as needed)
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "handcrafted_haven",
      transformation: [{ width: 1600, crop: "limit" }],
    });

    return NextResponse.json({ ok: true, url: uploadResult.secure_url, public_id: uploadResult.public_id });
  } catch (err: any) {
    console.error("[upload] error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Upload failed" }, { status: 500 });
  }
}



