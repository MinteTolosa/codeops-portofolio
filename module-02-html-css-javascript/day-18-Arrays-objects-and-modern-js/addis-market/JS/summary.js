import { withVat, format } from "./pricing.js";
import { orders } from "./orders.js";

// Step 1: Calculate the total for each order
const ordersWithTotals = orders.map((order) => {
  const itemsTotal = order.items.reduce(
    (total, { price, qty }) => total + price * qty,
    0
  );

  const total = withVat(itemsTotal);

  return {
    ...order,
    total
  };
});

console.log("After map:");
console.log(ordersWithTotals);

// Step 2: Filter orders over 500 ETB
const ordersOver500 = ordersWithTotals.filter(
  ({ total }) => total > 500
);

console.log("\nOrders over 500 ETB:");
console.log(ordersOver500);

// Step 3: Calculate grand total
const grandTotal = ordersWithTotals.reduce(
  (sum, { total }) => sum + total,
  0
);

console.log("\n=== Addis Market Order Summary ===");

ordersWithTotals.forEach(({ id, customer, total }) => {
  console.log(`${id} | ${customer} | ${format(total)}`);
});

console.log("\n=== Orders Over 500 ETB ===");

ordersOver500.forEach(({ id, customer, total }) => {
  console.log(`${id} | ${customer} | ${format(total)}`);
});

console.log(`\nGrand Total: ${format(grandTotal)}`);