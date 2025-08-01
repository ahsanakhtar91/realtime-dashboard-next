import { Button } from "@/components/Button";
import { Switch } from "@/components/Switch";
import { useBreakpoints } from "@shopify/polaris";
import { ChartVerticalFilledIcon, SunIcon } from "@shopify/polaris-icons";
import { restoreAllWidgets } from "@/app/actions/restoreAllWidgets";

type HeaderProps = {
  onThemeToggle: () => void;
  editMode?: boolean;
  setEditMode?: (value: boolean) => void;
};

export const Header = ({
  onThemeToggle,
  editMode,
  setEditMode,
}: HeaderProps) => {
  const { smDown } = useBreakpoints();

  return (
    <div className="flex w-full justify-between gap-2 p-3 border-b border-[var(--color-border)] bg-[var(--color-background)] transition-colors">
      <div className={`flex items-center ${smDown ? "gap-2" : "gap-4"}`}>
        <Button
          onClick={() => {
            restoreAllWidgets();
            setEditMode?.(false);
          }}
        >
          {smDown ? "Restore" : "Restore to default"}
        </Button>
        <Switch
          value={editMode}
          label={smDown ? "Edit" : "Edit mode"}
          onChange={setEditMode}
        />
      </div>
      <div className="flex items-center gap-1 text-[var(--color-chart-bars)]">
        <ChartVerticalFilledIcon width={26} className="fill-current" />
        <div className="font-normal text-2xl">acme</div>
      </div>
      <Button
        icon={<SunIcon width={20} className="fill-current" />}
        onClick={onThemeToggle}
      />
    </div>
  );
};
