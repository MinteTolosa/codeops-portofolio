"use server";
import { orderSchema } from "@/lib/validations";

export async function placeOrder(previousState, formData) {
  const customerName = formData.get("customerName");
  const phone = formData.get("phone");
  let items;
  
  try {
    items = JSON.parse(formData.get("items") || "[]");
  } catch { return {
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

  return {
    success: true,
    message: `Thank you, ${result.data.customerName}! Your order details passed validation.`,
  };
}
