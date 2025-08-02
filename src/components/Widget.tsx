import React from "react";
import classNames from "classnames";
import { Button } from "./Button";
import { XIcon } from "@shopify/polaris-icons";

interface WidgetProps {
  className?: string;
  heading: string;
  loading?: boolean;
  canDelete?: boolean;
  onDelete?: () => void;
  children?: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({
  className,
  heading,
  loading,
  canDelete,
  onDelete,
  children,
}) => {
  return (
    <div
      className={classNames(
        "flex-1 rounded-xl bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)]",
        className
      )}
    >
      <div className="flex flex-row items-center justify-between h-12 p-3 text-[15px] font-normal border-b border-[var(--color-border)]">
        <div>{heading}</div>
        {canDelete && (
          <Button
            icon={<XIcon height={18} className="fill-current" />}
            outlined
            onClick={onDelete}
          />
        )}
      </div>
      <div className="p-3 text-[13px] min-h-42">
        {children}
      </div>
    </div>
  );
};

export default Widget;
