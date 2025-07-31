"use client";
import { useCallback, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { PauseIcon, PlayIcon, RefreshCw } from "lucide-react";
import { Text } from "@/components/Text";
import { toggleTheme } from "@/app/actions/toggleTheme";

export default function DashboardPage() {
  const [autofetching, setAutofetching] = useState(false);

  const toggleAutofetching = useCallback(() => {
    setAutofetching((prev) => !prev);
  }, []);

  const autofetchingIcon = useMemo(() => {
    return autofetching ? <PauseIcon size={16} /> : <PlayIcon size={16} />;
  }, [autofetching]);

  return (
    <div className="font-sans items-center justify-items-center bg-[var(--color-root)] text-[var(--color-text)] h-[100vh] transition-colors">
      <Header onThemeToggle={toggleTheme} />
      <div className="flex w-full items-center justify-between p-4">
        <Text className="text-xl">Dashboard</Text>
        <div className="flex gap-2">
          <Button icon={autofetchingIcon} onClick={toggleAutofetching}>
            {autofetching ? "Pause auto-fetch" : "Resume auto-fetch"}
          </Button>
          <Button icon={<RefreshCw size={16} />} outlined />
        </div>
      </div>
    </div>
  );
}
