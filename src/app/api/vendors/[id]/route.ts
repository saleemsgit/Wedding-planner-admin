import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, errorResponse } from "@/lib/api-auth";
import { serializeVendor } from "@/lib/serializers";

const BADGES = ["AVAILABLE", "LIMITED", "BOOKED"] as const;
function normalizeBadge(badge: unknown) {
  const value = String(badge ?? "").toUpperCase();
  return (BADGES as readonly string[]).includes(value) ? (value as any) : undefined;
}

type Ctx = { params: Promise<{ id: string }> };

// GET /api/vendors/[id]
export async function GET(request: Request, { params }: Ctx) {
  try {
    requireRole(request, ["ADMIN"]);
    const { id } = await params;
    const vendor = await prisma.vendor.findUnique({
      where: { id: Number(id) },
      include: { category: true, services: true },
    });
    if (!vendor) return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    return NextResponse.json({ vendor: serializeVendor(vendor) });
  } catch (error) {
    return errorResponse(error);
  }
}

// PUT /api/vendors/[id]
export async function PUT(request: Request, { params }: Ctx) {
  try {
    requireRole(request, ["ADMIN"]);
    const { id } = await params;
    const body = await request.json();

    const imageList: string[] | undefined = Array.isArray(body.images)
      ? body.images.filter((i: unknown) => typeof i === "string" && i.length > 0)
      : undefined;
    const primaryImage = body.baseImage || imageList?.[0];

    const vendor = await prisma.vendor.update({
      where: { id: Number(id) },
      data: {
        businessName: body.businessName ?? undefined,
        categoryId: body.categoryId != null ? Number(body.categoryId) : undefined,
        description: body.description ?? undefined,
        location: body.location ?? undefined,
        address: body.address ?? undefined,
        phone: body.phone ?? undefined,
        email: body.email ?? undefined,
        minPrice:
          body.startingPrice != null
            ? Number(body.startingPrice)
            : body.minPrice != null
            ? Number(body.minPrice)
            : undefined,
        maxPrice: body.maxPrice != null ? Number(body.maxPrice) : undefined,
        rating: body.rating != null ? Number(body.rating) : undefined,
        reviewCount: body.reviewCount != null ? Number(body.reviewCount) : undefined,
        badge: normalizeBadge(body.badge),
        isVerified: body.isVerified != null ? Boolean(body.isVerified) : undefined,
        isFeatured: body.isFeatured != null ? Boolean(body.isFeatured) : undefined,
        isActive: body.isActive != null ? Boolean(body.isActive) : undefined,
        baseImage: primaryImage ?? undefined,
        images: imageList ?? undefined,
      },
      include: { category: true },
    });

    return NextResponse.json({ vendor: serializeVendor(vendor) });
  } catch (error) {
    return errorResponse(error);
  }
}

// DELETE /api/vendors/[id]  — soft delete (deactivate) by default, ?hard=true to remove
export async function DELETE(request: Request, { params }: Ctx) {
  try {
    requireRole(request, ["ADMIN"]);
    const { id } = await params;
    const url = new URL(request.url);
    const hard = url.searchParams.get("hard") === "true";

    if (hard) {
      await prisma.vendor.delete({ where: { id: Number(id) } });
      return NextResponse.json({ message: "Vendor deleted" });
    }

    const vendor = await prisma.vendor.update({
      where: { id: Number(id) },
      data: { isActive: false },
      include: { category: true },
    });
    return NextResponse.json({ vendor: serializeVendor(vendor), message: "Vendor deactivated" });
  } catch (error) {
    return errorResponse(error);
  }
}
