"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = { title: string; price: number; image?: string | null; productId?: string };

const ProductCard: React.FC<Props> = ({ title, price, image, productId }) => {
  const sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  const card = (
    <article className="bg-[#F5EFE6] rounded-2xl shadow-sm border border-[#C67C48] overflow-hidden flex flex-col h-full">
      <div className="relative w-full aspect-4/3 bg-gray-100">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover" sizes={sizes} priority={false} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">No image</div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-medium text-[#3E3E3E] text-sm sm:text-base">{title}</h4>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-[#C67C48]">${price}</span>
          <span className="px-3 py-1 rounded-md text-sm bg-[#C67C48] text-white">View</span>
        </div>
      </div>
    </article>
  );

  if (productId) {
    return (
      <Link href={`/product/${productId}`} className="block h-full">
        {card}
      </Link>
    );
  }

  return card;
};

export default ProductCard;




