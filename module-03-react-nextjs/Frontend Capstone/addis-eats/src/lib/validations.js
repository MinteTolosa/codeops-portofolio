
import { z } from "zod";

export const orderSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, "Enter at least 2 characters for your name."),
  phone: z
    .string()
    .trim()
    .min(9, "Enter a valid phone number."),
  neighborhood: z
    .string()
    .trim()
    .min(2, "Please enter your delivery neighbourhood."),
  items: z
    .array( z.object({
        dishId: z.string().min(1, "Dish ID is required."),
        quantity: z.number().int().positive(),
      })).min(1, "Your cart is empty."),
});
