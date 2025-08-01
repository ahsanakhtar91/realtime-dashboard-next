"use server";
import { cookies } from "next/headers";

export async function deleteWidget(widgetId: string) {
  const cookieStore = await cookies();

  const deletedWidgets = cookieStore.get("deleted-widgets")?.value as string;

  const deletedWidgetsArray = deletedWidgets ? JSON.parse(deletedWidgets) : [];

  // Check if the widget is already deleted
  if (deletedWidgetsArray.includes(widgetId)) {
    return;
  }

  // Add the widget to the deleted list
  deletedWidgetsArray.push(widgetId);

  cookieStore.set("deleted-widgets", JSON.stringify(deletedWidgetsArray), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}
