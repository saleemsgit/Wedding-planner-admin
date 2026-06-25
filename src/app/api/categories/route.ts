import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { errorResponse } from "@/lib/api-auth";

// GET /api/categories — list active categories (used by forms + customer site)
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
      select: { id: true, name: true, slug: true, icon: true, image: true, description: true },
    });
    return NextResponse.json({ categories });
  } catch (error) {
    return errorResponse(error);
  }
}
