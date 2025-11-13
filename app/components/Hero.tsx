export default function Hero() {
  return (
    <div>
      <div className="w-full -mt-16 relative z-0">
        <picture>
          <source media="(min-width:1024px)" srcSet="/hero-large.png" />
          <source media="(min-width:640px)" srcSet="/hero-medium.png" />
          <img
            src="/hero-small.png"
            alt="Featured handcrafted items"
            className="w-full"
            style={{ display: "block", height: "auto" }}
          />
        </picture>
      </div>

      <section className="w-full flex flex-col items-center justify-center text-center py-16" style={{ backgroundColor: "var(--color-light)" }}>
        <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: "var(--color-primary)" }}>
          Discover Handcrafted Treasures
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8" style={{ color: "var(--color-dark)" }}>
          Connect with artisans, explore creativity, and find one-of-a-kind handmade
          products that tell a story.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-lg transition cursor-pointer" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-light)" }}>
            Explore Marketplace
          </button>
          <button className="px-6 py-3 rounded-lg transition cursor-pointer" style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)", borderWidth: "2px" }}>
            Become a Seller
          </button>
        </div>
      </section>
    </div>
  );
}


