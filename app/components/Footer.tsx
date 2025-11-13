// app/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-900 text-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h5 className="font-bold text-lg">Handcrafted Haven</h5>
          <p className="text-sm mt-2 text-amber-200">A marketplace for artisans. Crafted with care.</p>
        </div>

        <div>
          <h6 className="font-semibold mb-2">Explore</h6>
          <ul className="text-sm space-y-1 text-amber-200">
            <li><a className="hover:underline" href="/shop">Products</a></li>
            <li><a className="hover:underline" href="/about">About</a></li>
            <li><a className="hover:underline" href="/contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h6 className="font-semibold mb-2">Contact</h6>
          <p className="text-sm text-amber-200">hello@handcrafted-haven.example</p>
        </div>
      </div>

      <div className="border-t border-amber-800 text-center py-4 text-sm">© {new Date().getFullYear()} Handcrafted Haven</div>
    </footer>
  );
};

export default Footer;


