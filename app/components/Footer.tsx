// app/components/Footer.tsx
"use client";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-900 text-amber-100">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h5 className="font-bold">Handcrafted Haven</h5>
          <p className="text-sm mt-2">A marketplace for artisans. Crafted with care.</p>
        </div>
        <div>
          <h6 className="font-semibold">Explore</h6>
          <ul className="mt-2 text-sm space-y-1">
            <li>Products</li>
            <li>Sellers</li>
            <li>About</li>
          </ul>
        </div>
        <div>
          <h6 className="font-semibold">Contact</h6>
          <p className="text-sm mt-2">hello@handcrafted-haven.example</p>
        </div>
      </div>
      <div className="border-t border-amber-800 text-center py-4 text-sm">© {new Date().getFullYear()} Handcrafted Haven</div>
    </footer>
  );
};

export default Footer;

