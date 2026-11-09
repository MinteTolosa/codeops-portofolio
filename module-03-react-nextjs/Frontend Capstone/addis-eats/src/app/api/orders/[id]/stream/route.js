
import { getOrder } from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = await params;

  const stream = new ReadableStream({
    start(controller) {
      let previousStatus = null;
      let closed = false;
      let timer;

      const closeStream = () => {
        if (closed) return;

        closed = true;
        clearInterval(timer);

        try {
          controller.close();
        } catch {
    
        }
      };

      const send = (data) => {
        if (closed) return;

        controller.enqueue(
          `data: ${JSON.stringify(data)}\n\n`
        );
      };

      const checkOrder = async () => {
        if (closed) return;

        try {
          const order = await getOrder(id);

          if (!order) {
            send({ error: "Order not found" });
            closeStream();
            return;
          }

          if (order.status !== previousStatus) {
            previousStatus = order.status;

            send({
              status: order.status,
              updatedAt: order.updatedAt || order.createdAt,
            });
          }

          if (["DELIVERED", "CANCELLED"].includes(order.status)) {
            closeStream();
          }
        } catch {
          closeStream();
        }
      };

      request.signal.addEventListener("abort", closeStream);

      checkOrder();

      timer = setInterval(checkOrder, 3000);
    },

    cancel() {

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
