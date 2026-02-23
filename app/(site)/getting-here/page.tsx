"use client";

import Link from "next/link";
import { useUIStore } from "@/store/use-ui-store";

const content = {
  en: {
    meta:     "Getting to Bohol",
    eyebrow:  "Arrival Guide",
    headline: "Seoul to Bohol.",
    sub:      "Five hours and a world away from the city.",
    steps: [
      {
        city:    "Seoul · Incheon International",
        time:    "Departs ICN",
        heading: "The Best Seat in the Sky",
        body:    "Korean Air's First Class departs from Incheon — one of the world's finest airports. A private suite with sliding door, fully flat bed, and Korean dining at 35,000 feet. The lounge opens hours before departure. The journey begins before you board.",
        detail:  "Korean Air First Class · Incheon Terminal 2",
      },
      {
        city:    "Manila · Ninoy Aquino International",
        time:    "Transit MNL",
        heading: "A Brief Pause",
        body:    "Philippine Airlines operates the connection through Terminal 2 — their dedicated terminal. A short layover in the Mabuhay Lounge, then onwards on the Mabuhay Class cabin for the final domestic leg to Bohol.",
        detail:  "PAL Terminal 2 · Mabuhay Lounge",
      },
      {
        city:    "Bohol · Panglao International",
        time:    "Arrives TAG",
        heading: "We Meet You Here",
        body:    "Your Island Properties representative is waiting at arrivals. Private vehicle directly to the property. From wheels down to your first view of the water — thirty minutes.",
        detail:  "Private transfer arranged · No waiting",
      },
    ],
    directLabel:   "Prefer non-stop?",
    directBody:    "Direct flights operate between Incheon and Tagbilaran — 5 hours 15 minutes, no connection. A practical option for return visits once you know the destination.",
    ctaHeading:    "Let us coordinate your visit.",
    ctaBody:       "Property tours are by private appointment. We handle transfers, scheduling, and any questions before you land.",
    ctaButton:     "Request a Visit",
    totalTime:     "Total journey time",
    totalDuration: "~6 hours Seoul to Bohol",
  },
  ko: {
    meta:     "보홀 오시는 길",
    eyebrow:  "방문 안내",
    headline: "서울에서 보홀까지.",
    sub:      "다섯 시간이면 도시의 모든 것이 사라집니다.",
    steps: [
      {
        city:    "서울 · 인천국제공항",
        time:    "인천 출발",
        heading: "하늘 위의 프라이빗 스위트",
        body:    "대한항공 퍼스트 클래스는 세계 최고 수준의 공항인 인천에서 출발합니다. 슬라이딩 도어가 있는 프라이빗 스위트, 완전히 평평한 침대, 그리고 고도 35,000피트에서 즐기는 한국식 기내식. 라운지는 출발 수 시간 전부터 이용 가능합니다.",
        detail:  "대한항공 퍼스트 클래스 · 인천 제2터미널",
      },
      {
        city:    "마닐라 · 니노이 아키노 국제공항",
        time:    "마닐라 경유",
        heading: "짧은 경유",
        body:    "필리핀항공 전용 터미널인 제2터미널을 통해 환승합니다. 마부하이 라운지에서 잠시 여유를 즐기신 후, 마부하이 클래스로 보홀까지 마지막 국내선 구간을 이동하십니다.",
        detail:  "PAL 제2터미널 · 마부하이 라운지",
      },
      {
        city:    "보홀 · 팡라오 국제공항",
        time:    "보홀 도착",
        heading: "저희가 마중 나갑니다",
        body:    "아일랜드 프로퍼티스 담당자가 도착 게이트에서 고객님을 기다리고 있습니다. 전용 차량으로 바로 매물까지 이동합니다. 착륙 후 바다가 보이는 곳까지, 단 삼십 분입니다.",
        detail:  "프라이빗 트랜스퍼 · 대기 없음",
      },
    ],
    directLabel:   "직항 편을 선호하십니까?",
    directBody:    "인천에서 타그빌라란까지 직항편이 운항됩니다. 소요 시간은 5시간 15분으로, 경유 없이 이동 가능합니다. 보홀을 이미 아시는 고객님께 편리한 선택지입니다.",
    ctaHeading:    "방문 일정을 조율해 드리겠습니다.",
    ctaBody:       "부동산 투어는 프라이빗 예약제로 진행됩니다. 공항 픽업, 일정 조율, 방문 전 문의 사항까지 모두 저희가 담당합니다.",
    ctaButton:     "방문 신청하기",
    totalTime:     "서울 → 보홀 총 소요 시간",
    totalDuration: "약 6시간",
  },
} as const;

const STEP_ICONS = ["✈", "🔄", "🏝"];

export default function GettingHerePage() {
  const locale = useUIStore((s) => s.locale);
  const t      = content[locale];

  return (
    <main className="min-h-screen bg-brand-cream">

      {/* Hero */}
      <section className="border-b border-brand-emerald/10 px-6 py-16 text-center sm:py-24">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-emerald/60">
          {t.eyebrow}
        </p>
        <h1 className="font-serif text-4xl font-light text-brand-emerald sm:text-5xl lg:text-6xl">
          {t.headline}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-brand-emerald/60 sm:text-lg">
          {t.sub}
        </p>

        {/* Total time pill */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-emerald/20 bg-white/60 px-5 py-2 text-sm text-brand-emerald backdrop-blur-sm">
          <span className="font-medium">{t.totalTime}:</span>
          <span className="text-brand-emerald/70">{t.totalDuration}</span>
        </div>
      </section>

      {/* Journey Steps */}
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-8 h-[calc(100%-4rem)] w-px bg-brand-emerald/15 sm:left-8" />

          <div className="space-y-12">
            {t.steps.map((step, i) => (
              <div key={i} className="relative flex gap-6 sm:gap-8">

                {/* Step circle */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-emerald/20 bg-brand-cream text-xl shadow-sm sm:h-16 sm:w-16">
                  {STEP_ICONS[i]}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2 pt-1">
                  <div className="mb-1 flex flex-wrap items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-brand-emerald/40">
                      {step.time}
                    </span>
                    <span className="text-xs text-brand-emerald/50">{step.city}</span>
                  </div>
                  <h2 className="mb-2 font-serif text-xl font-light text-brand-emerald sm:text-2xl">
                    {step.heading}
                  </h2>
                  <p className="text-sm leading-relaxed text-brand-emerald/65 sm:text-base">
                    {step.body}
                  </p>
                  <p className="mt-3 text-xs font-medium text-brand-emerald/40 tracking-wide">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct flight note */}
      <section className="border-t border-brand-emerald/10 bg-white/40 px-6 py-10">
        <div className="mx-auto max-w-2xl">
          <div className="flex gap-4">
            <span className="text-2xl">🛬</span>
            <div>
              <p className="mb-1 text-sm font-semibold text-brand-emerald">{t.directLabel}</p>
              <p className="text-sm leading-relaxed text-brand-emerald/60">{t.directBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 text-center sm:py-20">
        <h2 className="mb-3 font-serif text-2xl font-light text-brand-emerald sm:text-3xl">
          {t.ctaHeading}
        </h2>
        <p className="mx-auto mb-8 max-w-sm text-sm text-brand-emerald/60 sm:text-base">
          {t.ctaBody}
        </p>
        <Link
          href="/#contact"
          className="inline-block rounded-full bg-brand-emerald px-8 py-3 text-sm font-semibold text-brand-cream shadow-sm transition hover:bg-brand-emerald/90"
        >
          {t.ctaButton}
        </Link>
      </section>

    </main>
  );
}
