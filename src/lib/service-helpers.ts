// Shared helpers for building Service + Package records from form input.

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function cleanImages(images: unknown): string[] {
  return Array.isArray(images)
    ? images.filter((i: unknown) => typeof i === "string" && i.trim().length > 0)
    : [];
}

export function normalizePackageInput(pkg: any) {
  const price = Number(pkg.price);
  const discounted =
    pkg.discountedPrice != null && pkg.discountedPrice !== "" ? Number(pkg.discountedPrice) : null;
  const features = Array.isArray(pkg.features)
    ? pkg.features.filter((f: unknown) => typeof f === "string" && f.trim().length > 0)
    : typeof pkg.features === "string"
    ? pkg.features.split("\n").map((f: string) => f.trim()).filter(Boolean)
    : [];
  return {
    name: String(pkg.name || "Package"),
    description: pkg.description ? String(pkg.description) : null,
    price: Number.isFinite(price) ? price : 0,
    discountedPrice: discounted,
    features,
    guestCapacity:
      pkg.guestCapacity != null && pkg.guestCapacity !== ""
        ? Number(pkg.guestCapacity)
        : pkg.capacity != null && pkg.capacity !== ""
        ? Number(pkg.capacity)
        : null,
    duration: pkg.duration != null && pkg.duration !== "" ? Number(pkg.duration) : null,
    isActive: pkg.isActive === undefined ? true : Boolean(pkg.isActive),
  };
}
