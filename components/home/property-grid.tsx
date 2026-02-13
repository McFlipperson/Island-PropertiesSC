import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Car, MapPin, Square } from "lucide-react";
import { formatPrice } from "@/lib/utils/convert-price";
import type { HomepageProperty } from "@/types/property";

type PropertyGridProps = {
  properties: HomepageProperty[];
};

export function PropertyGrid({ properties }: PropertyGridProps) {
  if (properties.length === 0) {
    return null;
  }

  return (
    <section id="live-inventory" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-brand-emerald/70">Private Listings</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-brand-emerald sm:text-4xl">
            Sanity Live Inventory
          </h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <article
            key={property.slug}
            className="overflow-hidden rounded-3xl border border-brand-emerald/12 bg-white/70 shadow-glass"
          >
            <div className="relative h-52">
              <Image
                src={property.mainImage}
                alt={property.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            <div className="space-y-4 p-5">
              <div>
                <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.1em] text-brand-emerald/70">
                  <MapPin className="h-3.5 w-3.5" />
                  {property.locationLabel}
                </p>
                <h3 className="mt-2 font-heading text-2xl text-brand-emerald">{property.title}</h3>
                <p className="mt-2 text-lg font-semibold text-brand-emerald">
                  {property.pricePhp > 0 ? formatPrice(property.pricePhp, "PHP") : "Price on request"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-brand-emerald/85">
                <p className="inline-flex items-center gap-1.5">
                  <BedDouble className="h-3.5 w-3.5 text-brand-gold" />
                  {property.bedrooms} Beds
                </p>
                <p className="inline-flex items-center gap-1.5">
                  <Bath className="h-3.5 w-3.5 text-brand-gold" />
                  {property.bathrooms} Baths
                </p>
                <p className="inline-flex items-center gap-1.5">
                  <Car className="h-3.5 w-3.5 text-brand-gold" />
                  {property.parking} Parking
                </p>
                <p className="inline-flex items-center gap-1.5">
                  <Square className="h-3.5 w-3.5 text-brand-gold" />
                  {property.floorArea} sqm
                </p>
              </div>

              <Link
                href={`/listings/${property.slug}`}
                className="inline-flex rounded-full border border-brand-emerald/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-emerald transition hover:border-brand-gold hover:text-brand-gold"
              >
                View Listing
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
