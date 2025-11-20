// app/shop/ClientShop.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import ProductCard from "../../components/ProductCard";
import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  title: string;
  price: number;
  image?: string | null;
  description?: string | null;
  seller?: string | null;
  category?: string | null;
};

type Props = {
  initialProducts: Product[];
  initialTotal: number;
  initialPage: number;
  initialLimit: number;
  initialQuery: string;
};

export default function ClientShop({
  initialProducts,
  initialTotal,
  initialPage,
  initialLimit,
  initialQuery,
}: Props) {
  const router = useRouter();

  const [query, setQuery] = useState<string>(initialQuery ?? "");
  const [debouncedQuery, setDebouncedQuery] = useState<string>(initialQuery ?? "");
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>(initialProducts ?? []);
  const [total, setTotal] = useState<number>(initialTotal ?? 0);
  const [page, setPage] = useState<number>(initialPage ?? 1);
  const [limit] = useState<number>(initialLimit ?? 12);
  const [sellerFilter, setSellerFilter] = useState<string | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sort, setSort] = useState<string | undefined>(undefined);

  const mountedRef = useRef(false);

  // Debounce input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 350);
    return () => clearTimeout(t);
  }, [query]);

  // Fetch when debouncedQuery or page changes
  useEffect(() => {
    // Skip initial render (server already provided initial data)
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    const controller = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (debouncedQuery) params.set("q", debouncedQuery);
        if (page && page > 1) params.set("page", String(page));
        if (limit && limit !== 12) params.set("limit", String(limit)); // only include if not default
        if (sellerFilter) params.set("seller", sellerFilter);
        if (categoryFilter) params.set("category", categoryFilter);
        if (minPrice !== "") params.set("minPrice", String(minPrice));
        if (maxPrice !== "") params.set("maxPrice", String(maxPrice));
        if (sort) params.set("sort", sort);

        const res = await fetch(`/api/products?${params.toString()}`, { signal: controller.signal });
        if (!res.ok) throw new Error("Fetch failed");
        const json = await res.json();
        setProducts(json.products ?? []);
        setTotal(json.total ?? 0);
      } catch (err) {
        if ((err as any).name === "AbortError") return;
        console.error("[ClientShop] fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [debouncedQuery, page, limit]);

    // Re-fetch when filters or sort change
    useEffect(() => {
      // reset to first page when filters change
      setPage(1);
    }, [sellerFilter, categoryFilter, minPrice, maxPrice, sort]);

    // When any of the listed inputs change, fetch (debouncedQuery effect handles server fetch except initial)
    useEffect(() => {
      const controller = new AbortController();
      (async () => {
        setLoading(true);
        try {
          const params = new URLSearchParams();
          if (debouncedQuery) params.set("q", debouncedQuery);
          if (page && page > 1) params.set("page", String(page));
          if (limit && limit !== 12) params.set("limit", String(limit));
          if (sellerFilter) params.set("seller", sellerFilter);
          if (categoryFilter) params.set("category", categoryFilter);
          if (minPrice !== "") params.set("minPrice", String(minPrice));
          if (maxPrice !== "") params.set("maxPrice", String(maxPrice));
          if (sort) params.set("sort", sort);

          const res = await fetch(`/api/products?${params.toString()}`, { signal: controller.signal });
          if (!res.ok) throw new Error("Fetch failed");
          const json = await res.json();
          setProducts(json.products ?? []);
          setTotal(json.total ?? 0);
        } catch (err) {
          if ((err as any).name === "AbortError") return;
          console.error("[ClientShop] fetch error:", err);
        } finally {
          setLoading(false);
        }
      })();

      return () => controller.abort();
    }, [debouncedQuery, page, limit, sellerFilter, categoryFilter, minPrice, maxPrice, sort]);

  // Update URL: when search is empty and page==1 => /shop ; else include only necessary params
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    if (page && page > 1) params.set("page", String(page));
    if (limit && limit !== 12) params.set("limit", String(limit));
    if (sellerFilter) params.set("seller", sellerFilter);
    if (categoryFilter) params.set("category", categoryFilter);
    if (minPrice !== "") params.set("minPrice", String(minPrice));
    if (maxPrice !== "") params.set("maxPrice", String(maxPrice));
    if (sort) params.set("sort", sort);

    const qs = params.toString();
    const href = qs ? `/shop?${qs}` : `/shop`;

    // replace to avoid flooding history
    router.replace(href);
  }, [debouncedQuery, page, limit, router]);

  // derive seller options from products
  const sellerOptions = Array.from(new Set(products.map((p) => p.seller).filter(Boolean) as string[]));
  const categoryOptions = Array.from(new Set(products.map((p) => p.category).filter(Boolean) as string[]));

  const pageCount = Math.max(1, Math.ceil(total / limit));

  return (
    <section>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="w-full sm:w-1/3">
            <label className="block text-sm">Seller</label>
            <select value={sellerFilter ?? ""} onChange={(e) => setSellerFilter(e.target.value || undefined)} className="mt-1 block w-full border rounded px-3 py-2">
              <option value="">All sellers</option>
              {sellerOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-1/3">
            <label className="block text-sm">Category</label>
            <select value={categoryFilter ?? ""} onChange={(e) => setCategoryFilter(e.target.value || undefined)} className="mt-1 block w-full border rounded px-3 py-2">
              <option value="">All categories</option>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-1/3 flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm">Min price</label>
              <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm">Max price</label>
              <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <label className="text-sm">Sort</label>
          <select value={sort ?? ""} onChange={(e) => setSort(e.target.value || undefined)} className="border rounded px-3 py-2">
            <option value="">Newest</option>
            <option value="price_asc">Price: low → high</option>
            <option value="price_desc">Price: high → low</option>
            <option value="seller_asc">Seller: A → Z</option>
            <option value="seller_desc">Seller: Z → A</option>
            <option value="category_asc">Category: A → Z</option>
            <option value="category_desc">Category: Z → A</option>
          </select>
        </div>

        <label htmlFor="shop-search" className="sr-only">Buscar productos</label>
        <div className="relative">
          <input
            id="shop-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1); // reset to first page when query changes
            }}
            placeholder="Search for products...."
            className="w-full pr-12 rounded-md border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-700"
            aria-label="Search for products"
            autoComplete="off"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setPage(1);
              }}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl h-72" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-600">No se encontraron productos.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p._id} title={p.title} price={p.price} image={p.image ?? null} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination (mobile stacked) */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
        </div>

        <nav aria-label="Pagination" className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
            aria-label="Previous page"
          >
            ← Prev
          </button>

          <div className="inline-flex items-center gap-2">
            <span className="text-sm hidden sm:inline">Page</span>
            <select
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
              className="ml-2 border rounded px-2 py-1"
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
            className="px-3 py-1 rounded border disabled:opacity-50"
            aria-label="Next page"
          >
            Next →
          </button>
        </nav>
      </div>
    </section>
  );
}


