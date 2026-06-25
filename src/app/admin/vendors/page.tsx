"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Loader2 } from "lucide-react";
import { useAdminGuard, formatLkr } from "@/lib/admin";

export default function AdminVendorsPage() {
  const { user, loading } = useAdminGuard();
  const [vendors, setVendors] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/vendors", { cache: "no-store" });
      const data = await res.json();
      setVendors(data.vendors ?? []);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (user) load();
  }, [user]);

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      const matchSearch =
        !search ||
        v.businessName?.toLowerCase().includes(search.toLowerCase()) ||
        v.location?.toLowerCase().includes(search.toLowerCase()) ||
        v.category?.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && v.isActive) ||
        (statusFilter === "inactive" && !v.isActive) ||
        (statusFilter === "featured" && v.isFeatured) ||
        (statusFilter === "verified" && v.isVerified);
      return matchSearch && matchStatus;
    });
  }, [vendors, search, statusFilter]);

  const handleDelete = async (id: number) => {
    setBusy(true);
    try {
      await fetch(`/api/vendors/${id}`, { method: "DELETE" });
      setConfirmId(null);
      await load();
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <PageSkeleton />;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl text-[#17352c]">Vendors</h1>
          <p className="mt-1 text-sm text-[#6e7e76]">{vendors.length} total vendors</p>
        </div>
        <Link href="/admin/vendors/new" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#123f34] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f3329]">
          <Plus className="h-4 w-4" />
          Add Vendor
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9bafa6]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, location or category..."
            className="w-full rounded-full border border-[#eadfcb] bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#c9a24f]"
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-full border border-[#eadfcb] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#c9a24f]">
          <option value="all">All vendors</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="featured">Featured</option>
          <option value="verified">Verified</option>
        </select>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-[#eadfcb] bg-white">
        {fetching ? (
          <div className="flex items-center justify-center py-16 text-[#6e7e76]"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading vendors…</div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-[#6e7e76]">No vendors found.</p>
            <Link href="/admin/vendors/new" className="mt-3 inline-block text-sm font-medium text-[#1f6f58] hover:underline">Add your first vendor</Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <table className="hidden w-full text-left text-sm md:table">
              <thead className="border-b border-[#eadfcb] bg-[#fbf7ef] text-xs uppercase tracking-wider text-[#74857c]">
                <tr>
                  <th className="px-5 py-3">Vendor</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Starting Price</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0e6d6]">
                {filtered.map((v) => (
                  <tr key={v.id} className="hover:bg-[#fbf7ef]/60">
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#17352c]">{v.businessName}</p>
                      <div className="mt-1 flex gap-1.5">
                        {v.isFeatured ? <Tag tone="gold">Featured</Tag> : null}
                        {v.isVerified ? <Tag tone="green">Verified</Tag> : null}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[#567066]">{v.category ?? "—"}</td>
                    <td className="px-5 py-4 text-[#567066]">{v.location}</td>
                    <td className="px-5 py-4 text-[#567066]">{formatLkr(v.startingPrice)}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${v.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                        {v.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/vendors/${v.id}/edit`} className="rounded-lg border border-[#eadfcb] p-2 text-[#1f6f58] hover:bg-[#fbf7ef]" title="Edit"><Pencil className="h-4 w-4" /></Link>
                        <button onClick={() => setConfirmId(v.id)} className="rounded-lg border border-[#eadfcb] p-2 text-[#9b3a3a] hover:bg-rose-50" title="Deactivate"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile cards */}
            <div className="divide-y divide-[#f0e6d6] md:hidden">
              {filtered.map((v) => (
                <div key={v.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-[#17352c]">{v.businessName}</p>
                      <p className="text-xs text-[#6e7e76]">{v.category} · {v.location}</p>
                      <p className="mt-1 text-sm text-[#567066]">{formatLkr(v.startingPrice)}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${v.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                      {v.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link href={`/admin/vendors/${v.id}/edit`} className="flex-1 rounded-lg border border-[#eadfcb] py-2 text-center text-sm text-[#1f6f58]">Edit</Link>
                    <button onClick={() => setConfirmId(v.id)} className="flex-1 rounded-lg border border-[#eadfcb] py-2 text-center text-sm text-[#9b3a3a]">Deactivate</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {confirmId !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={() => setConfirmId(null)}>
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-xl text-[#17352c]">Deactivate vendor?</h3>
            <p className="mt-2 text-sm text-[#6e7e76]">This vendor will be hidden from the customer site. You can reactivate it later by editing it.</p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setConfirmId(null)} className="flex-1 rounded-full border border-[#eadfcb] py-2.5 text-sm font-medium text-[#17352c]">Cancel</button>
              <button onClick={() => handleDelete(confirmId)} disabled={busy} className="flex-1 rounded-full bg-rose-600 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60">
                {busy ? "Working…" : "Deactivate"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function Tag({ children, tone }: { children: React.ReactNode; tone: "gold" | "green" }) {
  const cls = tone === "gold" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700";
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${cls}`}>{children}</span>;
}

function PageSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-[#eadfcb]" />
      <div className="mt-6 h-64 animate-pulse rounded-3xl bg-[#eadfcb]/50" />
    </main>
  );
}
