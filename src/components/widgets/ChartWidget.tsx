import { ChartData } from "@/data/dashboard/types";
import React, { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type FormattedData = {
  key: string;
  value: string | number;
};

type ChartWidgetProps = {
  type?: "bar-chart" | "area-chart";
  direction?: "bottom-to-top" | "left-to-right";
  data?: ChartData;
  valueLabelInTooltip?: string;
};

export const ChartWidget = ({
  type = "bar-chart",
  direction = "bottom-to-top",
  data,
  valueLabelInTooltip = "Value",
}: ChartWidgetProps) => {
  const formattedData = useMemo(() => {
    if (!data) return [];

    const dataArr: FormattedData[] = [];
    data.labels.forEach((k, i) =>
      dataArr.push({ key: k, value: data.data[i] })
    );
    return dataArr;
  }, [data]);

  const Component = type === "bar-chart" ? BarChart : AreaChart;

  return (
    <ResponsiveContainer className="w-full! h-[250px]!">
      <Component
        data={formattedData}
        margin={{ top: 20, right: 20, bottom: 0, left: -5 }}
        layout={direction === "bottom-to-top" ? undefined : "vertical"}
        className="[&>svg]:focus:outline-none!"
      >
        <XAxis
          type={direction === "bottom-to-top" ? undefined : "number"}
          dataKey={direction === "bottom-to-top" ? "key" : undefined}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          className="fill-[var(--color-text)]"
          style={{ fill: "fill-[var(--color-text)]" }}
        />
        <YAxis
          type={direction === "bottom-to-top" ? undefined : "category"}
          dataKey={direction === "bottom-to-top" ? undefined : "key"}
          tickLine={false}
          axisLine={false}
          style={{ fontSize: 12, fill: "fill-[var(--color-text)]" }}
          className="fill-[var(--color-text)]"
        />
        <Tooltip
          cursor={false}
          content={({ payload }) => {
            if (!payload) return null;
            const item = payload?.[0]?.payload as FormattedData;
            if (!item) return null;
            return (
              <div className="w-fit p-2 flex flex-col gap-1 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-center text-[var(--color-text)]!">
                <span className="font-bold self-start">{item.key}</span>
                <span>
                  {valueLabelInTooltip}: {item.value}
                </span>
              </div>
            );
          }}
        />
        {type === "bar-chart" ? (
          <Bar
            dataKey="value"
            maxBarSize={36}
            className="fill-[var(--color-chart-bars)] cursor-pointer"
            activeBar={{ className: "opacity-75" }}
          />
        ) : (
          <>
            <Line
              type="monotone"
              dataKey="value"
              strokeWidth={0}
              dot={{ className: "hidden" }}
              activeDot={{ stroke: "var(--color-chart-bars)", strokeWidth: 4 }}
            />
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="65%"
                  stopColor="var(--color-chart-bars)"
                  stopOpacity="1"
                />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="value" fill="url(#areaGradient)" />
          </>
        )}
      </Component>
    </ResponsiveContainer>
  );
};
