"use client";

import { motion } from "framer-motion";
import { Bath, BedDouble, Car, MapPin, Square } from "lucide-react";
import { formatPrice } from "@/lib/utils/convert-price";
import { useUIStore } from "@/store/use-ui-store";
import type { PropertyCategory } from "@/types/property";

type HeroInfoProps = {
  title: string;
  locationLabel: string;
  pricePhp: number;
  category: PropertyCategory;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  floorArea: number;
};

export function HeroInfo({
  title,
  locationLabel,
  pricePhp,
  category,
  bedrooms,
  bathrooms,
  parking,
  floorArea,
}: HeroInfoProps) {
  const currency = useUIStore((state) => state.currency);
  const vitals = [
    { label: "Beds", value: bedrooms, icon: BedDouble },
    { label: "Baths", value: bathrooms, icon: Bath },
    { label: "Cars", value: parking, icon: Car },
    { label: "Area", value: `${floorArea} sqm`, icon: Square },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      <p className="inline-flex rounded-full border border-brand-gold/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold">
        {category}
      </p>
      <h1 className="font-heading text-4xl font-semibold leading-tight text-brand-emerald sm:text-5xl">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-4">
        <p className="inline-flex items-center gap-2 text-sm text-brand-emerald/75">
          <MapPin className="h-4 w-4" />
          {locationLabel}
        </p>
        <p className="text-xl font-semibold text-brand-emerald sm:text-2xl">
          {formatPrice(pricePhp, currency)}
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-4">
        {vitals.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="glass-panel flex items-center gap-2 rounded-xl border-brand-emerald/15 px-3 py-2"
            >
              <Icon className="h-4 w-4 text-brand-gold" />
              <p className="text-xs uppercase tracking-[0.1em] text-brand-emerald/75">{item.label}</p>
              <p className="ml-auto text-sm font-semibold text-brand-emerald">{item.value}</p>
            </div>
          );
        })}
      </div>
    </motion.header>
  );
}
