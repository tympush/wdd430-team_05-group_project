"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { User } from 'next-auth';
import signOutAction from '@/app/actions/signout';

type Props = { user: any };

export default function NavbarClient({ user }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Creators', href: '/creators' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Handcrafted Haven home" className="inline-flex items-center" onClick={() => setOpen(false)}>
              <Image src="/images/logo-dark.png" alt="Handcrafted Haven logo" width={40} height={40} priority />
              <span className="sr-only">Handcrafted Haven</span>
            </Link>
          </div>

          <nav className="hidden md:flex md:items-center md:gap-6" aria-label="Main navigation">
            {links.map((l) => (
              <Link 
                key={l.href} 
                href={l.href} 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(l.href) 
                    ? 'text-[#C67C48]' 
                    : 'text-[#3E3E3E] hover:text-[#E0B251]'
                }`}
              >
                {l.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex gap-3">
              {/*My Profile: only show to seller or admin*/}
              {user && (user.account_type === 'seller' || user.account_type === 'admin') && (
                <Link
                  href="/my-profile"
                  className="px-3 py-1 rounded-md border border-[#C67C48] text-[#C67C48] text-sm inline-flex items-center justify-center transition-colors duration-200 hover:bg-[#E0B251] hover:text-white hover:border-[#E0B251]"
                  onClick={() => setOpen(false)}
                  aria-label="My Profile"
                >
                  My Profile
                </Link>
              )}

              {/*Sell: only show to seller or admin*/}
              {user && (user.account_type === 'seller' || user.account_type === 'admin') && (
                <Link
                  href="/sell"
                  className="px-3 py-1 rounded-md border border-[#C67C48] text-[#C67C48] text-sm inline-flex items-center justify-center transition-colors duration-200 hover:bg-[#E0B251] hover:text-white hover:border-[#E0B251]"
                  onClick={() => setOpen(false)}
                  aria-label="Sell a product"
                >
                  Sell
                </Link>
              )}

              {/*Manage: visible only to admins*/}
              {user && user.account_type === 'admin' && (
                <Link 
                  href="/manage" 
                  className="px-3 py-1 rounded-md border border-[#C67C48] text-[#C67C48] text-sm inline-flex items-center justify-center transition-colors duration-200 hover:bg-[#E0B251] hover:text-white hover:border-[#E0B251]" 
                  onClick={() => setOpen(false)}
                >
                  Manage
                </Link>
              )}

              {!user ? (
                <Link 
                  href="/login" 
                  className="px-3 py-1 rounded-md border border-[#C67C48] text-[#C67C48] text-sm inline-flex items-center justify-center transition-colors duration-200 hover:bg-[#E0B251] hover:text-white hover:border-[#E0B251]" 
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Link>
              ) : (
                <form action={signOutAction}>
                  <button 
                    type="submit" 
                    className="px-3 py-1 rounded-md border border-[#C67C48] text-[#C67C48] text-sm inline-flex items-center justify-center transition-colors duration-200 hover:bg-[#E0B251] hover:text-white hover:border-[#E0B251]"
                  >
                    Sign Out
                  </button>
                </form>
              )}
            </div>

            <button className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none" aria-expanded={open} aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
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

      <div className={`md:hidden ${open ? 'block' : 'hidden'}`} role="menu" aria-label="Mobile menu">
        <div className="px-4 pt-2 pb-4 space-y-2">
          {links.map((l) => (
            <Link 
              key={l.href} 
              href={l.href} 
              onClick={() => setOpen(false)} 
              className={`block px-3 py-2 rounded-md text-base font-medium text-center transition-colors duration-200 ${
                isActive(l.href) 
                  ? 'text-[#C67C48] bg-[#FFF8F0]' 
                  : 'text-[#3E3E3E] hover:text-[#E0B251] hover:bg-[#FFF8F0]'
              }`}
            >
              {l.name}
            </Link>
          ))}

          <div className="pt-2 border-t border-gray-100 space-y-2 flex flex-col">
            {/*My Profile: only show to seller or admin*/}
            {user && (user.account_type === 'seller' || user.account_type === 'admin') && (
              <Link
                href="/my-profile"
                onClick={() => setOpen(false)}
                className="w-full px-3 py-2 rounded-md inline-flex items-center justify-center border border-[#C67C48] text-[#C67C48] transition-colors duration-200 hover:bg-[#E0B251] hover:text-white hover:border-[#E0B251]"
                aria-label="My Profile"
              >
                My Profile
              </Link>
            )}

            {/*Sell: only show to seller or admin*/}
            {user && (user.account_type === 'seller' || user.account_type === 'admin') && (
              <Link
                href="/sell"
                onClick={() => setOpen(false)}
                className="w-full px-3 py-2 rounded-md inline-flex items-center justify-center border border-[#C67C48] text-[#C67C48] transition-colors duration-200 hover:bg-[#E0B251] hover:text-white hover:border-[#E0B251]"
                aria-label="Sell a product"
              >
                Sell
              </Link>
            )}

            {/*Manage: visible only to admins*/}
            {user && user.account_type === 'admin' && (
              <Link 
                href="/manage" 
                onClick={() => setOpen(false)} 
                className="w-full px-3 py-2 rounded-md inline-flex items-center justify-center border border-[#C67C48] text-[#C67C48] transition-colors duration-200 hover:bg-[#E0B251] hover:text-white hover:border-[#E0B251]"
              >
                Manage
              </Link>
            )}

            {!user ? (
              <Link 
                href="/login" 
                onClick={() => setOpen(false)} 
                className="w-full px-3 py-2 rounded-md inline-flex items-center justify-center border border-[#C67C48] text-[#C67C48] transition-colors duration-200 hover:bg-[#E0B251] hover:text-white hover:border-[#E0B251]"
              >
                Log in
              </Link>
            ) : (
              <form action={signOutAction} className="w-full">
                <button 
                  type="submit" 
                  className="w-full px-3 py-2 rounded-md inline-flex items-center justify-center border border-[#C67C48] text-[#C67C48] transition-colors duration-200 hover:bg-[#E0B251] hover:text-white hover:border-[#E0B251]"
                >
                  Sign Out
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
