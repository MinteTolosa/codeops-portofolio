
"use server";

import { revalidatePath } from "next/cache";
import { getSession, getOrder, updateOrderStatus } from "@/lib/db";

const ALLOWED_STATUSES = ["PREPARING", "READY", "COMPLETED"];

export async function updateKitchenOrderStatus(orderId, status) {
  const user = await getSession();

  if (!user) {
    return {
      success: false,
      message: "Please sign in first.",
    };
  }

  if (user.role !== "admin" && user.role !== "kitchen") {
    return {
      success: false,
      message: "You are not authorized to manage kitchen orders.",
    };
  }

  if (
    typeof orderId !== "string" ||
    !orderId.trim() ||
    !ALLOWED_STATUSES.includes(status)
  ) {
    return {
      success: false,
      message: "Invalid order or status.",
    };
  }

  const order = await getOrder(orderId);

  if (!order) {
    return {
      success: false,
      message: "Order not found.",
    };
  }

  try {
    await updateOrderStatus(orderId, status);

    revalidatePath("/kitchen");
    revalidatePath("/orders");

    return {
      success: true,
      message: "Order status updated successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Could not update order status.",
    };
  }
}
