"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useUIStore } from "@/store/use-ui-store";

type MediaDeckProps = {
  title: string;
  images: string[];
  videoFile?: string;
};

export function MediaDeck({ title, images, videoFile }: MediaDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const openVideoModal = useUIStore((state) => state.openVideoModal);
  const hasVideo = Boolean(videoFile && videoFile.trim().length > 0);

  function snapToIndex(index: number) {
    const container = carouselRef.current;
    if (!container) return;

    const boundedIndex = Math.max(0, Math.min(index, images.length - 1));
    const width = container.clientWidth;

    container.scrollTo({
      left: boundedIndex * width,
      behavior: "smooth",
    });

    setActiveIndex(boundedIndex);
  }

  function onScroll() {
    const container = carouselRef.current;
    if (!container) return;
    const width = container.clientWidth || 1;
    const nextIndex = Math.round(container.scrollLeft / width);
    if (nextIndex !== activeIndex) {
      setActiveIndex(nextIndex);
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-brand-emerald/15 bg-brand-emerald/5"
    >
      <div
        ref={carouselRef}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
      >
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className="relative h-[46vh] min-w-full snap-center sm:h-[58vh]">
            <Image
              src={image}
              alt={`${title} view ${index + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-6">
        <div className="pointer-events-auto absolute bottom-4 right-4 flex gap-2 sm:bottom-6 sm:right-6">
          <button
            type="button"
            onClick={() => snapToIndex(activeIndex - 1)}
            className="rounded-full bg-black/45 p-2 text-white backdrop-blur"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => snapToIndex(activeIndex + 1)}
            className="rounded-full bg-black/45 p-2 text-white backdrop-blur"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {hasVideo ? (
          <button
            type="button"
            onClick={() => openVideoModal(videoFile as string)}
            className="pointer-events-auto absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/50 bg-black/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur transition hover:bg-black/65 sm:bottom-6 sm:left-6"
          >
            <Play className="h-4 w-4" />
            Watch Video
          </button>
        ) : (
          <p className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/75 sm:bottom-6 sm:left-6">
            No video uploaded
          </p>
        )}
      </div>

      <div className="absolute inset-x-0 top-4 flex justify-center gap-1.5">
        {images.map((image, index) => (
          <span
            key={`${image}-dot`}
            className={`h-1.5 rounded-full transition ${
              index === activeIndex ? "w-8 bg-brand-gold" : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </motion.section>
  );
}
