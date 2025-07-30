import React from "react";
import cn from "classnames";

type ButtonProps = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  outlined?: boolean;
  onClick?: () => void;
};

export const Button = ({
  icon,
  children,
  className = "",
  outlined,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-2 py-2 rounded-lg border text-[13px] font-normal h-8",
        "transition-opacity hover:opacity-75 hover:cursor-pointer",
        "bg-background text-foreground",
        outlined || children
          ? "bg-background border-border"
          : "bg-transparent border-none",
        className
      )}
    >
      {icon}
      {children && <span>{children}</span>}
    </button>
  );
};
