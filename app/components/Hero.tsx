// app/components/Hero.tsx
import React from "react";
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <section
      aria-label="Hero"
      className="w-full flex items-center justify-center text-center min-h-screen bg-amber-50 pt-20 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700 mb-4">
            Handcrafted & Sustainable
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-amber-800">
            Discover Handcrafted Treasures
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-xl mx-auto md:mx-0">
            Connect with artisans, explore creativity, and find one-of-a-kind handmade products that tell a story.
          </p>

          <div className="mt-6 flex flex-wrap justify-center md:justify-center gap-3">
            <a
              href="/shop"
              className="inline-flex items-center px-5 py-3 rounded-md bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-amber-200"
              aria-label="Explore marketplace"
            >
              Explore Marketplace
            </a>

            <a
              href="/about"
              className="inline-flex items-center px-5 py-3 rounded-md border border-amber-700 text-amber-700 text-sm font-medium hover:bg-amber-100 focus:outline-none focus:ring-4 focus:ring-amber-100"
              aria-label="Become a seller"
            >
              Become a Seller
            </a>
          </div>
        </div>

        {/* Image collage — collapses gracefully on small screens */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="rounded-xl overflow-hidden bg-white shadow-sm">
            <Image src="/images/hero-1.jpg" alt="Handmade ceramic mug" width={800} height={600} className="w-full h-40 sm:h-48 md:h-56 object-cover" />
          </div>
          <div className="rounded-xl overflow-hidden bg-white shadow-sm">
            <Image src="/images/hero-2.jpg" alt="Woven hang" width={800} height={600} className="w-full h-40 sm:h-48 md:h-56 object-cover" />
          </div>
          <div className="rounded-xl overflow-hidden bg-white shadow-sm">
            <Image src="/images/hero-3.jpg" alt="Jewelry closeup" width={800} height={600} className="w-full h-40 sm:h-48 md:h-56 object-cover" />
          </div>
          <div className="rounded-xl overflow-hidden bg-white shadow-sm">
            <Image src="/images/hero-4.jpg" alt="Textile" width={800} height={600} className="w-full h-40 sm:h-48 md:h-56 object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;



