import React, { Suspense } from 'react';
import LoginForm from '../ui/login-form';
import { auth } from '@/auth';

export default async function LoginPage() {
  const session = await auth();

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-[var(--color-primary)] p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <span className="sr-only">Handcrafted Haven</span>
            {/*Replace with logo component if available*/}
            <div className="text-white font-bold">Handcrafted Haven</div>
          </div>
        </div>
        <Suspense>
          {/*LoginForm is a client component (uses useActionState)*/}
          <LoginForm currentUser={session?.user ?? null} />
        </Suspense>
      </div>
    </main>
  );
}
