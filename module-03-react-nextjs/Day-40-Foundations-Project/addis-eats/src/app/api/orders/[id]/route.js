
import { NextResponse } from "next/server";
import { getOrder, markCancelled,} from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET(request, { params }) {
  const user = await getSession();

  if (!user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const order = await getOrder(id);

  if (!order || order.userId !== user.id) {
    return NextResponse.json(
      { error: "Order not found." },
      { status: 404 }
    );
  }
  return NextResponse.json({ order });
}

export async function PATCH(request, { params }) {
  const user = await getSession();

  if (!user) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const order = await getOrder(id);

  if (!order || order.userId !== user.id) {
    return NextResponse.json(
      { error: "Order not found." },
      { status: 404 }
    );
  }

  if (order.status !== "PENDING") {
    return NextResponse.json(
      { error: "Only pending orders can be cancelled." },
      { status: 409 }
    );
  }

  const cancelledOrder = await markCancelled(id);

  return NextResponse.json({
    message: "Order cancelled successfully.",
    order: cancelledOrder,
  });
}
