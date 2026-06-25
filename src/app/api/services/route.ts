import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, errorResponse } from "@/lib/api-auth";
import { serializeService } from "@/lib/serializers";
import { slugify, cleanImages, normalizePackageInput } from "@/lib/service-helpers";

// GET /api/services — admin list
export async function GET(request: Request) {
  try {
    requireRole(request, ["ADMIN"]);
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
      include: { vendor: true, category: true, packages: true },
    });
    return NextResponse.json({ services: services.map(serializeService) });
  } catch (error) {
    return errorResponse(error);
  }
}

// POST /api/services — admin create (with images, cover, packages)
export async function POST(request: Request) {
  try {
    requireRole(request, ["ADMIN"]);
    const body = await request.json();
    const {
      vendorId,
      categoryId,
      title,
      description,
      longDescription,
      images,
      coverImage,
      basePrice,
      discountedPrice,
      capacity,
      duration,
      isActive,
      isFeatured,
      packages,
    } = body;

    if (!vendorId || !title || basePrice == null) {
      return NextResponse.json({ error: "Vendor, title and base price are required" }, { status: 400 });
    }

    const vendor = await prisma.vendor.findUnique({ where: { id: Number(vendorId) } });
    if (!vendor) return NextResponse.json({ error: "Vendor does not exist" }, { status: 400 });

    const resolvedCategoryId = categoryId != null ? Number(categoryId) : vendor.categoryId;
    const imageList = cleanImages(images);
    const cover = (typeof coverImage === "string" && coverImage) || imageList[0] || vendor.baseImage || null;
    if (cover && !imageList.includes(cover)) imageList.unshift(cover);

    const base = Number(basePrice);
    const discounted = discountedPrice != null && discountedPrice !== "" ? Number(discountedPrice) : null;
    const discountPercentage = discounted != null && base > 0 ? Math.round(((base - discounted) / base) * 100) : null;

    const incomingPackages = Array.isArray(packages) ? packages : [];

    const service = await prisma.service.create({
      data: {
        vendorId: Number(vendorId),
        categoryId: resolvedCategoryId,
        title,
        slug: `${slugify(title)}-${Date.now().toString(36)}`,
        description: description || null,
        longDescription: longDescription || null,
        coverImage: cover,
        images: imageList.length ? imageList : vendor.images,
        basePrice: base,
        discountedPrice: discounted,
        discountPercentage,
        capacity: capacity != null && capacity !== "" ? Number(capacity) : null,
        duration: duration != null && duration !== "" ? Number(duration) : null,
        isActive: isActive === undefined ? true : Boolean(isActive),
        isFeatured: Boolean(isFeatured),
        packages: incomingPackages.length
          ? { create: incomingPackages.map((p: any) => ({ ...normalizePackageInput(p), vendorId: Number(vendorId) })) }
          : undefined,
      },
      include: { vendor: true, category: true, packages: true },
    });

    return NextResponse.json({ service: serializeService(service) }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
