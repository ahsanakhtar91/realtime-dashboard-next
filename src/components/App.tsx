"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import DashboardPage from "./DashboardPage";

export default function App({ deletedWidgets }: { deletedWidgets?: string[] }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardPage deletedWidgets={deletedWidgets} />
    </QueryClientProvider>
  );
}
