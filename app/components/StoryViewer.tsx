// app/components/StoryViewer.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Story } from "../types";

type Props = {
  story: Story;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
};

const StoryViewer: React.FC<Props> = ({ story, onClose, onNext, onPrevious }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const currentSlide = story.slides[currentSlideIndex];
  const duration = currentSlide.duration || 5; // Default 5 seconds

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          handleNext();
          return 0;
        }
        return prev + (100 / (duration * 10));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentSlideIndex, duration]);

  const handleNext = () => {
    if (currentSlideIndex < story.slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else if (onNext) {
      onNext();
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    } else if (onPrevious) {
      onPrevious();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition"
        aria-label="Close story"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
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

      {/* Navigation buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 z-40 text-white hover:text-gray-300 transition"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 z-40 text-white hover:text-gray-300 transition"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Story content */}
      <div className="relative w-full max-w-md h-full max-h-[90vh] bg-black rounded-lg overflow-hidden">
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-30 flex gap-1 p-2">
          {story.slides.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-100"
                style={{
                  width: `${
                    index < currentSlideIndex
                      ? 100
                      : index === currentSlideIndex
                      ? progress
                      : 0
                  }%`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Seller info */}
        <div className="absolute top-4 left-4 right-4 z-30 flex items-center gap-3">
          {story.sellerAvatar ? (
            <Image
              src={story.sellerAvatar}
              alt={story.sellerName}
              width={40}
              height={40}
              className="rounded-full border-2 border-white"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-semibold border-2 border-white">
              {story.sellerName.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-white font-semibold text-sm">
              {story.sellerName}
            </p>
            <p className="text-white/80 text-xs">
              {new Date(story.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Slide media */}
        <div className="relative w-full h-full">
          {currentSlide.type === "image" && (
            <Image
              src={currentSlide.mediaUrl}
              alt={currentSlide.caption || "Story slide"}
              fill
              className="object-contain"
              priority
            />
          )}
          {currentSlide.type === "video" && (
            <video
              src={currentSlide.mediaUrl}
              className="w-full h-full object-contain"
              autoPlay
              muted
              loop
            />
          )}
        </div>

        {/* Caption */}
        {currentSlide.caption && (
          <div className="absolute bottom-0 left-0 right-0 z-30 p-6 bg-linear-to-t from-black/80 to-transparent">
            <p className="text-white text-sm">{currentSlide.caption}</p>
          </div>
        )}

        {/* Product link */}
        {currentSlide.productLink && (
          <div className="absolute bottom-20 left-4 right-4 z-30">
            <a
              href={`/products/${currentSlide.productLink.productId}`}
              className="block bg-white/90 backdrop-blur-sm rounded-lg p-3 hover:bg-white transition"
            >
              <p className="text-xs text-gray-600 mb-1">Featured Product</p>
              <p className="font-semibold text-gray-800">
                {currentSlide.productLink.productName}
              </p>
              <p className="text-xs text-gray-600 mt-1">Tap to view →</p>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryViewer;
