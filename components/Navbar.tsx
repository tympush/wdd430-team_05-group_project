"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-amber-700">
          Handcrafted Haven
        </Link>

        <ul className="hidden md:flex space-x-6 text-(--color-secondary-text) font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`hover:text-amber-700 transition ${
                  pathname === link.href ? "text-(--color-primary)" : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <button className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition">
          Sign In
        </button>
      </div>
    </nav>
  );
}

