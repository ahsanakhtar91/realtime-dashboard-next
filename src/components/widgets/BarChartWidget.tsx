import { ChartData } from "@/data/dashboard/types";
import React, { useMemo } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type FormattedData = { key: string; value: string | number };

type BarChartWidgetProps = {
  data?: ChartData;
  direction?: "bottom-to-top" | "left-to-right";
};

export const BarChartWidget = ({
  data,
  direction = "bottom-to-top",
}: BarChartWidgetProps) => {
  const formattedData = useMemo(() => {
    if (!data) return [];

    const dataArr: FormattedData[] = [];
    data.labels.forEach((k, i) =>
      dataArr.push({ key: k, value: data.data[i] })
    );
    return dataArr;
  }, [data]);

  return (
    <ResponsiveContainer height={250}>
      <BarChart
        data={formattedData}
        margin={{ top: 20, right: 20, bottom: 0, left: -5 }}
        layout={direction === "bottom-to-top" ? undefined : "vertical"}
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
          content={({ payload }) => {
            if (!payload) return null;
            const item = payload?.[0]?.payload as unknown as FormattedData;
            if (!item) return null;
            return (
              <div className="w-fit p-2 flex flex-col gap-1 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-center text-[var(--color-text)]!">
                <span className="font-bold self-start">{item.key}</span>
                <span>Total Sales: {item.value}</span>
              </div>
            );
          }}
        />
        <Bar
          dataKey="value"
          maxBarSize={36}
          fill="var(--color-chart-bars)"
          className="text-[var(--color-text)]"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
