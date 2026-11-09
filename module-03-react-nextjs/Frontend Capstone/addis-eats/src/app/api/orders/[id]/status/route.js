import { NextResponse } from "next/server";
import { getSession } from "@/lib/db";
import { updateOrderStatus } from "@/lib/db";

export async function PATCH(request, { params }) {
  try {
    const user = await getSession();

    if (!user || !["admin", "staff"].includes(user.role)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { id } = await params;
    console.log("Kitchen received order ID:", id);
    const { status } = await request.json();

    const order = await updateOrderStatus(id, status);

    console.log("Updating order:", id);

    return NextResponse.json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}