// app/components/Navbar.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-amber-800">
              Handcrafted Haven
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex md:items-center md:gap-6" aria-label="Main navigation">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition ${
                  pathname === l.href ? "text-amber-800" : "text-gray-700 hover:text-amber-700"
                }`}
              >
                {l.name}
              </Link>
            ))}
          </nav>

          {/* Actions + Mobile button */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex gap-3">
              <button className="px-3 py-1 rounded-md border border-amber-700 text-amber-700 text-sm">Log in</button>
              <button className="px-3 py-1 rounded-md bg-amber-700 text-white text-sm hover:bg-amber-800">Sell</button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-300"
              aria-expanded={open}
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${open ? "block" : "hidden"}`} role="menu" aria-label="Mobile menu">
        <div className="px-4 pt-2 pb-4 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === l.href ? "bg-amber-50 text-amber-800" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {l.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 flex gap-2">
            <button className="w-1/2 px-3 py-2 rounded-md border border-amber-700 text-amber-700">Log in</button>
            <button className="w-1/2 px-3 py-2 rounded-md bg-amber-700 text-white">Sell</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;




