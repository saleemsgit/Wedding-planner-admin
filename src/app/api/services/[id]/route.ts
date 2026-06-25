import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, errorResponse } from "@/lib/api-auth";
import { serializeService } from "@/lib/serializers";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Ctx) {
  try {
    requireRole(request, ["ADMIN"]);
    const { id } = await params;
    const service = await prisma.service.findUnique({
      where: { id: Number(id) },
      include: { vendor: true, category: true, packages: true },
    });
    if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });
    return NextResponse.json({ service: serializeService(service) });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, { params }: Ctx) {
  try {
    requireRole(request, ["ADMIN"]);
    const { id } = await params;
    const body = await request.json();

    const imageList: string[] | undefined = Array.isArray(body.images)
      ? body.images.filter((i: unknown) => typeof i === "string" && i.length > 0)
      : undefined;

    let discountPercentage: number | undefined;
    if (body.basePrice != null && body.discountedPrice != null && body.discountedPrice !== "") {
      const base = Number(body.basePrice);
      const disc = Number(body.discountedPrice);
      discountPercentage = base > 0 ? Math.round(((base - disc) / base) * 100) : 0;
    }

    const service = await prisma.service.update({
      where: { id: Number(id) },
      data: {
        vendorId: body.vendorId != null ? Number(body.vendorId) : undefined,
        categoryId: body.categoryId != null ? Number(body.categoryId) : undefined,
        title: body.title ?? undefined,
        description: body.description ?? undefined,
        longDescription: body.longDescription ?? undefined,
        images: imageList ?? undefined,
        basePrice: body.basePrice != null ? Number(body.basePrice) : undefined,
        discountedPrice:
          body.discountedPrice === "" ? null : body.discountedPrice != null ? Number(body.discountedPrice) : undefined,
        discountPercentage,
        duration: body.duration != null && body.duration !== "" ? Number(body.duration) : undefined,
        isActive: body.isActive != null ? Boolean(body.isActive) : undefined,
      },
      include: { vendor: true, category: true, packages: true },
    });

    return NextResponse.json({ service: serializeService(service) });
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
      await prisma.service.delete({ where: { id: Number(id) } });
      return NextResponse.json({ message: "Service deleted" });
    }

    const service = await prisma.service.update({
      where: { id: Number(id) },
      data: { isActive: false },
      include: { vendor: true, category: true, packages: true },
    });
    return NextResponse.json({ service: serializeService(service), message: "Service deactivated" });
  } catch (error) {
    return errorResponse(error);
  }
}
