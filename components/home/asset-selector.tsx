"use client";

import { motion } from "framer-motion";
import { Building2, Palmtree, Users, Home, Warehouse, Hotel } from "lucide-react";
import Link from "next/link";

const assets = [
  {
    title: "Private Villas",
    description: "Beachfront and hillside estates with full ownership. Perfect for families seeking a permanent tropical residence or seasonal retreat.",
    icon: Home,
  },
  {
    title: "Fractional Ownership",
    description: "Shared luxury resort access (공유제) from ₩200-300M — familiar Korean model with Lotte/Hanwha-style management.",
    icon: Users,
  },
  {
    title: "Condotels & Condos",
    description: "Managed units with rental income potential. Professional hospitality partners handle operations while you earn returns.",
    icon: Hotel,
  },
  {
    title: "Commercial Properties",
    description: "Income-producing retail, office, and mixed-use developments in Bohol's growing economic zones.",
    icon: Warehouse,
  },
  {
    title: "Land & Development",
    description: "Premium beachfront and Chocolate Hills-view lots for custom builds or long-term appreciation.",
    icon: Palmtree,
  },
  {
    title: "Resort Investments",
    description: "Turnkey resort properties and shares in managed hospitality assets with professional operators.",
    icon: Building2,
  },
];

export function AssetSelector() {
  return (
    <section id="asset-selector" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.24em] text-brand-emerald/70">Full Portfolio</p>
        <h2 className="mt-2 font-heading text-3xl font-semibold text-brand-emerald sm:text-4xl">
          Complete Ownership Solutions
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-brand-emerald/75">
          From fractional resort shares to full estate ownership — flexible structures designed for Korean buyers familiar with 공유제 (fractional ownership) and seeking SRRV-compatible investments.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset, index) => {
          const Icon = asset.icon;

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
                Browse Listings
              </Link>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-12 rounded-3xl border border-brand-gold/20 bg-brand-gold/5 p-8">
        <h3 className="font-heading text-2xl text-brand-emerald">🇰🇷 Korean Buyer Support</h3>
        <div className="mt-4 grid gap-4 text-sm text-brand-emerald/80 sm:grid-cols-2">
          <div>
            <strong className="text-brand-emerald">SRRV Visa Guidance</strong>
            <p className="mt-1">₩20M deposit requirement, age 50+ eligibility — we guide you through the entire process.</p>
          </div>
          <div>
            <strong className="text-brand-emerald">Legal Structure Options</strong>
            <p className="mt-1">Philippine corporations, condominiums, and SRRV-compliant ownership vehicles — all explained clearly.</p>
          </div>
          <div>
            <strong className="text-brand-emerald">Korean-Language Service</strong>
            <p className="mt-1">Native Korean speakers on staff. All documents translated. KakaoTalk support available.</p>
          </div>
          <div>
            <strong className="text-brand-emerald">Trusted Partnership</strong>
            <p className="mt-1">Licensed real estate broker (Bohol Landscape Real Estate) with attorney-backed legal compliance.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
