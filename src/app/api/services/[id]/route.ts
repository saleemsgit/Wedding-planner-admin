import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, errorResponse } from "@/lib/api-auth";
import { serializeService } from "@/lib/serializers";
import { cleanImages, normalizePackageInput } from "@/lib/service-helpers";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Ctx) {
  try {
    requireRole(request, ["ADMIN"]);
    const { id } = await params;
    const service = await prisma.service.findUnique({
      where: { id: Number(id) },
      include: { vendor: true, category: true, packages: { orderBy: { price: "asc" } } },
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
    const serviceId = Number(id);
    const body = await request.json();

    const existing = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!existing) return NextResponse.json({ error: "Service not found" }, { status: 404 });

    const imageList = body.images !== undefined ? cleanImages(body.images) : undefined;
    let cover: string | undefined;
    if (body.coverImage !== undefined || imageList !== undefined) {
      cover = (typeof body.coverImage === "string" && body.coverImage) || imageList?.[0] || undefined;
      if (cover && imageList && !imageList.includes(cover)) imageList.unshift(cover);
    }

    let discountPercentage: number | undefined;
    if (body.basePrice != null && body.discountedPrice != null && body.discountedPrice !== "") {
      const base = Number(body.basePrice);
      const disc = Number(body.discountedPrice);
      discountPercentage = base > 0 ? Math.round(((base - disc) / base) * 100) : 0;
    }

    // --- Sync packages if provided ---
    if (Array.isArray(body.packages)) {
      const incoming = body.packages;
      const incomingIds = incoming.filter((p: any) => p.id).map((p: any) => Number(p.id));
      // delete packages removed in the form
      await prisma.package.deleteMany({
        where: { serviceId, id: { notIn: incomingIds.length ? incomingIds : [-1] } },
      });
      for (const p of incoming) {
        const data = { ...normalizePackageInput(p), vendorId: existing.vendorId, serviceId };
        if (p.id) {
          await prisma.package.update({ where: { id: Number(p.id) }, data });
        } else {
          await prisma.package.create({ data });
        }
      }
    }

    const service = await prisma.service.update({
      where: { id: serviceId },
      data: {
        vendorId: body.vendorId != null ? Number(body.vendorId) : undefined,
        categoryId: body.categoryId != null ? Number(body.categoryId) : undefined,
        title: body.title ?? undefined,
        description: body.description ?? undefined,
        longDescription: body.longDescription ?? undefined,
        coverImage: cover ?? (body.coverImage === "" ? null : undefined),
        images: imageList ?? undefined,
        basePrice: body.basePrice != null ? Number(body.basePrice) : undefined,
        discountedPrice:
          body.discountedPrice === "" ? null : body.discountedPrice != null ? Number(body.discountedPrice) : undefined,
        discountPercentage,
        capacity: body.capacity === "" ? null : body.capacity != null ? Number(body.capacity) : undefined,
        duration: body.duration === "" ? null : body.duration != null ? Number(body.duration) : undefined,
        isActive: body.isActive != null ? Boolean(body.isActive) : undefined,
        isFeatured: body.isFeatured != null ? Boolean(body.isFeatured) : undefined,
      },
      include: { vendor: true, category: true, packages: { orderBy: { price: "asc" } } },
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
