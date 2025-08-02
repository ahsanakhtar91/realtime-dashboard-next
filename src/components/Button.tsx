import React from "react";
import cn from "classnames";

type ButtonProps = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  outlined?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  icon,
  children,
  className = "",
  outlined,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      className={cn(
        "flex items-center gap-1 py-2 rounded-lg text-[13px] font-normal h-8 whitespace-nowrap transition-all",
        {
          "border border-[var(--color-border)]": outlined || children,
          "px-1.5": icon,
          "px-2": !icon,
          "cursor-not-allowed text-[var(--color-text-disabled)] bg-[var(--color-background-disabled)] border-[var(--color-border-disabled)]":
            disabled,
          "cursor-pointer text-[var(--color-text)] bg-[var(--color-background)] border-[var(--color-border)] hover:opacity-75 active:opacity-100":
            !disabled,
        },
        className
      )}
    >
      {icon}
      {children && <span>{children}</span>}
    </button>
  );
};
