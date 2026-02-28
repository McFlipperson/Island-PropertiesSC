import { HeroInfo } from "@/components/listing/hero-info";
import { MediaDeck } from "@/components/listing/media-deck";
import { PrivacyList } from "@/components/listing/privacy-list";
import { ROISnapshot } from "@/components/listing/roi-snapshot";
import { SpecsGrid } from "@/components/listing/specs-grid";
import { VideoModal } from "@/components/listing/video-modal";
import { ListingDetailBody } from "@/components/listing/listing-detail-body";
import { RequestViewingButton } from "@/components/listing/request-viewing-button";
import { YunaListingWrapper } from "@/components/sophia/sophia-listing-wrapper";
import { getPropertyBySlug } from "@/lib/sanity/properties";
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
HOA Fees: ${property.hoaFees > 0 ? `₱${property.hoaFees.toLocaleString("en-PH")}/month` : "Confirm with agent"}
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
          title_ko={property.title_ko}
          locationLabel={property.locationLabel}
          locationLabel_ko={property.locationLabel_ko}
          address={property.address}
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
          <ListingDetailBody property={property} />
          <SpecsGrid specs={property.specs} specs_ko={property.specs_ko} />
        </div>

        <div className="space-y-8">
          <PrivacyList distances={property.distances} />
          <ROISnapshot investment={property.investment} />
        </div>
      </section>

      <VideoModal />
      <YunaListingWrapper propertyContext={propertyContext} />
      <RequestViewingButton propertyName={property.title} propertySlug={params.slug} />
    </main>
  );
}
