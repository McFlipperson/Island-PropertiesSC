"use client";

import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, MapPin, Square, TrendingUp, Shield } from "lucide-react";
import { formatPrice } from "@/lib/utils/convert-price";
import { useUIStore } from "@/store/use-ui-store";
import { useTranslations } from "@/lib/i18n/translations";
import type { HomepageProperty } from "@/types/property";

type PropertyGridProps = {
  properties: HomepageProperty[];
};

const TIER_COLORS: Record<string, string> = {
  Trophy:    "bg-amber-500/15 text-amber-400 border-amber-500/25",
  Yield:     "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  Timeshare: "bg-sky-500/15 text-sky-400 border-sky-500/25",
  Land:      "bg-stone-500/15 text-stone-400 border-stone-500/25",
};

export function PropertyGrid({ properties }: PropertyGridProps) {
  const active    = properties.filter((p) => p.status !== "Sold").slice(0, 6);
  const currency  = useUIStore((s) => s.currency);
  const locale    = useUIStore((s) => s.locale);
  const t         = useTranslations(locale);
  if (active.length === 0) return null;

  return (
    <section id="live-inventory" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-brand-emerald/70">{t.listings.featuredEyebrow}</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-brand-emerald sm:text-4xl">
            {t.listings.featuredHeading}
          </h2>
        </div>
        <Link href="/listings"
          className="shrink-0 rounded-full border border-brand-emerald/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-emerald transition hover:border-brand-gold hover:text-brand-gold">
          {t.listings.viewAll}
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {active.map((property) => (
          <article
            key={property.slug}
            className="group overflow-hidden rounded-3xl border border-brand-emerald/12 bg-white/70 shadow-glass transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="relative h-52 overflow-hidden">
              <Image
                src={property.mainImage}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              {property.tier && (
                <span className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] backdrop-blur-sm ${TIER_COLORS[property.tier]}`}>
                  {locale === "ko" ? t.tiers[property.tier] : property.tier}
                </span>
              )}
              {property.srrv && (
                <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-blue-600/80 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                  <Shield className="h-2.5 w-2.5" /> SRRV
                </span>
              )}
              {property.yieldPercent && property.yieldPercent > 0 && (
                <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                  <TrendingUp className="h-2.5 w-2.5 text-emerald-400" />
                  {property.yieldPercent}% yield
                </span>
              )}
            </div>

            <div className="space-y-3 p-5">
              <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] text-brand-emerald/60">
                <MapPin className="h-3 w-3" />
                {locale === "ko" && property.locationLabel_ko ? property.locationLabel_ko : property.locationLabel}
              </p>
              <h3 className="font-heading text-xl text-brand-emerald">
                {locale === "ko" && property.title_ko ? property.title_ko : property.title}
              </h3>
              {(property.hook || property.hook_ko) && (
                <p className="text-sm leading-relaxed text-brand-emerald/65 line-clamp-2">
                  {locale === "ko" && property.hook_ko ? property.hook_ko : property.hook}
                </p>
              )}
              <div>
                <p className="text-xl font-bold text-brand-emerald">
                  {property.pricePhp > 0 ? formatPrice(property.pricePhp, currency) : t.listings.priceOnRequest}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-xs text-brand-emerald/70">
                <span className="flex items-center gap-1.5"><BedDouble className="h-3.5 w-3.5 text-brand-gold" />{property.bedrooms} {t.listings.beds}</span>
                <span className="flex items-center gap-1.5"><Bath className="h-3.5 w-3.5 text-brand-gold" />{property.bathrooms} {t.listings.baths}</span>
                <span className="flex items-center gap-1.5 col-span-2"><Square className="h-3.5 w-3.5 text-brand-gold" />{property.floorArea} sqm</span>
              </div>

              <Link href={`/listings/${property.slug}`}
                className="inline-flex w-full items-center justify-center rounded-full border border-brand-emerald/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-emerald transition hover:border-brand-gold hover:text-brand-gold">
                {t.listings.viewFull}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
