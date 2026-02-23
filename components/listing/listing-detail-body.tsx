"use client";

import { PortableText } from "@portabletext/react";
import { useUIStore } from "@/store/use-ui-store";
import { useTranslations } from "@/lib/i18n/translations";
import type { Property } from "@/types/property";

type Props = { property: Property };

export function ListingDetailBody({ property }: Props) {
  const locale = useUIStore((s) => s.locale);
  const t = useTranslations(locale);

  const content = locale === "ko" && property.content_ko?.length
    ? property.content_ko
    : property.content;

  return (
    <>
      {/* Concierge Narrative */}
      <article className="space-y-4 rounded-3xl border border-brand-emerald/10 bg-white/60 p-6 shadow-glass">
        <p className="text-xs uppercase tracking-[0.24em] text-brand-emerald/70">
          {t.listing.narrative}
        </p>
        <div className="space-y-3 text-base leading-relaxed text-brand-emerald/85">
          <PortableText value={content} />
        </div>
        <p className="inline-flex rounded-full bg-brand-emerald px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-cream">
          {t.listing.titleStatus}: {property.ownership}
        </p>
      </article>

      {/* Legal & Specs */}
      <article className="space-y-4 rounded-3xl border border-brand-emerald/10 bg-white/60 p-6 shadow-glass">
        <h2 className="font-heading text-2xl text-brand-emerald">{t.listing.legalSpecs}</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-brand-emerald/10 bg-white/65 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">{t.listing.titleStatus}</p>
            <p className="mt-1 text-sm font-semibold text-brand-emerald">{property.titleStatus}</p>
          </div>
          <div className="rounded-xl border border-brand-emerald/10 bg-white/65 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">{t.listing.yearBuilt}</p>
            <p className="mt-1 text-sm font-semibold text-brand-emerald">{property.yearBuilt}</p>
          </div>
          <div className="rounded-xl border border-brand-emerald/10 bg-white/65 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">{t.listing.furnishing}</p>
            <p className="mt-1 text-sm font-semibold text-brand-emerald">{property.furnishing}</p>
          </div>
          <div className="rounded-xl border border-brand-emerald/10 bg-white/65 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">{t.listing.hoaFees}</p>
            <p className="mt-1 text-sm font-semibold text-brand-emerald">
              {property.hoaFees.toLocaleString("en-PH")}
            </p>
          </div>
        </div>
      </article>

      {/* Amenities */}
      <article className="space-y-4 rounded-3xl border border-brand-emerald/10 bg-white/60 p-6 shadow-glass">
        <h2 className="font-heading text-2xl text-brand-emerald">{t.listing.amenities}</h2>
        <div className="flex flex-wrap gap-2">
          {(locale === "ko" && property.features_ko?.length
            ? property.features_ko
            : property.features
          ).map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-brand-emerald/15 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-brand-emerald"
            >
              {feature}
            </span>
          ))}
        </div>
      </article>
    </>
  );
}
