// app/components/Navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <nav className="w-full backdrop-blur-md shadow-sm fixed top-0 left-0 z-50" style={{ backgroundColor: "rgba(204,96,50,0.8)", borderBottomColor: "var(--color-secondary)" }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img src="/logo-light.png" alt="Artisan Logo" className="h-12 w-auto" />
          <Link href="/" className="text-2xl font-bold" style={{ color: "var(--color-light)" }}>
            Handcrafted Haven
          </Link>
        </div>

        <ul className="hidden md:flex space-x-6 font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors pb-1"
                style={{
                  color: pathname === link.href ? "var(--color-light)" : "var(--color-light)",
                  borderBottom: pathname === link.href ? "3px solid var(--color-accent)" : "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-light)';
                }}
              >
                {l.name}
              </Link>
            ))}
          </nav>

          {/* Actions + Mobile button */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex gap-3">
              <button className="px-3 py-1 rounded-md border border-amber-700 text-amber-700 text-sm">
                Log in
              </button>
              <button className="px-3 py-1 rounded-md bg-amber-700 text-white text-sm hover:bg-amber-800">
                Sell
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-300"
              aria-expanded={open}
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${open ? "block" : "hidden"}`}
        role="menu"
        aria-label="Mobile menu"
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === l.href
                  ? "bg-amber-50 text-amber-800"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {l.name}
            </Link>
          ))}

        <button className="px-6 py-2 rounded-lg transition font-medium" style={{ backgroundColor: "var(--color-accent)", color: "var(--color-dark)", border: "2px solid var(--color-accent)" }} onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = "var(--color-accent-2)"; e.currentTarget.style.borderColor = "var(--color-accent-2)";}} onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = "var(--color-accent)"; e.currentTarget.style.borderColor = "var(--color-accent)";}}>Sign In</button>
      </div>
    </header>
  );
};

export default Navbar;






