"use client";

import { useUIStore } from "@/store/use-ui-store";
import { useTranslations } from "@/lib/i18n/translations";

export function ListingsPageHeader() {
  const locale = useUIStore((s) => s.locale);
  const t = useTranslations(locale);

  return (
    <section className="border-b border-brand-emerald/10 bg-brand-cream/80 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.28em] text-brand-emerald/60">
          {t.listings.subheading}
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold text-brand-emerald sm:text-5xl lg:text-6xl">
          {t.listings.heading}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-emerald/70">
          {t.listings.description}
        </p>
        <p className="mt-3 text-sm text-brand-emerald/50">
          {t.listings.koreanLine}
        </p>
      </div>
    </section>
  );
}
