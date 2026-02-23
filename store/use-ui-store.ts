"use client";

import { create } from "zustand";

export type Currency = "PHP" | "USD" | "KRW";
export type Locale   = "en" | "ko";

type UIStore = {
  currency: Currency;
  locale: Locale;
  isMenuOpen: boolean;
  activeVideoUrl: string | null;
  isVideoModalOpen: boolean;
  isYunaOpen: boolean;
  isYunaSpeaking: boolean;
  yunaPropertyContext: string | null;
  setCurrency: (currency: Currency) => void;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  toggleMenu: () => void;
  closeMenu: () => void;
  openVideoModal: (videoUrl: string) => void;
  closeVideoModal: () => void;
  openYuna: () => void;
  closeYuna: () => void;
  toggleYuna: () => void;
  setYunaSpeaking: (speaking: boolean) => void;
  setYunaPropertyContext: (context: string | null) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  currency: "PHP",
  locale: "en",
  isMenuOpen: false,
  activeVideoUrl: null,
  isVideoModalOpen: false,
  isYunaOpen: false,
  isYunaSpeaking: false,
  yunaPropertyContext: null,
  setCurrency: (currency) => set({ currency }),
  setLocale: (locale) => set({ locale }),
  toggleLocale: () => set((state) => ({
    locale: state.locale === "en" ? "ko" : "en",
    currency: state.locale === "en" ? "KRW" : "PHP",
  })),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  openVideoModal: (videoUrl) => set({ activeVideoUrl: videoUrl, isVideoModalOpen: true }),
  closeVideoModal: () => set({ activeVideoUrl: null, isVideoModalOpen: false }),
  openYuna: () => set({ isYunaOpen: true }),
  closeYuna: () => set({ isYunaOpen: false }),
  toggleYuna: () => set((state) => ({ isYunaOpen: !state.isYunaOpen })),
  setYunaSpeaking: (speaking) => set({ isYunaSpeaking: speaking }),
  setYunaPropertyContext: (context) => set({ yunaPropertyContext: context }),
}));
