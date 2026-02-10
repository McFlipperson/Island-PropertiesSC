"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useUIStore } from "@/store/use-ui-store";

export function SophiaFab() {
  const isSophiaOpen = useUIStore((state) => state.isSophiaOpen);
  const toggleSophia = useUIStore((state) => state.toggleSophia);
  const isSophiaSpeaking = useUIStore((state) => state.isSophiaSpeaking);

  return (
    <motion.button
      type="button"
      onClick={toggleSophia}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 right-5 z-[55] inline-flex items-center gap-2 rounded-full bg-brand-emerald px-4 py-3 text-sm font-semibold text-brand-cream shadow-[0_12px_30px_rgba(4,57,39,0.4)] transition hover:translate-y-[-2px] hover:bg-[#05583a]"
    >
      <AnimatePresence mode="wait">
        {isSophiaOpen ? (
          <motion.span
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <X className="h-4 w-4" />
          </motion.span>
        ) : (
          <motion.span
            key="open"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <MessageCircle className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>

      <span>{isSophiaOpen ? "Close" : "Talk to Sophia"}</span>

      {/* Speaking indicator pulse */}
      {isSophiaSpeaking && !isSophiaOpen && (
        <motion.span
          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.4, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-brand-gold"
        />
      )}
    </motion.button>
  );
}
