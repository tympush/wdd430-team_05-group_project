// app/dashboard/page.tsx
"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CollectionCard from "../components/CollectionCard";
import Image from "next/image";
import { Collection } from "../types";

// Mock seller dashboard data
const mockDashboardData = {
  seller: {
    id: "seller1",
    name: "Emma Potter",
    avatar: "/images/seller-emma.jpg",
  },
  collections: [
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
  ] as Collection[],
  stats: {
    totalCollections: 3,
    totalStories: 5,
    totalViews: 1240,
    totalFollowers: 156,
  },
};

export default function DashboardPage() {
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [showStoryForm, setShowStoryForm] = useState(false);

  return (
    <>
      <Navbar />
      <main className="mt-16 min-h-screen bg-white">
        {/* Dashboard Header */}
        <section
          className="py-12"
          style={{ backgroundColor: "var(--color-light)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {mockDashboardData.seller.avatar ? (
                  <Image
                    src={mockDashboardData.seller.avatar}
                    alt={mockDashboardData.seller.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    {mockDashboardData.seller.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h1
                    className="text-3xl font-bold"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Welcome, {mockDashboardData.seller.name}
                  </h1>
                  <p className="text-gray-600">
                    Manage your collections and stories
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCollectionForm(true)}
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
                  + Create Collection
                </button>
                <button
                  onClick={() => setShowStoryForm(true)}
                  className="px-6 py-3 rounded-lg font-semibold border-2 transition-colors"
                  style={{
                    borderColor: "var(--color-primary)",
                    color: "var(--color-primary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-primary)";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--color-primary)";
                  }}
                >
                  + Add Story
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 border-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p
                  className="text-3xl font-bold mb-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  {mockDashboardData.stats.totalCollections}
                </p>
                <p className="text-gray-600">Collections</p>
              </div>
              <div className="text-center">
                <p
                  className="text-3xl font-bold mb-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  {mockDashboardData.stats.totalStories}
                </p>
                <p className="text-gray-600">Stories</p>
              </div>
              <div className="text-center">
                <p
                  className="text-3xl font-bold mb-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  {mockDashboardData.stats.totalViews.toLocaleString()}
                </p>
                <p className="text-gray-600">Total Views</p>
              </div>
              <div className="text-center">
                <p
                  className="text-3xl font-bold mb-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  {mockDashboardData.stats.totalFollowers}
                </p>
                <p className="text-gray-600">Followers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Collections Management */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2
              className="text-2xl font-semibold mb-6"
              style={{ color: "var(--color-dark)" }}
            >
              Your Collections
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDashboardData.collections.map((collection) => (
                <div key={collection.id} className="relative group">
                  <CollectionCard collection={collection} />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              {/* Empty state or add new card */}
              {mockDashboardData.collections.length === 0 && (
                <div
                  className="border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer hover:border-gray-400 transition"
                  onClick={() => setShowCollectionForm(true)}
                >
                  <p className="text-gray-500 mb-2">No collections yet</p>
                  <p className="text-sm text-gray-400">
                    Click to create your first collection
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Stories Management Preview */}
        <section
          className="py-12"
          style={{ backgroundColor: "var(--color-light)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2
              className="text-2xl font-semibold mb-6"
              style={{ color: "var(--color-dark)" }}
            >
              Your Stories
            </h2>
            <p className="text-gray-600 mb-4">
              Share your creative process and new products through stories.
              Stories are visible for 24 hours.
            </p>
            <button
              onClick={() => setShowStoryForm(true)}
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
              + Add New Story
            </button>
          </div>
        </section>

        <Footer />
      </main>

      {/* Collection Form Modal - TODO: Implement full form */}
      {showCollectionForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                Create New Collection
              </h2>
              <button
                onClick={() => setShowCollectionForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Collection creation form coming soon! This will allow you to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Add a collection title and description</li>
              <li>Upload a cover image</li>
              <li>Select products to include</li>
              <li>Add tags and categories</li>
            </ul>
          </div>
        </div>
      )}

      {/* Story Form Modal - TODO: Implement full form */}
      {showStoryForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-2xl font-bold"
                style={{ color: "var(--color-primary)" }}
              >
                Add New Story
              </h2>
              <button
                onClick={() => setShowStoryForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Story creation form coming soon! This will allow you to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Upload images or short videos</li>
              <li>Add captions and text overlays</li>
              <li>Link products in your stories</li>
              <li>Set display duration for each slide</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
