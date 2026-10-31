import { db, getSession } from "@/lib/db";
import CancelOrderButton from "./CancelOrderButton";
import OrderTable from "./OrderTable";

export default async function OrdersPage(props) {
  const searchParams = await props.searchParams;
  const user = await getSession();
  const allOrders = await db.order.findMany();
  const orders = user
    ? allOrders.filter((order) => order.userId === user.id)
        .sort( (a, b) => new Date(b.createdAt) - new Date(a.createdAt) )
    : [];

  return (
    <main className="min-h-screen bg-[#17130f] text-[#f5efe6] px-6 py-12 md:py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="border-b border-[#6f6252]/40 pb-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#c9a96e]">
            Addis-Eats
          </p>
          <h1 className="text-3xl font-bold md:text-4xl mt-1">My Orders</h1>
          <p className="mt-2 text-[#b8afa3] text-sm md:text-base">
            Track your recent food orders and delivery updates.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-[#6f6252]/40 bg-[#211b15] p-12 text-center text-[#b8afa3] shadow-xl">
            <p className="text-lg">No orders found.</p>
            <p className="mt-2 text-sm text-[#9e9589]">
              Place an order from our menu to track your delivery status here.
            </p>
          </div>
        ) : (
          <OrderTable orders={orders}  searchParams={searchParams} />
        )}
      </div>
    </main>
  );
}