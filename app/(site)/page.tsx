import { ContactForm } from "@/components/home/contact-form";
import { Hero } from "@/components/home/hero";
import { AssetSelector } from "@/components/home/asset-selector";
import { PropertyGrid } from "@/components/home/property-grid";
import { getHomepageProperties } from "@/lib/sanity/properties";
import { unstable_noStore as noStore } from "next/cache";

export default async function Home() {
  noStore();
  const properties = await getHomepageProperties();

  return (
    <main>
      <Hero />
      <AssetSelector />
      <PropertyGrid properties={properties} />
      <ContactForm />
    </main>
  );
}
