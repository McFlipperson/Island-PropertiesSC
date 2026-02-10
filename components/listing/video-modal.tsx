"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useUIStore } from "@/store/use-ui-store";

export function VideoModal() {
  const isVideoModalOpen = useUIStore((state) => state.isVideoModalOpen);
  const activeVideoUrl = useUIStore((state) => state.activeVideoUrl);
  const closeVideoModal = useUIStore((state) => state.closeVideoModal);

  return (
    <AnimatePresence>
      {isVideoModalOpen && activeVideoUrl ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4"
          onClick={closeVideoModal}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl"
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={closeVideoModal}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/65 p-1.5 text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <video
              src={activeVideoUrl}
              className="h-auto w-full"
              controls
              autoPlay
              muted
              loop
              playsInline
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
