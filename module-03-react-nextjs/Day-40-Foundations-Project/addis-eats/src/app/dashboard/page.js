import { db } from "@/lib/db";
import RevenueChart from "./RevenueChart";
import Link from "next/link";

export const dynamic = "force-dynamic";

function getOrderDate(order) {
  const date = new Date(order.createdAt);

  if (Number.isNaN(date.getTime())) return null;

  return date.toISOString().slice(0, 10);
}

async function getMenus() {
  const response = await fetch("https://addis-eats-backend.onrender.com/menu/", {
    cache: "force-cache",
  });

  const result = await response.json();

  if (!response.ok || !Array.isArray(result.data)) {
    throw new Error("Failed to fetch menu data.");
  }

  return result.data;
}

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;
  const State = params?.state;

  // Use ?state=error to demonstrate the error state.
  if (State === "error") {
    return (
      <main className="min-h-screen bg-[#17130f] text-[#f5efe6] px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#c9a96e]">
            Addis-Eats
          </p>
          <h1 className="text-3xl font-bold mt-1">Dashboard</h1>
          <section role="alert"
            className="mt-8 rounded-2xl border border-red-500/40 bg-red-950/30 p-6 text-red-200 shadow-xl" >
            <h2 className="font-semibold text-lg">Unable to load dashboard</h2>
            <p className="mt-2 text-sm text-red-300">
              The dashboard encountered a simulated error. Please try again.
            </p>
            <a className="mt-4 inline-block text-sm font-medium text-[#c9a96e] underline hover:text-[#dfc38d]"
              href="/dashboard" >
              Try again
            </a>
          </section>
        </div>
      </main>
    );
  }
  if (State === "empty") {
    return (
      <main className="min-h-screen bg-[#17130f] text-[#f5efe6] px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#c9a96e]">
            Addis-Eats
          </p>

          <h1 className="text-3xl font-bold mt-1">Dashboard</h1>

          <section className="mt-8 rounded-2xl border border-[#6f6252]/40 bg-[#211b15] p-8 text-center shadow-xl">
            <h2 className="text-xl font-semibold">No dashboard data yet</h2>
            <p className="mt-2 text-sm text-[#b8afa3]">
              There are currently no orders available to display.
            </p>
          </section>
        </div>
      </main>
    );
  }
  let orders;

  try {
    orders = await db.order.findMany();
  } catch {
    return (
      <main className="min-h-screen bg-[#17130f] text-[#f5efe6] px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#c9a96e]">
            Addis-Eats
          </p>
          <h1 className="text-3xl font-bold mt-1">Dashboard</h1>
          <section role="alert"
            className="mt-8 rounded-2xl border border-red-500/40 bg-red-950/30 p-6 text-red-200 shadow-xl" >
            <h2 className="font-semibold text-lg">Unable to load dashboard</h2>
            <p className="mt-2 text-sm text-red-300">
              We could not retrieve the orders. Please try again later.
            </p>
            <a className="mt-4 inline-block text-sm font-medium text-[#c9a96e] underline hover:text-[#dfc38d]"
              href="/dashboard" >
              Try again
            </a>
          </section>
        </div>
      </main>
    );
  }

  const revenueMap = new Map();
  const dailyMap = new Map();

  const menus = await getMenus();

  const menuById = new Map(menus.map((menu) => [menu.id, menu]));

  // console.log(
  //   "FULL ORDER ITEMS:",
  //   JSON.stringify(
  //     orders.map((order) => order.items),
  //     null,
  //     2
  //   )
  // );

  for (const order of orders) {
    const neighborhood = order.neighborhood;
    const revenue = order.items.reduce((total, item) => {
      const menu = menuById.get(item.dishId);
      return total + (menu ? menu.priceETB * item.quantity : 0);
    }, 0);
    const date = getOrderDate(order);

    revenueMap.set(neighborhood, (revenueMap.get(neighborhood) ?? 0) + revenue);

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

  const totalRevenue = revenueByNeighborhood.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const money = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  });

  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-[#17130f] text-[#f5efe6] px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#c9a96e]">
            Overview
          </p>
          <h1 className="mt-1 text-3xl font-bold md:text-4xl text-[#f5efe6]">
            Addis Eats Dashboard
          </h1>
          <p className="mt-2 text-[#b8afa3]">
            Revenue and order activity at a glance.
          </p>

          <section className="mt-8 rounded-2xl border border-dashed border-[#6f6252]/50 bg-[#211b15] p-12 text-center shadow-xl"
            aria-labelledby="empty-title" >
            <h2 id="empty-title" className="text-xl font-semibold text-[#f5efe6]">
              No orders yet
            </h2>
            <p className="mt-2 text-sm text-[#b8afa3]">
              Once customers place orders, revenue and order charts will appear
              here.
            </p>
            <Link href="/menu"
              className="mt-6 inline-block rounded-md bg-[#c9a96e] px-7 py-3 font-semibold text-[#17130f] transition hover:bg-[#dfc38d] shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a96e]" >
              Explore the menu
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#17130f] text-[#f5efe6] px-6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="border-b border-[#6f6252]/40 pb-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#c9a96e]">
            Overview
          </p>
          <h1 className="mt-1 text-3xl font-bold md:text-4xl text-[#f5efe6]">
            Addis Eats Dashboard
          </h1>
          <p className="mt-2 text-[#b8afa3]">
            Revenue and order activity at a glance.
          </p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2" aria-label="Business summary" >
          <article className="rounded-2xl border border-[#6f6252]/40 bg-[#211b15] p-6 shadow-xl">
            <p className="text-sm font-medium text-[#b8afa3]">Total revenue</p>
            <p className="mt-3 text-3xl font-bold text-[#c9a96e]">
              {money.format(totalRevenue)}
            </p>
          </article>
          <article className="rounded-2xl border border-[#6f6252]/40 bg-[#211b15] p-6 shadow-xl">
            <p className="text-sm font-medium text-[#b8afa3]">Total orders</p>
            <p className="mt-3 text-3xl font-bold text-[#f5efe6]">
              {orders.length}
            </p>
          </article>
        </section>

        <div className="rounded-2xl border border-[#6f6252]/40 bg-[#211b15] p-6 shadow-xl">
          <RevenueChart
            revenueByNeighborhood={revenueByNeighborhood}
            ordersByDay={ordersByDay}
            startDate={dateKeys[0]}
            endDate={dateKeys[6]}
          />
        </div>
      </div>
    </main>
  );
}