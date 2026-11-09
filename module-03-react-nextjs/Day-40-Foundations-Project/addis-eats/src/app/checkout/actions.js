
"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "@/lib/validations";
import { createOrder, getSession } from "@/lib/db";

export async function placeOrder(previousState, formData) {
  // Day 48 — Read checkout information
  const customerName = String(
    formData.get("customerName") || ""
  ).trim();

  const phone = String(
    formData.get("phone") || ""
  ).trim();

  const neighborhood = String(
    formData.get("neighborhood") || ""
  ).trim();

  const requestId = String(
    formData.get("requestId") || ""
  ).trim();

  // Day 48 — Validate request ID
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(requestId)
  ) {
    return {
      success: false,
      message: "Invalid checkout request. Please refresh and try again.",
    };
  }

  // Day 48 — Parse cart items
  let rawItems = [];

  try {
    rawItems = JSON.parse(formData.get("items") || "[]");

    if (!Array.isArray(rawItems)) {
      throw new Error("Invalid cart items");
    }
  } catch {
    return {
      success: false,
      message: "Invalid cart data. Please refresh and try again.",
    };
  }

  const items = rawItems.map((item) => ({
    dishId: String(item.dishId || item.id || ""),
    quantity: Number(item.quantity || 1),
  }));

  // Day 39 — Zod validation
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

  // Day 45 — Authentication
  const user = await getSession();

  if (!user) {
    return {
      success: false,
      message: "Please sign in before placing an order.",
    };
  }

  try {
    // Day 50 — Fetch trusted menu prices on the server
    const response = await fetch(
      "https://addis-eats-backend.onrender.com/menu/",
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Could not retrieve menu prices.");
    }

    const menuResult = await response.json();
    const menu = menuResult.data;

    if (!Array.isArray(menu)) {
      throw new Error("Invalid menu response.");
    }

    // Day 50 — Save a snapshot of each ordered dish
    const pricedItems = result.data.items.map((item) => {
      const dish = menu.find(
        (menuItem) => menuItem.id === item.dishId
      );

      if (!dish) {
        throw new Error(`Dish not found: ${item.dishId}`);
      }

      const price = Number(dish.priceETB);

      if (!Number.isFinite(price) || price < 0) {
        throw new Error(`Invalid price for ${dish.nameEn}`);
      }

      return {
        dishId: dish.id,
        name: dish.nameEn,
        price,
        quantity: item.quantity,
        lineTotal: price * item.quantity,
        currency: "ETB",
      };
    });

    // Day 50 — Calculate the order total on the server
    const totalAmount = pricedItems.reduce(
      (total, item) => total + item.lineTotal,
      0
    );

    // Day 48 — Server-side duplicate protection
    const order = await createOrder({
      ...result.data,
      items: pricedItems,
      totalAmount,
      currency: "ETB",
      userId: user.id,
      idempotencyKey: requestId,
    });

    revalidatePath("/orders");

    return {
      success: true,
      message: `Order ${order.id} created successfully! Thank you, ${result.data.customerName}.`,
      orderId: order.id,
    };
  } catch (error) {
    console.error("Order creation failed:", error);

    return {
      success: false,
      message: "We could not create your order. Please try again.",
    };
  }
}
