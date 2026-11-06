
import { db, getSession } from "@/lib/db";
import { redirect } from "next/navigation";
import UpdateOrderStatus from "./UpdateOrderStatus";

export default async function KitchenPage() {
  const user = await getSession();

  if (!user || !["admin", "staff"].includes(user.role)) {
    redirect("/signin");
  }

  const allOrders = await db.order.findMany();

  const orders = [...allOrders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt) );

  return (
    <main className="min-h-screen bg-[#17130f] px-6 py-12 text-[#f5efe6]">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.3em] text-[#c9a96e]">
          Addis Eats
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Kitchen Dashboard
        </h1>

        <p className="mt-3 text-[#b8afa3]">
          Manage orders and update their delivery status.
        </p>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-xl border border-[#6f6252]/40 bg-[#211b15] p-6">
            No orders available.
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((order) => (
              <section key={order.id}
                className="rounded-xl border border-[#6f6252]/40 bg-[#211b15] p-5" >
                <div className="flex flex-wrap justify-between gap-3">
                  <h2 className="font-semibold">
                    Order {order.id}
                  </h2>

                  <span className="text-[#c9a96e]">
                    {order.status}
                  </span>
                </div>

                <p className="mt-2 text-sm text-[#b8afa3]">
                  {order.neighborhood || "Delivery area not available"}
                </p>

                <div className="mt-4">
                  <UpdateOrderStatus
                    orderId={order.id}
                    currentStatus={order.status}
                  />
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
