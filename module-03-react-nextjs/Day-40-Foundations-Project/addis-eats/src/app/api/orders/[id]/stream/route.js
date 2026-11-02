import { getOrder } from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = await params;

  const stream = new ReadableStream({
    start(controller) {
      let previousStatus = null;
      let closed = false;

      const send = (data) => {controller.enqueue(
          `data: ${JSON.stringify(data)}\n\n`
        );
      };

      const checkOrder = async () => {
        if (closed) return;

        try {
          const order = await getOrder(id);

          if (!order) { send({ error: "Order not found" });
            closed = true;
            clearInterval(timer);
            controller.close();
            return;
          }

          if (order.status !== previousStatus) {
            previousStatus = order.status;

            send({
              status: order.status,
              updatedAt: order.updatedAt || order.createdAt,
            });
          }

          if (
            ["DELIVERED", "CANCELLED"].includes(order.status)
          ) {
            closed = true;
            clearInterval(timer);
            controller.close();
          }
        } catch {
          closed = true;
          clearInterval(timer);
          controller.close();
        }
      };

      checkOrder();

      const timer = setInterval(checkOrder, 3000);

      request.signal.addEventListener("abort", () => {
        closed = true;
        clearInterval(timer);
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}