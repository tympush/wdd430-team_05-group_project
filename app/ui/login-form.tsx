'use client';

import React, { useRef, useState } from 'react';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export default function LoginForm() {
  const callbackUrl = '/';
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined as any);
  const [isRegister, setIsRegister] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRegError(null);
    setRegSuccess(null);
    const fd = new FormData(e.currentTarget as HTMLFormElement);
    const username = (fd.get('username') as string) || '';
    const email = (fd.get('email') as string) || '';
    const password = (fd.get('password') as string) || '';

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setRegError(data?.error || 'Registration failed');
        return;
      }
      setRegSuccess('Account created. Please log in.');
      setIsRegister(false);
      // fill email in login form
      if (emailRef.current) emailRef.current.value = email;
    } catch (err) {
      console.error(err);
      setRegError('Server error');
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">{isRegister ? 'Create an account' : 'Please log in to continue.'}</h1>
        <button
          onClick={() => {
            setIsRegister((s) => !s);
            setRegError(null);
            setRegSuccess(null);
          }}
          className="text-sm text-[var(--color-primary)]"
          type="button"
        >
          {isRegister ? 'Have an account? Log in' : 'Create account'}
        </button>
      </div>

      {isRegister ? (
        <form onSubmit={handleRegister} className="flex-1 rounded-lg bg-[var(--color-light)] px-6 pb-4 pt-8">
          <div className="w-full">
            <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="username">
              Username
            </label>
            <input id="username" name="username" className="block w-full rounded-md border border-[rgba(0,0,0,0.06)] py-[9px] pl-3 text-sm" required />

            <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="email">
              Email
            </label>
            <input id="email-register" name="email" type="email" className="block w-full rounded-md border border-[rgba(0,0,0,0.06)] py-[9px] pl-3 text-sm" required />

            <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="password">
              Password
            </label>
            <input id="password-register" name="password" type="password" minLength={6} className="block w-full rounded-md border border-[rgba(0,0,0,0.06)] py-[9px] pl-3 text-sm" required />
          </div>

          <button className="mt-4 w-full py-2 px-4 rounded-md bg-[var(--color-primary)] text-white flex items-center justify-center" type="submit">
            Create account <ArrowRightIcon className="ml-2 h-5 w-5 text-white" />
          </button>

          <div className="mt-3">
            {regError && <p className="text-sm text-red-600">{regError}</p>}
            {regSuccess && <p className="text-sm text-green-700">{regSuccess}</p>}
          </div>
        </form>
      ) : (
        <form action={formAction} className="flex-1 rounded-lg bg-[var(--color-light)] px-6 pb-4 pt-8">
          <div className="w-full">
            <div>
              <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  ref={emailRef}
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
          <button className="mt-4 w-full py-2 px-4 rounded-md bg-[var(--color-primary)] text-white flex items-center justify-center" aria-disabled={isPending as unknown as boolean}>
            Log in <ArrowRightIcon className="ml-2 h-5 w-5 text-white" />
          </button>
          <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
            {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
          </div>
        </form>
      )}
    </div>
  );
}
