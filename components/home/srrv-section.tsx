"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useUIStore } from "@/store/use-ui-store";

const facts = [
  { label: "Age 50+", labelKo: "50세 이상" },
  { label: "No annual renewal", labelKo: "연간 갱신 없음" },
  { label: "Live & work legally", labelKo: "합법적 거주 및 취업" },
  { label: "Re-enter freely", labelKo: "자유로운 재입국" },
  { label: "Free if you buy", labelKo: "구매 시 무료" },
];

export function SrrvSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const openYuna = useUIStore((s) => s.openYuna);
  const locale = useUIStore((s) => s.locale);

  return (
    <section
      ref={ref}
      className="w-full bg-[#EBF4EC] px-6 py-20 sm:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            {locale === "ko" ? "SRRV 비자" : "The SRRV Visa"}
          </p>
          <h2 className="font-heading text-3xl font-bold text-brand-emerald sm:text-4xl lg:text-5xl">
            {locale === "ko" ? "대부분의 외국인이 모르는 비자." : <>The visa most expats<br className="hidden sm:block" /> don&apos;t know exists.</>}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-emerald/80">
            {locale === "ko"
              ? "특별 거주 은퇴자 비자(SRRV)는 필리핀에서 영구적으로 거주할 수 있게 해줍니다 — 자유롭게 재입국, 연간 갱신 없음, 대사관 방문 없음. 50세 이상. 취업, 투자, 은퇴. 동남아시아에서 가장 저평가된 장기 체류 비자이지만, 거의 알려져 있지 않습니다."
              : "The Special Resident Retiree's Visa (SRRV) lets you live in the Philippines permanently — re-enter freely, no annual renewal, no embassy visits. Age 50+. Work, invest, retire. It's the most underrated long-stay visa in Southeast Asia, and almost no one talks about it."}
          </p>
        </motion.div>

        {/* The Hook — highlighted callout */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 rounded-2xl border border-brand-gold/40 bg-brand-emerald px-7 py-6 shadow-lg"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold mb-3">
            {locale === "ko" ? "대부분이 놓치는 부분" : "The Part Most People Miss"}
          </p>
          <p className="text-base leading-relaxed text-white sm:text-lg">
            {locale === "ko" ? (
              <>SRRV에 필요한 $20,000 USD 보증금?{" "}<strong className="text-brand-gold">$50,000 이상의 적격 콘도미니엄을 구매하면 그 보증금이 면제됩니다</strong>{" "}— 부동산이 요건을 충족합니다. 대부분의 구매자에게 SRRV는{" "}<strong className="text-white">사실상 무료입니다.</strong></>
            ) : (
              <>The $20,000 USD deposit required for the SRRV?{" "}<strong className="text-brand-gold">If you purchase a qualifying condominium unit valued at $50,000 or more, that deposit is waived</strong>{" "}— your property satisfies the requirement. For most buyers, the SRRV is{" "}<strong className="text-white">effectively free.</strong></>
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {facts.map((fact) => (
            <span
              key={fact.label}
              className="rounded-full border border-brand-emerald/20 bg-white px-5 py-2.5 text-sm font-semibold text-brand-emerald"
            >
              {locale === "ko" ? fact.labelKo : fact.label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8"
        >
          <button
            onClick={openYuna}
            className="inline-flex items-center gap-2 text-base font-semibold text-[#C9A84C] hover:underline decoration-[#C9A84C] underline-offset-4 transition-all"
          >
            {locale === "ko" ? "✦ 자격 여부를 유나에게 물어보세요 →" : "✦ Ask Yuna if you qualify →"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
