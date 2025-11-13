export default function Footer() {
  return (
    <footer className="py-10 mt-12" style={{ backgroundColor: "rgba(204,96,50,0.8)", color: "var(--color-light)" }}>
      <div className="max-w-7x1 mx-auto text-center">
        <p className="text-lg font-semibold">Handcrafted Haven © {new Date().getFullYear()}</p>
        <p className="text-sm mt-2" style={{ color: "var(--color-light)" }}>
          Supporting local artisans and sustainable craftsmanship.
        </p>
      </div>
    </footer>
  );
}
