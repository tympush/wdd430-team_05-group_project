'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type Product = {
  _id: string;
  title: string;
  price: number;
  image?: string;
};

type Props = {
  products: Product[];
  sellerName: string;
};

export default function CreateStoryClient({ products, sellerName }: Props) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!text.trim()) {
      setError('Story text is required');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          text: text.trim(),
          productId: selectedProduct || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create story');
      }

      router.push('/my-profile');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Story Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., How I Started My Craft"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Story Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your story here..."
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-4">Featured Product (Optional)</label>
        {products.length === 0 ? (
          <p className="text-gray-500">You haven't created any products yet.</p>
        ) : (
          <div className="space-y-2">
            <label
              htmlFor="product-none"
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer select-none ${
                selectedProduct === null ? 'border-amber-300 bg-amber-50' : 'border-gray-200 hover:border-amber-300'
              }`}
            >
              <input
                id="product-none"
                type="radio"
                name="product"
                checked={selectedProduct === null}
                onChange={() => setSelectedProduct(null)}
                className="cursor-pointer"
              />
              <span className="text-gray-600">No product</span>
            </label>

            {products.map((product) => {
              const id = `story-product-${product._id}`;
              return (
                <label
                  key={product._id}
                  htmlFor={id}
                  className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer select-none ${
                    selectedProduct === product._id ? 'border-amber-300 bg-amber-50' : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <input
                    id={id}
                    type="radio"
                    name="product"
                    checked={selectedProduct === product._id}
                    onChange={() => setSelectedProduct(product._id)}
                    className="mt-1 cursor-pointer"
                  />

                  {product.image ? (
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image src={product.image} alt={product.title} width={80} height={80} className="object-cover rounded" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400">No image</div>
                  )}

                  <div className="flex-1">
                    <p className="font-medium">{product.title}</p>
                    <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 disabled:bg-gray-400"
        >
          {loading ? 'Creating...' : 'Create Story'}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
