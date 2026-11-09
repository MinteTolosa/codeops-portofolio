

import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/validations";
import { createOrder } from "@/lib/db";
import { getSession } from "@/lib/session";

// Day 39 — API Routes and Request Validation
export async function POST(request) {
  const user = await getSession();

  if (!user) {
    return NextResponse.json({ error: "Please sign in before placing an order." },
      { status: 401 }
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json( { error: "Invalid request body." },
      { status: 400 }
    );
  }
  const result = orderSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({
        error: "Invalid order.",
        fieldErrors: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  try {
    const order = await createOrder({...result.data, userId: user.id, });

    return NextResponse.json({ message: "Order created successfully.", order, },
      { status: 201 }
    );
  } catch {
    return NextResponse.json( { error: "Could not create the order." }, { status: 500 } );
  }
}




