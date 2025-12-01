// app/stories/page.tsx
"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StoryCircle from "../components/StoryCircle";
import StoryViewer from "../components/StoryViewer";
import { Story } from "../types";

// Mock data - replace with API call
const mockStories: Story[] = [
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
      {
        id: "s2",
        type: "image",
        mediaUrl: "/images/story-shaping.jpg",
        caption: "Shaping a new collection piece",
        duration: 5,
        productLink: {
          productId: "p1",
          productName: "Hand-thrown Mug",
        },
      },
      {
        id: "s3",
        type: "image",
        mediaUrl: "/images/story-kiln.jpg",
        caption: "Ready for the kiln! 🔥",
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
      {
        id: "s5",
        type: "image",
        mediaUrl: "/images/story-weaving.jpg",
        caption: "Using natural dyes for this project",
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
        productLink: {
          productId: "p6",
          productName: "Silver Pendant",
        },
      },
    ],
  },
];

export default function StoriesPage() {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(
    null
  );

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index);
  };

  const handleCloseStory = () => {
    setSelectedStoryIndex(null);
  };

  const handleNextStory = () => {
    if (
      selectedStoryIndex !== null &&
      selectedStoryIndex < mockStories.length - 1
    ) {
      setSelectedStoryIndex(selectedStoryIndex + 1);
    } else {
      setSelectedStoryIndex(null);
    }
  };

  const handlePreviousStory = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex > 0) {
      setSelectedStoryIndex(selectedStoryIndex - 1);
    }
  };

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
              Artisan Stories
            </h1>
            <p className="text-xl" style={{ color: "var(--color-dark)" }}>
              Follow the creative journey of talented artisans. Watch their
              stories to see behind-the-scenes moments and new creations.
            </p>
          </div>
        </section>

        {/* Stories Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2
              className="text-2xl font-semibold mb-8"
              style={{ color: "var(--color-dark)" }}
            >
              Active Stories
            </h2>

            {/* Stories horizontal scroll */}
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {mockStories.map((story, index) => (
                <StoryCircle
                  key={story.id}
                  story={story}
                  onClick={() => handleStoryClick(index)}
                />
              ))}
            </div>

            {/* Info section */}
            <div
              className="mt-12 p-8 rounded-xl"
              style={{ backgroundColor: "var(--color-light)" }}
            >
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "var(--color-primary)" }}
              >
                What are Artisan Stories?
              </h3>
              <p className="mb-4" style={{ color: "var(--color-dark)" }}>
                Stories let artisans share their creative process, showcase new
                products, and connect with buyers in an authentic way. Each
                story consists of images or short videos that disappear after 24
                hours.
              </p>
              <ul
                className="space-y-2 list-disc list-inside"
                style={{ color: "var(--color-dark)" }}
              >
                <li>See behind-the-scenes of the creative process</li>
                <li>Discover new products as they're being made</li>
                <li>Connect directly with featured products</li>
                <li>Follow your favorite artisans</li>
              </ul>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      {/* Story Viewer Modal */}
      {selectedStoryIndex !== null && (
        <StoryViewer
          story={mockStories[selectedStoryIndex]}
          onClose={handleCloseStory}
          onNext={handleNextStory}
          onPrevious={handlePreviousStory}
        />
      )}
    </>
  );
}
