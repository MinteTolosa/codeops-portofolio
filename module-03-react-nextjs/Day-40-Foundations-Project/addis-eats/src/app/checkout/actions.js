"use server";
import { z } from "zod";

import { revalidatePath } from "next/cache";


const checkoutSchema = z.object({
  customerName: z.string().trim().min(2, "Enter at least 2 characters for your name."),
  phone: z.string().trim().min(9, "Enter a valid phone number."),
});

export async function placeOrder(previousState, formData) {
 
  const formValues = { customerName: formData.get("customerName"),
    phone: formData.get("phone"),
  };

  const result = checkoutSchema.safeParse(formValues);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0].message,
    };
  }
  revalidatePath("/menu");

  return {
    success: true,
    message: `Thank you, ${result.data.customerName}! Your details are valid.`,
  };
}
