"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useUIStore } from "@/store/use-ui-store";

const quotes = [
  {
    text: "I pay ₱18,000 a month for a two-bedroom with an ocean view. My pension goes four times further here than it did in Canada. I wasn't looking for paradise — I just couldn't afford NOT to move.",
    textKo: "저는 오션뷰 투베드룸에 월 18,000페소를 냅니다. 캐나다에 있을 때보다 연금이 네 배는 더 오래갑니다. 낙원을 찾은 게 아니었어요 — 그냥 이사를 안 할 수가 없었습니다.",
    name: "Daniel Reyes",
    city: "Calgary, Canada",
  },
  {
    text: "As a retired GP I had serious questions about healthcare before I moved. Bohol surprised me. The facilities are better than I expected and the air quality alone added years to my life.",
    textKo: "이주 전에 의료 환경에 대해 진지하게 고민했습니다. 보홀은 기대 이상이었습니다. 시설도 생각보다 좋았고, 공기 질만으로도 수명이 늘어난 것 같습니다.",
    name: "Dr. Felix Hartmann",
    city: "London, UK",
  },
  {
    text: "The numbers made no sense at first — I kept looking for the catch. There isn't one. Bohol is where Cebu was fifteen years ago. The window is still open.",
    textKo: "처음엔 숫자가 말이 안 됐어요 — 어디서 함정이 있을까 계속 찾았습니다. 없었습니다. 보홀은 15년 전의 세부와 같습니다. 기회의 창은 아직 열려 있습니다.",
    name: "Marcus Webb",
    city: "London, UK",
  },
];

export function VoicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const locale = useUIStore((s) => s.locale);

  return (
    <section
      ref={ref}
      className="w-full bg-[#F5F0E8] px-6 py-20 sm:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
            {locale === "ko" ? "실제 목소리" : "Real Voices"}
          </p>
          <h2 className="font-heading text-3xl font-bold text-brand-emerald sm:text-4xl lg:text-5xl">
            {locale === "ko" ? "이주를 결정한 사람들의 이야기." : "From people who made the move."}
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.blockquote
              key={q.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="flex flex-col"
            >
              <span className="font-heading text-5xl leading-none text-brand-gold">&ldquo;</span>
              <p className="mt-2 flex-1 text-base leading-relaxed text-brand-emerald/80">
                {locale === "ko" ? q.textKo : q.text}
              </p>
              <div className="mt-6">
                <p className="font-semibold text-brand-emerald">{q.name}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-brand-emerald/50">{q.city}</p>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
