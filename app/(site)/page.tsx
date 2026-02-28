import { Hero } from "@/components/home/hero";
import { NumbersSection } from "@/components/home/numbers-section";
import { LifeSection } from "@/components/home/life-section";
import { OwnershipSection } from "@/components/home/ownership-section";
import { SrrvSection } from "@/components/home/srrv-section";
import { PropertyGrid } from "@/components/home/property-grid";
import { VoicesSection } from "@/components/home/voices-section";
import { getHomepageProperties } from "@/lib/sanity/properties";
import { unstable_noStore as noStore } from "next/cache";

export default async function Home() {
  noStore();
  const properties = await getHomepageProperties();

  return (
    <main>
      <Hero />
      <NumbersSection />
      <LifeSection />
      <OwnershipSection />
      <SrrvSection />
      <PropertyGrid properties={properties} />
      <VoicesSection />
    </main>
  );
}
