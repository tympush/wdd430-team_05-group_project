"use client";

import React, { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Props = { currentUser?: any | null };

export default function RegisterForm({ currentUser }: Props) {
  const router = useRouter();
  const [regError, setRegError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRegError(null);
    setIsSubmitting(true);
    
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const username = (fd.get('username') as string) || '';
    const email = (fd.get('email') as string) || '';
    const password = (fd.get('password') as string) || '';
    const account_type = (fd.get('account_type') as string) || 'user';

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, account_type }),
      });
      const data = await res.json();
      if (!res.ok) {
        setRegError(data?.error || 'Registration failed');
        setIsSubmitting(false);
        return;
      }
      // Redirect to login page after successful registration
      router.push('/login?registered=true');
    } catch (err) {
      console.error(err);
      setRegError('Server error');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Create an account</h1>
        <Link href="/login" className="text-sm text-[var(--color-primary)]">
          Have an account? Log in
        </Link>
      </div>

      <form onSubmit={handleRegister} className="flex-1 rounded-lg bg-[var(--color-light)] px-6 pb-4 pt-8">
        <div className="w-full">
          <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="username">
            Username
          </label>
          <input 
            id="username" 
            name="username" 
            className="block w-full rounded-md border border-[rgba(0,0,0,0.06)] py-[9px] pl-3 text-sm" 
            required 
          />

          <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="email">
            Email
          </label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            className="block w-full rounded-md border border-[rgba(0,0,0,0.06)] py-[9px] pl-3 text-sm" 
            required 
          />

          <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="password">
            Password
          </label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            minLength={6} 
            className="block w-full rounded-md border border-[rgba(0,0,0,0.06)] py-[9px] pl-3 text-sm" 
            required 
          />
        </div>

        {currentUser && currentUser.account_type === 'admin' ? (
          <div className="mt-4">
            <label className="mb-2 block text-xs font-medium" htmlFor="account_type">
              Account type
            </label>
            <select 
              id="account_type" 
              name="account_type" 
              className="block w-full rounded-md border py-2 pl-3 text-sm"
            >
              <option value="user">User</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        ) : (
          <input type="hidden" name="account_type" value="user" />
        )}

        <button 
          className="mt-4 w-full py-2 px-4 rounded-md bg-[var(--color-primary)] text-white flex items-center justify-center disabled:opacity-50" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Create account'} 
          <ArrowRightIcon className="ml-2 h-5 w-5 text-white" />
        </button>

        <div className="mt-3">
          {regError && <p className="text-sm text-red-600">{regError}</p>}
        </div>
      </form>
    </div>
  );
}
