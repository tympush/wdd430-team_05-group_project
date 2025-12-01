// app/sellers/[id]/page.tsx
"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CollectionCard from "../../components/CollectionCard";
import StoryCircle from "../../components/StoryCircle";
import StoryViewer from "../../components/StoryViewer";
import ProductCard from "../../components/ProductCard";
import Image from "next/image";
import { Collection, Story } from "../../types";

// Mock seller data - replace with API call based on params.id
const mockSeller = {
  id: "seller1",
  name: "Emma Potter",
  bio: "Ceramic artist specializing in hand-thrown pottery. I create functional art pieces inspired by nature and traditional techniques. Each piece is unique and made with sustainable local materials.",
  avatar: "/images/seller-emma.jpg",
  coverImage: "/images/seller-cover.jpg",
  location: "Portland, Oregon",
  joinedDate: new Date("2024-03-15"),
  collections: [
    {
      id: "1",
      title: "Rustic Ceramics",
      description: "Hand-thrown pottery pieces inspired by traditional techniques.",
      coverImage: "/images/collection-ceramics.jpg",
      sellerId: "seller1",
      sellerName: "Emma Potter",
      products: [
        { id: "p1", title: "Mug", price: 28, sellerId: "seller1" },
        { id: "p2", title: "Bowl", price: 65, sellerId: "seller1" },
      ],
      createdAt: new Date("2025-11-15"),
      updatedAt: new Date("2025-11-15"),
      tags: ["Pottery", "Handmade"],
    },
  ] as Collection[],
  stories: [
    {
      id: "1",
      sellerId: "seller1",
      sellerName: "Emma Potter",
      sellerAvatar: "/images/seller-emma.jpg",
      createdAt: new Date("2025-11-28"),
      slides: [
        {
          id: "s1",
          type: "image" as const,
          mediaUrl: "/images/story-clay.jpg",
          caption: "Starting the day at the wheel 🏺",
          duration: 5,
        },
      ],
    },
  ] as Story[],
  featuredProducts: [
    {
      id: "p1",
      title: "Hand-thrown Mug",
      price: 28,
      image: "/images/mug.jpg",
    },
    {
      id: "p2",
      title: "Ceramic Bowl Set",
      price: 65,
      image: "/images/bowls.jpg",
    },
    {
      id: "p3",
      title: "Rustic Vase",
      price: 45,
      image: "/images/vase.jpg",
    },
  ],
};

export default function SellerProfilePage() {
  const params = useParams();
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(
    null
  );

  return (
    <>
      <Navbar />
      <main className="mt-16 min-h-screen bg-white">
        {/* Cover Image */}
        <section className="relative h-64 sm:h-80 bg-gray-200">
          {mockSeller.coverImage && (
            <Image
              src={mockSeller.coverImage}
              alt={`${mockSeller.name} cover`}
              fill
              className="object-cover"
            />
          )}
        </section>

        {/* Profile Info */}
        <section className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 -mt-16 sm:-mt-20">
            {/* Avatar */}
            <div className="relative">
              {mockSeller.avatar ? (
                <Image
                  src={mockSeller.avatar}
                  alt={mockSeller.name}
                  width={160}
                  height={160}
                  className="rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <div
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-4xl font-bold"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {mockSeller.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Name and Bio */}
            <div className="flex-1 pb-6">
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: "var(--color-primary)" }}
              >
                {mockSeller.name}
              </h1>
              <p className="text-gray-600 mb-2">
                📍 {mockSeller.location} · Joined{" "}
                {mockSeller.joinedDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-gray-700 max-w-3xl">{mockSeller.bio}</p>
            </div>

            {/* Follow Button */}
            <button
              className="px-6 py-3 rounded-lg font-semibold text-white transition-colors"
              style={{ backgroundColor: "var(--color-primary)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-primary)";
              }}
            >
              Follow
            </button>
          </div>
        </section>

        {/* Stories */}
        {mockSeller.stories.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8 border-b">
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: "var(--color-dark)" }}
            >
              Stories
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {mockSeller.stories.map((story, index) => (
                <StoryCircle
                  key={story.id}
                  story={story}
                  onClick={() => setSelectedStoryIndex(index)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Collections */}
        {mockSeller.collections.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <h2
              className="text-2xl font-semibold mb-6"
              style={{ color: "var(--color-dark)" }}
            >
              Collections
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockSeller.collections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          </section>
        )}

        {/* Featured Products */}
        <section
          className="py-12"
          style={{ backgroundColor: "var(--color-light)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2
              className="text-2xl font-semibold mb-6"
              style={{ color: "var(--color-dark)" }}
            >
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockSeller.featuredProducts.map((product) => (
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

      {/* Story Viewer */}
      {selectedStoryIndex !== null && (
        <StoryViewer
          story={mockSeller.stories[selectedStoryIndex]}
          onClose={() => setSelectedStoryIndex(null)}
          onNext={() => {
            if (selectedStoryIndex < mockSeller.stories.length - 1) {
              setSelectedStoryIndex(selectedStoryIndex + 1);
            } else {
              setSelectedStoryIndex(null);
            }
          }}
          onPrevious={() => {
            if (selectedStoryIndex > 0) {
              setSelectedStoryIndex(selectedStoryIndex - 1);
            }
          }}
        />
      )}
    </>
  );
}
