import React from "react";

type ButtonProps = {
  value?: boolean;
  label?: string;
  onChange?: (value: boolean) => void;
};

export const Switch = ({ value, label, onChange }: ButtonProps) => {
  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        checked={value}
        className="sr-only peer"
        onChange={() => onChange && onChange(!value)}
      />
      <div className="relative w-9 h-5 bg-[var(--color-border)] peer-checked:bg-[var(--color-chart-bars)] rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:absolute after:top-[2px] after:start-[2px] after:bg-[var(--color-background)] after:border-[var(--color-border)] after:border after:rounded-full after:h-4 after:w-4 after:transition-all" />
      <span className="pl-2 text-sm">{label}</span>
    </label>
  );
};
