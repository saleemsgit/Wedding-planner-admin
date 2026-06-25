"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useAdminGuard } from "@/lib/admin";
import VendorForm, { type VendorFormValues } from "@/app/components/admin/VendorForm";

export default function EditVendorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, loading } = useAdminGuard();
  const [initial, setInitial] = useState<Partial<VendorFormValues> | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/vendors/${id}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (!d.vendor) {
          setNotFound(true);
          return;
        }
        const v = d.vendor;
        setInitial({
          businessName: v.businessName ?? "",
          categoryId: v.categoryId ? String(v.categoryId) : "",
          description: v.description ?? "",
          location: v.location ?? "",
          address: v.address ?? "",
          phone: v.phone ?? "",
          email: v.email ?? "",
          startingPrice: v.startingPrice != null ? String(v.startingPrice) : "",
          maxPrice: v.maxPrice != null ? String(v.maxPrice) : "",
          rating: v.rating != null ? String(v.rating) : "",
          reviewCount: v.reviewCount != null ? String(v.reviewCount) : "",
          badge: v.badge ?? "AVAILABLE",
          isVerified: !!v.isVerified,
          isFeatured: !!v.isFeatured,
          isActive: v.isActive !== false,
          baseImage: v.baseImage ?? v.image ?? "",
        });
      })
      .catch(() => setNotFound(true));
  }, [user, id]);

  if (loading || (!initial && !notFound)) {
    return <main className="mx-auto max-w-3xl px-6 py-10"><div className="h-64 animate-pulse rounded-3xl bg-[#eadfcb]/50" /></main>;
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/vendors" className="inline-flex items-center gap-1 text-sm text-[#1f6f58] hover:underline">
        <ChevronLeft className="h-4 w-4" /> Back to vendors
      </Link>
      <h1 className="mt-3 font-serif text-3xl text-[#17352c]">Edit Vendor</h1>

      {notFound ? (
        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">Vendor not found.</div>
      ) : (
        <div className="mt-6 rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-sm">
          <VendorForm mode="edit" vendorId={Number(id)} initial={initial!} />
        </div>
      )}
    </main>
  );
}
