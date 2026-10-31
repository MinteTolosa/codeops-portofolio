import CancelOrderButton from "./CancelOrderButton";
import Link from "next/link";

const PAGE_SIZE = 5;

const SORT_FIELDS = {
  createdAt: "Date",
  customerName: "Customer",
  status: "Status",
};

function buildUrl(sort, dir, page) {
  const params = new URLSearchParams();

  params.set("sort", sort);
  params.set("dir", dir);
  params.set("page", String(page));

  return `/orders?${params.toString()}`;
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString();
}

export default async function OrderTable({ orders, searchParams = {} }) {
  const params = await searchParams;
  const requestedSort =
    typeof params.sort === "string" ? params.sort : "createdAt";

  const sort = Object.hasOwn(SORT_FIELDS, requestedSort)
    ? requestedSort
    : "createdAt";

  const dir = params.dir === "asc" ? "asc" : "desc";
  const requestedPage = Number(params.page);
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const sortedOrders = [...orders].sort((a, b) => {
    const left = a[sort] ?? "";
    const right = b[sort] ?? "";

    let comparison;

    if (sort === "createdAt") {
      comparison = new Date(left).getTime() - new Date(right).getTime();
    } else {
      comparison = String(left).localeCompare(String(right));
    }

    return dir === "asc" ? comparison : -comparison;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(sortedOrders.length / PAGE_SIZE)
  );

  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageOrders = sortedOrders.slice(start, start + PAGE_SIZE);

  if (orders.length === 0) {
    return (
      <section className="mt-8 rounded-xl border bg-white p-6">
        <h2 className="text-xl font-semibold">Orders</h2>
        <p className="mt-3 text-gray-600">
          No orders are available to display yet.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-semibold">Orders</h2>
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-left text-sm text-black">
          <caption className="sr-only">
            Orders sorted by {SORT_FIELDS[sort]}, {dir}ending
          </caption>

          <thead className="bg-gray-100 text-black">
            <tr>
              {Object.entries(SORT_FIELDS).map(([key, label]) => {
                const nextDir =
                  sort === key && dir === "asc" ? "desc" : "asc";

                return (
                  <th scope="col" key={key} className="px-4 py-3">
                    <Link href={buildUrl(key, nextDir, 1)}
                      className="font-semibold underline underline-offset-4"
                      aria-label={`Sort by ${label}, ${ nextDir === "asc" ? "ascending" : "descending"}`} >
                      {label}
                      {sort === key ? (dir === "asc" ? " ↑" : " ↓") : ""}
                    </Link>
                  </th> );
              })}
              <th scope="col" className="px-4 py-3">Order ID</th>
              <th scope="col" className="px-4 py-3">Items</th>
              <th scope="col" className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
          {pageOrders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="px-4 py-3">{formatDate(order.createdAt)}</td>
              <td className="px-4 py-3">{order.customerName ?? "—"}</td>
              <td className="px-4 py-3">{order.status ?? "Unknown"}</td>
              <td className="px-4 py-3">{order.id}</td>
              <td className="px-4 py-3">
                {Array.isArray(order.items) ? order.items.length : 0}
              </td>
              <td className="px-4 py-3">
                {order.status === "PENDING" ? (
                  <CancelOrderButton orderId={order.id} />
                ) : (
                  <span className="text-[#9e9589]">No action</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>

      <nav aria-label="Order table pagination"
        className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          Page {safePage} of {totalPages} · {orders.length} orders
        </p>

        <div className="flex gap-3">
          {safePage > 1 && (
            <Link href={buildUrl(sort, dir, safePage - 1)}
              className="rounded-lg border px-4 py-2 hover:bg-gray-50">
              Previous
            </Link>
          )}

          {safePage < totalPages && (
            <Link href={buildUrl(sort, dir, safePage + 1)}
              className="rounded-lg border px-4 py-2 hover:bg-gray-50">
              Next
            </Link>
          )}
        </div>
      </nav>
    </section>
  );
}
