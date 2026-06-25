"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useAdminGuard } from "@/lib/admin";
import DealForm, { type DealFormValues } from "@/app/components/admin/DealForm";

export default function EditDealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, loading } = useAdminGuard();
  const [initial, setInitial] = useState<Partial<DealFormValues> | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/deals/${id}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (!d.deal) { setNotFound(true); return; }
        const x = d.deal;
        setInitial({
          title: x.title ?? "",
          description: x.description ?? "",
          vendorId: x.vendorId ? String(x.vendorId) : "",
          categoryId: x.categoryId ? String(x.categoryId) : "",
          originalPrice: x.originalPrice != null ? String(x.originalPrice) : "",
          discountedPrice: x.discountedPrice != null ? String(x.discountedPrice) : "",
          endDate: x.endDate ? x.endDate.slice(0, 10) : "",
          baseImage: x.image ?? (x.images?.[0] ?? ""),
          isActive: x.isActive !== false,
        });
      })
      .catch(() => setNotFound(true));
  }, [user, id]);

  if (loading || (!initial && !notFound)) return <main className="mx-auto max-w-3xl px-6 py-10"><div className="h-64 animate-pulse rounded-3xl bg-[#eadfcb]/50" /></main>;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/deals" className="inline-flex items-center gap-1 text-sm text-[#1f6f58] hover:underline"><ChevronLeft className="h-4 w-4" /> Back to deals</Link>
      <h1 className="mt-3 font-serif text-3xl text-[#17352c]">Edit Deal</h1>
      {notFound ? <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">Deal not found.</div> : <div className="mt-6 rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-sm"><DealForm mode="edit" dealId={Number(id)} initial={initial!} /></div>}
    </main>
  );
}
