// app/collections/page.tsx
"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CollectionCard from "../components/CollectionCard";
import { Collection } from "../types";

// Mock data - replace with API call
const mockCollections: Collection[] = [
  {
    id: "1",
    title: "Rustic Ceramics",
    description: "Hand-thrown pottery pieces inspired by traditional techniques and natural earth tones.",
    coverImage: "/images/collection-ceramics.jpg",
    sellerId: "seller1",
    sellerName: "Emma Potter",
    sellerAvatar: "/images/seller-emma.jpg",
    products: [
      { id: "p1", title: "Clay Mug", price: 28, sellerId: "seller1" },
      { id: "p2", title: "Bowl Set", price: 65, sellerId: "seller1" },
      { id: "p3", title: "Vase", price: 45, sellerId: "seller1" },
    ],
    createdAt: new Date("2025-11-15"),
    updatedAt: new Date("2025-11-15"),
    tags: ["Pottery", "Handmade", "Ceramic"],
  },
  {
    id: "2",
    title: "Woven Wonders",
    description: "Contemporary textile art using sustainable materials and traditional weaving methods.",
    coverImage: "/images/collection-textiles.jpg",
    sellerId: "seller2",
    sellerName: "Maya Weaver",
    sellerAvatar: "/images/seller-maya.jpg",
    products: [
      { id: "p4", title: "Wall Hanging", price: 75, sellerId: "seller2" },
      { id: "p5", title: "Basket", price: 42, sellerId: "seller2" },
    ],
    createdAt: new Date("2025-11-10"),
    updatedAt: new Date("2025-11-10"),
    tags: ["Textiles", "Weaving", "Sustainable"],
  },
  {
    id: "3",
    title: "Silver Stories",
    description: "Unique silver jewelry pieces, each with its own narrative and handcrafted detail.",
    coverImage: "/images/collection-jewelry.jpg",
    sellerId: "seller3",
    sellerName: "Alex Silversmith",
    products: [
      { id: "p6", title: "Silver Pendant", price: 52, sellerId: "seller3" },
      { id: "p7", title: "Ring", price: 68, sellerId: "seller3" },
      { id: "p8", title: "Earrings", price: 38, sellerId: "seller3" },
      { id: "p9", title: "Bracelet", price: 82, sellerId: "seller3" },
    ],
    createdAt: new Date("2025-11-20"),
    updatedAt: new Date("2025-11-20"),
    tags: ["Jewelry", "Silver", "Handcrafted"],
  },
];

export default function CollectionsPage() {
  return (
    <>
      <Navbar />
      <main className="mt-16 min-h-screen">
        {/* Hero Section */}
        <section
          className="py-16 text-center"
          style={{ backgroundColor: "var(--color-light)" }}
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h1
              className="text-5xl font-bold mb-4"
              style={{ color: "var(--color-primary)" }}
            >
              Artisan Collections
            </h1>
            <p className="text-xl" style={{ color: "var(--color-dark)" }}>
              Discover curated collections from talented artisans around the world.
              Each collection tells a unique story through handcrafted pieces.
            </p>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-2xl font-semibold"
                style={{ color: "var(--color-dark)" }}
              >
                Featured Collections
              </h2>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-lg border transition-colors"
                  style={{
                    borderColor: "var(--color-primary)",
                    color: "var(--color-primary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-primary)";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--color-primary)";
                  }}
                >
                  All
                </button>
                <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                  Pottery
                </button>
                <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                  Textiles
                </button>
                <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                  Jewelry
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockCollections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
