import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { PauseCircleIcon, PlayIcon, RefreshIcon } from "@shopify/polaris-icons";
import { Text } from "@/components/Text";
import { toggleTheme } from "@/app/actions/toggleTheme";
import { WidgetContainer } from "@/components/widgets/WidgetContainer";
import { deleteWidget } from "@/app/actions/deleteWidget";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/data/dashboard/fetchDashboardData";
import { Theme } from "@/app/types";
import { toast } from "react-toastify";
import {
  DashboardApiError,
  DashboardApiResponse,
} from "@/data/dashboard/types";
import dynamic from "next/dynamic";
const MapWidget = dynamic(() => import("@/components/widgets/MapWidget"), {
  loading: () => <p>Loading Map...</p>,
});
import { ChartWidget } from "@/components/widgets/ChartWidget";
import { TableWidget } from "./widgets/TableWidget";
import { SummaryWidget } from "./widgets/SummaryWidget";

export default function DashboardPage({
  theme,
  deletedWidgets,
}: {
  theme: Theme;
  deletedWidgets?: string[];
}) {
  const [autofetch, setAutofetch] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const manualfetch = useRef(false);

  const { data, isLoading, isRefetching, refetch, error } = useQuery<
    DashboardApiResponse,
    DashboardApiError
  >({
    queryKey: ["dashboardData"],
    queryFn: fetchDashboardData,
    refetchInterval: autofetch ? 5000 : false, // refetch data every 5 seconds (if autofetch is true)
    refetchIntervalInBackground: false,
    retry: false,
    staleTime: 1000 * 60, // Consider data stale after 1 minute
  });

  const dashboardData = useMemo(() => data?.data.dashboardData, [data]);

  const loading = useMemo(() => {
    if (manualfetch.current) return true;

    return (isLoading || isRefetching) && !autofetch;
  }, [isLoading, isRefetching, autofetch]);

  useEffect(() => {
    if (error) {
      toast.error(
        <div className="flex flex-col gap-1">
          <div className="font-bold">{error.message}</div>
          {error.subMessage && <div>{error.subMessage}</div>}
        </div>,
        {
          className: "text-sm",
          autoClose: 2500,
          position: "bottom-right",
          theme,
        }
      );
    }
  }, [error]);

  const toggleAutofetch = useCallback(() => {
    setAutofetch((prev) => !prev);
  }, []);

  const playPauseIcon = useMemo(() => {
    return autofetch ? (
      <PauseCircleIcon height={20} className="fill-current" />
    ) : (
      <PlayIcon height={20} className="fill-current" />
    );
  }, [autofetch]);

  const widgets = useMemo(
    () => ({
      row1: [
        {
          id: "summary",
          heading: "Summary",
          content: <SummaryWidget data={dashboardData} />,
        },
        {
          id: "orders",
          heading: "Orders",
          content: (
            <ChartWidget
              type="bar-chart"
              direction="left-to-right"
              data={dashboardData?.charts?.userEngagement}
              valueLabelInTooltip="Total Orders"
            />
          ),
        },
        {
          id: "top-products",
          heading: "Top Products",
          content: (
            <ChartWidget
              type="bar-chart"
              direction="bottom-to-top"
              data={{
                labels: (dashboardData?.tables?.topProducts ?? []).map(
                  (item) => item.name
                ),
                data: (dashboardData?.tables?.topProducts ?? []).map(
                  (item) => item.sales
                ),
              }}
              valueLabelInTooltip="Total Sales"
            />
          ),
        },
      ],
      row2: [
        {
          id: "total-sales",
          heading: "Total sales over time",
          content: (
            <ChartWidget
              type="area-chart"
              direction="bottom-to-top"
              data={dashboardData?.charts?.salesOverTime}
              valueLabelInTooltip="Total Sales"
            />
          ),
        },
        {
          id: "payments-history",
          heading: "Payments history",
          content: (
            <TableWidget data={dashboardData?.tables?.recentTransactions} />
          ),
        },
      ],
      row3: [
        {
          id: "locations",
          heading: "Locations",
          content: (
            <MapWidget locations={dashboardData?.map?.locations ?? []} />
          ),
        },
      ],
    }),
    [dashboardData]
  );

  const widgetCommonProps = {
    canDelete: editMode,
    loading,
  };

  return (
    <div className="font-sans items-center text-[var(--color-text)] h-full pb-4 transition-colors leading-4">
      <Header
        theme={theme}
        onThemeToggle={toggleTheme}
        editMode={editMode}
        setEditMode={setEditMode}
      />
      <div className="flex w-full items-center justify-between p-4 gap-2">
        <Text className="text-xl">Dashboard</Text>
        <div className="flex gap-2">
          <Button
            icon={
              autofetch && isRefetching && !loading ? (
                <RefreshIcon
                  height={18}
                  className="fill-current animate-spin"
                />
              ) : (
                playPauseIcon
              )
            }
            disabled={loading}
            onClick={toggleAutofetch}
          >
            {`${autofetch ? "Pause" : "Start"} auto-fetch`}
          </Button>
          <Button
            icon={<RefreshIcon height={18} className="fill-current" />}
            outlined
            disabled={loading}
            onClick={async () => {
              manualfetch.current = true;
              await refetch();
              manualfetch.current = false;
            }}
          />
        </div>
      </div>

      {/* Widgets in Row #1 (summary, orders, top-products) */}
      <div className="w-full px-4 flex lg:gap-4 flex-col lg:flex-row">
        {!deletedWidgets?.includes(widgets.row1[0].id) && (
          <WidgetContainer
            className="mb-4"
            heading={widgets.row1[0].heading}
            {...widgetCommonProps}
            onDelete={() => deleteWidget(widgets.row1[0].id)}
          >
            {widgets.row1[0].content}
          </WidgetContainer>
        )}

        <div className="flex sm:gap-4 flex-2 flex-col sm:flex-row">
          {widgets.row1
            .slice(1)
            .filter((widget) => !deletedWidgets?.includes(widget.id))
            .map((widget) => (
              <WidgetContainer
                className="mb-4"
                key={widget.id}
                heading={widget.heading}
                {...widgetCommonProps}
                onDelete={() => deleteWidget(widget.id)}
              >
                {widget.content}
              </WidgetContainer>
            ))}
        </div>
      </div>

      {/* Widgets in Row #2 (total-sales, payments-history) */}
      <div className="w-full px-4 flex sm:gap-4 flex-col sm:flex-row">
        {widgets.row2
          .filter((widget) => !deletedWidgets?.includes(widget.id))
          .map((widget) => (
            <WidgetContainer
              className="mb-4"
              key={widget.id}
              heading={widget.heading}
              {...widgetCommonProps}
              onDelete={() => deleteWidget(widget.id)}
            >
              {widget.content}
            </WidgetContainer>
          ))}
      </div>

      {/* Widget in Row #3 (locations) */}
      <div className="w-full px-4">
        {widgets.row3
          .filter((widget) => !deletedWidgets?.includes(widget.id))
          .map((widget) => (
            <WidgetContainer
              // className="mb-4"
              key={widget.id}
              heading={widget.heading}
              {...widgetCommonProps}
              onDelete={() => deleteWidget(widget.id)}
            >
              {widget.content}
            </WidgetContainer>
          ))}
      </div>
    </div>
  );
}
