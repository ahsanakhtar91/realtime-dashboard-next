import { cookies } from "next/headers";
import { Theme } from "@/app/types";
import App from "@/components/App";

export default async function Home() {
  const cookieStore = await cookies();

  const theme = (cookieStore.get("theme")?.value || "light") as Theme;

  const deletedWidgets = cookieStore.get("deleted-widgets")?.value as string;

  const deletedWidgetsArray = deletedWidgets ? JSON.parse(deletedWidgets) : [];

  return <App theme={theme} deletedWidgets={deletedWidgetsArray} />;
}
