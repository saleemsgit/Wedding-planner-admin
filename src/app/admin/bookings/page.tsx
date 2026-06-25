"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, CheckCircle2, XCircle, CheckCheck } from "lucide-react";
import { useAdminGuard, formatLkr, formatDate } from "@/lib/admin";

const STATUS_TONE: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-rose-100 text-rose-700",
  CANCELLED: "bg-rose-100 text-rose-700",
  COMPLETED: "bg-blue-100 text-blue-700",
};

export default function AdminBookingsPage() {
  const { user, loading } = useAdminGuard();
  const [bookings, setBookings] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const load = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/bookings", { cache: "no-store" });
      const data = await res.json();
      setBookings(data.bookings ?? []);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (user) load();
  }, [user]);

  const filtered = useMemo(
    () => (filter === "all" ? bookings : bookings.filter((b) => b.status === filter)),
    [bookings, filter]
  );

  const updateStatus = async (id: number, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const data = await res.json();
        setBookings((prev) => prev.map((b) => (b.id === id ? data.booking : b)));
        setToast(`Booking #${id} marked ${status.toLowerCase()}`);
        setTimeout(() => setToast(null), 2500);
      }
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <PageSkeleton />;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-serif text-3xl text-[#17352c]">Bookings</h1>
      <p className="mt-1 text-sm text-[#6e7e76]">{bookings.length} total bookings</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {["all", "PENDING", "CONFIRMED", "COMPLETED", "REJECTED", "CANCELLED"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === s ? "bg-[#123f34] text-white" : "border border-[#eadfcb] text-[#17352c] hover:bg-[#fbf7ef]"
            }`}
          >
            {s === "all" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-[#eadfcb] bg-white">
        {fetching ? (
          <div className="flex items-center justify-center py-16 text-[#6e7e76]"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-16 text-center text-[#6e7e76]">No bookings in this view.</div>
        ) : (
          <div className="divide-y divide-[#f0e6d6]">
            {filtered.map((b) => (
              <div key={b.id} className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-medium text-[#17352c]">{b.customerName ?? "Customer"}</p>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_TONE[b.status] ?? "bg-gray-100 text-gray-700"}`}>
                      {b.status.toLowerCase()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[#567066]">{b.serviceTitle ?? "—"} · {b.vendorName ?? "—"}</p>
                  <p className="mt-1 text-xs text-[#6e7e76]">
                    Event: {formatDate(b.eventDate)} {b.eventTime ? `at ${b.eventTime}` : ""} · {b.guestCount ?? 0} guests · {b.packageName ?? "No package"}
                  </p>
                  {b.customRequests ? <p className="mt-1 text-xs italic text-[#6e7e76]">“{b.customRequests}”</p> : null}
                </div>

                <div className="flex flex-col items-start gap-2 lg:items-end">
                  <p className="text-lg font-semibold text-[#17352c]">{formatLkr(b.amount)}</p>
                  <div className="flex flex-wrap gap-2">
                    <button disabled={updatingId === b.id || b.status === "CONFIRMED"} onClick={() => updateStatus(b.id, "CONFIRMED")} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-40">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Confirm
                    </button>
                    <button disabled={updatingId === b.id || b.status === "COMPLETED"} onClick={() => updateStatus(b.id, "COMPLETED")} className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-40">
                      <CheckCheck className="h-3.5 w-3.5" /> Complete
                    </button>
                    <button disabled={updatingId === b.id || b.status === "REJECTED"} onClick={() => updateStatus(b.id, "REJECTED")} className="inline-flex items-center gap-1.5 rounded-full border border-rose-300 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-40">
                      <XCircle className="h-3.5 w-3.5" /> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#123f34] px-5 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      ) : null}
    </main>
  );
}

function PageSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-[#eadfcb]" />
      <div className="mt-6 h-64 animate-pulse rounded-3xl bg-[#eadfcb]/50" />
    </main>
  );
}
