export default function Footer() {
  return (
    <footer className="py-10" style={{ backgroundColor: "rgba(198,124,72,0.85)", color: "var(--color-light)" }}>
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-lg font-semibold">Handcrafted Haven © {new Date().getFullYear()}</p>
        <p className="text-sm mt-2" style={{ color: "var(--color-light)" }}>
          Supporting local artisans and sustainable craftsmanship.
        </p>
      </div>
    </footer>
  );
}
