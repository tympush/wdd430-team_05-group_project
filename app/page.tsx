// app/page.tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="mt-16"> {/* mt to offset fixed navbar */}
        <Hero />
        <Features />

        <section className="py-12" style={{ backgroundColor: "var(--color-light)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--color-dark)" }}>Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <ProductCard title="Hand-thrown Mug" price={28} />
              <ProductCard title="Woven Wall Hanging" price={75} />
              <ProductCard title="Silver Pendant" price={52} />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}


