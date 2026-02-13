"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "639000000000";
const message =
  "Hello%20Island%20Properties%2C%20I%20would%20like%20to%20request%20a%20private%20viewing.";

export function WhatsAppFab() {
  return (
    <motion.a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand-emerald px-4 py-3 text-sm font-semibold text-brand-cream shadow-[0_12px_30px_rgba(4,57,39,0.4)] transition hover:translate-y-[-2px] hover:bg-[#05583a]"
    >
      <MessageCircle className="h-4 w-4" />
      WhatsApp
    </motion.a>
  );
}
