"use client";

import React, { useState } from 'react';
import Image from 'next/image';

type Props = {
  product: { _id: string; title: string; price: number; image?: string | null };
  user: { name?: string | null; email?: string | null };
};

export default function BuyClient({ product, user }: Props) {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address) return alert('Please enter a shipping address');
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id, address }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || json?.message || 'Order failed');

      setOrderNumber(json.order?.orderNumber ?? null);
    } catch (err: any) {
      console.error('Order error', err);
      alert('Order failed: ' + (err?.message || 'unknown'));
    } finally {
      setLoading(false);
    }
  }

  if (orderNumber) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Thank you for your purchase!</h2>
        <p className="mb-2">Order number: <span className="font-mono">{orderNumber}</span></p>
        <p className="text-sm text-gray-600">This confirmation will remain until you leave this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex gap-4 mb-4">
        <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
          {product.image ? (
            <Image src={product.image} alt={product.title} width={96} height={96} className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">No image</div>
          )}
        </div>
        <div>
          <h3 className="font-semibold">{product.title}</h3>
          <div className="text-amber-700 font-bold">${product.price}</div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          <span className="text-sm text-gray-600">Name</span>
          <input value={user.name ?? ''} readOnly className="mt-1 block w-full border rounded px-3 py-2 bg-gray-50" />
        </label>

        <label className="block mb-2">
          <span className="text-sm text-gray-600">Email</span>
          <input value={user.email ?? ''} readOnly className="mt-1 block w-full border rounded px-3 py-2 bg-gray-50" />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-gray-600">Shipping address</span>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} required className="mt-1 block w-full border rounded px-3 py-2" placeholder="Street, City, State, ZIP" />
        </label>

        <div className="flex items-center gap-3">
          <button type="submit" className="px-4 py-2 bg-amber-700 text-white rounded" disabled={loading}>
            {loading ? 'Placing order...' : `Place order for $${product.price}`}
          </button>
        </div>
      </form>
    </div>
  );
}
