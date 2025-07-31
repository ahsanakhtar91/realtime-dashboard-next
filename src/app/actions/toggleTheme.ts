"use server";
import { cookies } from "next/headers";
import { Theme } from "@/app/types";

export async function toggleTheme() {
  const cookieStore = await cookies();

  const currentTheme = cookieStore.get("theme")?.value as Theme;

  // Updating the theme in cookies
  cookieStore.set("theme", currentTheme === "light" ? "dark" : "light", {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}
