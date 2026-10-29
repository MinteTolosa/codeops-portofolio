
import { db, getSession } from "@/lib/db";
import CancelOrderButton from "./CancelOrderButton";
import OrderTable from "./OrderTable";

export default async function OrdersPage() {
  const user = await getSession();
  const allOrders = await db.order.findMany();

  const orders = user
    ? allOrders.filter((order) => order.userId === user.id)
    : [];

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">
          My Orders
        </h1>

        <p className="mt-3 text-gray-600">
          View your recent orders and their status.
        </p>
        <OrderTable orders={orders} searchParams={searchParams} />

        {orders.length === 0 ? (
          <p className="mt-8 rounded-xl bg-white p-6 text-gray-600 shadow-sm">
            No orders found. Place an order from the menu to see it here.
          </p>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((order) => (
            <div key={order.id} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Order {order.id}
                  </h2>

                <p className="mt-2 text-sm text-gray-600">
                  Customer: {order.customerName}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Phone: {order.phone}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Items: {order.items.length}
                </p>
                </div>

                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                  {order.status}
                </span>
                </div>
                {order.status !== "CANCELLED" && (
              <div className="mt-5">
                <CancelOrderButton orderId={order.id} />
              </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
