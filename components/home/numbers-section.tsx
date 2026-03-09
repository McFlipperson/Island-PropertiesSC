"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useUIStore } from "@/store/use-ui-store";
import { CheckCircle2, XCircle } from "lucide-react";

const USD_TO_PHP = 58;
const USD_TO_KRW = 1450;

type Currency = "PHP" | "USD" | "KRW";

function formatUsdPrice(usdValue: number, currency: Currency): string {
  if (currency === "PHP") return `₱${Math.round(usdValue * USD_TO_PHP).toLocaleString()}`;
  if (currency === "USD") return `$${Math.round(usdValue).toLocaleString()}`;
  return `₩${Math.round(usdValue * USD_TO_KRW).toLocaleString()}`;
}

function formatPhpPrice(phpValue: number, currency: Currency): string {
  const usd = phpValue / USD_TO_PHP;
  if (currency === "PHP") return `₱${Math.round(phpValue).toLocaleString()}`;
  if (currency === "USD") return `$${Math.round(usd).toLocaleString()}`;
  return `₩${Math.round(usd * USD_TO_KRW).toLocaleString()}`;
}

const currencyLabel: Record<Currency, string> = {
  PHP: "Philippine Peso (PHP)",
  USD: "US Dollar (USD)",
  KRW: "Korean Won (KRW)",
};

const currencyLabelKo: Record<Currency, string> = {
  PHP: "필리핀 페소 (PHP)",
  USD: "미국 달러 (USD)",
  KRW: "한국 원 (KRW)",
};

export function NumbersSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const openYuna = useUIStore((s) => s.openYuna);
  const currency = useUIStore((s) => s.currency) as Currency;
  const locale = useUIStore((s) => s.locale);

  const comparisons = [
    {
      city: locale === "ko" ? "발리, 인도네시아" : "Bali, Indonesia",
      price: formatUsdPrice(2300, currency) + "+/sqm",
      note: "Foreigners cannot own freehold",
      noteKo: "외국인 완전 소유 불가",
      can: false,
      highlight: false,
    },
    {
      city: locale === "ko" ? "치앙마이, 태국" : "Chiang Mai, Thailand",
      price: formatUsdPrice(1700, currency) + "/sqm",
      note: "Leasehold only, landlocked",
      noteKo: "임대만 가능, 내륙 지역",
      can: false,
      highlight: false,
    },
    {
      city: locale === "ko" ? "팡라오, 보홀" : "Panglao, Bohol",
      price: `${formatPhpPrice(50000, currency)}–${formatPhpPrice(80000, currency).replace(/^[₱$₩]/, "")}/sqm`,
      note: "Full CCT title — foreigners CAN own",
      noteKo: "완전한 CCT 소유권 — 외국인 소유 가능",
      can: true,
      highlight: true,
      badge: "✓ Best Value",
      badgeKo: "✓ 최고의 가치",
    },
  ];

  return (
    <section
      ref={ref}
      className="w-full bg-[#F5F0E8] px-6 py-20 sm:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            {locale === "ko" ? "숫자로 보기" : "The Numbers"}
          </p>
          <h2 className="font-heading max-w-3xl text-3xl font-bold leading-tight text-brand-emerald sm:text-4xl lg:text-5xl">
            {locale === "ko" ? "보홀보다 비싸고, 소유도 안 됩니다." : "More expensive. And you can't even own it."}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-emerald/80">
            {locale === "ko"
              ? "동남아시아 최고의 부동산 시장들은 대부분 외국인 소유를 막거나, 임대 구조에 묶어 놓습니다. 보홀은 다릅니다."
              : "The most popular destinations in Southeast Asia either block foreign ownership or lock you into a lease. Bohol is the exception."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 grid gap-4 sm:grid-cols-3"
        >
          {comparisons.map((item, i) => (
            <motion.div
              key={item.city}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className={`relative rounded-2xl border p-6 transition ${
                item.highlight
                  ? "border-brand-gold bg-brand-emerald shadow-xl"
                  : "border-brand-emerald/15 bg-white"
              }`}
            >
              {item.badge && (
                <span className="absolute -top-3 left-4 rounded-full bg-brand-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-emerald">
                  {locale === "ko" ? item.badgeKo : item.badge}
                </span>
              )}
              <p className={`text-sm font-semibold uppercase tracking-[0.15em] ${item.highlight ? "text-brand-gold" : "text-brand-emerald/60"}`}>
                {item.city}
              </p>
              <p className={`mt-2 text-3xl font-bold ${item.highlight ? "text-white" : "text-brand-emerald"}`}>
                {item.price}
              </p>
              <div className={`mt-3 flex items-start gap-2 text-sm font-medium ${item.highlight ? "text-white/90" : "text-brand-emerald/80"}`}>
                {item.can
                  ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                  : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                }
                <p>{locale === "ko" ? item.noteKo : item.note}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6"
        >
          <p className="text-xs text-brand-emerald/50 italic">
            {locale === "ko"
              ? `가격은 ${currencyLabelKo[currency]}로 표시됩니다. 상단 내비게이션에서 통화를 변경하세요.`
              : `Prices shown in ${currencyLabel[currency]}. Toggle currency in the top navigation.`}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6"
        >
          <p className="text-lg font-semibold text-brand-emerald">
            {locale === "ko"
              ? "더 저렴하고, 날씨도 더 좋고, 실제로 소유할 수 있습니다."
              : "Lower price. Better weather. You actually own it."}
          </p>
          <button
            onClick={openYuna}
            className="mt-4 inline-flex items-center gap-2 text-base font-semibold text-[#C9A84C] hover:underline decoration-[#C9A84C] underline-offset-4 transition-all"
          >
            {locale === "ko" ? "✦ 예산으로 여기서 무엇을 얻을 수 있는지 궁금하세요? 유나에게 물어보세요 →" : "✦ Curious what your budget gets you here? Ask Yuna →"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
