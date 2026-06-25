"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const inputCls =
  "w-full rounded-2xl border border-[#eadfcb] bg-white px-4 py-2.5 text-sm text-[#17352c] outline-none transition focus:border-[#c9a24f]";

export type DealFormValues = {
  title: string;
  description: string;
  vendorId: string;
  categoryId: string;
  originalPrice: string;
  discountedPrice: string;
  endDate: string;
  baseImage: string;
  isActive: boolean;
};

const empty: DealFormValues = {
  title: "",
  description: "",
  vendorId: "",
  categoryId: "",
  originalPrice: "",
  discountedPrice: "",
  endDate: "",
  baseImage: "",
  isActive: true,
};

export default function DealForm({ mode, dealId, initial }: { mode: "create" | "edit"; dealId?: number; initial?: Partial<DealFormValues> }) {
  const router = useRouter();
  const [values, setValues] = useState<DealFormValues>({ ...empty, ...initial });
  const [vendors, setVendors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/vendors").then((r) => r.json()).then((d) => setVendors(d.vendors ?? [])).catch(() => {});
    fetch("/api/categories").then((r) => r.json()).then((d) => setCategories(d.categories ?? [])).catch(() => {});
  }, []);

  const set = <K extends keyof DealFormValues>(k: K, v: DealFormValues[K]) => setValues((s) => ({ ...s, [k]: v }));

  const discountPct = (() => {
    const o = Number(values.originalPrice);
    const d = Number(values.discountedPrice);
    return o > 0 && d >= 0 ? Math.round(((o - d) / o) * 100) : 0;
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const payload = {
        title: values.title,
        description: values.description,
        vendorId: values.vendorId || "",
        categoryId: values.categoryId || "",
        originalPrice: values.originalPrice ? Number(values.originalPrice) : null,
        discountedPrice: values.discountedPrice ? Number(values.discountedPrice) : null,
        endDate: values.endDate || null,
        images: values.baseImage ? [values.baseImage] : undefined,
        isActive: values.isActive,
      };
      const res = await fetch(mode === "create" ? "/api/deals" : `/api/deals/${dealId}`, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to save deal"); setSaving(false); return; }
      router.push("/admin/deals");
      router.refresh();
    } catch {
      setError("Something went wrong.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Title *</span>
        <input required value={values.title} onChange={(e) => set("title", e.target.value)} className={inputCls} placeholder="Wedding Halls Special Offer" />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Vendor</span>
          <select value={values.vendorId} onChange={(e) => set("vendorId", e.target.value)} className={inputCls}>
            <option value="">No specific vendor</option>
            {vendors.map((v) => <option key={v.id} value={v.id}>{v.businessName}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Category</span>
          <select value={values.categoryId} onChange={(e) => set("categoryId", e.target.value)} className={inputCls}>
            <option value="">No specific category</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Original Price (LKR) *</span>
          <input required type="number" value={values.originalPrice} onChange={(e) => set("originalPrice", e.target.value)} className={inputCls} placeholder="750000" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Discounted Price (LKR) *</span>
          <input required type="number" value={values.discountedPrice} onChange={(e) => set("discountedPrice", e.target.value)} className={inputCls} placeholder="637500" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Discount %</span>
          <input readOnly value={`${discountPct}%`} className={`${inputCls} bg-[#fbf7ef]`} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Valid Until</span>
          <input type="date" value={values.endDate} onChange={(e) => set("endDate", e.target.value)} className={inputCls} />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Image URL</span>
          <input value={values.baseImage} onChange={(e) => set("baseImage", e.target.value)} className={inputCls} placeholder="https://..." />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Description</span>
        <textarea value={values.description} onChange={(e) => set("description", e.target.value)} rows={3} className={inputCls} />
      </label>
      <label className="flex cursor-pointer items-center gap-2.5">
        <input type="checkbox" checked={values.isActive} onChange={(e) => set("isActive", e.target.checked)} className="h-5 w-5 rounded accent-[#123f34]" />
        <span className="text-sm font-medium text-[#17352c]">Active</span>
      </label>
      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[#123f34] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0f3329] disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {mode === "create" ? "Create Deal" : "Save Changes"}
        </button>
        <Link href="/admin/deals" className="rounded-full border border-[#eadfcb] px-6 py-3 text-sm font-medium text-[#17352c] hover:bg-[#fbf7ef]">Cancel</Link>
      </div>
    </form>
  );
}
