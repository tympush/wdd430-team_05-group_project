"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="text-2xl font-bold text-amber-800">
          Handcrafted Haven
        </Link>

        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`transition ${
                  pathname === l.href ? "text-amber-800" : "hover:text-amber-700"
                }`}
              >
                {l.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md border border-amber-700 text-amber-700">
            Log in
          </button>
          <button className="px-4 py-2 rounded-md bg-amber-700 text-white">
            Sell with us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



