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
    <form onSubmit={handleSubmit} className="bg-[#F5EFE6] rounded-lg shadow-md p-6 border border-[#C67C48]">
      {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-[#3E3E3E]">Collection Name</label>
        <input
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          placeholder="e.g., Summer Collection"
          className="w-full px-4 py-2 border border-[#C67C48] rounded-lg focus:ring-2 focus:ring-[#E0B251] focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-4 text-[#3E3E3E]">Select Products</label>
        {products.length === 0 ? (
          <p className="text-[#6E6E6E]">You haven't created any products yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => {
              const id = `product-${product._id}`;
              return (
                <label
                  key={product._id}
                  htmlFor={id}
                  className={`flex items-start gap-3 p-3 border rounded-lg hover:border-[#C67C48] cursor-pointer select-none ${
                    selectedProducts.includes(product._id) ? 'border-[#C67C48] bg-[#FFF8F0]' : 'border-[#D4C4B0]'
                  }`}
                >
                  <input
                    id={id}
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => handleProductToggle(product._id)}
                    className="mt-1 cursor-pointer h-4 w-4 accent-[#C67C48]"
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
        <p className="text-sm text-[#6E6E6E] mt-2">
          {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[#C67C48] text-white py-2 rounded-lg hover:bg-[#A65829] disabled:bg-gray-400"
        >
          {loading ? 'Creating...' : 'Create Collection'}
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
