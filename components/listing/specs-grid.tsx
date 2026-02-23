"use client";

import { Bolt, Droplets, Route, Wifi } from "lucide-react";
import { useUIStore } from "@/store/use-ui-store";
import { useTranslations } from "@/lib/i18n/translations";
import type { PropertySpecs } from "@/types/property";

export function SpecsGrid({ specs }: { specs: PropertySpecs }) {
  const locale = useUIStore((s) => s.locale);
  const t = useTranslations(locale);

  const items = [
    { label: t.listing.power,      value: specs.generator ? t.listing.generatorOn : t.listing.generatorOff, icon: Bolt },
    { label: t.listing.water,      value: specs.waterSource,  icon: Droplets },
    { label: t.listing.internet,   value: specs.internetType, icon: Wifi },
    { label: t.listing.roadAccess, value: specs.roadAccess,   icon: Route },
  ];

  return (
    <section className="space-y-4">
      <h2 className="font-heading text-2xl text-brand-emerald">{t.listing.infrastructure}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className="glass-panel rounded-2xl border-brand-emerald/15 p-4">
              <p className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-brand-emerald/70">
                <Icon className="h-4 w-4" />
                {item.label}
              </p>
              <p className="text-sm font-medium text-brand-emerald">{item.value}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
