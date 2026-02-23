"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, MapPin, Square, TrendingUp, Shield, Filter } from "lucide-react";
import { formatPrice } from "@/lib/utils/convert-price";
import { useUIStore } from "@/store/use-ui-store";
import { useTranslations } from "@/lib/i18n/translations";
import type { HomepageProperty, PropertyTier } from "@/types/property";

type Props = { properties: HomepageProperty[] };

const TIER_COLORS: Record<string, string> = {
  Trophy:    "bg-amber-500/15 text-amber-400 border-amber-500/25",
  Yield:     "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  Timeshare: "bg-sky-500/15 text-sky-400 border-sky-500/25",
  Land:      "bg-stone-500/15 text-stone-400 border-stone-500/25",
};

const STATUS_COLORS: Record<string, string> = {
  Active:        "bg-emerald-500/20 text-emerald-400",
  Reserved:      "bg-amber-500/20 text-amber-400",
  Sold:          "bg-rose-500/20 text-rose-400",
  "Coming Soon": "bg-purple-500/20 text-purple-400",
};

export function ListingsGrid({ properties }: Props) {
  const [activeTier, setActiveTier] = useState<PropertyTier | "All">("All");
  const currency = useUIStore((s) => s.currency);
  const locale   = useUIStore((s) => s.locale);
  const t        = useTranslations(locale);

  const TIERS: { label: string; value: PropertyTier | "All" }[] = [
    { label: t.listings.filterAll,           value: "All" },
    { label: `🏆 ${t.tiers.Trophy}`,         value: "Trophy" },
    { label: `📈 ${t.tiers.Yield}`,          value: "Yield" },
    { label: `🌴 ${t.tiers.Timeshare}`,      value: "Timeshare" },
    { label: `🌿 ${t.tiers.Land}`,           value: "Land" },
  ];

  const filtered = useMemo(() =>
    properties.filter((p) => {
      if (p.status === "Sold") return false;
      if (activeTier === "All") return true;
      return p.tier === activeTier;
    }),
    [properties, activeTier]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: 0 };
    properties.forEach((p) => {
      if (p.status === "Sold") return;
      c.All = (c.All ?? 0) + 1;
      if (p.tier) c[p.tier] = (c[p.tier] ?? 0) + 1;
    });
    return c;
  }, [properties]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">

      {/* ── Filter bar ── */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-brand-emerald/40 mr-1" />
        {TIERS.map((tier) => {
          const count = counts[tier.value] ?? 0;
          if (tier.value !== "All" && count === 0) return null;
          return (
            <button
              key={tier.value}
              onClick={() => setActiveTier(tier.value)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition-all ${
                activeTier === tier.value
                  ? "bg-brand-emerald text-brand-cream border-brand-emerald"
                  : "border-brand-emerald/20 text-brand-emerald/70 hover:border-brand-gold hover:text-brand-gold"
              }`}
            >
              {tier.label}
              {count > 0 && <span className="ml-1 opacity-60">({count})</span>}
            </button>
          );
        })}
      </div>

      {/* ── Count ── */}
      <p className="mb-6 text-xs uppercase tracking-[0.2em] text-brand-emerald/50">
        {t.listings.count(filtered.length)}
      </p>

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-brand-emerald/40">
          <p className="text-lg">{t.listings.noListings}</p>
          <p className="mt-2 text-sm">{t.listings.noListingsSub}</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.slug}
              className="group overflow-hidden rounded-3xl border border-brand-emerald/12 bg-white/70 shadow-glass transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={p.mainImage}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {p.tier && (
                  <span className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] backdrop-blur-sm ${TIER_COLORS[p.tier]}`}>
                    {locale === "ko" ? t.tiers[p.tier] : p.tier}
                  </span>
                )}
                {p.status && p.status !== "Active" && (
                  <span className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] backdrop-blur-sm ${STATUS_COLORS[p.status] ?? ""}`}>
                    {locale === "ko"
                      ? ((t.status as Record<string, string>)[p.status] ?? p.status)
                      : p.status}
                  </span>
                )}
                {p.srrv && (
                  <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-blue-600/80 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                    <Shield className="h-2.5 w-2.5" /> {t.listings.srrv}
                  </span>
                )}
                {p.yieldPercent && p.yieldPercent > 0 && (
                  <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                    <TrendingUp className="h-2.5 w-2.5 text-emerald-400" />
                    {p.yieldPercent}% {t.listings.yield}
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="space-y-3 p-5">
                <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-brand-emerald/60">
                  <MapPin className="h-3 w-3" />
                  {locale === "ko" && p.locationLabel_ko ? p.locationLabel_ko : p.locationLabel}
                </p>
                <h3 className="font-heading text-xl leading-snug text-brand-emerald">
                  {locale === "ko" && p.title_ko ? p.title_ko : p.title}
                </h3>
                {(p.hook || p.hook_ko) && (
                  <p className="text-sm leading-relaxed text-brand-emerald/70 line-clamp-2">
                    {locale === "ko" && p.hook_ko ? p.hook_ko : p.hook}
                  </p>
                )}

                {/* Price — single line, switches with currency toggle */}
                <p className="text-xl font-bold text-brand-emerald">
                  {p.pricePhp > 0
                    ? formatPrice(p.pricePhp, currency)
                    : t.listings.priceOnRequest}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-1.5 text-[11px] text-brand-emerald/70">
                  <span className="flex items-center gap-1">
                    <BedDouble className="h-3 w-3 text-brand-gold" />
                    {p.bedrooms} {t.listings.beds}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-3 w-3 text-brand-gold" />
                    {p.bathrooms} {t.listings.baths}
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="h-3 w-3 text-brand-gold" />
                    {p.floorArea} sqm
                  </span>
                </div>

                <Link
                  href={`/listings/${p.slug}`}
                  className="mt-1 inline-flex w-full items-center justify-center rounded-full border border-brand-emerald/20 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-emerald transition hover:border-brand-gold hover:bg-brand-gold/5 hover:text-brand-gold"
                >
                  {t.listings.viewFull}
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
