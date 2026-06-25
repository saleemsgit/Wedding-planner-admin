"use client";

import { useState } from "react";

export default function CreateVendorForm() {
  const [form, setForm] = useState({ businessName: "", category: "", location: "", startingPrice: "", badge: "Available", verified: false, image: "" });
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      const res = await fetch("/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed");
      setStatus("saved");
      setForm({ businessName: "", category: "", location: "", startingPrice: "", badge: "Available", verified: false, image: "" });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 rounded-2xl border bg-white">
      <div className="grid grid-cols-2 gap-2">
        <input value={form.businessName} onChange={(e) => setForm((s) => ({ ...s, businessName: e.target.value }))} placeholder="Business name" className="p-2 border rounded" required />
        <input value={form.category} onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))} placeholder="Category" className="p-2 border rounded" required />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input value={form.location} onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))} placeholder="Location" className="p-2 border rounded" required />
        <input value={form.startingPrice} onChange={(e) => setForm((s) => ({ ...s, startingPrice: e.target.value }))} placeholder="Starting price" className="p-2 border rounded" />
      </div>
      <div className="flex items-center gap-2">
        <select value={form.badge} onChange={(e) => setForm((s) => ({ ...s, badge: e.target.value }))} className="p-2 border rounded">
          <option>Available</option>
          <option>Limited</option>
          <option>Booked</option>
        </select>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.verified} onChange={(e) => setForm((s) => ({ ...s, verified: e.target.checked }))} /> Verified
        </label>
      </div>
      <div>
        <input value={form.image} onChange={(e) => setForm((s) => ({ ...s, image: e.target.value }))} placeholder="Image URL" className="p-2 border rounded w-full" />
      </div>
      <div className="flex items-center gap-2">
        <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white">Create vendor</button>
        {status === "saving" && <span>Saving...</span>}
        {status === "saved" && <span className="text-green-600">Saved</span>}
        {status === "error" && <span className="text-red-600">Error</span>}
      </div>
    </form>
  );
}
