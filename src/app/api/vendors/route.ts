import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, errorResponse } from "@/lib/api-auth";
import { serializeVendor } from "@/lib/serializers";

const BADGES = ["AVAILABLE", "LIMITED", "BOOKED"] as const;

function normalizeBadge(badge: unknown): "AVAILABLE" | "LIMITED" | "BOOKED" {
  const value = String(badge ?? "").toUpperCase();
  return (BADGES as readonly string[]).includes(value) ? (value as any) : "AVAILABLE";
}

// GET /api/vendors  — admin list (all vendors, newest first)
export async function GET(request: Request) {
  try {
    requireRole(request, ["ADMIN"]);
    const vendors = await prisma.vendor.findMany({
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      include: { category: true, services: true },
    });
    return NextResponse.json({ vendors: vendors.map(serializeVendor) });
  } catch (error) {
    return errorResponse(error);
  }
}

// POST /api/vendors — admin create
export async function POST(request: Request) {
  try {
    requireRole(request, ["ADMIN"]);
    const body = await request.json();
    const {
      businessName,
      categoryId,
      description,
      location,
      address,
      phone,
      email,
      startingPrice,
      minPrice,
      maxPrice,
      rating,
      reviewCount,
      badge,
      isVerified,
      isFeatured,
      isActive,
      baseImage,
      images,
    } = body;

    if (!businessName || !categoryId || !location || !phone || !email) {
      return NextResponse.json(
        { error: "Business name, category, location, phone and email are required" },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({ where: { id: Number(categoryId) } });
    if (!category) {
      return NextResponse.json({ error: "Selected category does not exist" }, { status: 400 });
    }

    const existing = await prisma.vendor.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "A vendor with this email already exists" }, { status: 400 });
    }

    const imageList: string[] = Array.isArray(images)
      ? images.filter((i: unknown) => typeof i === "string" && i.length > 0)
      : [];
    const primaryImage = baseImage || imageList[0] || null;
    if (primaryImage && !imageList.includes(primaryImage)) imageList.unshift(primaryImage);

    const vendor = await prisma.vendor.create({
      data: {
        businessName,
        categoryId: Number(categoryId),
        description: description || null,
        location,
        address: address || null,
        phone,
        email,
        minPrice:
          startingPrice != null ? Number(startingPrice) : minPrice != null ? Number(minPrice) : null,
        maxPrice: maxPrice != null ? Number(maxPrice) : null,
        rating: rating != null ? Number(rating) : 0,
        reviewCount: reviewCount != null ? Number(reviewCount) : 0,
        badge: normalizeBadge(badge),
        isVerified: Boolean(isVerified),
        isFeatured: Boolean(isFeatured),
        isActive: isActive === undefined ? true : Boolean(isActive),
        baseImage: primaryImage,
        images: imageList,
      },
      include: { category: true },
    });

    return NextResponse.json({ vendor: serializeVendor(vendor) }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
