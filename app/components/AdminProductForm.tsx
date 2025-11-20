// app/components/AdminProductForm.tsx
"use client";
import React, { useState } from "react";

export default function AdminProductForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function uploadFile(fileToUpload: File) {
    const fd = new FormData();
    fd.append("file", fileToUpload);
    setStatus("uploading");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    if (!res.ok || !json?.ok) {
      throw new Error(json?.error || "Upload failed");
    }
    return json.url as string;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      let imageUrl: string | undefined;
      if (file) {
        try {
          imageUrl = await uploadFile(file);
        } catch (err: any) {
          setStatus("upload error: " + (err.message || "unknown"));
          return;
        }
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          price: typeof price === "number" ? price : Number(price),
          image: imageUrl,
          description,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("create error: " + (data?.error || "unknown"));
        return;
      }

      setStatus("saved");
      setTitle("");
      setPrice("");
      setFile(null);
      setDescription("");
    } catch (err: any) {
      setStatus("error: " + (err.message || "unknown"));
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

