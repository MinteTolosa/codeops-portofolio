
import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";

// Day 42 — Route Protection and Role Authorization

export function proxy(request) {
  
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get("addis_eats_session")?.value;
  const user = verifySessionToken(token);

  const isKitchen = pathname.startsWith("/kitchen");
  const isProtected =
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/orders") ||
    isKitchen;

  if (isProtected && !user) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("next", pathname + search);
    return NextResponse.redirect(signInUrl);
  }

  if (isKitchen && user?.role !== "staff") {
    return NextResponse.redirect(new URL("/orders", request.url));
  }

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
    "/orders/:path*",
    "/kitchen/:path*",
    "/signin",
    "/signup",
  ],
};
