"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  CircleAlert,
  Store,
  Tag,
  TrendingUp,
} from "lucide-react";
import { useAdminGuard, formatLkr, formatDate } from "@/lib/admin";

type Stats = {
  vendors: any[];
  services: any[];
  deals: any[];
  bookings: any[];
};

export default function AdminDashboardPage() {
  const { user, loading } = useAdminGuard();
  const [data, setData] = useState<Stats | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const [v, s, d, b] = await Promise.all([
          fetch("/api/vendors", { cache: "no-store" }).then((r) => r.json()),
          fetch("/api/services", { cache: "no-store" }).then((r) => r.json()),
          fetch("/api/deals", { cache: "no-store" }).then((r) => r.json()),
          fetch("/api/bookings", { cache: "no-store" }).then((r) => r.json()),
        ]);
        setData({
          vendors: v.vendors ?? [],
          services: s.services ?? [],
          deals: d.deals ?? [],
          bookings: b.bookings ?? [],
        });
      } catch {
        setErr("Failed to load dashboard data");
      }
    })();
  }, [user]);

  if (loading || (!data && !err)) {
    return <DashboardSkeleton />;
  }

  if (err) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">{err}</div>
      </main>
    );
  }

  const { vendors, services, deals, bookings } = data!;
  const pending = bookings.filter((b) => b.status === "PENDING").length;
  const revenue = bookings
    .filter((b) => b.status === "CONFIRMED" || b.status === "COMPLETED")
    .reduce((sum, b) => sum + (b.amount ?? 0), 0);
  const featured = vendors.filter((v) => v.isFeatured).length;
  const activeDeals = deals.filter((d) => d.isActive).length;

  return (
    <main className="min-h-screen bg-[#fbf7ef]">
      <section className="border-b border-[#eadfcb] bg-gradient-to-br from-[#123f34] via-[#184c3e] to-[#d2ad5f] text-white">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <p className="text-xs uppercase tracking-[0.28em] text-white/80">Admin Control Center</p>
          <h1 className="mt-2 font-serif text-3xl md:text-4xl">Welcome back, {user?.name}</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/80">
            Manage vendors, services, deals and bookings for the WeddingSL marketplace.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric title="Total Vendors" value={String(vendors.length)} detail={`${featured} featured`} icon={<Store className="h-5 w-5" />} href="/admin/vendors" />
          <Metric title="Total Services" value={String(services.length)} detail="Listed services" icon={<BadgeCheck className="h-5 w-5" />} href="/admin/services" />
          <Metric title="Active Deals" value={String(activeDeals)} detail={`${deals.length} total`} icon={<Tag className="h-5 w-5" />} href="/admin/deals" />
          <Metric title="Total Bookings" value={String(bookings.length)} detail={`${pending} pending`} icon={<CalendarDays className="h-5 w-5" />} href="/admin/bookings" />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Metric title="Pending Review" value={String(pending)} detail="Bookings waiting" icon={<CircleAlert className="h-5 w-5" />} href="/admin/bookings" />
          <Metric title="Revenue" value={formatLkr(revenue)} detail="Confirmed + completed" icon={<TrendingUp className="h-5 w-5" />} />
          <Metric title="Featured Vendors" value={String(featured)} detail="Shown on homepage" icon={<Store className="h-5 w-5" />} href="/admin/vendors" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <Panel title="Recent Bookings" action={{ label: "View all", href: "/admin/bookings" }}>
            {bookings.length === 0 ? (
              <Empty text="No bookings yet. Customer bookings will appear here." />
            ) : (
              <div className="divide-y divide-[#f0e6d6]">
                {bookings.slice(0, 6).map((b) => (
                  <div key={b.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                    <div>
                      <p className="font-medium text-[#17352c]">{b.customerName ?? "Customer"}</p>
                      <p className="text-xs text-[#6e7e76]">{b.serviceTitle ?? b.vendorName} · {formatDate(b.eventDate)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[#17352c]">{formatLkr(b.amount)}</p>
                      <StatusBadge status={b.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Panel>

          <Panel title="Recent Vendors" action={{ label: "Manage", href: "/admin/vendors" }}>
            {vendors.length === 0 ? (
              <Empty text="No vendors yet. Add your first vendor." />
            ) : (
              <div className="space-y-3">
                {vendors.slice(0, 5).map((v) => (
                  <div key={v.id} className="rounded-2xl border border-[#eadfcb] p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-[#17352c]">{v.businessName}</p>
                        <p className="text-xs text-[#6e7e76]">{v.category} · {v.location}</p>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${v.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                        {v.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </div>
      </section>
    </main>
  );
}

function Metric({ title, value, detail, icon, href }: { title: string; value: string; detail: string; icon: React.ReactNode; href?: string }) {
  const body = (
    <div className="rounded-3xl border border-[#eadfcb] bg-white p-5 shadow-[0_10px_30px_rgba(24,60,50,0.04)] transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#6e7e76]">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-[#17352c]">{value}</p>
          <p className="mt-1 text-sm text-[#567066]">{detail}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f7f1e2] text-[#1f6f58]">{icon}</div>
      </div>
    </div>
  );
  return href ? <Link href={href as any}>{body}</Link> : body;
}

function Panel({ title, action, children }: { title: string; action?: { label: string; href: string }; children: React.ReactNode }) {
  return (
    <section className="rounded-[28px] border border-[#eadfcb] bg-white p-5 shadow-[0_12px_40px_rgba(24,60,50,0.05)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-xl text-[#17352c]">{title}</h2>
        {action ? (
          <Link href={action.href as any} className="text-sm font-medium text-[#1f6f58] hover:underline">
            {action.label}
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700",
    CONFIRMED: "bg-emerald-100 text-emerald-700",
    REJECTED: "bg-rose-100 text-rose-700",
    CANCELLED: "bg-rose-100 text-rose-700",
    COMPLETED: "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${tone[status] ?? "bg-gray-100 text-gray-700"}`}>
      {status.toLowerCase()}
    </span>
  );
}

function Empty({ text }: { text: string }) {
  return <div className="rounded-2xl border border-dashed border-[#eadfcb] bg-[#fbf7ef] px-4 py-8 text-center text-sm text-[#6e7e76]">{text}</div>;
}

function DashboardSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="h-8 w-64 animate-pulse rounded-lg bg-[#eadfcb]" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-3xl bg-[#eadfcb]/60" />
        ))}
      </div>
    </main>
  );
}
