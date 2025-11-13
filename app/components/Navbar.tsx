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
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <button className="px-6 py-2 rounded-lg transition font-medium" style={{ backgroundColor: "var(--color-accent)", color: "var(--color-dark)", border: "2px solid var(--color-accent)" }} onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = "var(--color-accent-2)"; e.currentTarget.style.borderColor = "var(--color-accent-2)";}} onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = "var(--color-accent)"; e.currentTarget.style.borderColor = "var(--color-accent)";}}>Sign In</button>
      </div>
    </nav>
  );
}

