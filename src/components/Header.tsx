import { Button } from "@/components/Button";
import { SunIcon } from "lucide-react";

type HeaderProps = {
  onThemeToggle: () => void;
};

export const Header = ({ onThemeToggle }: HeaderProps) => {
  return (
    <div className="flex flex-row w-full justify-between p-3 border-b border-border bg-background">
      <div className="text-[#07557C] font-bold text-[18px]">acme</div>
      <Button icon={<SunIcon size={16} />} onClick={onThemeToggle} />
    </div>
  );
};
