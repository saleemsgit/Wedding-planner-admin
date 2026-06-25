import { NextResponse } from "next/server";
import { verifyToken, getCookie, getTokenFromHeader, type JWTPayload } from "@/lib/auth";

/**
 * Extract and verify the auth token from a request.
 * Looks first at the HTTP-only `token` cookie, then the Authorization header.
 * Returns the decoded JWT payload, or null if missing/invalid.
 */
export function getAuth(request: Request): JWTPayload | null {
  const cookieToken = getCookie(request.headers.get("cookie") ?? undefined, "admin_token");
  const headerToken = getTokenFromHeader(request.headers.get("authorization") ?? undefined);
  const token = cookieToken ?? headerToken;
  if (!token) return null;
  return verifyToken(token);
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * Require an authenticated user with one of the allowed roles.
 * Throws AuthError (401/403) which callers convert into a JSON response.
 */
export function requireRole(
  request: Request,
  roles: Array<"ADMIN" | "CUSTOMER" | "VENDOR">
): JWTPayload {
  const auth = getAuth(request);
  if (!auth) {
    throw new AuthError("Authentication required", 401);
  }
  if (!roles.includes(auth.role)) {
    throw new AuthError("You do not have permission to perform this action", 403);
  }
  return auth;
}

/** Convert any error into a clean JSON response. AuthError keeps its status. */
export function errorResponse(error: unknown) {
  if (error instanceof AuthError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error("API error:", error);
  return NextResponse.json({ error: "Server error" }, { status: 500 });
}
