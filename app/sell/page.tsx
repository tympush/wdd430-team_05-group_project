import AdminProductForm from "@/app/components/AdminProductForm";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Sell — Handcrafted Haven",
  description: "Create a new product to sell on Handcrafted Haven",
};

export default async function SellPage() {
  const session = await auth();
  if (!session?.user || !['seller', 'admin'].includes(session.user.account_type || 'user')) {
    // Not authenticated or not permitted — redirect to login
    redirect('/login');
  }

  return (
    <main className="mt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold mb-4">Create a new product</h1>
        <p className="text-sm mb-6" style={{ color: "var(--color-dark)" }}>
          Use this form to add a new product to your shop.
        </p>
        <AdminProductForm seller={session.user.name ?? (session.user.email ?? '')} />

        <div className="mt-8 text-sm" style={{ color: "var(--color-secondary-text)" }}>
          <p>
            Note for my team: this form is protected. Only authenticated users can access it.
          </p>
        </div>
      </div>
    </main>
  );
}
