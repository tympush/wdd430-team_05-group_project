export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100 py-10">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-lg font-semibold">Handcrafted Haven © {new Date().getFullYear()}</p>
        <p className="text-sm mt-2 text-amber-200">
          Supporting local artisans and sustainable craftsmanship.
        </p>
      </div>
    </footer>
  );
}
