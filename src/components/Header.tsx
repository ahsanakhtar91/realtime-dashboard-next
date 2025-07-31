import { Button } from "@/components/Button";
import { ChartVerticalFilledIcon, SunIcon } from "@shopify/polaris-icons";

type HeaderProps = {
  onThemeToggle: () => void;
};

export const Header = ({ onThemeToggle }: HeaderProps) => {
  return (
    <div className="flex w-full justify-between p-3 border-b border-[var(--color-border)] bg-[var(--color-background)] transition-colors">
      <div className="text-[var(--color-chart-bars)] flex items-center gap-1">
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
