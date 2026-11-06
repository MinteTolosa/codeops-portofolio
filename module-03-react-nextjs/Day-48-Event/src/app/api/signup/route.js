import { NextResponse } from "next/server";
import { z } from "zod";
import { createUser } from "@/lib/db";
import { createSessionToken } from "@/lib/auth";
import { SESSION_COOKIE } from "@/lib/session";

const signupSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(128),
});

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
  const result = signupSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        error: "Please correct the registration details.",
        fieldErrors: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  try {
    const user = await createUser(result.data);

    if (!user) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const token = createSessionToken(user);

    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );

    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Sign-up failed:", error);

    return NextResponse.json(
      { error: "Registration is temporarily unavailable." },
      { status: 500 }
    );
  }
}