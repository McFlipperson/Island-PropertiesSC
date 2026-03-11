import { areas } from "@/lib/areas";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bohol Areas Guide | Sikat Properties",
  description:
    "Explore Bohol's top real estate areas — Panglao, Tagbilaran, Dauis, Baclayon, Anda and more. Find the right location for your lifestyle and budget.",
  keywords:
    "bohol real estate areas, where to buy property bohol, panglao tagbilaran dauis baclayon property",
};

export default function AreasIndexPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#1B4332] text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-[#C9A84C] text-[#1B4332] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Bohol Real Estate
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Bohol by Area
          </h1>
          <p className="text-xl text-white/80">
            Each part of Bohol offers a different lifestyle. Find yours.
          </p>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/area/${area.slug}`}
              className="group border border-gray-200 rounded-xl p-6 hover:border-[#1B4332] hover:shadow-md transition-all"
            >
              <div className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-2">
                Bohol
              </div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#1B4332] mb-2">
                {area.name}
              </h2>
              <p className="text-gray-500 text-sm mb-4">{area.tagline}</p>
              <div className="text-[#1B4332] text-sm font-semibold group-hover:underline">
                View area →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-14 px-6 text-center">
        <h2 className="text-2xl font-bold text-[#1B4332] mb-4">
          Not sure which area is right for you?
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Tell us your budget, lifestyle, and goals — we&apos;ll match you with the
          right location and available listings.
        </p>
        <Link
          href="/#contact"
          className="inline-block bg-[#1B4332] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#2d6a4f] transition-colors"
        >
          Get Personalised Advice
        </Link>
      </section>
    </main>
  );
}
