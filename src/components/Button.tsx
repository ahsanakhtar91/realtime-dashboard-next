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
        "flex items-center gap-1 px-2 py-2 rounded-lg border text-[13px] font-normal h-8",
        "transition-opacity cursor-pointer hover:opacity-75 active:opacity-100 text-[var(--color-text)]",
        outlined || children
          ? "bg-[var(--color-background)] border-[var(--color-border)]"
          : "bg-transparent border-none",
        className
      )}
    >
      {icon}
      {children && <span>{children}</span>}
    </button>
  );
};
