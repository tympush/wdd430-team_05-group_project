// app/page.tsx
"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import ProductCard from "./components/ProductCard";
import CollectionCard from "./components/CollectionCard";
import StoryCircle from "./components/StoryCircle";
import StoryViewer from "./components/StoryViewer";
import Footer from "./components/Footer";
import Link from "next/link";
import { Collection, Story } from "./types";

// Mock data for featured stories
const featuredStories: Story[] = [
  {
    id: "1",
    sellerId: "seller1",
    sellerName: "Emma Potter",
    sellerAvatar: "/images/seller-emma.jpg",
    createdAt: new Date("2025-11-28"),
    slides: [
      {
        id: "s1",
        type: "image",
        mediaUrl: "/images/story-clay.jpg",
        caption: "Starting the day at the wheel 🏺",
        duration: 5,
      },
    ],
  },
  {
    id: "2",
    sellerId: "seller2",
    sellerName: "Maya Weaver",
    sellerAvatar: "/images/seller-maya.jpg",
    createdAt: new Date("2025-11-27"),
    slides: [
      {
        id: "s4",
        type: "image",
        mediaUrl: "/images/story-loom.jpg",
        caption: "Working on a new wall hanging 🧵",
        duration: 5,
      },
    ],
  },
  {
    id: "3",
    sellerId: "seller3",
    sellerName: "Alex Silversmith",
    createdAt: new Date("2025-11-26"),
    slides: [
      {
        id: "s6",
        type: "image",
        mediaUrl: "/images/story-silver.jpg",
        caption: "Crafting a new pendant design ✨",
        duration: 5,
      },
    ],
  },
];

// Mock data for featured collections
const featuredCollections: Collection[] = [
  {
    id: "1",
    title: "Rustic Ceramics",
    description: "Hand-thrown pottery pieces inspired by traditional techniques.",
    coverImage: "/images/collection-ceramics.jpg",
    sellerId: "seller1",
    sellerName: "Emma Potter",
    sellerAvatar: "/images/seller-emma.jpg",
    products: [
      { id: "p1", title: "Mug", price: 28, sellerId: "seller1" },
      { id: "p2", title: "Bowl", price: 65, sellerId: "seller1" },
    ],
    createdAt: new Date("2025-11-15"),
    updatedAt: new Date("2025-11-15"),
    tags: ["Pottery", "Handmade"],
  },
  {
    id: "2",
    title: "Woven Wonders",
    description: "Contemporary textile art using sustainable materials.",
    coverImage: "/images/collection-textiles.jpg",
    sellerId: "seller2",
    sellerName: "Maya Weaver",
    sellerAvatar: "/images/seller-maya.jpg",
    products: [
      { id: "p4", title: "Wall Hanging", price: 75, sellerId: "seller2" },
    ],
    createdAt: new Date("2025-11-10"),
    updatedAt: new Date("2025-11-10"),
    tags: ["Textiles", "Weaving"],
  },
  {
    id: "3",
    title: "Silver Stories",
    description: "Unique silver jewelry pieces with handcrafted detail.",
    coverImage: "/images/collection-jewelry.jpg",
    sellerId: "seller3",
    sellerName: "Alex Silversmith",
    products: [
      { id: "p6", title: "Silver Pendant", price: 52, sellerId: "seller3" },
    ],
    createdAt: new Date("2025-11-20"),
    updatedAt: new Date("2025-11-20"),
    tags: ["Jewelry", "Silver"],
  },
];

export default function Page() {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(
    null
  );

  return (
    <>
      <Navbar />
      <main className="mt-16">
        <Hero />
        <Features />

        {/* Stories Section */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-semibold"
                style={{ color: "var(--color-dark)" }}
              >
                Artisan Stories
              </h2>
              <Link
                href="/stories"
                className="text-sm font-medium hover:underline"
                style={{ color: "var(--color-primary)" }}
              >
                View all →
              </Link>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {featuredStories.map((story, index) => (
                <StoryCircle
                  key={story.id}
                  story={story}
                  onClick={() => setSelectedStoryIndex(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Collections Section */}
        <section
          className="py-12"
          style={{ backgroundColor: "var(--color-light)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-semibold"
                style={{ color: "var(--color-dark)" }}
              >
                Featured Collections
              </h2>
              <Link
                href="/collections"
                className="text-sm font-medium hover:underline"
                style={{ color: "var(--color-primary)" }}
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCollections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2
              className="text-2xl font-semibold mb-6"
              style={{ color: "var(--color-dark)" }}
            >
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <ProductCard title="Hand-thrown Mug" price={28} />
              <ProductCard title="Woven Wall Hanging" price={75} />
              <ProductCard title="Silver Pendant" price={52} />
            </div>
          </div>
        </section>

        <Footer />
      </main>

      {/* Story Viewer Modal */}
      {selectedStoryIndex !== null && (
        <StoryViewer
          story={featuredStories[selectedStoryIndex]}
          onClose={() => setSelectedStoryIndex(null)}
          onNext={() => {
            if (selectedStoryIndex < featuredStories.length - 1) {
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


