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
    return <div className="bg-gray-50 rounded-lg p-6 mb-8 text-gray-600">Loading...</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-700">
          <Link href="/login" className="text-amber-700 font-semibold hover:underline">
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
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave a Review</h3>

      <div className="mb-4">
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-3xl transition ${
                star <= rating ? "text-amber-400" : "text-gray-300"
              } hover:text-amber-400`}
              aria-label={`Rate ${star} stars`}
            >
              ★
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-2">{rating} out of 5 stars</p>
      </div>

      <div className="mb-4">
        <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-2">
          Your Review
        </label>
        <textarea
          id="review-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience with this product..."
          maxLength={2000}
          rows={5}
          className="w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-700 resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">{text.length} / 2000 characters</p>
      </div>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          } text-sm`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="w-full bg-amber-700 text-white font-semibold py-2 rounded-lg hover:bg-amber-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
