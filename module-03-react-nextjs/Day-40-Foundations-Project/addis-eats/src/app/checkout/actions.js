
"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "@/lib/validations";
import { createOrder, getSession } from "@/lib/db";

export async function placeOrder(previousState, formData) {
  const customerName = formData.get("customerName");
  const phone = formData.get("phone");
  let items;

  try {
    items = JSON.parse(formData.get("items") || "[]");
  } catch {
    return {
      success: false,
      message: "Invalid cart data. Please refresh and try again.",
    };
  }

  const result = orderSchema.safeParse({
    customerName,
    phone,
    items,
  });

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }

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
