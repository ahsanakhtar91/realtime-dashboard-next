import { Button } from "@/components/Button";
import { ChartNoAxesColumnDecreasing, SunIcon } from "lucide-react";

type HeaderProps = {
  onThemeToggle: () => void;
};

export const Header = ({ onThemeToggle }: HeaderProps) => {
  return (
    <div className="flex w-full justify-between p-3 border-b border-[var(--color-border)] bg-[var(--color-background)] transition-colors">
      <div className="text-[var(--color-chart-bars)] flex items-center gap-1">
        <ChartNoAxesColumnDecreasing />
        <div className="font-normal text-2xl">acme</div>
      </div>
      <Button icon={<SunIcon size={18} />} onClick={onThemeToggle} />
    </div>
  );
};
