import { getAllProperties } from "@/lib/sanity/properties";
import { ListingsGrid } from "@/components/listings/listings-grid";
import { ListingsPageHeader } from "@/components/listings/listings-page-header";
import { ListingsPageFooterCta } from "@/components/listings/listings-footer-cta";
import { unstable_noStore as noStore } from "next/cache";

export const metadata = {
  title: "Properties | Island Properties — Bohol Luxury Real Estate",
  description: "Browse exclusive luxury properties in Bohol, Philippines. Beachfront villas, condos, timeshare, and land. Korean buyer support — SRRV guidance, KRW pricing, attorney-backed.",
};

export default async function ListingsPage() {
  noStore();
  const properties = await getAllProperties();

  return (
    <main className="min-h-screen">
      <ListingsPageHeader />
      <ListingsGrid properties={properties} />
      <ListingsPageFooterCta />
    </main>
  );
}
