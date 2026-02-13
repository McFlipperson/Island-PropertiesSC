import { HeroInfo } from "@/components/listing/hero-info";
import { MediaDeck } from "@/components/listing/media-deck";
import { PrivacyList } from "@/components/listing/privacy-list";
import { ROISnapshot } from "@/components/listing/roi-snapshot";
import { SpecsGrid } from "@/components/listing/specs-grid";
import { VideoModal } from "@/components/listing/video-modal";
import { SaraListingWrapper } from "@/components/sara-components/sara-listing-wrapper";
import { getPropertyBySlug } from "@/lib/sanity/properties";
import { PortableText } from "@portabletext/react";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";

type ListingPageProps = {
  params: {
    slug: string;
  };
};

export default async function ListingPage({ params }: ListingPageProps) {
  noStore();
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  // Build property context string for Sophia
  const propertyContext = `
Property: ${property.title}
Location: ${property.locationLabel}
Price: ₱${property.pricePhp.toLocaleString("en-PH")} PHP
Category: ${property.category}
Bedrooms: ${property.bedrooms} | Bathrooms: ${property.bathrooms} | Parking: ${property.parking}
Floor Area: ${property.floorArea} sqm | Lot Area: ${property.lotArea} sqm
Title Status: ${property.titleStatus}
Ownership: ${property.ownership}
Year Built: ${property.yearBuilt}
Furnishing: ${property.furnishing}
HOA Fees: ₱${property.hoaFees.toLocaleString("en-PH")}/month
Features: ${property.features.join(", ")}
Infrastructure: Power ${property.specs.generator ? "(Generator Backup)" : "(Grid Only)"}, Water: ${property.specs.waterSource}, Internet: ${property.specs.internetType}, Road: ${property.specs.roadAccess}
Proximity: Airport ${property.distances.airportMins} mins, Beach ${property.distances.beachMins} mins, Hospital ${property.distances.hospitalMins} mins
Investment: Daily Rate $${property.investment.dailyRateUsd} USD, Yield ${property.investment.yieldPercent}%
`.trim();

  return (
    <main className="pb-28">
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12">
        <HeroInfo
          title={property.title}
          locationLabel={property.locationLabel}
          pricePhp={property.pricePhp}
          category={property.category}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          parking={property.parking}
          floorArea={property.floorArea}
        />
        <MediaDeck title={property.title} images={property.gallery} videoFile={property.videoFile} />
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div className="space-y-8">
          <article className="space-y-4 rounded-3xl border border-brand-emerald/10 bg-white/60 p-6 shadow-glass">
            <p className="text-xs uppercase tracking-[0.24em] text-brand-emerald/70">
              Concierge Narrative
            </p>
            <div className="space-y-3 text-base leading-relaxed text-brand-emerald/85">
              <PortableText value={property.content} />
            </div>
            <p className="inline-flex rounded-full bg-brand-emerald px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-cream">
              Ownership: {property.ownership}
            </p>
          </article>

          <article className="space-y-4 rounded-3xl border border-brand-emerald/10 bg-white/60 p-6 shadow-glass">
            <h2 className="font-heading text-2xl text-brand-emerald">Legal & Specs</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl border border-brand-emerald/10 bg-white/65 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">
                  Title Status
                </p>
                <p className="mt-1 text-sm font-semibold text-brand-emerald">{property.titleStatus}</p>
              </div>
              <div className="rounded-xl border border-brand-emerald/10 bg-white/65 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">Year Built</p>
                <p className="mt-1 text-sm font-semibold text-brand-emerald">{property.yearBuilt}</p>
              </div>
              <div className="rounded-xl border border-brand-emerald/10 bg-white/65 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">Furnishing</p>
                <p className="mt-1 text-sm font-semibold text-brand-emerald">{property.furnishing}</p>
              </div>
              <div className="rounded-xl border border-brand-emerald/10 bg-white/65 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">
                  Monthly HOA (PHP)
                </p>
                <p className="mt-1 text-sm font-semibold text-brand-emerald">
                  {property.hoaFees.toLocaleString("en-PH")}
                </p>
              </div>
            </div>
          </article>

          <article className="space-y-4 rounded-3xl border border-brand-emerald/10 bg-white/60 p-6 shadow-glass">
            <h2 className="font-heading text-2xl text-brand-emerald">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-brand-emerald/15 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-brand-emerald"
                >
                  {feature}
                </span>
              ))}
            </div>
          </article>
          <SpecsGrid specs={property.specs} />
        </div>

        <div className="space-y-8">
          <PrivacyList distances={property.distances} />
          <ROISnapshot investment={property.investment} />
        </div>
      </section>

      <VideoModal />

      {/* Sophia context provider for this listing */}
      <SaraListingWrapper propertyContext={propertyContext} />

      <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-brand-emerald/15 bg-brand-cream/92 p-4 backdrop-blur-md">
        <div className="mx-auto w-full max-w-7xl">
          <button
            type="button"
            className="w-full rounded-full bg-brand-emerald px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-cream transition hover:bg-[#05583a]"
          >
            Request Private Viewing
          </button>
        </div>
      </div>
    </main>
  );
}
