import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, errorResponse } from "@/lib/api-auth";
import { serializeBooking } from "@/lib/serializers";

// GET /api/bookings — admin list of all bookings
export async function GET(request: Request) {
  try {
    requireRole(request, ["ADMIN"]);
    const url = new URL(request.url);
    const status = url.searchParams.get("status");

    const bookings = await prisma.booking.findMany({
      where: status ? { status: status as any } : undefined,
      orderBy: { createdAt: "desc" },
      include: { customer: true, vendor: true, service: true, package: true },
    });
    return NextResponse.json({ bookings: bookings.map(serializeBooking) });
  } catch (error) {
    return errorResponse(error);
  }
}
