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
    <nav className="w-full backdrop-blur-md shadow-sm fixed top-0 left-0 z-50" style={{ backgroundColor: "rgba(198,124,72,0.85)", borderBottomColor: "var(--color-secondary)" }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <img src="/logo-light.png" alt="Artisan Logo" className="h-12 w-auto" />
        <Link href="/" className="text-2xl font-bold" style={{ color: "var(--color-light)" }}>
          Handcrafted Haven
        </Link>

        <ul className="hidden md:flex space-x-6 font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors"
                style={{
                  color: pathname === link.href ? "var(--color-accent)" : "var(--color-light)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = pathname === link.href ? 'var(--color-accent)' : 'var(--color-light)')}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <button className="px-4 py-2 rounded-lg transition" style={{ backgroundColor: "var(--color-primary)", color: "var(--color-light)" }}>
          Sign In
        </button>
      </div>
    </nav>
  );
}

