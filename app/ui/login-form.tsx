"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Props = { currentUser?: any | null };

export default function LoginForm({ currentUser }: Props) {
  const searchParams = useSearchParams();
  const callbackUrl = '/';
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined as any);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage('Account created successfully! Please log in.');
    }
  }, [searchParams]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Please log in to continue.</h1>
        <Link href="/register" className="text-sm text-[var(--color-primary)]">
          Create account
        </Link>
      </div>

      <form action={formAction} className="flex-1 rounded-lg bg-[var(--color-light)] px-6 pb-4 pt-8">
        {successMessage && (
          <div className="mb-4 p-3 rounded-md bg-green-50 border border-green-200">
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
        )}
        
        <div className="w-full">
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-[rgba(0,0,0,0.06)] py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-[rgba(0,0,0,0.06)] py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button 
          className="mt-4 w-full py-2 px-4 rounded-md bg-[var(--color-primary)] text-white flex items-center justify-center disabled:opacity-50" 
          aria-disabled={isPending as unknown as boolean}
          disabled={isPending}
        >
          {isPending ? 'Logging in...' : 'Log in'} 
          <ArrowRightIcon className="ml-2 h-5 w-5 text-white" />
        </button>
        <div className="flex h-8 items-end space-x-1 mt-2" aria-live="polite" aria-atomic="true">
          {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
}
