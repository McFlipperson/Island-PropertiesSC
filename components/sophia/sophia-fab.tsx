"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useUIStore } from "@/store/use-ui-store";

export function YunaFab() {
  const isYunaOpen    = useUIStore((s) => s.isYunaOpen);
  const toggleYuna    = useUIStore((s) => s.toggleYuna);
  const isYunaSpeaking = useUIStore((s) => s.isYunaSpeaking);
  const locale        = useUIStore((s) => s.locale);

  const label = isYunaOpen
    ? (locale === "ko" ? "닫기" : "Close")
    : (locale === "ko" ? "✦ 유나에게 물어보기" : "Ask Yuna");

  return (
    <div className="fixed bottom-5 right-5 z-[55] flex flex-col items-end gap-1">
      <motion.button
        type="button"
        onClick={toggleYuna}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#043927] to-[#0A7EA4] px-5 py-3.5 text-sm font-semibold text-brand-cream border border-[#C9A84C]/40 shadow-[0_0_24px_rgba(201,168,76,0.35)] transition hover:translate-y-[-2px] hover:shadow-[0_0_32px_rgba(201,168,76,0.5)]"
      >
        {/* Shimmer sweep */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 3, repeatDelay: 4, ease: "easeInOut" }}
        />

        <AnimatePresence mode="wait">
          {isYunaOpen ? (
            <motion.span key="close"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="h-4 w-4" />
            </motion.span>
          ) : (
            <motion.span key="sparkle"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }}>
              <span style={{ color: "#C9A84C" }}>✦</span>
            </motion.span>
          )}
        </AnimatePresence>

        <span>{label}</span>

        {isYunaSpeaking && !isYunaOpen && (
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.4, 0.8] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-brand-gold"
          />
        )}
      </motion.button>

      {/* Online now indicator — only visible when Yuna is closed */}
      {!isYunaOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-1 px-1"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-medium text-emerald-600/80 tracking-wide">
            {locale === "ko" ? "온라인" : "online now"}
          </span>
        </motion.div>
      )}
    </div>
  );
}
