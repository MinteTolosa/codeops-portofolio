
"use server";

// Day 39 — Server Actions and Order Ownership

import { revalidatePath } from "next/cache";
import { getOrder, getSession, markCancelled } from "@/lib/db";

export async function cancelOrder(orderId) {
  const user = await getSession();

  if (!user) {
    return {
      success: false,
      message: "Please sign in to cancel an order.",
    };
  }

  if (typeof orderId !== "string" || !orderId.trim()) {
    return {
      success: false,
      message: "Invalid order ID.",
    };
  }

  const order = await getOrder(orderId);

  if (!order) {
    return {
      success: false,
      message: "Order not found.",
    };
  }

  if (order.userId !== user.id) {
    return {
      success: false,
      message: "You cannot cancel another user's order.",
    };
  }

  if (order.status === "CANCELLED") {
    return {
      success: false,
      message: "This order has already been cancelled.",
    };
  }

  try {
    await markCancelled(orderId);

    revalidatePath("/orders");
    revalidatePath(`/orders/${orderId}`);

    return {
      success: true,
      message: "Order cancelled successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Could not cancel the order. Please try again.",
    };
  }
}
