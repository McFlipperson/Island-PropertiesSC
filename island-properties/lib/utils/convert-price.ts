import type { Currency } from "@/store/use-ui-store";

const EXCHANGE_RATE = Number(process.env.NEXT_PUBLIC_CURRENCY_EXCHANGE_RATE ?? 58);

export function convertPrice(pricePhp: number, currency: Currency): number {
  if (currency === "PHP") {
    return pricePhp;
  }

  return pricePhp / EXCHANGE_RATE;
}

export function formatPrice(pricePhp: number, currency: Currency): string {
  const converted = convertPrice(pricePhp, currency);
  const currencyCode = currency === "PHP" ? "PHP" : "USD";
  const locale = currency === "PHP" ? "en-PH" : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(converted);
}
