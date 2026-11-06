"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "@/lib/validations";
import { createOrder, getSession } from "@/lib/db";

export async function placeOrder(previousState, formData) {
  const customerName = String(formData.get("customerName") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const neighborhood = String(formData.get("neighborhood") || "").trim();
  
  let rawItems = [];
  try {
    rawItems = JSON.parse(formData.get("items") || "[]");
  } catch {
    return {
      success: false,
      message: "Invalid cart data. Please refresh and try again.",
    };
  }

  // Ensure dishId and quantity are correctly formatted for Zod
  const items = rawItems.map((item) => ({
    dishId: String(item.dishId || item.id || ""),
    quantity: Number(item.quantity || 1),
  }));

  const result = orderSchema.safeParse({
    customerName,
    phone,
    neighborhood,
    items,
  });

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }
  //console.log("Validating payload:", { customerName, phone, neighborhood, items });

  const user = await getSession();

  if (!user) {
    return {
      success: false,
      message: "Please sign in before placing an order.",
    };
  }

  try {
    const order = await createOrder({
      ...result.data,
      userId: user.id,
    });

    revalidatePath("/orders");

    return {
      success: true,
      message: `Order ${order.id} created successfully! Thank you, ${result.data.customerName}.`,
    };
  } catch {
    return {
      success: false,
      message: "We could not create your order. Please try again.",
    };
  }
}