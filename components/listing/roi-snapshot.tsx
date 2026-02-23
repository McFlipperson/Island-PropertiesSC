"use client";

import { useUIStore } from "@/store/use-ui-store";
import { useTranslations } from "@/lib/i18n/translations";
import type { PropertyInvestment } from "@/types/property";

export function ROISnapshot({ investment }: { investment: PropertyInvestment }) {
  const locale = useUIStore((s) => s.locale);
  const t = useTranslations(locale);
  const yearlyGrossUsd = Math.round(investment.dailyRateUsd * 365);

  return (
    <section className="space-y-4">
      <h2 className="font-heading text-2xl text-brand-emerald">{t.listing.roi}</h2>
      <article className="glass-panel rounded-2xl border-brand-emerald/15 p-5">
        <dl className="grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">{t.listing.dailyRate}</dt>
            <dd className="mt-1 text-xl font-semibold text-brand-emerald">${investment.dailyRateUsd.toLocaleString("en-US")}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">{t.listing.yield}</dt>
            <dd className="mt-1 text-xl font-semibold text-brand-emerald">{investment.yieldPercent.toFixed(1)}%</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">{t.listing.grossAnnual}</dt>
            <dd className="mt-1 text-xl font-semibold text-brand-emerald">${yearlyGrossUsd.toLocaleString("en-US")}</dd>
          </div>
        </dl>
      </article>
    </section>
  );
}
