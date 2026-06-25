import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, errorResponse } from "@/lib/api-auth";
import { serializeDeal } from "@/lib/serializers";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Ctx) {
  try {
    requireRole(request, ["ADMIN"]);
    const { id } = await params;
    const deal = await prisma.deal.findUnique({
      where: { id: Number(id) },
      include: { category: true, vendor: true },
    });
    if (!deal) return NextResponse.json({ error: "Deal not found" }, { status: 404 });
    return NextResponse.json({ deal: serializeDeal(deal) });
  } catch (error) {
    return errorResponse(error);
  }
}

async function update(request: Request, params: Ctx["params"]) {
  requireRole(request, ["ADMIN"]);
  const { id } = await params;
  const body = await request.json();

  let discount: number | undefined;
  if (body.originalPrice != null && body.discountedPrice != null) {
    const o = Number(body.originalPrice);
    const d = Number(body.discountedPrice);
    discount = o > 0 ? Math.round(((o - d) / o) * 100) : 0;
  } else if (body.discount != null && body.discount !== "") {
    discount = Number(body.discount);
  }

  const imageList: string[] | undefined = Array.isArray(body.images)
    ? body.images.filter((i: unknown) => typeof i === "string" && i.length > 0)
    : undefined;

  const deal = await prisma.deal.update({
    where: { id: Number(id) },
    data: {
      title: body.title ?? undefined,
      description: body.description ?? undefined,
      categoryId: body.categoryId === "" ? null : body.categoryId != null ? Number(body.categoryId) : undefined,
      vendorId: body.vendorId === "" ? null : body.vendorId != null ? Number(body.vendorId) : undefined,
      serviceId: body.serviceId === "" ? null : body.serviceId != null ? Number(body.serviceId) : undefined,
      originalPrice: body.originalPrice != null ? Number(body.originalPrice) : undefined,
      discountedPrice: body.discountedPrice != null ? Number(body.discountedPrice) : undefined,
      discount,
      discountValue: discount,
      startDate: body.startDate ? new Date(body.startDate) : undefined,
      endDate: body.endDate || body.validUntil ? new Date(body.endDate || body.validUntil) : undefined,
      images: imageList ?? undefined,
      image: imageList?.[0] ?? undefined,
      isActive: body.isActive != null ? Boolean(body.isActive) : undefined,
    },
    include: { category: true, vendor: true },
  });

  return NextResponse.json({ deal: serializeDeal(deal) });
}

export async function PUT(request: Request, { params }: Ctx) {
  try {
    return await update(request, params);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(request: Request, { params }: Ctx) {
  try {
    return await update(request, params);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request, { params }: Ctx) {
  try {
    requireRole(request, ["ADMIN"]);
    const { id } = await params;
    const url = new URL(request.url);
    const hard = url.searchParams.get("hard") === "true";
    if (hard) {
      await prisma.deal.delete({ where: { id: Number(id) } });
      return NextResponse.json({ message: "Deal deleted" });
    }
    const deal = await prisma.deal.update({
      where: { id: Number(id) },
      data: { isActive: false },
      include: { category: true, vendor: true },
    });
    return NextResponse.json({ deal: serializeDeal(deal), message: "Deal deactivated" });
  } catch (error) {
    return errorResponse(error);
  }
}
