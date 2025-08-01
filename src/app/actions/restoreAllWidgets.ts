"use server";
import { cookies } from "next/headers";

export async function restoreAllWidgets() {
  const cookieStore = await cookies();

  cookieStore.set("deleted-widgets", "", {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}
