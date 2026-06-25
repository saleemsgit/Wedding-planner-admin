import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, errorResponse } from "@/lib/api-auth";
import { serializeDeal } from "@/lib/serializers";

// GET /api/deals — admin list (all deals)
export async function GET(request: Request) {
  try {
    requireRole(request, ["ADMIN"]);
    const deals = await prisma.deal.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true, vendor: true },
    });
    return NextResponse.json({ deals: deals.map(serializeDeal) });
  } catch (error) {
    return errorResponse(error);
  }
}

// POST /api/deals — admin create
export async function POST(request: Request) {
  try {
    requireRole(request, ["ADMIN"]);
    const body = await request.json();
    const {
      title,
      description,
      categoryId,
      vendorId,
      serviceId,
      originalPrice,
      discountedPrice,
      discount,
      startDate,
      endDate,
      validUntil,
      images,
      image,
      isActive,
    } = body;

    if (!title || originalPrice == null || discountedPrice == null) {
      return NextResponse.json(
        { error: "Title, original price and discounted price are required" },
        { status: 400 }
      );
    }

    const original = Number(originalPrice);
    const discounted = Number(discountedPrice);
    const computedDiscount =
      discount != null && discount !== ""
        ? Number(discount)
        : original > 0
        ? Math.round(((original - discounted) / original) * 100)
        : 0;

    const end = endDate || validUntil;
    const imageList: string[] = Array.isArray(images)
      ? images.filter((i: unknown) => typeof i === "string" && i.length > 0)
      : [];
    if (image && !imageList.includes(image)) imageList.unshift(image);

    const deal = await prisma.deal.create({
      data: {
        title,
        description: description || null,
        categoryId: categoryId != null && categoryId !== "" ? Number(categoryId) : null,
        vendorId: vendorId != null && vendorId !== "" ? Number(vendorId) : null,
        serviceId: serviceId != null && serviceId !== "" ? Number(serviceId) : null,
        discountType: "PERCENTAGE",
        discountValue: computedDiscount,
        discount: computedDiscount,
        originalPrice: original,
        discountedPrice: discounted,
        image: imageList[0] || null,
        images: imageList,
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: end ? new Date(end) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: isActive === undefined ? true : Boolean(isActive),
      },
      include: { category: true, vendor: true },
    });

    return NextResponse.json({ deal: serializeDeal(deal) }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
