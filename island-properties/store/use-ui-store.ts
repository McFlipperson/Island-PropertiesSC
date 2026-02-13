"use client";

import { create } from "zustand";

export type Currency = "PHP" | "USD";

type UIStore = {
  currency: Currency;
  isMenuOpen: boolean;
  activeVideoUrl: string | null;
  isVideoModalOpen: boolean;
  isSaraOpen: boolean;
  isSaraSpeaking: boolean;
  saraPropertyContext: string | null;
  setCurrency: (currency: Currency) => void;
  toggleCurrency: () => void;
  toggleMenu: () => void;
  closeMenu: () => void;
  openVideoModal: (videoUrl: string) => void;
  closeVideoModal: () => void;
  openSara: () => void;
  closeSara: () => void;
  toggleSara: () => void;
  setSaraSpeaking: (speaking: boolean) => void;
  setSaraPropertyContext: (context: string | null) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  currency: "PHP",
  isMenuOpen: false,
  activeVideoUrl: null,
  isVideoModalOpen: false,
  isSaraOpen: false,
  isSaraSpeaking: false,
  saraPropertyContext: null,
  setCurrency: (currency) => set({ currency }),
  toggleCurrency: () =>
    set((state) => ({
      currency: state.currency === "PHP" ? "USD" : "PHP",
    })),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  openVideoModal: (videoUrl) =>
    set({
      activeVideoUrl: videoUrl,
      isVideoModalOpen: true,
    }),
  closeVideoModal: () =>
    set({
      activeVideoUrl: null,
      isVideoModalOpen: false,
    }),
  openSara: () => set({ isSaraOpen: true }),
  closeSara: () => set({ isSaraOpen: false }),
  toggleSara: () => set((state) => ({ isSaraOpen: !state.isSaraOpen })),
  setSaraSpeaking: (speaking) => set({ isSaraSpeaking: speaking }),
  setSaraPropertyContext: (context) => set({ saraPropertyContext: context }),
}));
