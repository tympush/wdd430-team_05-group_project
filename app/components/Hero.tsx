// app/components/Hero.tsx
import React from "react";
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <section
      aria-label="Hero"
      className="w-full relative"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
        aria-hidden="true"
      />

      {/* Overlay for contrast */}
      <div aria-hidden="true" className="absolute inset-0 z-10 bg-linear-to-b from-black/30 via-black/10 to-transparent" />

      <div className="relative z-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-20 md:py-28">
            {/* Left: text */}
            <div className="text-center md:text-left">
              <p className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-700 mb-4">
                Handcrafted & Sustainable
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-md">
                Discover Handcrafted Treasures
              </h1>

              <p className="mt-4 text-base sm:text-lg text-white/90 max-w-xl mx-auto md:mx-0">
                Connect with artisans, explore creativity, and find one-of-a-kind handmade products that tell a story.
              </p>

              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                <a
                  href="/shop"
                  className="inline-flex items-center px-5 py-3 rounded-md bg-amber-700 text-white text-sm font-medium hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-amber-200"
                  aria-label="Explore marketplace"
                >
                  Explore Marketplace
                </a>

                <a
                  href="/about"
                  className="inline-flex items-center px-5 py-3 rounded-md border border-white/40 text-white text-sm font-medium hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20"
                  aria-label="Become a seller"
                >
                  Become a Seller
                </a>
              </div>

              <div className="mt-6 text-sm text-white/80">
                <strong className="text-white">Free shipping</strong> on orders over $75.
              </div>
            </div>

            {/* Right: image collage — hidden on very small screens */}
            <div className="hidden md:grid grid-cols-2 gap-3">
              <div className="rounded-xl overflow-hidden bg-white shadow-sm">
                <Image src="/images/coffee-cup.webp" alt="Handmade ceramic mug" width={800} height={600} className="w-full h-48 object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden bg-white shadow-sm">
                <Image src="/images/wool-decoration.webp" alt="Woven hanging" width={800} height={600} className="w-full h-48 object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden bg-white shadow-sm">
                <Image src="/images/jelwery.webp" alt="Jewelry closeup" width={800} height={600} className="w-full h-48 object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden bg-white shadow-sm">
                <Image src="/images/textil.webp" alt="Textile" width={800} height={600} className="w-full h-48 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;




