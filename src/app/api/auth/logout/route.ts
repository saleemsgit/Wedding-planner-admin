import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout successful" },
    { status: 200 }
  );

  // Clear cookie (admin-specific name)
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return response;
}
