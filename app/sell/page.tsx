import AdminProductForm from "@/app/components/AdminProductForm";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Sell",
};

export default async function SellPage() {
  const session = await auth();
  if (!session?.user || !['seller', 'admin'].includes(session.user.account_type || 'user')) {
    // Not authenticated or not permitted — redirect to login
    redirect('/login');
  }

  return (
    <main className="mt-20 min-h-screen bg-[#F8F5F1]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold mb-4 text-[#3E3E3E]">Create a new product</h1>
        <p className="text-sm mb-6 text-[#6E6E6E]">
          Use this form to add a new product to your shop.
        </p>
        <AdminProductForm seller={session.user.name ?? (session.user.email ?? '')} />
      </div>
    </main>
  );
}
