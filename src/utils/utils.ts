export const formatNumber = (number: number = 0, showCurrency?: boolean) => {
  return number.toLocaleString("en-US", {
    style: showCurrency ? "currency" : "decimal",
    currency: showCurrency ? "USD" : undefined,
  });
};
