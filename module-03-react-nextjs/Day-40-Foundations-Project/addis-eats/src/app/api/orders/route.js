import { z } from "zod";

const orderSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  phone: z.string().min(9, "Enter a valid phone number"),
  items: z.array( z.object({
      dishId: z.string(),
      quantity: z.number().int().positive(),
    })
  ).min(1, "Your cart is empty"),
});

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
  } catch (error) {
    return Response.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
