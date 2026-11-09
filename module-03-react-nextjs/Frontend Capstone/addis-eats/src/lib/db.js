import { getSession } from "@/lib/session";
import { randomUUID } from "node:crypto";
import { hashPassword } from "@/lib/auth";

export { getSession };

const mockDishes = [
  {
    id: "dish_1",
    name: "Doro Wat",
    description: "Traditional spicy chicken stew served with injera and boiled egg.",
    price: 350,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_2",
    name: "Beyaynetu",
    description: "Assorted vegan fasting dishes served on injera.",
    price: 220,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
  {
    id: "dish_3",
    name: "Kitfo",
    description: "Minced beef seasoned with mitmita and niter kibbeh.",
    price: 400,
    currency: "ETB",
    category: "Main",
    available: true,
  },
  {
    id: "dish_4",
    name: "Shiro Tegabeno",
    description: "Rich chickpea flour stew served bubbling hot in a clay pot.",
    price: 180,
    currency: "ETB",
    category: "Vegetarian",
    available: true,
  },
];

const mockOrders =globalThis.__addisEatsMockOrders || (globalThis.__addisEatsMockOrders = []);
// Day 48 — Idempotency protection
const idempotencyKeys =
  globalThis.__addisEatsIdempotencyKeys ||
  (globalThis.__addisEatsIdempotencyKeys = new Map());

// Day 42 — Temporary mock user storage
const mockUsers = [];

export async function findUserByEmail(email) {
  return mockUsers.find((user) => user.email === email) || null;
}

export async function createUser({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    return null;
  }

  const user = {
    id: randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(password),
    role: "customer",
  };

  mockUsers.push(user);

  return user;
}

export const db = {
  dish: {
    findMany: async () => [...mockDishes],
    findUnique: async ({ where }) =>
      mockDishes.find((dish) => dish.id === where.id) || null,
  },
  order: {
    findMany: async () => [...mockOrders],
  },
};

export async function getDish(id) {
  return mockDishes.find((dish) => dish.id === id) || null;
}

// Day 48 — Prevent duplicate order creation

export async function createOrder(data) {
  const { idempotencyKey, ...orderData } = data;

  if (!idempotencyKey) {
    throw new Error("Idempotency key is required.");
  }

  const requestKey = `${orderData.userId}:${idempotencyKey}`;

  const existingOrder = idempotencyKeys.get(requestKey);

  if (existingOrder) {
    return existingOrder;
  }
  const order = {
    ...orderData,
    id: `ord_${randomUUID()}`,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  mockOrders.push(order);

  idempotencyKeys.set(requestKey, order);

  return order;
}

export async function getOrder(id) {
  return mockOrders.find((order) => order.id === id) || null;
}

// Day 50 — Safe order cancellation

export async function markCancelled(id) {
  const order = await getOrder(id);

  if (!order) {
    throw new Error("Order not found.");
  }

  if (order.status === "CANCELLED") {
    throw new Error("This order has already been cancelled.");
  }

  if (order.status === "DELIVERED") {
    throw new Error("Delivered orders cannot be cancelled.");
  }

  order.status = "CANCELLED";
  order.updatedAt = new Date().toISOString();

  return order;
}

export async function updateOrderStatus(id, status) {
  console.log("Searching for order:", id);

  console.log(
    "Available orders:",
    mockOrders.map((order) => order.id)
  );

  const order = await getOrder(id);

  if (!order) {
    throw new Error(`Order not found: ${id}`);
  }

  const allowedStatuses = [
    "PENDING",
    "PREPARING",
    "DELIVERED",
    "CANCELLED",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid order status");
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();

  return order;
}

