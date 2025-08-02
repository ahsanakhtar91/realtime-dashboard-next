import { cookies } from "next/headers";
import App from "@/components/App";

export default async function Home() {
  const cookieStore = await cookies();

  const deletedWidgets = cookieStore.get("deleted-widgets")?.value as string;

  const deletedWidgetsArray = deletedWidgets ? JSON.parse(deletedWidgets) : [];

  return <App deletedWidgets={deletedWidgetsArray} />;
}
