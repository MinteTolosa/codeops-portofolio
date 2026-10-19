
import { orderSchema } from "@/lib/validations";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = orderSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          error: "Invalid order",
          fieldErrors: result.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    return Response.json(
      {
        message: "Order data is valid",
        order: result.data,
      },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
