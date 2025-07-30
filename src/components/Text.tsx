import React from "react";
import cn from "classnames";

type TextProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Text = ({ children, className }: TextProps) => {
  return (
    <div
      className={cn(
        "font-normal text-foreground transition-colors",
        className
      )}
    >
      {children}
    </div>
  );
};
