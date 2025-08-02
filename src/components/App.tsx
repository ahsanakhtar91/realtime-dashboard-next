"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import DashboardPage from "./DashboardPage";

export default function App({ deletedWidgets }: { deletedWidgets?: string[] }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <DashboardPage deletedWidgets={deletedWidgets} />
    </QueryClientProvider>
  );
}
