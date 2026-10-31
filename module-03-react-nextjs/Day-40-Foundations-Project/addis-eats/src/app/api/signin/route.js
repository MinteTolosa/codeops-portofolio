
import { NextResponse } from "next/server";
import { createSessionToken, verifyPassword } from "@/lib/auth";
import { SESSION_COOKIE } from "@/lib/session";
import { findUserByEmail } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }
    const isDemoAdmin =
      email === process.env.DEMO_ADMIN_EMAIL?.trim().toLowerCase() &&
      password === process.env.DEMO_ADMIN_PASSWORD;
    const isDemoStaff =
      email === process.env.DEMO_STAFF_EMAIL?.trim().toLowerCase() 
      && password === process.env.DEMO_STAFF_PASSWORD;

    const isDemoCustomer = email === process.env.DEMO_USER_EMAIL?.trim().toLowerCase() 
      && password === process.env.DEMO_USER_PASSWORD;

    let user = null;

    if (isDemoAdmin) {
    user = {
      id: "demo_admin",
      name: "Admin",
      email,
      role: "admin",
    };
  } else if (isDemoStaff) {
    user = {
      id: "demo_staff",
      name: "Staff",
      email,
      role: "staff",
    };
  } else if (isDemoCustomer) {
    user = {
      id: "demo_customer",
      name: "Customer",
      email,
      role: "customer",
    };
  } else {
    const registeredUser = await findUserByEmail(email);

      if (
        registeredUser &&
        verifyPassword(password, registeredUser.passwordHash)
      ) { user = {
          id: registeredUser.id,
          name: registeredUser.name,
          email: registeredUser.email,
          role: registeredUser.role,
        };
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }
    const token = createSessionToken(user);

    const response = NextResponse.json({
      message: "Signed in successfully.",
      user: { id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Sign-in error:", error);

    return NextResponse.json(
      { error: "Unable to sign in. Please try again." },
      { status: 500 }
    );
  }
}
