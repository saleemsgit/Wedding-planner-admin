import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, errorResponse } from "@/lib/api-auth";
import { serializeBooking } from "@/lib/serializers";

type Ctx = { params: Promise<{ id: string }> };

const STATUSES = ["PENDING", "CONFIRMED", "REJECTED", "COMPLETED", "CANCELLED"] as const;

export async function GET(request: Request, { params }: Ctx) {
  try {
    requireRole(request, ["ADMIN"]);
    const { id } = await params;
    const booking = await prisma.booking.findUnique({
      where: { id: Number(id) },
      include: { customer: true, vendor: true, service: true, package: true },
    });
    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    return NextResponse.json({ booking: serializeBooking(booking) });
  } catch (error) {
    return errorResponse(error);
  }
}

// PUT /api/bookings/[id] — admin updates status
export async function PUT(request: Request, { params }: Ctx) {
  try {
    requireRole(request, ["ADMIN"]);
    const { id } = await params;
    const body = await request.json();
    const status = String(body.status ?? "").toUpperCase();

    if (!(STATUSES as readonly string[]).includes(status)) {
      return NextResponse.json({ error: "Invalid booking status" }, { status: 400 });
    }

    const booking = await prisma.booking.update({
      where: { id: Number(id) },
      data: { status: status as any, notes: body.notes ?? undefined },
      include: { customer: true, vendor: true, service: true, package: true },
    });

    // Best-effort customer notification
    try {
      const typeMap: Record<string, any> = {
        CONFIRMED: "BOOKING_CONFIRMED",
        REJECTED: "BOOKING_REJECTED",
        PENDING: "BOOKING_PENDING",
      };
      if (typeMap[status]) {
        await prisma.notification.create({
          data: {
            userId: booking.customerId,
            title: `Booking ${status.toLowerCase()}`,
            message: `Your booking for ${booking.service?.title ?? "a service"} is now ${status.toLowerCase()}.`,
            type: typeMap[status],
            relatedId: booking.id,
          },
        });
      }
    } catch (e) {
      console.error("notification create failed", e);
    }

    return NextResponse.json({ booking: serializeBooking(booking) });
  } catch (error) {
    return errorResponse(error);
  }
}
