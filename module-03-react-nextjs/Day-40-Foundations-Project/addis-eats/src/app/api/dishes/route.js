
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Day 41 — Search API and Query Parameters

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const dishes = await db.dish.findMany();

  const filteredDishes = query
    ? dishes.filter((dish) =>
        [dish.name, dish.description, dish.category]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query))
      )
    : dishes;

  return NextResponse.json(filteredDishes);
}
