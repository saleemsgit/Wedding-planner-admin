"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import ImageUploader from "@/app/components/admin/ImageUploader";

type Category = { id: number; name: string };

export type VendorFormValues = {
  businessName: string;
  categoryId: string;
  description: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  startingPrice: string;
  maxPrice: string;
  rating: string;
  reviewCount: string;
  badge: string;
  isVerified: boolean;
  isFeatured: boolean;
  isActive: boolean;
  baseImage: string;
  images: string[];
};

const empty: VendorFormValues = {
  businessName: "",
  categoryId: "",
  description: "",
  location: "",
  address: "",
  phone: "",
  email: "",
  startingPrice: "",
  maxPrice: "",
  rating: "",
  reviewCount: "",
  badge: "AVAILABLE",
  isVerified: false,
  isFeatured: false,
  isActive: true,
  baseImage: "",
  images: [],
};

export default function VendorForm({
  mode,
  vendorId,
  initial,
}: {
  mode: "create" | "edit";
  vendorId?: number;
  initial?: Partial<VendorFormValues>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<VendorFormValues>({ ...empty, ...initial });
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => setCategories(d.categories ?? []))
      .catch(() => setCategories([]));
  }, []);

  const set = <K extends keyof VendorFormValues>(key: K, val: VendorFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const payload = {
        businessName: values.businessName,
        categoryId: values.categoryId ? Number(values.categoryId) : null,
        description: values.description,
        location: values.location,
        address: values.address,
        phone: values.phone,
        email: values.email,
        startingPrice: values.startingPrice ? Number(values.startingPrice) : null,
        maxPrice: values.maxPrice ? Number(values.maxPrice) : null,
        rating: values.rating ? Number(values.rating) : 0,
        reviewCount: values.reviewCount ? Number(values.reviewCount) : 0,
        badge: values.badge,
        isVerified: values.isVerified,
        isFeatured: values.isFeatured,
        isActive: values.isActive,
        baseImage: values.baseImage || values.images[0] || "",
        images: values.images,
      };

      const res = await fetch(mode === "create" ? "/api/vendors" : `/api/vendors/${vendorId}`, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save vendor");
        setSaving(false);
        return;
      }
      router.push("/admin/vendors");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Business Name *">
          <input required value={values.businessName} onChange={(e) => set("businessName", e.target.value)} className={inputCls} placeholder="Royal Gardens Banquet Hall" />
        </Field>
        <Field label="Category *">
          <select required value={values.categoryId} onChange={(e) => set("categoryId", e.target.value)} className={inputCls}>
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Location *">
          <input required value={values.location} onChange={(e) => set("location", e.target.value)} className={inputCls} placeholder="Colombo" />
        </Field>
        <Field label="Address">
          <input value={values.address} onChange={(e) => set("address", e.target.value)} className={inputCls} placeholder="123 Galle Road" />
        </Field>
        <Field label="Phone *">
          <input required value={values.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} placeholder="+94 77 000 0000" />
        </Field>
        <Field label="Email *">
          <input required type="email" value={values.email} onChange={(e) => set("email", e.target.value)} className={inputCls} placeholder="vendor@example.lk" />
        </Field>
        <Field label="Starting Price (LKR)">
          <input type="number" value={values.startingPrice} onChange={(e) => set("startingPrice", e.target.value)} className={inputCls} placeholder="350000" />
        </Field>
        <Field label="Max Price (LKR)">
          <input type="number" value={values.maxPrice} onChange={(e) => set("maxPrice", e.target.value)} className={inputCls} placeholder="2000000" />
        </Field>
        <Field label="Rating (0-5)">
          <input type="number" step="0.1" min="0" max="5" value={values.rating} onChange={(e) => set("rating", e.target.value)} className={inputCls} placeholder="4.8" />
        </Field>
        <Field label="Review Count">
          <input type="number" value={values.reviewCount} onChange={(e) => set("reviewCount", e.target.value)} className={inputCls} placeholder="0" />
        </Field>
        <Field label="Availability Badge">
          <select value={values.badge} onChange={(e) => set("badge", e.target.value)} className={inputCls}>
            <option value="AVAILABLE">Available</option>
            <option value="LIMITED">Limited</option>
            <option value="BOOKED">Booked</option>
          </select>
        </Field>
      </div>

      <Field label="Description">
        <textarea value={values.description} onChange={(e) => set("description", e.target.value)} rows={3} className={inputCls} placeholder="Tell customers about this vendor..." />
      </Field>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Images</span>
        <p className="mb-3 text-xs text-[#6e7e76]">Drag &amp; drop photos, click to browse, or paste a URL. Star one as the cover used on customer cards.</p>
        <ImageUploader
          images={values.images}
          coverImage={values.baseImage}
          onChange={(imgs, cover) => setValues((v) => ({ ...v, images: imgs, baseImage: cover }))}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <Toggle label="Verified" checked={values.isVerified} onChange={(v) => set("isVerified", v)} />
        <Toggle label="Featured" checked={values.isFeatured} onChange={(v) => set("isFeatured", v)} />
        <Toggle label="Active" checked={values.isActive} onChange={(v) => set("isActive", v)} />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[#123f34] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f3329] disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {mode === "create" ? "Create Vendor" : "Save Changes"}
        </button>
        <Link href="/admin/vendors" className="rounded-full border border-[#eadfcb] px-6 py-3 text-sm font-medium text-[#17352c] hover:bg-[#fbf7ef]">
          Cancel
        </Link>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-2xl border border-[#eadfcb] bg-white px-4 py-2.5 text-sm text-[#17352c] outline-none transition focus:border-[#c9a24f]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#17352c]">{label}</span>
      {children}
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 rounded border-[#eadfcb] accent-[#123f34]" />
      <span className="text-sm font-medium text-[#17352c]">{label}</span>
    </label>
  );
}
