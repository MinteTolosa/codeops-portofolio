
export default async function OrderDetailsPage({ params }) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Order Details
        </h1>

        <p className="mt-3 text-gray-600">
          Order ID: {id}
        </p>

        <p className="mt-3 text-gray-600">
          Full order details will be available when order storage
          and authentication are implemented.
        </p>
      </div>
    </main>
  );
}
