"use client";

import { motion } from "framer-motion";
import { Building2, Palmtree, Users, Home, Warehouse, Hotel } from "lucide-react";
import Link from "next/link";
import { useUIStore } from "@/store/use-ui-store";
import { useTranslations } from "@/lib/i18n/translations";

const ICONS = [Home, Users, Hotel, Warehouse, Palmtree, Building2];

export function AssetSelector() {
  const locale = useUIStore((s) => s.locale);
  const t = useTranslations(locale);

  return (
    <section id="asset-selector" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.24em] text-brand-emerald/70">{t.assets.eyebrow}</p>
        <h2 className="mt-2 font-heading text-3xl font-semibold text-brand-emerald sm:text-4xl">
          {t.assets.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-brand-emerald/75">{t.assets.body}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {t.assets.items.map((asset, index) => {
          const Icon = ICONS[index];
          return (
            <motion.article
              key={asset.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="glass-panel flex min-h-[280px] flex-col justify-between rounded-3xl border-brand-emerald/15 p-6"
            >
              <div>
                <div className="mb-6 inline-flex rounded-2xl bg-brand-emerald p-3 text-brand-cream">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl text-brand-emerald">{asset.title}</h3>
                <p className="mt-3 text-sm text-brand-emerald/75">{asset.description}</p>
              </div>
              <Link
                href="/#live-inventory"
                className="mt-6 inline-flex w-fit rounded-full border border-brand-emerald/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-emerald transition hover:border-brand-gold hover:text-brand-gold"
              >
                {t.assets.browseCta}
              </Link>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-12 rounded-3xl border border-brand-gold/20 bg-brand-gold/5 p-8">
        <h3 className="font-heading text-2xl text-brand-emerald">{t.assets.supportHeading}</h3>
        <div className="mt-4 grid gap-4 text-sm text-brand-emerald/80 sm:grid-cols-2">
          {t.assets.support.map((item) => (
            <div key={item.title}>
              <strong className="text-brand-emerald">{item.title}</strong>
              <p className="mt-1">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
