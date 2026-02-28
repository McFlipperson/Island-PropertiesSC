"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const tiles = [
  {
    label: "Chocolate Hills",
    caption: "Chocolate Hills",
    size: "col-span-2",
    src: "/assets/life-choco-hills.jpg",
    position: "object-center",
  },
  {
    label: "Alona Beach",
    caption: "Alona Beach",
    size: "",
    src: "/assets/life-beach.jpg",
    position: "object-center",
  },
  {
    label: "Alona Beach Nightlife",
    caption: "Alona Beach",
    size: "",
    src: "/assets/life-nightlife.jpg",
    position: "object-center",
  },
  {
    label: "Tagbilaran City",
    caption: "Tagbilaran City",
    size: "",
    src: "/assets/life-city.jpg",
    position: "object-center",
  },
  {
    label: "Philippine Tarsier",
    caption: "Only here.",
    size: "",
    src: "/assets/tarsier-bohol.jpg",
    position: "object-cover object-center",
  },
  {
    label: "Bohol Roads",
    caption: "No traffic. Ever.",
    size: "",
    src: "/assets/life-road.jpg",
    position: "object-center",
  },
  {
    label: "Bohol Sea Diving",
    caption: "Bohol Sea",
    size: "",
    src: "/assets/life-diving.jpg",
    position: "object-[center_25%]",
  },
  {
    label: "Hinagdanan Cave",
    caption: "Hinagdanan Cave, Panglao",
    size: "col-span-2",
    src: "/assets/life-cave.jpg",
    position: "object-center",
  },
];

export function LifeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<{ src: string; label: string } | null>(null);

  return (
    <section
      ref={ref}
      className="w-full bg-brand-emerald px-6 py-20 sm:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            The Life
          </p>
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Everything you came to Asia for.<br className="hidden sm:block" />
            <span className="text-brand-gold"> None of what you didn&apos;t.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
            A modern city with hospitals, malls, and infrastructure — wrapped in the most beautiful island you&apos;ve never heard of.
          </p>
        </motion.div>

        {/* Compact magazine mosaic — 3 cols desktop, 2 tablet, 1 mobile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.06 * i }}
              className={`relative h-48 overflow-hidden bg-brand-emerald/40 lg:h-56 ${tile.size} cursor-pointer group`}
              onClick={() => setSelected({ src: tile.src, label: tile.label })}
            >
              <Image
                src={tile.src}
                alt={tile.label}
                fill
                className={`object-cover ${tile.position}`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              {/* Bottom gradient for caption readability — covers bottom 30% */}
              <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/60 to-transparent" />
              {/* Magazine caption */}
              <p className="absolute bottom-2 left-3 text-xs leading-none tracking-wide text-white drop-shadow-sm">
                {tile.caption}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
              onClick={() => setSelected(null)}
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[90vh] max-w-5xl w-full h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selected.src}
                alt={selected.label}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
