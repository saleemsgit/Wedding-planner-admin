"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  Store,
  Tag,
  X,
} from "lucide-react";
import NotificationBell from "./admin/NotificationBell";

const navLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/vendors", label: "Vendors", icon: Store },
  { href: "/admin/services", label: "Services", icon: BadgeCheck },
  { href: "/admin/deals", label: "Deals", icon: Tag },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
];

export default function AdminNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/admin/login");
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfcb] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#123f34] to-[#d2ad5f] text-white shadow-sm">
            <Menu className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-[#17352c]">WeddingSL Admin</p>
            <p className="hidden text-xs text-[#6e7e76] sm:block">Vendor & booking control</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition ${
                  isActive(item.href)
                    ? "bg-[#123f34] text-white shadow-sm"
                    : "text-[#17352c] hover:bg-[#fbf7ef] hover:text-[#123f34]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <div className="ml-2"><NotificationBell /></div>
          <button
            onClick={handleLogout}
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-[#eadfcb] px-3.5 py-2 text-sm font-medium text-[#9b3a3a] transition hover:bg-rose-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <NotificationBell />
          <button
            className="rounded-xl border border-[#eadfcb] p-2 text-[#17352c]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav className="border-t border-[#eadfcb] bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    isActive(item.href) ? "bg-[#123f34] text-white" : "text-[#17352c] hover:bg-[#fbf7ef]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="mt-1 inline-flex items-center gap-2 rounded-xl border border-[#eadfcb] px-3.5 py-2.5 text-sm font-medium text-[#9b3a3a]"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
