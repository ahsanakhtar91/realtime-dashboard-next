import DashboardPage from "@/components/DashboardPage";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();

  const deletedWidgets = cookieStore.get("deleted-widgets")?.value as string;

  const deletedWidgetsArray = deletedWidgets ? JSON.parse(deletedWidgets) : [];

  return <DashboardPage deletedWidgets={deletedWidgetsArray} />;
}
