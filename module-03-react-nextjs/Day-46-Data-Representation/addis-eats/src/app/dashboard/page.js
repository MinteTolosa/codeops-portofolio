
import { db } from "@/lib/db";
import RevenueChart from "./RevenueChart";
import Link from "next/link";

export const dynamic = "force-dynamic";

function getRevenue(order) {
  return Number(
    order.totalETB ??
      order.totalAmount ??
      order.totalPrice ??
      order.total ??
      order.amount ??
      0
  );
}

function getNeighborhood(order) {
  return (
    order.neighborhood ??
    order.deliveryNeighborhood ??
    order.address?.neighborhood ??
    "Unknown"
  );
}

function getOrderDate(order) {
  const date = new Date(order.createdAt);

  if (Number.isNaN(date.getTime())) return null;

  return date.toISOString().slice(0, 10);
}

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;
  const demoState = params?.state;

  // Use ?state=error to demonstrate the error state.
  if (demoState === "error") {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">Addis Eats Dashboard</h1>
        <section
          role="alert"
          className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-red-800"
        >
          <h2 className="font-semibold">Unable to load dashboard</h2>
          <p className="mt-2">
            The dashboard encountered a simulated error. Please try again.
          </p>
          <a className="mt-4 inline-block underline" href="/dashboard">
            Try again
          </a>
        </section>
      </main>
    );
  }

  let orders;

  try {
    orders = await db.order.findMany();
  } catch {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">Addis Eats Dashboard</h1>
        <section
          role="alert"
          className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-red-800"
        >
          <h2 className="font-semibold">Unable to load dashboard</h2>
          <p className="mt-2">
            We could not retrieve the orders. Please try again later.
          </p>
          <a className="mt-4 inline-block underline" href="/dashboard">
            Try again
          </a>
        </section>
      </main>
    );
  }

  const revenueMap = new Map();
  const dailyMap = new Map();

  for (const order of orders) {
    const revenue = getRevenue(order);
    const neighborhood = getNeighborhood(order);
    const date = getOrderDate(order);

    revenueMap.set(
      neighborhood,
      (revenueMap.get(neighborhood) ?? 0) + revenue
    );

    if (date) {
      dailyMap.set(date, (dailyMap.get(date) ?? 0) + 1);
    }
  }

  const revenueByNeighborhood = Array.from(
    revenueMap,
    ([neighborhood, revenue]) => ({ neighborhood, revenue })
  ).sort((a, b) => b.revenue - a.revenue);

  const allDates = Array.from(dailyMap.keys()).sort();
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 6);

  const dateKeys = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date.toISOString().slice(0, 10);
  });

  const ordersByDay = dateKeys.map((date) => ({
    date,
    orders: dailyMap.get(date) ?? 0,
  }));

  const totalRevenue = orders.reduce(
    (sum, order) => sum + getRevenue(order),
    0
  );

  const money = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  });

  if (orders.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900">
          Addis Eats Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Revenue and order activity at a glance.
        </p>

        <section
          className="mt-8 rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center"
          aria-labelledby="empty-title"
        >
          <h2 id="empty-title" className="text-xl font-semibold">
            No orders yet
          </h2>
          <p className="mt-2 text-gray-600">
            Once customers place orders, your revenue and order charts will
            appear here.
          </p>
        <Link  href="/menu"
            className="mt-5 inline-block rounded-lg bg-amber-600 px-5 py-3 font-medium text-white transition-colors hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700">
            Explore the menu
        </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-amber-700">
          Overview
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Addis Eats Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Revenue and order activity at a glance.
        </p>
      </header>

      <section
        className="mt-8 grid gap-4 sm:grid-cols-2"
        aria-label="Business summary" >
        <article className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Total revenue</p>
          <p className="mt-2 text-2xl font-bold">{money.format(totalRevenue)}</p>
        </article>
        <article className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Total orders</p>
          <p className="mt-2 text-2xl font-bold">{orders.length}</p>
        </article>
      </section>

      <RevenueChart
        revenueByNeighborhood={revenueByNeighborhood}
        ordersByDay={ordersByDay}
        startDate={dateKeys[0]}
        endDate={dateKeys[6]}
      />
    </main>
  );
}
