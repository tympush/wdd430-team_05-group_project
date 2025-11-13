// app/components/ProductCard.tsx
"use client";
import React from "react";
import Image from "next/image";

type Props = {
  title: string;
  price: number;
  image?: string;
};

const ProductCard: React.FC<Props> = ({ title, price, image = "/product-mug.png" }) => {
  return (
    <article className="bg-white rounded-2xl shadow-sm border overflow-hidden mb-50">
      <div className="relative h-56 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-gray-800">${price}</span>
          <button className="px-3 py-1 rounded-md text-sm bg-amber-700 text-white hover:brightness-95">
            View
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

