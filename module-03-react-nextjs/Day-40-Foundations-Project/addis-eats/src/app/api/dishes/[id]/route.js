
import { NextResponse } from "next/server";
import { getDish } from "@/lib/db";

// Day 39 — Dynamic API Route and 404 Handling
export async function GET(request, { params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    return NextResponse.json(
      { error: "Dish not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ dish }, { status: 200 });
}
