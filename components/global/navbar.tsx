"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Currency } from "@/store/use-ui-store";
import { useUIStore } from "@/store/use-ui-store";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Listings", href: "/listings/panglao-cliffside-estate" },
];

const currencies: Currency[] = ["PHP", "USD"];

export function Navbar() {
  const pathname = usePathname();
  const currency = useUIStore((state) => state.currency);
  const setCurrency = useUIStore((state) => state.setCurrency);
  const isMenuOpen = useUIStore((state) => state.isMenuOpen);
  const toggleMenu = useUIStore((state) => state.toggleMenu);
  const closeMenu = useUIStore((state) => state.closeMenu);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-emerald/10 bg-brand-cream/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center"
          onClick={closeMenu}
        >
          <Image
            src="/assets/logo-transparent.png"
            alt="Island Properties logo"
            width={420}
            height={120}
            className="h-14 w-auto sm:h-16"
            priority
          />
        </Link>

        <div className="flex items-center gap-3">
          <div className="glass-panel relative inline-flex rounded-full p-1">
            {currencies.map((option) => {
              const isActive = option === currency;

              return (
                <button
                  key={option}
                  type="button"
                  className="relative z-10 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide sm:px-4"
                  onClick={() => setCurrency(option)}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-currency"
                      className="absolute inset-0 rounded-full bg-brand-emerald"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  ) : null}
                  <span className={`relative ${isActive ? "text-brand-cream" : "text-brand-emerald"}`}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

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

      <AnimatePresence>
        {isMenuOpen ? (
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
        ) : null}
      </AnimatePresence>
    </header>
  );
}
