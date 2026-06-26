"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type AdminUser = { id: number; name: string; email: string; role: string; phone?: string | null };

/** Client-side guard: verifies the cookie session belongs to an ADMIN. */
export function useAdminGuard() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/me", { cache: "no-store" });
        const data = await res.json();
        if (!active) return;
        if (!res.ok || !data.user || data.user.role !== "ADMIN") {
          router.replace("/admin/login");
          return;
        }
        setUser(data.user);
      } catch {
        router.replace("/admin/login");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [router]);

  return { user, loading };
}

export function formatLkr(amount: number | null | undefined) {
  if (amount == null) return "—";
  return `LKR ${Number(amount).toLocaleString()}`;
}

export function formatDate(value: string | Date | null | undefined) {
  if (!value) return "Date not set";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "Date not set";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
