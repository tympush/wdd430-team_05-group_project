"use client";
import Image from "next/image";
import Link from "next/link";

type Props = { title: string; price: number; image?: string | null; productId?: string; avgRating?: number; reviewCount?: number };

function RatingStars({ rating, count }: { rating?: number; count?: number }) {
  const r = Math.max(0, Math.min(5, Number(rating ?? 0)));
  const full = Math.floor(r);
  const half = r - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const stars: string[] = [];
  for (let i = 0; i < full; i++) stars.push("★");
  if (half) stars.push("☆");
  for (let i = 0; i < empty; i++) stars.push("✩");
  return (
    <div className="flex items-center gap-2 text-amber-700 mt-1" aria-label={`Average rating ${r.toFixed(1)} out of 5`}>
      <span className="tracking-tight">{stars.join(" ")}</span>
      <span className="text-xs text-gray-600">{r.toFixed(1)}{typeof count === "number" ? ` (${count})` : ""}</span>
    </div>
  );
}

const ProductCard: React.FC<Props> = ({ title, price, image, productId, avgRating = 0, reviewCount = 0 }) => {
  const sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  const card = (
    <article className="bg-[#F5EFE6] rounded-2xl shadow-sm border border-[#C67C48] overflow-hidden flex flex-col h-full hover:border-[#E0B251] hover:shadow-lg transition-all duration-300">
      <div className="relative w-full aspect-4/3 bg-gray-100">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover" sizes={sizes} priority={false} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">No image</div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <h4 className="font-medium text-[#3E3E3E] text-sm sm:text-base">{title}</h4>
        <RatingStars rating={avgRating} count={reviewCount} />
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-[#C67C48]">${price}</span>
          <span className="px-3 py-1 rounded-md text-sm bg-[#C67C48] text-white hover:bg-[#A65829] transition-colors duration-200">View</span>
        </div>
      </div>
    </article>
  );

  if (productId) {
    return (
      <Link href={`/product/${productId}`} className="block h-full">
        {card}
      </Link>
    );
  }

  return card;
};

export default ProductCard;




