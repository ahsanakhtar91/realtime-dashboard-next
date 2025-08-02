import { DashboardApiResponse } from "./types";

export const fetchDashboardData = async (): Promise<DashboardApiResponse> => {
  const response = await fetch("/api/dashboard");

  if (!response.ok) {
    const errorData = await response.json();
    return Promise.reject(errorData);
  }

  return response.json();
};
