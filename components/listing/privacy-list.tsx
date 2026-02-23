"use client";

import { useUIStore } from "@/store/use-ui-store";
import { useTranslations } from "@/lib/i18n/translations";
import type { PropertyDistances } from "@/types/property";

export function PrivacyList({ distances }: { distances: PropertyDistances }) {
  const locale = useUIStore((s) => s.locale);
  const t = useTranslations(locale);

  const entries = [
    { emoji: "✈️", label: t.listing.airport, value: distances.airportMins },
    { emoji: "🏝️", label: t.listing.beach,   value: distances.beachMins },
    { emoji: "🏥", label: t.listing.hospital, value: distances.hospitalMins },
  ];

  return (
    <section className="space-y-4">
      <h2 className="font-heading text-2xl text-brand-emerald">{t.listing.proximity}</h2>
      <ul className="space-y-2">
        {entries.map((e) => (
          <li key={e.label} className="glass-panel rounded-xl border-brand-emerald/15 px-4 py-3 text-sm text-brand-emerald">
            {e.emoji} {e.label}: {e.value} {t.listing.mins}
          </li>
        ))}
      </ul>
    </section>
  );
}
