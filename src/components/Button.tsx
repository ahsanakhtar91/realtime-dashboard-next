import React from "react";
import cn from "classnames"; // Optional: Utility to join classes

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
        "inline-flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-medium",
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
