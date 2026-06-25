"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useAdminGuard, formatLkr, formatDate } from "@/lib/admin";

export default function AdminDealsPage() {
  const { user, loading } = useAdminGuard();
  const [deals, setDeals] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const load = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/deals", { cache: "no-store" });
      const data = await res.json();
      setDeals(data.deals ?? []);
    } finally {
      setFetching(false);
    }
  };
  useEffect(() => { if (user) load(); }, [user]);

  const dealStatus = (d: any) => {
    if (!d.isActive) return { label: "Inactive", cls: "bg-gray-100 text-gray-600" };
    if (d.endDate && new Date(d.endDate).getTime() < Date.now()) return { label: "Expired", cls: "bg-rose-100 text-rose-700" };
    return { label: "Active", cls: "bg-emerald-100 text-emerald-700" };
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/deals/${id}`, { method: "DELETE" });
    setConfirmId(null);
    load();
  };

  if (loading) return <main className="mx-auto max-w-7xl px-6 py-10"><div className="h-64 animate-pulse rounded-3xl bg-[#eadfcb]/50" /></main>;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl text-[#17352c]">Deals</h1>
          <p className="mt-1 text-sm text-[#6e7e76]">{deals.length} total deals</p>
        </div>
        <Link href="/admin/deals/new" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#123f34] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f3329]">
          <Plus className="h-4 w-4" /> Add Deal
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fetching ? (
          [0, 1, 2].map((i) => <div key={i} className="h-44 animate-pulse rounded-3xl bg-[#eadfcb]/50" />)
        ) : deals.length === 0 ? (
          <div className="col-span-full rounded-3xl border border-dashed border-[#eadfcb] bg-white px-6 py-16 text-center text-[#6e7e76]">No deals yet. <Link href="/admin/deals/new" className="text-[#1f6f58] hover:underline">Add one</Link>.</div>
        ) : (
          deals.map((d) => {
            const st = dealStatus(d);
            return (
              <div key={d.id} className="overflow-hidden rounded-3xl border border-[#eadfcb] bg-white shadow-sm">
                {d.image ? <img src={d.image} alt={d.title} className="h-32 w-full object-cover" /> : <div className="h-32 w-full bg-gradient-to-br from-[#123f34] to-[#d2ad5f]" />}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-[#17352c]">{d.title}</p>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${st.cls}`}>{st.label}</span>
                  </div>
                  <p className="mt-1 text-xs text-[#6e7e76]">{d.vendorName ?? d.category ?? "General"}</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-semibold text-[#17352c]">{formatLkr(d.discountedPrice)}</span>
                    {d.originalPrice ? <span className="text-xs text-[#9bafa6] line-through">{formatLkr(d.originalPrice)}</span> : null}
                    <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">-{d.discount}%</span>
                  </div>
                  <p className="mt-2 text-xs text-[#6e7e76]">Until {formatDate(d.endDate)}</p>
                  <div className="mt-3 flex gap-2">
                    <Link href={`/admin/deals/${d.id}/edit`} className="flex-1 rounded-lg border border-[#eadfcb] py-2 text-center text-sm text-[#1f6f58] hover:bg-[#fbf7ef]"><Pencil className="mx-auto h-4 w-4" /></Link>
                    <button onClick={() => setConfirmId(d.id)} className="flex-1 rounded-lg border border-[#eadfcb] py-2 text-center text-sm text-[#9b3a3a] hover:bg-rose-50"><Trash2 className="mx-auto h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {confirmId !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setConfirmId(null)}>
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-xl text-[#17352c]">Deactivate deal?</h3>
            <p className="mt-2 text-sm text-[#6e7e76]">It will be hidden from customers.</p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setConfirmId(null)} className="flex-1 rounded-full border border-[#eadfcb] py-2.5 text-sm font-medium">Cancel</button>
              <button onClick={() => handleDelete(confirmId)} className="flex-1 rounded-full bg-rose-600 py-2.5 text-sm font-semibold text-white hover:bg-rose-700">Deactivate</button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
