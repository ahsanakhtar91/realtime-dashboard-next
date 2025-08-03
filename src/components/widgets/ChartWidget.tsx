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

export const ChartWidget = ({
  data,
  direction = "bottom-to-top",
}: {
  data?: ChartData;
  direction?: "bottom-to-top" | "left-to-right";
}) => {
  if (!data) return null;

  const formattedData = useMemo(() => {
    const arr: FormattedData[] = [];
    data.labels.forEach((k, i) => arr.push({ key: k, value: data.data[i] }));
    return arr;
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
            const d = payload?.[0]?.payload as unknown as FormattedData;
            if (!d) return null;
            return (
              <div className="w-fit p-2 flex gap-1 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] text-center text-[var(--color-text)]!">
                <span className="font-bold">
                  {d.key}
                  {": "}
                </span>
                <span>{d.value}</span>
              </div>
            );
          }}
        />
        <Bar
          dataKey="value"
          maxBarSize={direction === "bottom-to-top" ? 45 : 38}
          fill="var(--color-chart-bars)"
          className="text-[var(--color-text)]"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
