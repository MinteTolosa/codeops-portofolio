
import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/validations";
import { createOrder } from "@/lib/db";

// Day 39 — API Routes and Request Validation
export async function POST(request) {
  try {
    const body = await request.json();
    const result = orderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid order",
          fieldErrors: result.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const order = await createOrder(result.data);

    return NextResponse.json(
      {
        message: "Order created successfully",
        order,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
