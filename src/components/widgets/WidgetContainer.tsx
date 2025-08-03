import classNames from "classnames";
import { Button } from "@/components/Button";
import { XIcon } from "@shopify/polaris-icons";

type WidgetContainerProps = {
  className?: string;
  heading: string;
  loading?: boolean;
  canDelete?: boolean;
  onDelete?: () => void;
  children?: React.ReactNode;
}

export const WidgetContainer = ({
  className,
  heading,
  loading,
  canDelete,
  onDelete,
  children,
}: WidgetContainerProps) => {
  const loadingIndicatorHeading = (
    <div className="animate-pulse bg-[var(--color-border)] w-25 h-6 rounded-xl" />
  );

  const loadingIndicatorContent = (
    <div className="flex flex-col gap-3">
      <div className="animate-pulse bg-[var(--color-border)] w-full h-16 rounded-xl" />
      <div className="animate-pulse bg-[var(--color-border)] w-full h-16 rounded-xl" />
    </div>
  );

  return (
    <div
      className={classNames(
        "flex-1 rounded-xl bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)]",
        className
      )}
    >
      <div className="flex flex-row items-center justify-between h-12 p-3 text-[15px] font-normal border-b border-[var(--color-border)]">
        <div>{loading ? loadingIndicatorHeading : heading}</div>
        {canDelete && (
          <Button
            icon={<XIcon height={18} className="fill-current" />}
            outlined
            onClick={onDelete}
          />
        )}
      </div>
      <div className="p-3 text-[13px] min-h-62">
        {loading ? loadingIndicatorContent : children}
      </div>
    </div>
  );
};
