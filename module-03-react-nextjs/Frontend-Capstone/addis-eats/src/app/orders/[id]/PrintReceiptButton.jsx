"use client";

export default function PrintReceiptButton() {
  return (
    <button type="button"
      onClick={() => window.print()}
      className="rounded-lg bg-[#c9a96e] px-4 py-2 text-sm font-semibold text-[#17130f] hover:opacity-90 print:hidden" >
      Print Receipt
    </button>
  );
}