"use client";

import { useUIStore } from "@/store/use-ui-store";
import { useTranslations } from "@/lib/i18n/translations";

export function RequestViewingButton() {
  const locale = useUIStore((s) => s.locale);
  const t = useTranslations(locale);

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-brand-emerald/15 bg-brand-cream/92 p-4 backdrop-blur-md">
      <div className="mx-auto w-full max-w-7xl">
        <button
          type="button"
          className="w-full rounded-full bg-brand-emerald px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-cream transition hover:bg-[#05583a]"
        >
          {t.listing.requestViewing}
        </button>
      </div>
    </div>
  );
}
