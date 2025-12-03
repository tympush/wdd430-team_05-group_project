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
    <form onSubmit={handleSubmit} className="bg-[#F5EFE6] rounded-lg shadow-md p-6 border border-[#C67C48]">
      {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-[#3E3E3E]">Story Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., How I Started My Craft"
          className="w-full px-4 py-2 border border-[#C67C48] rounded-lg focus:ring-2 focus:ring-[#E0B251] focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-[#3E3E3E]">Story Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your story here..."
          rows={8}
          className="w-full px-4 py-2 border border-[#C67C48] rounded-lg focus:ring-2 focus:ring-[#E0B251] focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-4 text-[#3E3E3E]">Featured Product (Optional)</label>
        {products.length === 0 ? (
          <p className="text-[#6E6E6E]">You haven't created any products yet.</p>
        ) : (
          <div className="space-y-2">
            <label
              htmlFor="product-none"
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer select-none ${
                selectedProduct === null ? 'border-[#C67C48] bg-[#FFF8F0]' : 'border-[#D4C4B0] hover:border-[#C67C48]'
              }`}
            >
              <input
                id="product-none"
                type="radio"
                name="product"
                checked={selectedProduct === null}
                onChange={() => setSelectedProduct(null)}
                className="cursor-pointer accent-[#C67C48]"
              />
              <span className="text-[#3E3E3E]">No product</span>
            </label>

            {products.map((product) => {
              const id = `story-product-${product._id}`;
              return (
                <label
                  key={product._id}
                  htmlFor={id}
                  className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer select-none ${
                    selectedProduct === product._id ? 'border-[#C67C48] bg-[#FFF8F0]' : 'border-[#D4C4B0] hover:border-[#C67C48]'
                  }`}
                >
                  <input
                    id={id}
                    type="radio"
                    name="product"
                    checked={selectedProduct === product._id}
                    onChange={() => setSelectedProduct(product._id)}
                    className="mt-1 cursor-pointer accent-[#C67C48]"
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
          className="flex-1 bg-[#C67C48] text-white py-2 rounded-lg hover:bg-[#A65829] disabled:bg-gray-400"
        >
          {loading ? 'Creating...' : 'Create Story'}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 border border-[#C67C48] text-[#C67C48] py-2 rounded-lg hover:bg-[#FFF8F0]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
