import { Button } from "@/components/Button";
import { ChartNoAxesColumnDecreasing, SunIcon } from "lucide-react";

type HeaderProps = {
  onThemeToggle: () => void;
};

export const Header = ({ onThemeToggle }: HeaderProps) => {
  return (
    <div className="flex w-full justify-between p-3 border-b border-border bg-background transition-colors">
      <div className="text-bars font-bold text-[20px] flex items-center gap-2">
        <ChartNoAxesColumnDecreasing />
        <div>acme</div>
      </div>
      <Button icon={<SunIcon size={16} />} onClick={onThemeToggle} />
    </div>
  );
};
