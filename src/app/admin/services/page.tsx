"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Loader2 } from "lucide-react";
import { useAdminGuard, formatLkr } from "@/lib/admin";

export default function AdminServicesPage() {
  const { user, loading } = useAdminGuard();
  const [services, setServices] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const load = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/services", { cache: "no-store" });
      const data = await res.json();
      setServices(data.services ?? []);
    } finally {
      setFetching(false);
    }
  };
  useEffect(() => { if (user) load(); }, [user]);

  const filtered = useMemo(
    () => services.filter((s) => !search || s.title?.toLowerCase().includes(search.toLowerCase()) || s.vendorName?.toLowerCase().includes(search.toLowerCase())),
    [services, search]
  );

  const handleDelete = async (id: number) => {
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    setConfirmId(null);
    load();
  };

  if (loading) return <main className="mx-auto max-w-7xl px-6 py-10"><div className="h-64 animate-pulse rounded-3xl bg-[#eadfcb]/50" /></main>;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl text-[#17352c]">Services</h1>
          <p className="mt-1 text-sm text-[#6e7e76]">{services.length} total services</p>
        </div>
        <Link href="/admin/services/new" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#123f34] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f3329]">
          <Plus className="h-4 w-4" /> Add Service
        </Link>
      </div>

      <div className="relative mt-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9bafa6]" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search services or vendors..." className="w-full rounded-full border border-[#eadfcb] bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#c9a24f]" />
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-[#eadfcb] bg-white">
        {fetching ? (
          <div className="flex items-center justify-center py-16 text-[#6e7e76]"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-16 text-center text-[#6e7e76]">No services found. <Link href="/admin/services/new" className="text-[#1f6f58] hover:underline">Add one</Link>.</div>
        ) : (
          <div className="divide-y divide-[#f0e6d6]">
            {filtered.map((s) => (
              <div key={s.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[#17352c]">{s.title}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${s.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>{s.isActive ? "Active" : "Inactive"}</span>
                  </div>
                  <p className="mt-1 text-xs text-[#6e7e76]">{s.vendorName} · {s.category}</p>
                  <p className="mt-1 text-sm text-[#567066]">{formatLkr(s.discountedPrice ?? s.basePrice)}{s.discountedPrice ? <span className="ml-2 text-xs text-[#9bafa6] line-through">{formatLkr(s.basePrice)}</span> : null}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/services/${s.id}/edit`} className="rounded-lg border border-[#eadfcb] p-2 text-[#1f6f58] hover:bg-[#fbf7ef]"><Pencil className="h-4 w-4" /></Link>
                  <button onClick={() => setConfirmId(s.id)} className="rounded-lg border border-[#eadfcb] p-2 text-[#9b3a3a] hover:bg-rose-50"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {confirmId !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setConfirmId(null)}>
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-xl text-[#17352c]">Deactivate service?</h3>
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
