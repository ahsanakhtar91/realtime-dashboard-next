import React from "react";
import cn from "classnames";

type ButtonProps = {
  icon?: React.ReactNode;
  label?: string;
  className?: string;
  onClick?: () => void;
};

export const Button = ({
  icon,
  label,
  className = "",
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-2 py-2 rounded-lg border text-[13px] font-normal h-8",
        "transition-opacity hover:opacity-80 hover:cursor-pointer",
        "bg-background text-foreground",
        label ? "bg-background border-border" : "bg-transparent border-none",
        className
      )}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
};
