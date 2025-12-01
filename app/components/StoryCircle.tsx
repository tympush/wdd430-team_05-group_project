// app/components/StoryCircle.tsx
"use client";
import React from "react";
import Image from "next/image";
import { Story } from "../types";

type Props = {
  story: Story;
  onClick: () => void;
};

const StoryCircle: React.FC<Props> = ({ story, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 group"
    >
      <div className="relative">
        {/* Gradient ring */}
        <div
          className="absolute inset-0 rounded-full p-0.5"
          style={{
            background:
              "linear-gradient(45deg, var(--color-accent), var(--color-primary), var(--color-secondary))",
          }}
        >
          <div className="w-full h-full bg-white rounded-full" />
        </div>

        {/* Avatar */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white">
          {story.sellerAvatar ? (
            <Image
              src={story.sellerAvatar}
              alt={story.sellerName}
              fill
              className="object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white text-xl font-bold"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {story.sellerName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Seller name */}
      <p className="text-xs sm:text-sm font-medium text-gray-700 max-w-[80px] truncate group-hover:text-gray-900">
        {story.sellerName}
      </p>
    </button>
  );
};

export default StoryCircle;
