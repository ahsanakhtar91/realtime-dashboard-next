import { NextResponse } from "next/server";

const DASHBOARD_API_ENDPOINT = "https://dashboard-api-dusky.vercel.app/api/get";
const DASHBOARD_API_AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export async function GET(): Promise<NextResponse> {
  try {
    const response = await fetch(DASHBOARD_API_ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${DASHBOARD_API_AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch dashboard data" },
        { status: 400 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
