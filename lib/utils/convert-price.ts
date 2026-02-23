import type { Currency } from "@/store/use-ui-store";

// Update these rates periodically or pull from an API
const PHP_TO_USD = Number(process.env.NEXT_PUBLIC_CURRENCY_EXCHANGE_RATE ?? 58);
const PHP_TO_KRW = Number(process.env.NEXT_PUBLIC_KRW_RATE ?? 23.4);

export function convertPrice(pricePhp: number, currency: Currency): number {
  switch (currency) {
    case "USD": return pricePhp / PHP_TO_USD;
    case "KRW": return pricePhp * PHP_TO_KRW;
    default:    return pricePhp;
  }
}

export function formatPrice(pricePhp: number, currency: Currency): string {
  const converted = convertPrice(pricePhp, currency);

  if (currency === "KRW") {
    if (converted >= 1_000_000_000) {
      return `₩${(converted / 1_000_000_000).toFixed(1)}B`;
    }
    if (converted >= 100_000_000) {
      return `₩${Math.round(converted / 100_000_000)}억`;
    }
    return `₩${Math.round(converted / 10_000).toLocaleString()}만`;
  }

  return new Intl.NumberFormat(currency === "PHP" ? "en-PH" : "en-US", {
    style: "currency",
    currency: currency === "PHP" ? "PHP" : "USD",
    maximumFractionDigits: 0,
  }).format(converted);
}

/** Convert a USD amount to the selected display currency and format it */
export function formatUsd(amountUsd: number, currency: Currency): string {
  // Convert USD → PHP first, then reuse formatPrice
  const asPhp = amountUsd * PHP_TO_USD;
  return formatPrice(asPhp, currency);
}

/** Return the currency symbol/label for the ROI section heading */
export function currencyLabel(currency: Currency): string {
  switch (currency) {
    case "KRW": return "KRW";
    case "USD": return "USD";
    default:    return "PHP";
  }
}
