import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, errorResponse } from "@/lib/api-auth";
import { toSafeIsoString } from "@/lib/serializers";

// GET /api/notifications — current admin's notifications + unread count
export async function GET(request: Request) {
  try {
    const auth = requireRole(request, ["ADMIN"]);
    const [notifications, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where: { userId: auth.id },
        orderBy: { createdAt: "desc" },
        take: 30,
      }),
      prisma.notification.count({ where: { userId: auth.id, isRead: false } }),
    ]);
    return NextResponse.json({
      unreadCount,
      notifications: notifications.map((n) => ({
        id: n.id,
        title: n.title,
        message: n.message,
        type: n.type,
        relatedId: n.relatedId,
        isRead: n.isRead,
        createdAt: toSafeIsoString(n.createdAt),
      })),
    });
  } catch (error) {
    return errorResponse(error);
  }
}

// POST /api/notifications — mark notifications read. Body { id } marks one; empty marks all.
export async function POST(request: Request) {
  try {
    const auth = requireRole(request, ["ADMIN"]);
    let id: number | undefined;
    try {
      const body = await request.json();
      if (body && body.id != null) id = Number(body.id);
    } catch {
      // no body = mark all
    }
    await prisma.notification.updateMany({
      where: { userId: auth.id, isRead: false, ...(id ? { id } : {}) },
      data: { isRead: true, readAt: new Date() },
    });
    const unreadCount = await prisma.notification.count({ where: { userId: auth.id, isRead: false } });
    return NextResponse.json({ unreadCount });
  } catch (error) {
    return errorResponse(error);
  }
}
