"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize page from URL if present
  const [page, setPage] = useState(() => {
    const urlPage = searchParams.get('reviewPage');
    return urlPage ? Math.max(1, Number(urlPage)) : 1;
  });
  const [total, setTotal] = useState(0);
  const limit = 3;

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/reviews?productId=${productId}&page=${page}&limit=${limit}`);
        if (!res.ok) {
          setError("Failed to load reviews.");
          return;
        }
        const data = await res.json();
        setReviews(data.reviews || []);
        setTotal(data.total || 0);
      } catch (err) {
        console.error("Error loading reviews:", err);
        setError("An error occurred while loading reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, refreshKey, page]);

  // Update URL when page changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (page > 1) {
      params.set('reviewPage', String(page));
    } else {
      params.delete('reviewPage');
    }
    const newUrl = params.toString() ? `${window.location.pathname}?${params}` : window.location.pathname;
    router.replace(newUrl, { scroll: false });
  }, [page, router]);

  if (loading) {
    return <div className="text-center py-8 text-[#6E6E6E]">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (reviews.length === 0) {
    return <div className="text-center py-8 text-[#6E6E6E]">No reviews yet. Be the first to review!</div>;
  }

  const pageCount = Math.max(1, Math.ceil(total / limit));

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

      {pageCount > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total} reviews
          </div>

          <nav aria-label="Review pagination" className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1 rounded border disabled:opacity-50 bg-white hover:bg-gray-50 disabled:hover:bg-white transition"
              aria-label="Previous page"
            >
              ← Prev
            </button>

            <div className="inline-flex items-center gap-2">
              <span className="text-sm hidden sm:inline">Page</span>
              <select
                value={page}
                onChange={(e) => setPage(Number(e.target.value))}
                className="ml-2 border rounded px-2 py-1 bg-white"
                aria-label="Select page"
              >
                {Array.from({ length: pageCount }).map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page >= pageCount}
              className="px-3 py-1 rounded border disabled:opacity-50 bg-white hover:bg-gray-50 disabled:hover:bg-white transition"
              aria-label="Next page"
            >
              Next →
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
