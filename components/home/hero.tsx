"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useUIStore } from "@/store/use-ui-store";
import { useTranslations } from "@/lib/i18n/translations";

export function Hero() {
  const locale = useUIStore((s) => s.locale);
  const t = useTranslations(locale);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-8 pt-6 sm:px-6 sm:pt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="bg-transparent"
      >
        <div className="relative h-[72vh] w-full bg-brand-cream sm:h-[88vh] lg:h-[96vh]">
          <Image
            src="https://i.imgur.com/4Wumn1e.jpeg"
            alt="Bohol Island Properties - Natural Paradise Real Estate"
            fill
            priority
            className="object-contain"
            sizes="100vw"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="px-1 pt-8 sm:pt-10"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.28em] text-brand-gold sm:text-sm">
          {t.hero.eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-brand-emerald sm:text-6xl">
          {t.hero.heading}
        </h1>
        <p className="mt-6 max-w-xl text-sm text-brand-emerald/85 sm:text-base">
          {t.hero.body}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Link
            href="/listings"
            className="inline-flex rounded-full border border-brand-gold/70 bg-brand-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-emerald transition hover:bg-[#d3ad64]"
          >
            {t.hero.cta}
          </Link>
          <Link
            href="/#asset-selector"
            className="inline-flex rounded-full border border-brand-emerald/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-emerald transition hover:border-brand-gold hover:text-brand-gold"
          >
            {t.hero.ctaSecondary}
          </Link>
        </div>
        <p className="mt-6 text-xs text-brand-emerald/60">{t.hero.footnote}</p>
      </motion.div>
    </section>
  );
}
