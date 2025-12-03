"use client";

import React, { useState } from "react";
import Link from "next/link";

type Props = {
  productId: string;
  onReviewSubmitted: () => void;
};

export default function ReviewForm({ productId, onReviewSubmitted }: Props) {
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to submit a test request to see if authenticated
        // Or check via a fetch to /api/auth/callback or similar
        // For now, we'll assume logged in if they can reach here
        // The server-side check will validate on submission
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    return <div className="bg-[#F5EFE6] rounded-lg p-6 mb-8 text-[#6E6E6E]">Loading...</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="bg-[#FFF8F0] border border-[#E0B251] rounded-lg p-4 mb-6">
        <p className="text-sm text-[#3E3E3E]">
          <Link href="/login" className="text-[#C67C48] font-semibold hover:underline">
            Log in
          </Link>
          {" "}to leave a review.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setMessage({ type: "error", text: "Review text cannot be empty." });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          rating: Number(rating),
          text: text.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setMessage({ type: "error", text: err.message || "Failed to submit review." });
        return;
      }

      setMessage({ type: "success", text: "Review submitted successfully!" });
      setRating(5);
      setText("");
      onReviewSubmitted();
    } catch (err) {
      console.error("Error submitting review:", err);
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#F5EFE6] rounded-lg p-6 mb-8 border border-[#C67C48]">
      <h3 className="text-lg font-semibold text-[#3E3E3E] mb-4">Leave a Review</h3>

      <div className="mb-4">
        <label htmlFor="rating" className="block text-sm font-medium text-[#3E3E3E] mb-2">
          Rating
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-3xl transition ${
                star <= rating ? "text-[#E0B251]" : "text-gray-300"
              } hover:text-[#E0B251]`}
              aria-label={`Rate ${star} stars`}
            >
              ★
            </button>
          ))}
        </div>
        <p className="text-sm text-[#6E6E6E] mt-2">{rating} out of 5 stars</p>
      </div>

      <div className="mb-4">
        <label htmlFor="review-text" className="block text-sm font-medium text-[#3E3E3E] mb-2">
          Your Review
        </label>
        <textarea
          id="review-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience with this product..."
          maxLength={2000}
          rows={5}
          className="w-full border border-[#C67C48] rounded-lg px-4 py-2 text-[#3E3E3E] bg-white focus:outline-none focus:ring-2 focus:ring-[#C67C48] resize-none"
        />
        <p className="text-xs text-[#6E6E6E] mt-1">{text.length} / 2000 characters</p>
      </div>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-[#D4E8D4] border border-[#A6BBA1] text-[#2D5A2D]"
              : "bg-[#FDD4D4] border border-[#C67C48] text-[#8B0000]"
          } text-sm`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="w-full bg-[#C67C48] text-white font-semibold py-2 rounded-lg hover:bg-[#A65829] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
