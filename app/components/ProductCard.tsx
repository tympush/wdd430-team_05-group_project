// app/components/ProductCard.tsx
"use client";
import React from "react";
import Image from "next/image";

type Props = {
  title: string;
  price: number;
  image?: string | null;
};

const ProductCard: React.FC<Props> = ({ title, price, image }) => {
  return (
    <article className="rounded-2xl shadow-sm border overflow-hidden flex flex-col" style={{ backgroundColor: "var(--color-light)" }}>
      <div className="relative w-full h-48 sm:h-56 md:h-64" style={{ backgroundColor: "var(--color-light)" }}>
        <Image
          src={image ?? "/product-mug.png"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-medium text-sm sm:text-base" style={{ color: "var(--color-dark)" }}>{title}</h4>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold" style={{ color: "var(--color-dark)" }}>${price}</span>
          <button
            className="px-3 py-1 rounded-md text-sm transition"
            style={{ backgroundColor: "var(--color-primary)", color: "var(--color-light)" }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            View
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;


