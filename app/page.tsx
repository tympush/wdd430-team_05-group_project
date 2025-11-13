import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-light)" }}>
      <main className="flex flex-col flex-1">
        <header className="border-b shadow-sm" style={{ backgroundColor: "var(--color-primary)", borderColor: "var(--color-secondary)" }}>
          <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
            <img src="/logo-light.png" alt="Artisan Logo" className="h-12 w-auto" />
            <nav>
              <ul className="flex gap-8">
                <li><a href="" className="font-medium transition-colors" style={{ color: "var(--color-light)" }}>Home</a></li>
                <li><a href="" className="font-medium transition-colors" style={{ color: "var(--color-light)" }}>Catalogue</a></li>
                <li><a href="" className="font-medium transition-colors" style={{ color: "var(--color-light)" }}>Reviews</a></li>
                <li><a href="" className="font-medium transition-colors" style={{ color: "var(--color-light)" }}>Log In</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <section className="flex-1 px-6 py-12 max-w-7xl mx-auto w-full">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--color-dark)" }}>Welcome to Handcrafted Haven</h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--color-dark)" }}>
            Discover handcrafted treasures from talented artisans around the world. Our marketplace celebrates
            authentic craftsmanship, unique designs, and the stories behind each creation. Browse our collection
            and find the perfect piece that speaks to your style.
          </p>
        </section>
        <footer className="py-8 mt-12" style={{ backgroundColor: "var(--color-secondary)", color: "var(--color-light)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center">&copy; 2025 Handcrafted Haven. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
