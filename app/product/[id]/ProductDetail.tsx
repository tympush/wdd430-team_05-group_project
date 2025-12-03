"use client";

import React, { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import ReviewForm from "@/app/components/ReviewForm";
import ReviewList from "@/app/components/ReviewList";

type Product = {
  _id: string;
  title: string;
  price: number;
  image?: string | null;
  description: string;
  seller?: string | null;
  category?: string | null;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  const [reviewAdded, setReviewAdded] = useState(false);

  const handleReviewSubmitted = () => {
    setReviewAdded(!reviewAdded);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#F8F5F1] min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="relative w-full h-96 bg-white rounded-lg overflow-hidden border border-[#E0B251]">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">No image</div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-[#3E3E3E] mb-4">{product.title}</h1>

          <div className="mb-6">
            <span className="text-3xl font-bold text-[#C67C48]">${product.price}</span>
          </div>

          {product.category && (
            <div className="mb-3">
              <span className="text-sm text-[#6E6E6E]">Category: </span>
              <span className="text-sm font-medium text-[#3E3E3E]">{product.category}</span>
            </div>
          )}

          {product.seller && (
            <div className="mb-6">
              <span className="text-sm text-[#6E6E6E]">Seller: </span>
              <Link href={`/creators/${encodeURIComponent(product.seller)}`} className="text-sm font-medium text-[#3E3E3E] hover:underline">
                {product.seller}
              </Link>
            </div>
          )}

          <div className="border-t border-[#C67C48] pt-6">
            <h2 className="text-lg font-semibold text-[#3E3E3E] mb-3">Description</h2>
            <p className="text-[#3E3E3E] whitespace-pre-wrap">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-[#C67C48] pt-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#3E3E3E] mb-6">Reviews</h2>
          <ReviewForm productId={product._id} onReviewSubmitted={handleReviewSubmitted} />
        </div>

        <ReviewList productId={product._id} refreshKey={reviewAdded} />
      </div>
    </div>
  );
}
