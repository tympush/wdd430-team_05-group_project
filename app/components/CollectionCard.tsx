// app/components/CollectionCard.tsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Collection } from "../types";

type Props = {
  collection: Collection;
};

const CollectionCard: React.FC<Props> = ({ collection }) => {
  return (
    <Link href={`/collections/${collection.id}`}>
      <article className="bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className="relative w-full h-64 bg-gray-100">
          {collection.coverImage ? (
            <Image
              src={collection.coverImage}
              alt={collection.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No image
            </div>
          )}
          {/* Product count badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
            {collection.products.length} items
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            {collection.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {collection.description}
          </p>

          {/* Seller info */}
          <div className="mt-auto flex items-center gap-3">
            {collection.sellerAvatar ? (
              <Image
                src={collection.sellerAvatar}
                alt={collection.sellerName}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                {collection.sellerName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-800">
                {collection.sellerName}
              </p>
              {collection.tags && collection.tags.length > 0 && (
                <p className="text-xs text-gray-500">
                  {collection.tags.slice(0, 2).join(" · ")}
                </p>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CollectionCard;
