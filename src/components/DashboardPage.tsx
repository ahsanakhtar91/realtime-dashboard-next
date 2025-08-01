"use client";
import { useCallback, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { PauseCircleIcon, PlayIcon, RefreshIcon } from "@shopify/polaris-icons";
import { Text } from "@/components/Text";
import { toggleTheme } from "@/app/actions/toggleTheme";
import Widget from "@/components/Widget";
import { useBreakpoints } from "@shopify/polaris";

const iconProps = {
  width: 18,
  className: "fill-current",
};

export default function DashboardPage() {
  const [autofetching, setAutofetching] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { smDown } = useBreakpoints();

  const toggleAutofetching = useCallback(() => {
    setAutofetching((prev) => !prev);
  }, []);

  const autofetchingIcon = useMemo(() => {
    return autofetching ? (
      <PauseCircleIcon {...iconProps} />
    ) : (
      <PlayIcon {...iconProps} />
    );
  }, [autofetching]);

  const widgets = useMemo(
    () => ({
      row1: [
        {
          id: "summary",
          heading: "Summary",
          content: <div>Summary Content...</div>,
        },
        {
          id: "orders",
          heading: "Orders",
          content: <div>Orders Content...</div>,
        },
        {
          id: "top-products",
          heading: "Top Products",
          content: <div>Top Products Content...</div>,
        },
      ],
      row2: [
        {
          id: "total-sales",
          heading: "Total sales over time",
          content: <div>Total Sales Content...</div>,
        },
        {
          id: "payments-history",
          heading: "Payments history",
          content: <div>Payments History Content...</div>,
        },
      ],
      row3: [
        {
          id: "locations",
          heading: "Locations",
          content: <div>Locations Content...</div>,
        },
      ],
    }),
    []
  );

  return (
    <div className="font-sans items-center bg-[var(--color-root)] text-[var(--color-text)] h-[100vh] transition-colors leading-4">
      <Header
        onThemeToggle={toggleTheme}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      <div className="flex w-full items-center justify-between p-4 gap-2">
        <Text className="text-xl">Dashboard</Text>
        <div className="flex gap-2">
          <Button icon={autofetchingIcon} onClick={toggleAutofetching}>
            {`${smDown ? "" : autofetching ? "Pause " : "Start "} auto-fetch`}
          </Button>
          <Button icon={<RefreshIcon {...iconProps} />} outlined />
        </div>
      </div>

      {/* Widgets Row 1 */}
      <div className="w-full px-4 pb-4 flex gap-4 flex-col lg:flex-row">
        <Widget
          heading={widgets.row1[0].heading}
          canDelete={editMode}
          onDelete={() => {
            console.log(widgets.row1[0].id);
          }}
        >
          {widgets.row1[0].content}
        </Widget>

        <div className="flex gap-4 flex-2 flex-col sm:flex-row">
          {widgets.row1.slice(1).map((widget) => (
            <Widget
              key={widget.id}
              heading={widget.heading}
              canDelete={editMode}
              onDelete={() => {
                console.log(widget.id);
              }}
            >
              {widget.content}
            </Widget>
          ))}
        </div>
      </div>

      {/* Widgets Row 2 */}
      <div className="w-full px-4 pb-4 flex gap-4 flex-col sm:flex-row">
        {widgets.row2.map((widget) => (
          <Widget
            key={widget.id}
            heading={widget.heading}
            canDelete={editMode}
            onDelete={() => {
              console.log(widget.id);
            }}
          >
            {widget.content}
          </Widget>
        ))}
      </div>

      {/* Widgets Row 3 */}
      <div className="w-full px-4 pb-4">
        {widgets.row3.map((widget) => (
          <Widget
            key={widget.id}
            heading={widget.heading}
            canDelete={editMode}
            onDelete={() => {
              console.log(widget.id);
            }}
          >
            {widget.content}
          </Widget>
        ))}
      </div>
    </div>
  );
}
