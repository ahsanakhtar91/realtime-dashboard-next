import { useMemo } from "react";
import { Button } from "@/components/Button";
import { Switch } from "@/components/Switch";
import {
  ChartVerticalFilledIcon,
  SunIcon,
  MoonIcon,
} from "@shopify/polaris-icons";
import { Theme } from "@/app/types";
import { restoreAllWidgets } from "@/app/actions/restoreAllWidgets";

type HeaderProps = {
  theme: Theme;
  onThemeToggle: () => void;
  editMode?: boolean;
  setEditMode?: (value: boolean) => void;
};

export const Header = ({
  theme,
  onThemeToggle,
  editMode,
  setEditMode,
}: HeaderProps) => {
  const themeIcon = useMemo(
    () =>
      theme === "dark" ? (
        <MoonIcon height={20} className="fill-current" />
      ) : (
        <SunIcon height={20} className="fill-current" />
      ),
    [theme]
  );

  return (
    <div className="flex w-full justify-between gap-2 p-3 border-b border-[var(--color-border)] bg-[var(--color-background)] transition-colors">
      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          onClick={() => {
            restoreAllWidgets();
            setEditMode?.(false);
          }}
        >
          <span className="hidden sm:flex">Restore to default</span>
          <span className="flex sm:hidden ">Restore</span>
        </Button>
        <Switch
          value={editMode}
          label={
            <>
              <span className="hidden sm:flex">Edit mode</span>
              <span className="flex sm:hidden ">Edit</span>
            </>
          }
          onChange={setEditMode}
        />
      </div>
      <div className="flex items-center gap-1 text-[var(--color-chart-bars)]">
        <ChartVerticalFilledIcon height={26} className="fill-current" />
        <div className="font-normal text-2xl">acme</div>
      </div>
      <Button icon={themeIcon} onClick={onThemeToggle} />
    </div>
  );
};
