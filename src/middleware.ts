import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  // If the user is not authenticated
  if (!token) {
    // Redirect to appropriate sign-in page if trying to access dashboard
    if (pathname.startsWith("/gpo/dashboard")) {
      return NextResponse.redirect(new URL("/gpo/sign-in", request.url));
    }
    if (pathname.startsWith("/admin/dashboard")) {
      return NextResponse.redirect(new URL("/admin/sign-in", request.url));
    }
    // Allow access to sign-in pages and other public routes
    return NextResponse.next();
  }

  // If the user is authenticated
  const userRole = token.role as string;
  const isActive = token.isActive as boolean;

  // Handle inactive GPO users
  if (
    userRole === "GPO" &&
    isActive === false &&
    pathname !== "/gpo/deactivated"
  ) {
    return NextResponse.redirect(new URL("/gpo/deactivated", request.url));
  }

  // Redirect GPO users trying to access sign-in page
  if (userRole === "GPO" && pathname === "/gpo/sign-in") {
    return NextResponse.redirect(new URL("/gpo/dashboard", request.url));
  }

  // Redirect Admin users trying to access sign-in page
  if (
    ["ADMIN", "SUPERADMIN"].includes(userRole) &&
    pathname === "/admin/sign-in"
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Prevent GPO users from accessing admin routes
  if (userRole === "GPO" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/gpo/dashboard", request.url));
  }

  // Prevent Admin users from accessing GPO routes
  if (
    ["ADMIN", "SUPERADMIN"].includes(userRole) &&
    pathname.startsWith("/gpo")
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Allow access to all other routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/gpo/:path*", "/admin/:path*"],
};
