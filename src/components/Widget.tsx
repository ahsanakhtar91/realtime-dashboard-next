import React from "react";

interface WidgetProps {
  heading: string;
  children?: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({ heading, children }) => (
  <div className="flex-1 rounded-xl bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)]">
    <div className="p-3 text-[15px] font-normal border-b border-[var(--color-border)]">
      {heading}
    </div>
    <div className="p-3 text-[13px]">{children}</div>
  </div>
);

export default Widget;
