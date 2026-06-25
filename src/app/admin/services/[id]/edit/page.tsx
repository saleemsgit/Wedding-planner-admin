"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useAdminGuard } from "@/lib/admin";
import ServiceForm, { type ServiceFormValues } from "@/app/components/admin/ServiceForm";

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, loading } = useAdminGuard();
  const [initial, setInitial] = useState<Partial<ServiceFormValues> | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/services/${id}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (!d.service) { setNotFound(true); return; }
        const s = d.service;
        setInitial({
          vendorId: s.vendorId ? String(s.vendorId) : "",
          categoryId: s.categoryId ? String(s.categoryId) : "",
          title: s.title ?? "",
          description: s.description ?? "",
          longDescription: s.longDescription ?? "",
          basePrice: s.basePrice != null ? String(s.basePrice) : "",
          discountedPrice: s.discountedPrice != null ? String(s.discountedPrice) : "",
          capacity: s.capacity != null ? String(s.capacity) : "",
          duration: s.duration != null ? String(s.duration) : "",
          isFeatured: !!s.isFeatured,
          isActive: s.isActive !== false,
          images: Array.isArray(s.images) ? s.images : [],
          coverImage: s.coverImage ?? s.image ?? (s.images?.[0] ?? ""),
          packages: Array.isArray(s.packages)
            ? s.packages.map((p: any) => ({
                id: p.id,
                name: p.name ?? "",
                price: p.price != null ? String(p.price) : "",
                discountedPrice: p.discountedPrice != null ? String(p.discountedPrice) : "",
                description: p.description ?? "",
                features: Array.isArray(p.features) ? p.features.join("\n") : "",
                guestCapacity: p.guestCapacity != null ? String(p.guestCapacity) : "",
                duration: p.duration != null ? String(p.duration) : "",
                isActive: p.isActive !== false,
              }))
            : [],
        });
      })
      .catch(() => setNotFound(true));
  }, [user, id]);

  if (loading || (!initial && !notFound)) return <main className="mx-auto max-w-3xl px-6 py-10"><div className="h-64 animate-pulse rounded-3xl bg-[#eadfcb]/50" /></main>;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/services" className="inline-flex items-center gap-1 text-sm text-[#1f6f58] hover:underline"><ChevronLeft className="h-4 w-4" /> Back to services</Link>
      <h1 className="mt-3 font-serif text-3xl text-[#17352c]">Edit Service</h1>
      {notFound ? <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">Service not found.</div> : <div className="mt-6 rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-sm"><ServiceForm mode="edit" serviceId={Number(id)} initial={initial!} /></div>}
    </main>
  );
}
