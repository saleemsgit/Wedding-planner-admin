"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Plus, Trash2, Star, X, Upload, ImagePlus } from "lucide-react";

const inputCls =
  "w-full rounded-2xl border border-[#eadfcb] bg-white px-4 py-2.5 text-sm text-[#17352c] outline-none transition focus:border-[#c9a24f]";

export type PackageInput = {
  id?: number;
  name: string;
  price: string;
  discountedPrice: string;
  description: string;
  features: string; // newline separated in the form
  guestCapacity: string;
  duration: string;
  isActive: boolean;
};

export type ServiceFormValues = {
  vendorId: string;
  categoryId: string;
  title: string;
  description: string; // short
  longDescription: string; // full
  basePrice: string;
  discountedPrice: string;
  capacity: string;
  duration: string;
  isFeatured: boolean;
  isActive: boolean;
  images: string[];
  coverImage: string;
  packages: PackageInput[];
};

const emptyPackage: PackageInput = {
  name: "",
  price: "",
  discountedPrice: "",
  description: "",
  features: "",
  guestCapacity: "",
  duration: "",
  isActive: true,
};

const empty: ServiceFormValues = {
  vendorId: "",
  categoryId: "",
  title: "",
  description: "",
  longDescription: "",
  basePrice: "",
  discountedPrice: "",
  capacity: "",
  duration: "",
  isFeatured: false,
  isActive: true,
  images: [],
  coverImage: "",
  packages: [],
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
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/vendors").then((r) => r.json()).then((d) => setVendors(d.vendors ?? [])).catch(() => {});
    fetch("/api/categories").then((r) => r.json()).then((d) => setCategories(d.categories ?? [])).catch(() => {});
  }, []);

  const set = <K extends keyof ServiceFormValues>(k: K, v: ServiceFormValues[K]) => setValues((s) => ({ ...s, [k]: v }));

  // ---- Images ----
  const addImageUrls = (urls: string[]) => {
    setValues((s) => {
      const next = Array.from(new Set([...s.images, ...urls.filter(Boolean)]));
      return { ...s, images: next, coverImage: s.coverImage || next[0] || "" };
    });
  };
  const addUrl = () => {
    const url = imageUrl.trim();
    if (!url) return;
    addImageUrls([url]);
    setImageUrl("");
  };
  const removeImage = (url: string) => {
    setValues((s) => {
      const next = s.images.filter((i) => i !== url);
      return { ...s, images: next, coverImage: s.coverImage === url ? next[0] ?? "" : s.coverImage };
    });
  };
  const setCover = (url: string) => set("coverImage", url);

  const handleFiles = async (fileList: FileList | File[] | null) => {
    if (!fileList) return;
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) {
      setError("Please drop image files only.");
      return;
    }
    setUploading(true);
    setError(null);
    const uploaded: string[] = [];
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/cloudinary/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (res.ok && data.url) uploaded.push(data.url);
        else setError(data.error || "One or more images failed to upload. You can paste an image URL instead.");
      }
      if (uploaded.length) addImageUrls(uploaded);
    } catch {
      setError("Image upload failed. You can paste an image URL instead.");
    } finally {
      setUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); if (!dragActive) setDragActive(true); };
  const onDragLeave = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
  };

  // ---- Packages ----
  const addPackage = () => setValues((s) => ({ ...s, packages: [...s.packages, { ...emptyPackage }] }));
  const removePackage = (idx: number) => setValues((s) => ({ ...s, packages: s.packages.filter((_, i) => i !== idx) }));
  const setPackage = (idx: number, patch: Partial<PackageInput>) =>
    setValues((s) => ({ ...s, packages: s.packages.map((p, i) => (i === idx ? { ...p, ...patch } : p)) }));

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
        discountedPrice: values.discountedPrice === "" ? "" : Number(values.discountedPrice),
        capacity: values.capacity === "" ? "" : Number(values.capacity),
        duration: values.duration === "" ? "" : Number(values.duration),
        isFeatured: values.isFeatured,
        isActive: values.isActive,
        images: values.images,
        coverImage: values.coverImage,
        packages: values.packages.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price ? Number(p.price) : 0,
          discountedPrice: p.discountedPrice,
          description: p.description,
          features: p.features.split("\n").map((f) => f.trim()).filter(Boolean),
          guestCapacity: p.guestCapacity,
          duration: p.duration,
          isActive: p.isActive,
        })),
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {error ? <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}

      {/* Basic details */}
      <section>
        <h3 className="mb-4 font-serif text-lg text-[#17352c]">Basic details</h3>
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
            <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Service / Hall title *</span>
            <input required value={values.title} onChange={(e) => set("title", e.target.value)} className={inputCls} placeholder="Royal Gardens Grand Ballroom" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Starting price (LKR) *</span>
            <input required type="number" value={values.basePrice} onChange={(e) => set("basePrice", e.target.value)} className={inputCls} placeholder="250000" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Discount price (LKR)</span>
            <input type="number" value={values.discountedPrice} onChange={(e) => set("discountedPrice", e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Capacity / guests</span>
            <input type="number" value={values.capacity} onChange={(e) => set("capacity", e.target.value)} className={inputCls} placeholder="400" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Duration (hours)</span>
            <input type="number" value={values.duration} onChange={(e) => set("duration", e.target.value)} className={inputCls} placeholder="8" />
          </label>
        </div>
        <label className="mt-5 block">
          <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Short description</span>
          <textarea value={values.description} onChange={(e) => set("description", e.target.value)} rows={2} className={inputCls} placeholder="One-line summary shown on cards" />
        </label>
        <label className="mt-4 block">
          <span className="mb-1.5 block text-sm font-medium text-[#17352c]">Full description</span>
          <textarea value={values.longDescription} onChange={(e) => set("longDescription", e.target.value)} rows={4} className={inputCls} placeholder="Detailed description shown on the service detail page" />
        </label>
        <div className="mt-4 flex flex-wrap gap-6">
          <Toggle label="Featured" checked={values.isFeatured} onChange={(v) => set("isFeatured", v)} />
          <Toggle label="Active (visible to customers)" checked={values.isActive} onChange={(v) => set("isActive", v)} />
        </div>
      </section>

      {/* Images */}
      <section>
        <h3 className="mb-1 font-serif text-lg text-[#17352c]">Images</h3>
        <p className="mb-4 text-sm text-[#6e7e76]">Drag &amp; drop photos, click to browse, or paste a URL. Click the star to set the cover image used on cards.</p>

        {/* Drag & drop zone */}
        <label
          onDragOver={onDragOver}
          onDragEnter={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${
            dragActive ? "border-[#c9a24f] bg-[#f7efdc] ring-2 ring-[#c9a24f]" : "border-[#eadfcb] bg-[#fbf7ef] hover:border-[#c9a24f]"
          }`}
        >
          {uploading ? <Loader2 className="h-7 w-7 animate-spin text-[#9a7b32]" /> : <Upload className="h-7 w-7 text-[#9a7b32]" />}
          <p className="mt-2 text-sm font-medium text-[#17352c]">
            {uploading ? "Uploading…" : dragActive ? "Drop images to upload" : "Drag & drop images here"}
          </p>
          <p className="text-xs text-[#6e7e76]">or click to browse — you can select several at once</p>
          <input type="file" accept="image/*" multiple className="hidden" disabled={uploading} onChange={(e) => handleFiles(e.target.files)} />
        </label>

        <div className="mt-3 flex items-center gap-2">
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addUrl(); } }} className={inputCls} placeholder="…or paste an image URL and press Add" />
          <button type="button" onClick={addUrl} className="inline-flex items-center gap-1 rounded-2xl border border-[#eadfcb] px-4 py-2.5 text-sm font-medium text-[#17352c] hover:bg-[#fbf7ef]"><Plus className="h-4 w-4" /> Add</button>
        </div>

        {values.images.length === 0 ? (
          <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#eadfcb] bg-[#fbf7ef] py-10 text-[#9bafa6]">
            <ImagePlus className="h-7 w-7" />
            <p className="mt-2 text-sm">No images yet</p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {values.images.map((url) => {
              const isCover = values.coverImage === url;
              return (
                <div key={url} className={`group relative overflow-hidden rounded-2xl border ${isCover ? "border-[#c9a24f] ring-2 ring-[#c9a24f]" : "border-[#eadfcb]"}`}>
                  <img src={url} alt="" className="h-28 w-full object-cover" />
                  {isCover ? <span className="absolute left-2 top-2 rounded-full bg-[#c9a24f] px-2 py-0.5 text-[10px] font-semibold text-white">Cover</span> : null}
                  <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 bg-black/40 p-1.5 opacity-0 transition group-hover:opacity-100">
                    <button type="button" onClick={() => setCover(url)} className="flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-medium text-[#9a7b32]" title="Set as cover">
                      <Star className={`h-3 w-3 ${isCover ? "fill-[#c9a24f] text-[#c9a24f]" : ""}`} /> Cover
                    </button>
                    <button type="button" onClick={() => removeImage(url)} className="rounded-lg bg-white/90 p-1 text-rose-600" title="Remove"><X className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Packages */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg text-[#17352c]">Packages</h3>
            <p className="text-sm text-[#6e7e76]">Add tiers like Basic, Premium, Luxury. Customers pick one when booking.</p>
          </div>
          <button type="button" onClick={addPackage} className="inline-flex items-center gap-2 rounded-full bg-[#123f34] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0f3329]"><Plus className="h-4 w-4" /> Add package</button>
        </div>

        {values.packages.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#eadfcb] bg-[#fbf7ef] py-8 text-center text-sm text-[#6e7e76]">No packages yet. Click “Add package” to create Basic / Premium / Luxury tiers.</div>
        ) : (
          <div className="space-y-4">
            {values.packages.map((p, idx) => (
              <div key={idx} className="rounded-2xl border border-[#eadfcb] bg-[#fffdf8] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-[#f7f1e2] px-3 py-1 text-xs font-semibold text-[#9a7b32]">Package {idx + 1}</span>
                  <button type="button" onClick={() => removePackage(idx)} className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 hover:underline"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input value={p.name} onChange={(e) => setPackage(idx, { name: e.target.value })} className={inputCls} placeholder="Package name (e.g. Premium)" />
                  <input type="number" value={p.price} onChange={(e) => setPackage(idx, { price: e.target.value })} className={inputCls} placeholder="Price (LKR)" />
                  <input type="number" value={p.discountedPrice} onChange={(e) => setPackage(idx, { discountedPrice: e.target.value })} className={inputCls} placeholder="Discounted price (optional)" />
                  <input type="number" value={p.guestCapacity} onChange={(e) => setPackage(idx, { guestCapacity: e.target.value })} className={inputCls} placeholder="Guest capacity (optional)" />
                  <input type="number" value={p.duration} onChange={(e) => setPackage(idx, { duration: e.target.value })} className={inputCls} placeholder="Duration hours (optional)" />
                  <input value={p.description} onChange={(e) => setPackage(idx, { description: e.target.value })} className={inputCls} placeholder="Short description" />
                </div>
                <label className="mt-3 block">
                  <span className="mb-1 block text-xs font-medium text-[#6e7e76]">Features / what's included — one per line</span>
                  <textarea value={p.features} onChange={(e) => setPackage(idx, { features: e.target.value })} rows={3} className={inputCls} placeholder={"Hall rental 8 hours\nPremium decoration\nCatering for 400 guests"} />
                </label>
                <div className="mt-2"><Toggle label="Active" checked={p.isActive} onChange={(v) => setPackage(idx, { isActive: v })} /></div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="flex items-center gap-3 border-t border-[#eadfcb] pt-5">
        <button type="submit" disabled={saving || uploading} className="inline-flex items-center gap-2 rounded-full bg-[#123f34] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0f3329] disabled:opacity-60">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {mode === "create" ? "Create Service" : "Save Changes"}
        </button>
        <Link href="/admin/services" className="rounded-full border border-[#eadfcb] px-6 py-3 text-sm font-medium text-[#17352c] hover:bg-[#fbf7ef]">Cancel</Link>
      </div>
    </form>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 rounded accent-[#123f34]" />
      <span className="text-sm font-medium text-[#17352c]">{label}</span>
    </label>
  );
}
