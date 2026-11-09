import { notFound } from "next/navigation";
import { getOrder } from "@/lib/db";
import { etb, when } from "@/lib/format";

import MapPanel from "./MapPanel";
import OrderLiveStatus from "./OrderLiveStatus";

export default async function TrackPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) notFound();

  return (
    <main className="min-h-screen bg-[#17130f] px-6 py-12 text-[#f5efe6]">
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <p className="text-sm uppercase tracking-widest text-[#c9a96e]">
            Addis Eats
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Track Your Order
          </h1>

          <p className="mt-2 text-[#b8afa3]">
            Order ID: {order.id}
          </p>
        </div>

        <OrderLiveStatus id={order.id} initial={order.status} />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            Delivery Location
          </h2>

          <MapPanel
            deliveryAddress={order.neighborhood || "Address not provided"}/>

          <p className="text-sm text-[#b8afa3]">
            Delivery area: {order.neighborhood || "Address not provided"}
          </p>
        </section>

        <section className="rounded-xl bg-[#211b15] p-5">
          <p>
            Order placed:{" "}
            {when.format(new Date(order.createdAt))}
          </p>

          <p className="mt-2">
            Total items: {order.items?.length || 0}
          </p>
        </section>
      </div>
    </main>
  );
}