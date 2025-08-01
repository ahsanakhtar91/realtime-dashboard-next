"use client";
import { useCallback, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { PauseCircleIcon, PlayIcon, RefreshIcon } from "@shopify/polaris-icons";
import { Text } from "@/components/Text";
import { toggleTheme } from "@/app/actions/toggleTheme";
import Widget from "@/components/Widget";

const iconProps = {
  width: 18,
  className: "fill-current",
};

export default function DashboardPage() {
  const [autofetching, setAutofetching] = useState(false);

  const toggleAutofetching = useCallback(() => {
    setAutofetching((prev) => !prev);
  }, []);

  const autofetchingIcon = useMemo(() => {
    return autofetching ? (
      <PauseCircleIcon {...iconProps} />
    ) : (
      <PlayIcon {...iconProps} />
    );
  }, [autofetching]);

  return (
    <div className="font-sans items-center justify-items-center bg-[var(--color-root)] text-[var(--color-text)] h-[100vh] transition-colors leading-4">
      <Header onThemeToggle={toggleTheme} />
      <div className="flex w-full items-center justify-between p-4">
        <Text className="text-xl">Dashboard</Text>
        <div className="flex gap-2">
          <Button icon={autofetchingIcon} onClick={toggleAutofetching}>
            {autofetching ? "Pause auto-fetch" : "Resume auto-fetch"}
          </Button>
          <Button icon={<RefreshIcon {...iconProps} />} outlined />
        </div>
      </div>

      {/* Widgets Row 1 */}
      <div className="w-full px-4 pb-4 flex gap-4 flex-col lg:flex-row">
        <Widget heading="Summary">Content here...</Widget>
        <div className="flex gap-4 flex-2 flex-col sm:flex-row">
          <Widget heading="Orders">Content here...</Widget>
          <Widget heading="Top Products">Content here...</Widget>
        </div>
      </div>

      {/* Widgets Row 2 */}
      <div className="w-full px-4 pb-4 flex gap-4 flex-col sm:flex-row">
        <Widget heading="Total sales over time">Content here...</Widget>
        <Widget heading="Payments history">Content here...</Widget>
      </div>

      {/* Widgets Row 3 */}
      <div className="w-full px-4 pb-4">
        <Widget heading="Locations">Content here...</Widget>
      </div>
    </div>
  );
}
