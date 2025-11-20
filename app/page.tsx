// app/page.tsx
import Hero from "./components/Hero";
import Features from "./components/Features";
import AdminProductForm from "./components/AdminProductForm";
import FeaturedProducts from "./components/FeaturedProducts";

export default function Page() {
  return (
    <>
      <main className="mt-16">
        <Hero />
        <Features />
        <FeaturedProducts />
      </main>
    </>
  );
}



