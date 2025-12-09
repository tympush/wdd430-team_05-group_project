import { Suspense } from 'react';
import RegisterForm from '@/app/components/RegisterForm';
import { auth } from '@/auth';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register"
};

export default async function RegisterPage() {
  const session = await auth();

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-[var(--color-primary)] p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <span className="sr-only">Handcrafted Haven</span>
            <div className="text-white font-bold">Handcrafted Haven</div>
          </div>
        </div>
        <Suspense>
          <RegisterForm currentUser={session?.user ?? null} />
        </Suspense>
      </div>
    </main>
  );
}
