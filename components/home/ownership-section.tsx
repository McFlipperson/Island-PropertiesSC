"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useUIStore } from "@/store/use-ui-store";
import { FileText, Key, Building2 } from "lucide-react";

const paths = [
  {
    icon: FileText,
    title: "CCT Condo Title",
    titleKo: "CCT 콘도 소유권",
    body: "The cleanest option. Your name on a Filipino title deed. No middleman, no structure, no risk.",
    bodyKo: "가장 깔끔한 방법입니다. 필리핀 부동산 등기부에 귀하의 이름이 올라갑니다. 중개인 없음, 복잡한 구조 없음, 위험 없음.",
  },
  {
    icon: Key,
    title: "Long-Term Lease",
    titleKo: "장기 임대",
    body: "Up to 99 years under the new Investors' Lease Act (RA 12252, signed 2025). Own the building, lease the land. The most flexible path for non-condo property.",
    bodyKo: "신규 투자자 임대법(RA 12252, 2025년 서명)에 따라 최대 99년. 건물 소유, 토지 임대. 콘도 외 부동산에 가장 유연한 방법입니다.",
  },
  {
    icon: Building2,
    title: "Filipino Corporation",
    titleKo: "필리핀 법인",
    body: "For serious investors. Structure a company, acquire land assets. Attorney-guided.",
    bodyKo: "진지한 투자자를 위한 방법입니다. 법인을 설립하여 토지 자산을 취득합니다. 변호사 가이드 제공.",
  },
];

export function OwnershipSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const openYuna = useUIStore((s) => s.openYuna);
  const locale = useUIStore((s) => s.locale);

  return (
    <section
      ref={ref}
      className="w-full bg-white px-6 py-20 sm:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            {locale === "ko" ? "소유권" : "Ownership"}
          </p>
          <h2 className="font-heading text-3xl font-bold text-brand-emerald sm:text-4xl lg:text-5xl">
            {locale === "ko" ? "외국인도 보홀에서 합법적으로 부동산을 소유할 수 있습니다." : "Foreigners can legally own property in Bohol."}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-brand-emerald/70">
            {locale === "ko" ? "세 가지 방법. 모두 합법적입니다. 어떤 것이 맞는지 안내해 드립니다." : "Three paths. All legitimate. We'll show you which fits."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 grid gap-6 sm:grid-cols-3"
        >
          {paths.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className="rounded-2xl border border-brand-emerald/10 bg-[#F5F0E8] p-7"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-emerald">
                  <Icon className="h-5 w-5 text-brand-gold" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-brand-emerald">
                  {locale === "ko" ? item.titleKo : item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-emerald/70">
                  {locale === "ko" ? item.bodyKo : item.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-brand-emerald/70">
            {locale === "ko" ? "어떤 방법이 적합한지 모르시겠어요?" : "Not sure which is right for you?"}{" "}
            <button
              onClick={openYuna}
              className="font-semibold text-[#C9A84C] hover:underline decoration-[#C9A84C] underline-offset-4 transition-all text-base"
            >
              {locale === "ko" ? "✦ 유나가 세 가지를 모두 쉽게 설명해 드립니다 →" : "✦ Yuna can walk you through all three in plain English →"}
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
