
import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";

// Day 42 — Route Protection and Role Authorization

export function proxy(request) {
  
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get("addis_eats_session")?.value;
  const user = verifySessionToken(token);

  const isKitchen = pathname.startsWith("/kitchen");
  const isDashboard = pathname.startsWith("/dashboard");
  const isProtected =
  pathname.startsWith("/checkout") ||
  pathname.startsWith("/orders") ||
  isKitchen || isDashboard;

  if (isProtected && !user) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("next", pathname + search);
    return NextResponse.redirect(signInUrl);
  }

  if (
    isKitchen &&
    !["staff", "admin"].includes(user?.role)
  ) {
    return NextResponse.redirect(new URL("/orders", request.url));
  }

  if (isDashboard && user?.role !== "admin") {
  return NextResponse.redirect(new URL("/orders", request.url)); }

  if (
    (pathname === "/signin" || pathname === "/signup") &&
    user
  ) {
  return NextResponse.redirect(new URL("/", request.url));
}

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/checkout/:path*",
    "/dashboard/:path*",
    "/orders/:path*",
    "/kitchen/:path*",
    "/signin",
    "/signup",
  ],
};
