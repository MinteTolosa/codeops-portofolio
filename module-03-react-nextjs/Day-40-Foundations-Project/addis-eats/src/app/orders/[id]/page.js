import { notFound } from "next/navigation";
import { getOrder, getSession } from "@/lib/db";
import Link from "next/link";
import PrintReceiptButton from "./PrintReceiptButton";

async function getMenu() {
  try {
    const response = await fetch(
      "https://addis-eats-backend.onrender.com/menu/",
      { cache: "no-store" }
    );

    if (!response.ok) return [];

    const result = await response.json();

    return Array.isArray(result.data) ? result.data : [];
  } catch {
    return [];
  }
}

export default async function OrderDetailsPage({ params }) {
  const { id } = await params;

  const user = await getSession();

  if (!user) notFound();

  const order = await getOrder(id);

  if (!order) notFound();

  if (String(order.userId) !== String(user.id)) notFound();

  const menu = await getMenu();

  const orderedItems = (order.items || []).map((item) => {
    const dish = menu.find(
      (dish) => String(dish.id) === String(item.dishId)
    );

    return {
      ...item,
      name: dish?.nameEn || item.name || item.dishId,
      price: item.price ?? dish?.priceETB ?? null,
    };
  });

  return (
    <main className="min-h-screen bg-[#17130f] px-6 py-12 text-[#f5efe6] print:bg-white print:text-black print:px-0 print:py-0">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link href="/orders"
            className="text-sm text-[#c9a96e] hover:underline" >
            ← Back to My Orders
          </Link>
          <PrintReceiptButton />
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-[#c9a96e]">
            Addis Eats
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Order Details
          </h1>

          <p className="mt-2 text-[#b8afa3]">
            Order ID: {order.id}
          </p>
        </div>

        <section className="rounded-xl border border-[#6f6252]/40 bg-[#211b15] p-6">
          <h2 className="text-xl font-semibold text-[#c9a96e]">
            Customer Information
          </h2>

          <p className="mt-4">Name: {order.customerName}</p>
          <p className="mt-2">Phone: {order.phone}</p>
          <p className="mt-2">Delivery area: {order.neighborhood}</p>
        </section>

        <section className="rounded-xl border border-[#6f6252]/40 bg-[#211b15] p-6">
          <h2 className="text-xl font-semibold text-[#c9a96e]">
            Order Information
          </h2>

          <p className="mt-4">Status: {order.status}</p>

          <p className="mt-2">
            Placed: {new Date(order.createdAt).toLocaleString()}
          </p>
        </section>

        <section className="rounded-xl border border-[#6f6252]/40 bg-[#211b15] p-6">
          <h2 className="text-xl font-semibold text-[#c9a96e]">
            Ordered Items
          </h2>

          <div className="mt-4 space-y-4">
            {orderedItems.map((item, index) => (
              <div
                key={`${item.dishId}-${index}`}
                className="flex justify-between gap-4 border-b border-[#6f6252]/30 pb-3"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="mt-1 text-sm text-[#b8afa3]">
                    {item.quantity} × {Number(item.price).toLocaleString()} ETB
                  </p>
                </div>

                <p className="font-medium text-[#c9a96e]">
                  {Number(item.lineTotal ?? item.price * item.quantity).toLocaleString()} ETB
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between border-t border-[#6f6252]/40 pt-4">
            <span className="text-lg font-semibold">Total Amount</span>
            <span className="text-xl font-bold text-[#c9a96e]">
              {Number(
                order.totalAmount ??
                orderedItems.reduce(
                  (total, item) =>
                    total + Number(item.price || 0) * item.quantity,
                  0
                )
              ).toLocaleString()} ETB
            </span>
          </div>
        </section>

      </div>
    </main>
  );
}