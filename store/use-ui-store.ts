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
  isSophiaOpen: boolean;
  isSophiaSpeaking: boolean;
  sophiaPropertyContext: string | null;
  setCurrency: (currency: Currency) => void;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  toggleMenu: () => void;
  closeMenu: () => void;
  openVideoModal: (videoUrl: string) => void;
  closeVideoModal: () => void;
  openSophia: () => void;
  closeSophia: () => void;
  toggleSophia: () => void;
  setSophiaSpeaking: (speaking: boolean) => void;
  setSophiaPropertyContext: (context: string | null) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  currency: "PHP",
  locale: "en",
  isMenuOpen: false,
  activeVideoUrl: null,
  isVideoModalOpen: false,
  isSophiaOpen: false,
  isSophiaSpeaking: false,
  sophiaPropertyContext: null,
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
  openSophia: () => set({ isSophiaOpen: true }),
  closeSophia: () => set({ isSophiaOpen: false }),
  toggleSophia: () => set((state) => ({ isSophiaOpen: !state.isSophiaOpen })),
  setSophiaSpeaking: (speaking) => set({ isSophiaSpeaking: speaking }),
  setSophiaPropertyContext: (context) => set({ sophiaPropertyContext: context }),
}));
