import { useMemo, useState } from "react";
import cn from "classnames";
import { TableRow } from "@/data/dashboard/types";
import { Button } from "@/components/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@shopify/polaris-icons";

const PAGE_SIZE = 4;

export type TableWidgetProps = {
  data?: TableRow[];
};

export const TableWidget = ({ data }: TableWidgetProps) => {
  const headings = ["ID", "User Name", "Amount", "Date"];

  const formattedRows = useMemo(() => {
    if (!data) return [];

    const rows: Array<string | number>[] = [];

    data.forEach(({ id, user, amount, date }) => {
      const rowItem = [id, user, amount, date];
      rows.push(rowItem);
    });

    return rows;
  }, [data]);

  const [page, setPage] = useState(0);

  const { startIndex, endIndex } = useMemo(() => {
    const end = page * PAGE_SIZE + PAGE_SIZE;
    return {
      startIndex: page * PAGE_SIZE,
      endIndex: end > formattedRows.length ? formattedRows.length : end,
    };
  }, [page, formattedRows]);

  const { hasPrevious, hasNext } = useMemo(() => {
    return {
      hasPrevious: page > 0,
      hasNext: !!formattedRows[endIndex + 1],
    };
  }, [page, endIndex, formattedRows]);

  const rowsToShow = formattedRows.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col w-full h-full justify-between">
      <table
        cellSpacing={0}
        className="w-full text-[13px] font-normal text-[var(--color-text)] bg-[var(--color-background)] border border-separate border-[var(--color-border)] rounded-xl overflow-hidden"
      >
        <thead>
          <tr>
            {headings.map((h, hIndex) => (
              <th
                key={hIndex}
                className="sm:px-2 md:px-2 xl:px-6 py-3 font-normal opacity-80 border-b border-[var(--color-border)] text-left first:pl-4"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowsToShow.map((row, rIndex) => (
            <tr key={rIndex}>
              {row.map((cell, cIndex) => (
                <td
                  key={cIndex}
                  className={cn(
                    "sm:px-2 md:px-2 xl:px-6 py-3 font-normal border-b border-[var(--color-border)] whitespace-nowrap text-left first:pl-4"
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center mt-3 justify-between">
        <div>
          {`Showing ${startIndex + 1} - ${endIndex} of ${
            formattedRows.length
          } Records`}
        </div>
        <div className="flex gap-2">
          <Button
            icon={<ChevronLeftIcon height={18} className="fill-current" />}
            onClick={() => setPage(page - 1)}
            outlined
            disabled={!hasPrevious}
          />
          <Button
            icon={<ChevronRightIcon height={18} className="fill-current" />}
            onClick={() => setPage(page + 1)}
            outlined
            disabled={!hasNext}
          />
        </div>
      </div>
    </div>
  );
};
