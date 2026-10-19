"use client";
import { useActionState } from "react";
import { placeOrder } from "./actions";

const initialState = {
  success: false,
  message: "",
};
export default function CheckoutForm({ cartItems }) {
  const [state, formAction, isPending] = useActionState(
   placeOrder,
   initialState
  );
  const items = cartItems.map((item) => ({dishId: String(item.id),
   quantity: item.quantity,
  }));
  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="items" value={JSON.stringify(items)} />
      <div>
        <label htmlFor="customerName">Full Name</label>
        <input id="customerName" name="customerName" type="text"
          required
          minLength={2}
          className="block w-full rounded-lg border p-3"/>
      </div>
      <div>
       <label htmlFor="phone">Phone Number</label>
       <input id="phone" name="phone" type="tel" required
          minLength={9}
          className="block w-full rounded-lg border p-3"/>
      </div>
      <button type="submit" disabled={isPending || cartItems.length === 0}
        className="rounded-lg bg-black px-6 py-3 font-semibold text-white disabled:opacity-50">
        {isPending ? "Validating..." : "Validate Order"}
      </button>
      {state.message && (
       <p role="status"
          className={state.success ? "text-green-700" : "text-red-600"} >
          {state.message}
        </p>
      )}
    </form>
  );
}
