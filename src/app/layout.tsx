import "./globals.css";
import { Geist } from "next/font/google";
import { ReactNode, CSSProperties } from "react";
import { cookies } from "next/headers";
import { Theme } from "@/app/types";
import { Metadata } from "next";

const geistSans = Geist({ subsets: ["latin"] });

function getTokensByTheme(theme: Theme) {
  return theme === "light"
    ? {
        "--color-root": "#f8fbfc",
        "--color-text": "#181b1c",
        "--color-background": "#fafdff",
        "--color-border": "#d8dcde",
        "--color-text-disabled": "#74797b",
        "--color-background-disabled": "#d8dcde",
        "--color-border-disabled": "#74797b",
        "--color-chart-bars": "#07557c",
      }
    : {
        "--color-root": "#3e4243",
        "--color-text": "#fafdff",
        "--color-background": "#181b1c",
        "--color-border": "#6b6f71",
        "--color-text-disabled": "#b3b5b6",
        "--color-background-disabled": "#6b6f71",
        "--color-border-disabled": "#b3b5b6",
        "--color-chart-bars": "#0d72a5",
      };
}

export const metadata: Metadata = {
  title: "ACME | Real-Time Dashboard",
  description:
    "ACME is a configurable, real-time dashboard for monitoring live data.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = (cookieStore.get("theme")?.value || "light") as Theme;

  const themeTokens = getTokensByTheme(theme);

  const styleTokens = {
    ...themeTokens,
    "--font-sans": geistSans.style.fontFamily,
  };

  return (
    <html
      lang="en"
      style={styleTokens as CSSProperties}
      className="bg-[var(--color-root)]"
    >
      <body data-theme={theme}>{children}</body>
    </html>
  );
}
