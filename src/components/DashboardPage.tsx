"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { PauseCircleIcon, PlayIcon, RefreshIcon } from "@shopify/polaris-icons";
import { Text } from "@/components/Text";
import { toggleTheme } from "@/app/actions/toggleTheme";
import Widget from "@/components/Widget";
import { useBreakpoints } from "@shopify/polaris";
import { deleteWidget } from "@/app/actions/deleteWidget";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/data/dashboard/fetchDashboardData";
import { Theme } from "@/app/types";
import { toast } from "react-toastify";

const iconProps = {
  height: 18,
  className: "fill-current",
};

export default function DashboardPage({
  deletedWidgets,
}: {
  deletedWidgets?: string[];
}) {
  const [autofetch, setAutofetch] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { data, isLoading, isRefetching, refetch, error } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchDashboardData,
    refetchInterval: autofetch ? 5000 : false, // refetch data every 5 seconds (if autofetch is true)
    refetchIntervalInBackground: false,
    retry: 0, // retry once on failure
    staleTime: 1000 * 60, // Consider data stale after 1 minute
  });

  const loading = useMemo(
    () => isLoading || isRefetching,
    [isLoading, isRefetching]
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        toastId: "error",
        autoClose: 2000,
        position: "bottom-right",
        theme: document.body.getAttribute("data-theme") as Theme,
      });
    }
  }, [error]);

  const dashboardData = useMemo(() => data?.data.dashboardData, [data]);

  const toggleAutofetch = useCallback(() => {
    setAutofetch((prev) => !prev);
  }, []);

  const autofetchIcon = useMemo(() => {
    return autofetch ? (
      <PauseCircleIcon {...iconProps} />
    ) : (
      <PlayIcon {...iconProps} />
    );
  }, [autofetch]);

  const { smDown } = useBreakpoints();

  console.log("Dashboard Data:", dashboardData);

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

  const widgetCommonProps = {
    canDelete: editMode,
    loading,
  };

  return (
    <div className="font-sans items-center text-[var(--color-text)] h-full pb-4 transition-colors leading-4">
      <Header
        onThemeToggle={toggleTheme}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      <div className="flex w-full items-center justify-between p-4 gap-2">
        <Text className="text-xl">Dashboard</Text>
        <div className="flex gap-2">
          <Button
            icon={autofetchIcon}
            disabled={loading}
            onClick={toggleAutofetch}
          >
            {`${smDown ? "" : autofetch ? "Pause" : "Start"} auto-fetch`}
          </Button>
          <Button
            icon={<RefreshIcon {...iconProps} />}
            outlined
            disabled={loading}
            onClick={refetch}
          />
        </div>
      </div>

      {/* Widgets in Row #1 (Summary, Orders, Top Products) */}
      <div className="w-full px-4 flex lg:gap-4 flex-col lg:flex-row">
        {!deletedWidgets?.includes(widgets.row1[0].id) && (
          <Widget
            className="mb-4"
            heading={widgets.row1[0].heading}
            {...widgetCommonProps}
            onDelete={() => deleteWidget(widgets.row1[0].id)}
          >
            {widgets.row1[0].content}
          </Widget>
        )}

        <div className="flex sm:gap-4 flex-2 flex-col sm:flex-row">
          {widgets.row1
            .slice(1)
            .filter((widget) => !deletedWidgets?.includes(widget.id))
            .map((widget) => (
              <Widget
                className="mb-4"
                key={widget.id}
                heading={widget.heading}
                {...widgetCommonProps}
                onDelete={() => deleteWidget(widget.id)}
              >
                {widget.content}
              </Widget>
            ))}
        </div>
      </div>

      {/* Widgets in Row #2 (Total Sales, Payments History) */}
      <div className="w-full px-4 flex sm:gap-4 flex-col sm:flex-row">
        {widgets.row2
          .filter((widget) => !deletedWidgets?.includes(widget.id))
          .map((widget) => (
            <Widget
              className="mb-4"
              key={widget.id}
              heading={widget.heading}
              {...widgetCommonProps}
              onDelete={() => deleteWidget(widget.id)}
            >
              {widget.content}
            </Widget>
          ))}
      </div>

      {/* Widget in Row #3 (Locations) */}
      <div className="w-full px-4">
        {widgets.row3
          .filter((widget) => !deletedWidgets?.includes(widget.id))
          .map((widget) => (
            <Widget
              // className="mb-4"
              key={widget.id}
              heading={widget.heading}
              {...widgetCommonProps}
              onDelete={() => deleteWidget(widget.id)}
            >
              {widget.content}
            </Widget>
          ))}
      </div>
    </div>
  );
}
