"use client";

import { motion } from "framer-motion";
import { Building2, Landmark, Warehouse } from "lucide-react";
import Link from "next/link";

const assets = [
  {
    title: "Residential",
    description: "Private villas, cliff estates, and branded residences with long-hold value.",
    icon: Landmark,
  },
  {
    title: "Commercial",
    description: "Income-producing towers, managed floors, and strategic mixed-use assets.",
    icon: Warehouse,
  },
  {
    title: "Condo",
    description: "Prime district condominium units tuned for executive rental demand.",
    icon: Building2,
  },
];

export function AssetSelector() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-brand-emerald/70">Asset Selector</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-brand-emerald sm:text-4xl">
            Private Asset Classes
          </h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {assets.map((asset, index) => {
          const Icon = asset.icon;

          return (
            <motion.article
              key={asset.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="glass-panel flex min-h-[320px] flex-col justify-between rounded-3xl border-brand-emerald/15 p-6"
            >
              <div>
                <div className="mb-6 inline-flex rounded-2xl bg-brand-emerald p-3 text-brand-cream">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-2xl text-brand-emerald">{asset.title}</h3>
                <p className="mt-3 text-sm text-brand-emerald/75">{asset.description}</p>
              </div>
              <Link
                href="/#live-inventory"
                className="mt-8 inline-flex w-fit rounded-full border border-brand-emerald/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-emerald transition hover:border-brand-gold hover:text-brand-gold"
              >
                Browse Live Listings
              </Link>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
