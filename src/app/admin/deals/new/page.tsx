"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useAdminGuard } from "@/lib/admin";
import DealForm from "@/app/components/admin/DealForm";

export default function NewDealPage() {
  const { user, loading } = useAdminGuard();
  if (loading || !user) return <main className="mx-auto max-w-3xl px-6 py-10"><div className="h-64 animate-pulse rounded-3xl bg-[#eadfcb]/50" /></main>;
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/deals" className="inline-flex items-center gap-1 text-sm text-[#1f6f58] hover:underline"><ChevronLeft className="h-4 w-4" /> Back to deals</Link>
      <h1 className="mt-3 font-serif text-3xl text-[#17352c]">Add Deal</h1>
      <div className="mt-6 rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-sm"><DealForm mode="create" /></div>
    </main>
  );
}
