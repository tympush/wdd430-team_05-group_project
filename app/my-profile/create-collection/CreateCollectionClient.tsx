'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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

export default function CreateCollectionClient({ products, sellerName }: Props) {
  const [collectionName, setCollectionName] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleProductToggle = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!collectionName.trim()) {
      setError('Collection name is required');
      return;
    }

    if (selectedProducts.length === 0) {
      setError('Please select at least one product');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: collectionName.trim(),
          productIds: selectedProducts,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create collection');
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
        <label className="block text-sm font-medium mb-2">Collection Name</label>
        <input
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          placeholder="e.g., Summer Collection"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-4">Select Products</label>
        {products.length === 0 ? (
          <p className="text-gray-500">You haven't created any products yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-amber-300 cursor-pointer"
                onClick={() => handleProductToggle(product._id)}
              >
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product._id)}
                  onChange={() => handleProductToggle(product._id)}
                  className="mt-1 cursor-pointer"
                />
                <div className="flex-1">
                  <p className="font-medium">{product.title}</p>
                  <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="text-sm text-gray-500 mt-2">
          {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 disabled:bg-gray-400"
        >
          {loading ? 'Creating...' : 'Create Collection'}
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
