import { areas } from "@/lib/areas";
import { getAllProperties } from "@/lib/sanity/properties";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const area = areas.find((a) => a.slug === params.slug);
  if (!area) return {};
  return {
    title: area.seoTitle,
    description: area.seoDescription,
    keywords: area.keywords.join(", "),
    openGraph: {
      title: area.seoTitle,
      description: area.seoDescription,
    },
  };
}

export default async function AreaPage({
  params,
}: {
  params: { slug: string };
}) {
  const area = areas.find((a) => a.slug === params.slug);
  if (!area) notFound();

  const allProperties = await getAllProperties();
  const areaProperties = allProperties.filter((p) =>
    area.locationMatch.some((loc) =>
      p.locationLabel?.toLowerCase().includes(loc.toLowerCase())
    )
  );

  const formatPrice = (php: number) => {
    if (php >= 1_000_000) return `₱${(php / 1_000_000).toFixed(1)}M`;
    return `₱${php.toLocaleString()}`;
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#1B4332] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-[#C9A84C] text-[#1B4332] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Bohol Real Estate
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{area.name}</h1>
          <p className="text-xl text-white/80">{area.tagline}</p>
        </div>
      </section>

      {/* Description */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <p className="text-gray-700 text-lg leading-relaxed">{area.description}</p>

        {/* Highlights */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
          {area.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[#C9A84C] font-bold mt-1">✓</span>
              <span className="text-gray-700">{h}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Listings */}
      <section className="bg-gray-50 py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1B4332] mb-2">
            Properties in {area.name}
          </h2>
          <p className="text-gray-500 mb-8">
            {areaProperties.length > 0
              ? `${areaProperties.length} listing${areaProperties.length !== 1 ? "s" : ""} available`
              : "New listings coming soon — check back or contact us for off-market opportunities."}
          </p>

          {areaProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {areaProperties.map((property) => (
                <Link
                  key={property.slug}
                  href={`/listings/${property.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={property.mainImage}
                      alt={property.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-[#C9A84C] font-semibold uppercase tracking-wider mb-1">
                      {property.locationLabel}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{property.title}</h3>
                    <div className="text-[#1B4332] font-bold">
                      {formatPrice(property.pricePhp)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-10 text-center border border-gray-200">
              <p className="text-gray-500 mb-4">
                No active listings in {area.name} yet. We source off-market and
                pre-launch opportunities — contact us to be notified first.
              </p>
              <Link
                href="/#contact"
                className="inline-block bg-[#1B4332] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2d6a4f] transition-colors"
              >
                Get Notified
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* All Areas */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <h2 className="text-xl font-bold text-[#1B4332] mb-6">
          Explore Other Areas in Bohol
        </h2>
        <div className="flex flex-wrap gap-3">
          {areas
            .filter((a) => a.slug !== area.slug)
            .map((a) => (
              <Link
                key={a.slug}
                href={`/area/${a.slug}`}
                className="bg-gray-100 hover:bg-[#1B4332] hover:text-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                {a.name}
              </Link>
            ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1B4332] text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Looking for property in {area.name}?
        </h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          We work with Bohol&apos;s top developers and source listings before they hit
          the market. Tell us what you need.
        </p>
        <Link
          href="/#contact"
          className="inline-block bg-[#C9A84C] text-[#1B4332] font-bold px-8 py-4 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Contact Us
        </Link>
      </section>
    </main>
  );
}
