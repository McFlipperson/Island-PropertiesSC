"use client";

import { create } from "zustand";

export type Currency = "PHP" | "USD";

type UIStore = {
  currency: Currency;
  isMenuOpen: boolean;
  activeVideoUrl: string | null;
  isVideoModalOpen: boolean;
  isSophiaOpen: boolean;
  isSophiaSpeaking: boolean;
  sophiaPropertyContext: string | null;
  setCurrency: (currency: Currency) => void;
  toggleCurrency: () => void;
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
  isMenuOpen: false,
  activeVideoUrl: null,
  isVideoModalOpen: false,
  isSophiaOpen: false,
  isSophiaSpeaking: false,
  sophiaPropertyContext: null,
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
  openSophia: () => set({ isSophiaOpen: true }),
  closeSophia: () => set({ isSophiaOpen: false }),
  toggleSophia: () => set((state) => ({ isSophiaOpen: !state.isSophiaOpen })),
  setSophiaSpeaking: (speaking) => set({ isSophiaSpeaking: speaking }),
  setSophiaPropertyContext: (context) => set({ sophiaPropertyContext: context }),
}));
