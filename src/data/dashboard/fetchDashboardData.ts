import {
  DASHBOARD_API_ENDPOINT,
  DASHBOARD_API_AUTH_TOKEN,
} from "@/constants/constants";

export const fetchDashboardData = async (): Promise<any> => {
  const response = await fetch(DASHBOARD_API_ENDPOINT, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${DASHBOARD_API_AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
