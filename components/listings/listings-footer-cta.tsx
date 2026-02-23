"use client";

import { useUIStore } from "@/store/use-ui-store";
import { useTranslations } from "@/lib/i18n/translations";

export function ListingsPageFooterCta() {
  const locale = useUIStore((s) => s.locale);
  const t = useTranslations(locale);

  return (
    <section className="border-t border-brand-emerald/10 bg-brand-emerald px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-brand-cream/60">
          Off-Market & Upcoming
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold text-brand-cream sm:text-4xl">
          {t.listings.offMarketHeading}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-brand-cream/75">
          {t.listings.offMarketBody}
        </p>
        {locale === "en" && (
          <p className="mt-2 text-sm text-brand-cream/50">
            원하시는 매물이 없으신가요? 소피아에게 문의해 주십시오.
          </p>
        )}
        <a
          href="/#contact"
          className="mt-8 inline-flex rounded-full bg-brand-cream px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-emerald transition hover:bg-brand-gold hover:text-white"
        >
          {t.listings.enquiry}
        </a>
      </div>
    </section>
  );
}
