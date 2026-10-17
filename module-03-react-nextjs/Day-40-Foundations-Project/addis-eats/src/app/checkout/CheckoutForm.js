"use client";
import { useActionState } from "react";
import { placeOrder } from "./actions";

const initialState = {success: false, message: "", };
export default function CheckoutForm() {
  const [state, formAction, isPending] = useActionState(
    placeOrder,
    initialState
  );

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="customerName">Full Name</label>
        <input id="customerName" name="customerName" type="text" required />
      </div>
      <div>
        <label htmlFor="phone">Phone Number</label>
        <input id="phone" name="phone" type="tel" required />
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Test Server Action"}
      </button>
      
      {state.message && (
        <p role="status">{state.message}</p>
      )}
    </form>
  );
}
