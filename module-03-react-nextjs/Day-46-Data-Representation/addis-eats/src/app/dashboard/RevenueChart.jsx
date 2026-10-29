
"use client";

function formatETB(value) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);
}

function shortDate(value) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
  });
}

export default function RevenueChart({
  revenueByNeighborhood,
  ordersByDay,
  startDate,
  endDate,
}) {
  const width = 640;
  const height = 300;
  const left = 78;
  const right = 20;
  const top = 20;
  const bottom = 55;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;

  const maxRevenue = Math.max(
    1,
    ...revenueByNeighborhood.map((item) => item.revenue)
  );

  const maxOrders = Math.max(
    1,
    ...ordersByDay.map((item) => item.orders)
  );

  const ticks = Array.from({ length: 5 }, (_, index) =>
    Math.ceil((maxRevenue * index) / 4)
  );

  const points = ordersByDay.map((item, index) => {
    const x =
      left +
      (ordersByDay.length > 1
        ? (index / (ordersByDay.length - 1)) * chartWidth
        : chartWidth / 2);

    const y = top + chartHeight - (item.orders / maxOrders) * chartHeight;

    return { ...item, x, y };
  });

  const line = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <section className="mt-8 space-y-8">
      <article className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">
          Revenue by neighbourhood
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Revenue in Ethiopian birr (ETB).
        </p>

        <div className="mt-5 h-[320px] w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-full min-w-[520px] w-full"
            role="img"
            aria-labelledby="revenue-title revenue-description"
          >
            <title id="revenue-title">Revenue by neighbourhood</title>
            <desc id="revenue-description">
              A bar chart comparing total revenue in ETB across neighbourhoods.
            </desc>

            {ticks.map((tick, index) => {
              const y = top + chartHeight - (index / 4) * chartHeight;

              return (
                <g key={index}>
                  <line
                    x1={left}
                    x2={width - right}
                    y1={y}
                    y2={y}
                    stroke="#e5e7eb"
                  />
                  <text
                    x={left - 8}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="11"
                    fill="#4b5563"
                  >
                    {formatETB(tick)}
                  </text>
                </g>
              );
            })}

            {revenueByNeighborhood.map((item, index) => {
              const slot = chartWidth / revenueByNeighborhood.length;
              const barWidth = Math.min(55, slot * 0.65);
              const barHeight = (item.revenue / maxRevenue) * chartHeight;
              const x = left + slot * index + (slot - barWidth) / 2;
              const y = top + chartHeight - barHeight;

              return (
                <g key={item.neighborhood}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx="4"
                    fill="#d97706"
                  />
                  <text
                    x={x + barWidth / 2}
                    y={height - bottom + 18}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#374151"
                  >
                    {item.neighborhood.length > 10
                      ? `${item.neighborhood.slice(0, 9)}…`
                      : item.neighborhood}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <table className="mt-4 w-full text-left text-sm">
          <caption className="mb-2 text-left font-medium">
            Revenue data by neighbourhood
          </caption>
          <thead>
            <tr className="border-b text-gray-600">
              <th scope="col" className="py-2">Neighbourhood</th>
              <th scope="col" className="py-2 text-right">Revenue (ETB)</th>
            </tr>
          </thead>
          <tbody>
            {revenueByNeighborhood.map((item) => (
              <tr key={item.neighborhood} className="border-b">
                <th scope="row" className="py-2 font-normal">
                  {item.neighborhood}
                </th>
                <td className="py-2 text-right">
                  {formatETB(item.revenue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>

      <article className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">
          Orders per day: {shortDate(startDate)} – {shortDate(endDate)}
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Unit: number of orders per day.
        </p>

        <div className="mt-5 h-[300px] w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-full min-w-[520px] w-full"
            role="img"
            aria-labelledby="orders-title orders-description"
          >
            <title id="orders-title">Orders per day</title>
            <desc id="orders-description">
              A line chart showing the number of orders each day in the
              selected seven-day range.
            </desc>

            {[0, 1, 2, 3, 4].map((index) => {
              const value = Math.round((maxOrders * index) / 4);
              const y = top + chartHeight - (index / 4) * chartHeight;

              return (
                <g key={index}>
                  <line
                    x1={left}
                    x2={width - right}
                    y1={y}
                    y2={y}
                    stroke="#e5e7eb"
                  />
                  <text
                    x={left - 10}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="12"
                    fill="#4b5563"
                  >
                    {value}
                  </text>
                </g>
              );
            })}

            {points.length > 1 && (
              <polyline
                points={line}
                fill="none"
                stroke="#0f766e"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            )}

            {points.map((point) => (
              <g key={point.date}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="5"
                  fill="#0f766e"
                />
                <text
                  x={point.x}
                  y={height - bottom + 20}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#374151"
                >
                  {shortDate(point.date)}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <table className="mt-4 w-full text-left text-sm">
          <caption className="mb-2 text-left font-medium">
            Daily order data for {shortDate(startDate)} – {shortDate(endDate)}
          </caption>
          <thead>
            <tr className="border-b text-gray-600">
              <th scope="col" className="py-2">Date</th>
              <th scope="col" className="py-2 text-right">Orders</th>
            </tr>
          </thead>
          <tbody>
            {ordersByDay.map((item) => (
              <tr key={item.date} className="border-b">
                <th scope="row" className="py-2 font-normal">
                  {shortDate(item.date)}
                </th>
                <td className="py-2 text-right">{item.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
