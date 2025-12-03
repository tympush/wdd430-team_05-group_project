"use client";

import React, { useEffect, useState } from "react";

type Review = {
  _id: string;
  rating: number;
  text: string;
  author: string;
  productId: string;
  createdAt: string;
};

type Props = {
  productId: string;
  refreshKey?: boolean;
};

export default function ReviewList({ productId, refreshKey }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/reviews?productId=${productId}`);
        if (!res.ok) {
          setError("Failed to load reviews.");
          return;
        }
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (err) {
        console.error("Error loading reviews:", err);
        setError("An error occurred while loading reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, refreshKey]);

  if (loading) {
    return <div className="text-center py-8 text-[#6E6E6E]">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (reviews.length === 0) {
    return <div className="text-center py-8 text-[#6E6E6E]">No reviews yet. Be the first to review!</div>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review._id} className="bg-[#F5EFE6] border border-[#C67C48] rounded-lg p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold text-[#3E3E3E]">{review.author}</p>
              <p className="text-sm text-[#6E6E6E]">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${i < review.rating ? "text-[#E0B251]" : "text-gray-300"}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="text-[#3E3E3E] whitespace-pre-wrap">{review.text}</p>
        </div>
      ))}
    </div>
  );
}
