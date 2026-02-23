"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Currency } from "@/store/use-ui-store";
import { useUIStore } from "@/store/use-ui-store";

const navItemsEn = [
  { label: "Home",       href: "/" },
  { label: "Properties", href: "/listings" },
];
const navItemsKo = [
  { label: "홈",   href: "/" },
  { label: "매물", href: "/listings" },
];

const currencies: Currency[] = ["PHP", "USD", "KRW"];

export function Navbar() {
  const pathname    = usePathname();
  const currency    = useUIStore((s) => s.currency);
  const setCurrency = useUIStore((s) => s.setCurrency);
  const locale      = useUIStore((s) => s.locale);
  const toggleLocale = useUIStore((s) => s.toggleLocale);
  const isMenuOpen  = useUIStore((s) => s.isMenuOpen);
  const toggleMenu  = useUIStore((s) => s.toggleMenu);
  const closeMenu   = useUIStore((s) => s.closeMenu);

  const navItems = locale === "ko" ? navItemsKo : navItemsEn;

  return (
    <header className="sticky top-0 z-40 border-b border-brand-emerald/10 bg-brand-cream/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">

        {/* Logo */}
        <Link href="/" className="inline-flex items-center" onClick={closeMenu}>
          <Image
            src="/assets/logo-transparent.png"
            alt="Island Properties logo"
            width={420}
            height={120}
            className="h-14 w-auto sm:h-16"
            priority
          />
        </Link>

        <div className="flex items-center gap-2">

          {/* Currency switcher — PHP / USD / KRW */}
          <div className="glass-panel relative inline-flex rounded-full p-1">
            {currencies.map((option) => {
              const isActive = option === currency;
              return (
                <button
                  key={option}
                  type="button"
                  className="relative z-10 rounded-full px-2.5 py-1.5 text-xs font-semibold tracking-wide sm:px-3"
                  onClick={() => setCurrency(option)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-currency"
                      className="absolute inset-0 rounded-full bg-brand-emerald"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className={`relative ${isActive ? "text-brand-cream" : "text-brand-emerald"}`}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Language toggle — EN / 한국어 */}
          <button
            type="button"
            onClick={toggleLocale}
            className="glass-panel rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide text-brand-emerald transition hover:bg-brand-emerald/10"
            title={locale === "en" ? "한국어로 보기" : "View in English"}
          >
            {locale === "en" ? "한국어" : "EN"}
          </button>

          {/* Hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={toggleMenu}
            className="glass-panel flex h-10 w-10 items-center justify-center rounded-full text-brand-emerald transition hover:bg-white/70"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-4 mb-4 rounded-2xl border border-brand-emerald/15 bg-white/85 p-3 shadow-glass backdrop-blur-md sm:mx-6"
          >
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                        isActive
                          ? "bg-brand-emerald text-brand-cream"
                          : "text-brand-emerald hover:bg-brand-emerald/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
