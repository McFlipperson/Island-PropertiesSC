"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUIStore } from "@/store/use-ui-store";

export function Hero() {
  const openYuna = useUIStore((s) => s.openYuna);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full-bleed image */}
      <Image
        src="/assets/life-choco-hills.jpg"
        alt="Panglao Island Bohol Philippines — Beachfront Property for Foreign Buyers"
        fill
        priority
        className="object-cover animate-kenburns"
        sizes="100vw"
      />

      {/* Dark gradient overlay — ALWAYS visible, not tied to text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />

      {/* Centered text content — fades in after 3s */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{
          opacity: textVisible ? 1 : 0,
          transition: "opacity 1.5s ease-in",
        }}
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-gold">
          Bohol, Philippines
        </p>

        <h1 className="font-heading max-w-3xl text-4xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
          Paradise isn&apos;t<br />
          just for holidays.
        </h1>

        <p className="mt-5 max-w-md text-base text-white/80 sm:text-lg">
          Own a piece of Bohol from $65,000. No residency required.
        </p>

        <div className="mt-8">
          <Link
            href="/listings"
            className="inline-flex rounded-full bg-brand-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-brand-emerald shadow-lg transition hover:bg-[#d3ad64] hover:shadow-xl"
          >
            Explore Properties
          </Link>
        </div>
      </div>

      {/* Yuna nudge — bottom of hero, also fades in with text */}
      <div
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        style={{
          opacity: textVisible ? 1 : 0,
          transition: "opacity 1.5s ease-in",
        }}
      >
        <button
          onClick={openYuna}
          className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm text-white/80 backdrop-blur-sm transition hover:border-brand-gold/50 hover:bg-white/15 hover:text-white"
        >
          <span className="h-2 w-2 rounded-full bg-brand-gold" />
          Questions? Yuna knows every answer
          <span className="transition group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </section>
  );
}
