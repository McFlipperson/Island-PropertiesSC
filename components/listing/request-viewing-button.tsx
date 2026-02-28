"use client";

import { useUIStore } from "@/store/use-ui-store";

interface RequestViewingButtonProps {
  propertyName?: string;
  propertySlug?: string;
}

export function RequestViewingButton({ propertyName, propertySlug }: RequestViewingButtonProps) {
  const locale                 = useUIStore((s) => s.locale);
  const openYuna               = useUIStore((s) => s.openYuna);
  const setYunaPropertyContext = useUIStore((s) => s.setYunaPropertyContext);

  function handleClick() {
    if (propertyName) {
      setYunaPropertyContext(
        `The visitor is viewing the listing page for: ${propertyName}${propertySlug ? ` (slug: ${propertySlug})` : ""}. They clicked "Request Viewing" — they are interested in this specific property. Greet them warmly, acknowledge the property by name, and guide them toward booking a private viewing or sharing their contact details.`
      );
    }
    openYuna();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-5 left-5 z-[54] inline-flex items-center gap-2 rounded-full bg-brand-emerald px-4 py-3 text-sm font-semibold text-brand-cream shadow-[0_12px_30px_rgba(4,57,39,0.4)] transition hover:translate-y-[-2px] hover:bg-[#05583a]"
    >
      {locale === "ko" ? "프라이빗 투어 신청" : "Request Viewing"}
    </button>
  );
}
