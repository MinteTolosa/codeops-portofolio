
import "server-only";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";

// Day 42 — Read the Current Session

export const SESSION_COOKIE = "addis_eats_session";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if(!token) return null;

  return verifySessionToken(token);
}
