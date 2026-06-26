"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, CalendarDays } from "lucide-react";

type Notification = {
  id: number;
  title: string;
  message: string | null;
  type: string;
  relatedId: number | null;
  isRead: boolean;
  createdAt: string;
};

function timeAgo(iso: string) {
  if (!iso) return "";
  const d = new Date(iso).getTime();
  if (Number.isNaN(d)) return "";
  const mins = Math.round((Date.now() - d) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function NotificationBell() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/notifications", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setItems(data.notifications ?? []);
      setUnread(data.unreadCount ?? 0);
    } catch {
      // ignore
    }
  };

  // initial load + poll every 30s
  useEffect(() => {
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, []);

  // close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const toggle = async () => {
    const next = !open;
    setOpen(next);
    if (next && unread > 0) {
      setUnread(0);
      setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
      try { await fetch("/api/notifications", { method: "POST" }); } catch { /* ignore */ }
    }
  };

  const openBooking = (n: Notification) => {
    setOpen(false);
    router.push("/admin/bookings");
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={toggle} className="relative rounded-full border border-[#eadfcb] p-2 text-[#17352c] transition hover:bg-[#fbf7ef]" aria-label="Notifications">
        <Bell className="h-4 w-4" />
        {unread > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-[#eadfcb] bg-white shadow-xl">
          <div className="border-b border-[#eadfcb] px-4 py-3">
            <p className="text-sm font-semibold text-[#17352c]">Notifications</p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-[#6e7e76]">No notifications yet.</div>
            ) : (
              items.map((n) => (
                <button
                  key={n.id}
                  onClick={() => openBooking(n)}
                  className={`flex w-full items-start gap-3 border-b border-[#f0e6d6] px-4 py-3 text-left transition hover:bg-[#fbf7ef] ${n.isRead ? "" : "bg-[#fbf7ef]/60"}`}
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#f7f1e2] text-[#1f6f58]">
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#17352c]">{n.title}</p>
                    {n.message ? <p className="mt-0.5 text-xs text-[#6e7e76]">{n.message}</p> : null}
                    <p className="mt-1 text-[10px] text-[#9bafa6]">{timeAgo(n.createdAt)}</p>
                  </div>
                  {!n.isRead ? <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500" /> : null}
                </button>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
