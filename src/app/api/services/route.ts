import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, errorResponse } from "@/lib/api-auth";
import { serializeService } from "@/lib/serializers";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

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

// POST /api/services — admin create
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
      basePrice,
      discountedPrice,
      duration,
      isActive,
    } = body;

    if (!vendorId || !title || basePrice == null) {
      return NextResponse.json(
        { error: "Vendor, title and base price are required" },
        { status: 400 }
      );
    }

    const vendor = await prisma.vendor.findUnique({ where: { id: Number(vendorId) } });
    if (!vendor) return NextResponse.json({ error: "Vendor does not exist" }, { status: 400 });

    const resolvedCategoryId = categoryId != null ? Number(categoryId) : vendor.categoryId;
    const imageList: string[] = Array.isArray(images)
      ? images.filter((i: unknown) => typeof i === "string" && i.length > 0)
      : [];

    const base = Number(basePrice);
    const discounted = discountedPrice != null && discountedPrice !== "" ? Number(discountedPrice) : null;
    const discountPercentage =
      discounted != null && base > 0 ? Math.round(((base - discounted) / base) * 100) : null;

    const service = await prisma.service.create({
      data: {
        vendorId: Number(vendorId),
        categoryId: resolvedCategoryId,
        title,
        slug: `${slugify(title)}-${Date.now().toString(36)}`,
        description: description || null,
        longDescription: longDescription || null,
        images: imageList.length ? imageList : vendor.images,
        basePrice: base,
        discountedPrice: discounted,
        discountPercentage,
        duration: duration != null && duration !== "" ? Number(duration) : null,
        isActive: isActive === undefined ? true : Boolean(isActive),
      },
      include: { vendor: true, category: true, packages: true },
    });

    return NextResponse.json({ service: serializeService(service) }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
