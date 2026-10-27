
import { NextResponse } from "next/server";
import { createSessionToken } from "@/lib/auth";
import { SESSION_COOKIE } from "@/lib/session";

// Day 42 — Sign In and Set a Secure Cookie

export async function POST(request) {
  const emailConfigured = process.env.DEMO_USER_EMAIL;
  const passwordConfigured = process.env.DEMO_USER_PASSWORD;

  if (!emailConfigured || !passwordConfigured) {
    return NextResponse.json(
      { error: "Sign-in is not configured." },
      { status: 500 }
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password =
    typeof body.password === "string" ? body.password : "";

  if (
    email !== emailConfigured.trim().toLowerCase() ||
    password !== passwordConfigured
  ) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  const user = {
    id: "demo_customer",
    name: "Demo Customer",
    email: emailConfigured.trim().toLowerCase(),
    role: "customer",
  };

  const token = createSessionToken(user);
  const response = NextResponse.json({ success: true });

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 8 * 60 * 60,
  });

  return response;
}
