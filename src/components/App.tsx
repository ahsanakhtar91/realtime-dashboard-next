"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { Theme } from "@/app/types";
import DashboardPage from "@/components/DashboardPage";

export default function App({
  theme,
  deletedWidgets,
}: {
  theme: Theme;
  deletedWidgets?: string[];
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <DashboardPage theme={theme} deletedWidgets={deletedWidgets} />
    </QueryClientProvider>
  );
}
