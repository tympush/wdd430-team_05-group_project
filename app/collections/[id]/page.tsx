// app/collections/[id]/page.tsx
"use client";
import React from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import Image from "next/image";
import Link from "next/link";

// Mock data - replace with API call based on params.id
const mockCollectionDetail = {
  id: "1",
  title: "Rustic Ceramics",
  description:
    "Hand-thrown pottery pieces inspired by traditional techniques and natural earth tones. Each piece is unique and crafted with care over several weeks.",
  coverImage: "/images/collection-ceramics.jpg",
  sellerId: "seller1",
  sellerName: "Emma Potter",
  sellerAvatar: "/images/seller-emma.jpg",
  products: [
    {
      id: "p1",
      title: "Hand-thrown Mug",
      price: 28,
      image: "/images/mug.jpg",
      sellerId: "seller1",
    },
    {
      id: "p2",
      title: "Ceramic Bowl Set",
      price: 65,
      image: "/images/bowls.jpg",
      sellerId: "seller1",
    },
    {
      id: "p3",
      title: "Rustic Vase",
      price: 45,
      image: "/images/vase.jpg",
      sellerId: "seller1",
    },
    {
      id: "p4",
      title: "Decorative Plate",
      price: 38,
      image: "/images/plate.jpg",
      sellerId: "seller1",
    },
    {
      id: "p5",
      title: "Tea Set",
      price: 95,
      image: "/images/teaset.jpg",
      sellerId: "seller1",
    },
    {
      id: "p6",
      title: "Planter Pot",
      price: 32,
      image: "/images/planter.jpg",
      sellerId: "seller1",
    },
  ],
  createdAt: new Date("2025-11-15"),
  updatedAt: new Date("2025-11-15"),
  tags: ["Pottery", "Handmade", "Ceramic", "Sustainable"],
  story:
    "This collection represents my journey into traditional pottery. Each piece is crafted using clay sourced from local deposits and fired in a wood-burning kiln.",
};

export default function CollectionDetailPage() {
  const params = useParams();

  return (
    <>
      <Navbar />
      <main className="mt-16 min-h-screen bg-white">
        {/* Collection Header */}
        <section
          className="relative h-96"
          style={{ backgroundColor: "var(--color-light)" }}
        >
          {mockCollectionDetail.coverImage && (
            <div className="absolute inset-0">
              <Image
                src={mockCollectionDetail.coverImage}
                alt={mockCollectionDetail.title}
                fill
                className="object-cover opacity-40"
              />
            </div>
          )}
          <div className="relative z-10 h-full flex items-center justify-center px-6">
            <div className="max-w-4xl text-center">
              <h1
                className="text-5xl font-bold mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                {mockCollectionDetail.title}
              </h1>
              <p
                className="text-xl mb-6"
                style={{ color: "var(--color-dark)" }}
              >
                {mockCollectionDetail.description}
              </p>
              <div className="flex items-center justify-center gap-4">
                {mockCollectionDetail.sellerAvatar ? (
                  <Image
                    src={mockCollectionDetail.sellerAvatar}
                    alt={mockCollectionDetail.sellerName}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-semibold"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    {mockCollectionDetail.sellerName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-left">
                  <Link
                    href={`/sellers/${mockCollectionDetail.sellerId}`}
                    className="font-semibold hover:underline"
                    style={{ color: "var(--color-dark)" }}
                  >
                    {mockCollectionDetail.sellerName}
                  </Link>
                  <p className="text-sm" style={{ color: "var(--color-dark)" }}>
                    {mockCollectionDetail.products.length} items in this collection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collection Story */}
        {mockCollectionDetail.story && (
          <section className="py-12" style={{ backgroundColor: "var(--color-light)" }}>
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                The Story Behind This Collection
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--color-dark)" }}>
                {mockCollectionDetail.story}
              </p>
              {mockCollectionDetail.tags && mockCollectionDetail.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {mockCollectionDetail.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: "var(--color-accent-2)",
                        color: "var(--color-dark)",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Products Grid */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2
              className="text-2xl font-semibold mb-8"
              style={{ color: "var(--color-dark)" }}
            >
              Items in This Collection
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockCollectionDetail.products.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
