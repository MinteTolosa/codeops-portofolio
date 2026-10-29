
export default function OrdersLoading() {
  return (
    <main
      className="min-h-screen bg-gray-50 px-6 py-12"
      aria-busy="true"
      aria-label="Loading orders"
    >
      <div className="mx-auto max-w-4xl animate-pulse">
        <div className="h-9 w-48 rounded bg-gray-200" />
        <div className="mt-3 h-4 w-72 max-w-full rounded bg-gray-200" />

        <div className="mt-8 overflow-hidden rounded-xl border bg-white">
          <div className="grid grid-cols-3 gap-4 bg-gray-100 p-4">
            <div className="h-4 rounded bg-gray-200" />
            <div className="h-4 rounded bg-gray-200" />
            <div className="h-4 rounded bg-gray-200" />
          </div>

          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 border-t p-4"
            >
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
              <div className="h-4 rounded bg-gray-200" />
            </div>
          ))}
        </div>

        <p className="sr-only" role="status">
          Loading orders. Please wait.
        </p>
      </div>
    </main>
  );
}
