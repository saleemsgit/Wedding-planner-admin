"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const inputCls =
  "w-full rounded-2xl border border-[#eadfcb] bg-white px-4 py-2.5 text-sm text-[#17352c] outline-none transition focus:border-[#c9a24f]";

export type ServiceFormValues = {
  vendorId: string;
  categoryId: string;
  title: string;
  description: string;
  longDescription: string;
  basePrice: string;
  discountedPrice: string;
  duration: string;
  baseImage: string;
  isActive: boolean;
};

const empty: ServiceFormValues = {
  vendorId: "",
  categoryId: "",
  title: "",
  description: "",
  longDescription: "",
  basePrice: "",
  discountedPrice: "",
  duration: "",
  baseImage: "",
  isActive: true,
};

export default function ServiceForm({
  mode,
  serviceId,
  initial,
}: {
  mode: "create" | "edit";
  serviceId?: number;
  initial?: Partial<ServiceFormValues>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<ServiceFormValues>({ ...empty, ...initial });
  const [vendors, setVendors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/vendors").then((r) => r.json()).then((d) => setVendors(d.vendors ?? [])).catch(() => {});
    fetch("/api/categories").then((r) => r.json()).then((d) => setCategories(d.categories ?? [])).catch(() => {});
  }, []);

  const set = <K extends keyof ServiceFormValues>(k: K, v: ServiceFormValues[K]) => setValues((s) => ({ ...s, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const payload = {
        vendorId: values.vendorId ? Number(values.vendorId) : null,
        categoryId: values.categoryId ? Number(values.categoryId) : null,
        title: values.title,
        description: values.description,
        longDescription: values.longDescription,
        basePrice: values.basePrice ? Number(values.basePrice) : null,
        discountedPrice: values.discountedPrice ? Number(values.discountedPrice) : "",
        duration: values.duration ? Number(values.duration) : "",
        images: values.baseImage ? [values.baseImage] : undefined,
        isActive: values.isActive,
      };
      const res = await fetch(mode === "create" ? "/api/services" : `/api/services/${serviceId}`, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save service");
        setSaving(false);
        return;
      }
      router.push("/admin/services");
      router.refresh();
    } catch {
      setError("Something went wrong.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Vendor *</span>
          <select required value={values.vendorId} onChange={(e) => set("vendorId", e.target.value)} className={inputCls}>
            <option value="">Select vendor</option>
            {vendors.map((v) => <option key={v.id} value={v.id}>{v.businessName}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Category</span>
          <select value={values.categoryId} onChange={(e) => set("categoryId", e.target.value)} className={inputCls}>
            <option value="">Use vendor category</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Title *</span>
          <input required value={values.title} onChange={(e) => set("title", e.target.value)} className={inputCls} placeholder="Grand Wedding Hall Package" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Base Price (LKR) *</span>
          <input required type="number" value={values.basePrice} onChange={(e) => set("basePrice", e.target.value)} className={inputCls} placeholder="750000" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Discount Price (LKR)</span>
          <input type="number" value={values.discountedPrice} onChange={(e) => set("discountedPrice", e.target.value)} className={inputCls} placeholder="650000" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Duration (hours)</span>
          <input type="number" value={values.duration} onChange={(e) => set("duration", e.target.value)} className={inputCls} placeholder="8" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Image URL</span>
          <input value={values.baseImage} onChange={(e) => set("baseImage", e.target.value)} className={inputCls} placeholder="https://..." />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Short Description</span>
        <textarea value={values.description} onChange={(e) => set("description", e.target.value)} rows={2} className={inputCls} />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Long Description</span>
        <textarea value={values.longDescription} onChange={(e) => set("longDescription", e.target.value)} rows={3} className={inputCls} />
      </label>
      <label className="flex cursor-pointer items-center gap-2.5">
        <input type="checkbox" checked={values.isActive} onChange={(e) => set("isActive", e.target.checked)} className="h-5 w-5 rounded accent-[#123f34]" />
        <span className="text-sm font-medium text-[#17352c]">Active (visible to customers)</span>
      </label>
      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[#123f34] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0f3329] disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {mode === "create" ? "Create Service" : "Save Changes"}
        </button>
        <Link href="/admin/services" className="rounded-full border border-[#eadfcb] px-6 py-3 text-sm font-medium text-[#17352c] hover:bg-[#fbf7ef]">Cancel</Link>
      </div>
    </form>
  );
}
