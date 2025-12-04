"use client";
import React, { useState } from "react";

type Props = { seller?: string };

const CATEGORIES = [
  'Accessories',
  'Bath & Beauty',
  'Calligraphy & Lettering',
  'Clothing',
  'Digital Downloads',
  'Furniture & Woodworking',
  'Home Decor',
  'Holiday & Seasonal',
  'Jewelry',
  'Kitchen & Dining',
  'Outdoor & Garden',
  'Paintings & Drawings',
  'Pets',
  'Photography',
  'Prints & Posters',
  'Personalized & Custom',
  'Toys & Games',
  'Other'
];

export default function AdminProductForm({ seller }: Props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [status, setStatus] = useState<string | null>(null);

  async function uploadFile(fileToUpload: File) {
    const fd = new FormData();
    fd.append("file", fileToUpload);
    setStatus("Uploading image...");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) {
      const text = await safeText(res);
      throw new Error(`Upload failed (${res.status}): ${text}`);
    }
    const json = await safeJson(res);
    if (!json || !json.url) throw new Error("Upload returned no url");
    return json.url as string;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving product...");
    try {
      let imageUrl: string | undefined;
      if (file) {
        imageUrl = await uploadFile(file);
      }

      const payload: any = {
        title,
        price: typeof price === "number" ? price : Number(price),
        image: imageUrl,
        description,
        seller: seller ?? null,
        category,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await safeText(res);
        throw new Error(`Create failed (${res.status}): ${text}`);
      }

      const data = await safeJson(res);
      setStatus("Product saved ✅");
      // reset form
      setTitle("");
      setPrice("");
      setFile(null);
      setDescription("");
    } catch (err: any) {
      console.error(err);
      setStatus("Error: " + (err.message || "unknown"));
    }
  }

  async function safeJson(res: Response) {
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.includes("application/json")) {
      const t = await res.text();
      console.warn("Response not JSON:", t);
      return null;
    }
    try {
      return await res.json();
    } catch (e) {
      console.warn("Failed to parse JSON:", e);
      return null;
    }
  }

  async function safeText(res: Response) {
    try {
      return await res.text();
    } catch {
      return String(res.statusText || "no body");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow my-6">
      <h3 className="text-lg font-semibold mb-3">Create product (test)</h3>

      <label className="block mb-2">
        <span className="text-sm">Title</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full border rounded px-3 py-2" />
      </label>

      <label className="block mb-2">
        <span className="text-sm">Price</span>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))} required className="mt-1 block w-full border rounded px-3 py-2" />
      </label>

      <label className="block mb-2">
        <span className="text-sm">Image file</span>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mt-1 block w-full" />
      </label>

      <label className="block mb-2">
        <span className="text-sm">Category</span>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2">
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        <span className="text-sm">Description</span>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
      </label>

      <div className="flex items-center gap-3">
        <button type="submit" className="px-4 py-2 bg-amber-700 text-white rounded">Create</button>
        <div className="text-sm text-gray-600">{status}</div>
      </div>
    </form>
  );
}


