export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center min-h-screen bg-amber-50">
      <h1 className="text-5xl md:text-6xl font-bold text-amber-800 mb-4">
        Discover Handcrafted Treasures
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">
        Connect with artisans, explore creativity, and find one-of-a-kind handmade
        products that tell a story.
      </p>
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition cursor-pointer">
          Explore Marketplace
        </button>
        <button className="px-6 py-3 border border-amber-700 text-amber-700 rounded-lg hover:bg-amber-100 transition cursor-pointer">
          Become a Seller
        </button>
      </div>
    </section>
  );
}
