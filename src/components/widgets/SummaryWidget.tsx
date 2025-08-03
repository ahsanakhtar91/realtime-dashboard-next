import { DashboardData } from "@/data/dashboard/types";
import { formatNumber } from "@/utils/utils";
import { useMemo } from "react";
import cn from "classnames";

type SummaryWidgetProps = {
  data?: DashboardData;
};

export const SummaryWidget = ({ data }: SummaryWidgetProps) => {
  // Using salesOverTime data to calculate totalSales
  // Assuming the amount in each sale was $70 on avarage
  const totalSales = useMemo(() => {
    const amountPerSale = 70;
    const salesCount = (data?.charts?.salesOverTime?.data ?? []).reduce(
      (num, sum) => sum + num,
      0
    );
    return salesCount * amountPerSale;
  }, [data?.charts?.salesOverTime]);

  // Assuming the total expenses are 20% of the totalSales
  const totalExpenses = (totalSales * 20) / 100;

  // Now using totalSales and totalExpenses to get the totalProfit
  const totalProfit = totalSales - totalExpenses;

  // Using userEngagement (Orders) data to sum up the totalOrders
  const totalOrders = useMemo(() => {
    return (data?.charts?.userEngagement?.data ?? []).reduce(
      (num, sum) => sum + num,
      0
    );
  }, [data?.charts?.userEngagement]);

  const sections = [
    { label: "Total sales", text: `${formatNumber(totalSales, true)} USD` },
    {
      label: "Total expenses",
      text: `${formatNumber(totalExpenses, true)} USD`,
    },
    { label: "Gross profit", text: `${formatNumber(totalProfit, true)} USD` },
    { label: "Total orders", text: formatNumber(totalOrders) },
  ];

  return (
    <div className="flex flex-col m-[-12] font-normal">
      {sections.map((section, i) => (
        <div
          key={i}
          className={cn("flex flex-col pb-2 pl-4 pt-3 gap-1", {
            "border-t border-[var(--color-border)]": i > 0,
          })}
        >
          <div className="text-[13px]">{section.label}</div>
          <div className="text-xl">{section.text}</div>
        </div>
      ))}
    </div>
  );
};
