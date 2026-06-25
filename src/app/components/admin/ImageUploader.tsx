"use client";

import { useState } from "react";
import { Loader2, Plus, Star, X, Upload } from "lucide-react";

const inputCls =
  "w-full rounded-2xl border border-[#eadfcb] bg-white px-4 py-2.5 text-sm text-[#17352c] outline-none transition focus:border-[#c9a24f]";

/**
 * Reusable multi-image picker with drag & drop, click-to-browse, URL paste,
 * preview grid, remove, and cover selection. Uploads to /api/cloudinary/upload.
 */
export default function ImageUploader({
  images,
  coverImage,
  onChange,
}: {
  images: string[];
  coverImage: string;
  onChange: (images: string[], coverImage: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addUrls = (urls: string[]) => {
    const clean = urls.map((u) => u.trim()).filter(Boolean);
    if (!clean.length) return;
    const next = Array.from(new Set([...images, ...clean]));
    onChange(next, coverImage || next[0] || "");
  };

  const addUrlField = () => {
    if (!imageUrl.trim()) return;
    addUrls([imageUrl]);
    setImageUrl("");
  };

  const removeImage = (url: string) => {
    const next = images.filter((i) => i !== url);
    onChange(next, coverImage === url ? next[0] ?? "" : coverImage);
  };

  const setCover = (url: string) => onChange(images, url);

  const handleFiles = async (fileList: FileList | File[] | null) => {
    if (!fileList) return;
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) {
      setError("Please choose image files only.");
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
        else setError(data.error || "Some images failed to upload. You can paste an image URL instead.");
      }
      if (uploaded.length) addUrls(uploaded);
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

  return (
    <div>
      {error ? <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</div> : null}

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
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addUrlField(); } }}
          className={inputCls}
          placeholder="…or paste an image URL and press Add"
        />
        <button type="button" onClick={addUrlField} className="inline-flex items-center gap-1 rounded-2xl border border-[#eadfcb] px-4 py-2.5 text-sm font-medium text-[#17352c] hover:bg-[#fbf7ef]">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      {images.length > 0 ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((url) => {
            const isCover = coverImage === url;
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
      ) : null}
    </div>
  );
}
