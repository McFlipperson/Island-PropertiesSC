"use client";

import { useState, useMemo } from "react";
import { useUIStore } from "@/store/use-ui-store";
import { Search } from "lucide-react";

const sections = [
  {
    id: "ownership",
    icon: "🏠",
    title: "Owning Property in the Philippines",
    titleKo: "필리핀 부동산 소유",
    color: "bg-brand-emerald",
    items: [
      {
        q: "Can foreigners legally own property in the Philippines?",
        qKo: "외국인이 필리핀에서 합법적으로 부동산을 소유할 수 있나요?",
        a: `Yes — with the right structure. Foreigners cannot own land outright, but there are three proven legal paths:

**1. CCT Condo Title (most popular)**
Condominiums are explicitly exempt from the land ownership restriction. As long as foreign ownership in the building doesn't exceed 40% of total units, you receive a Condominium Certificate of Title (CCT) — your name, on a Filipino title deed, no co-owner required. This is the cleanest, simplest path. All listings on Sikat Properties are CCT-titled.

**2. Long-Term Lease (up to 99 years)**
Under Republic Act 12252 (signed September 2025), foreigners can now lease private land for up to 99 years. You own the building or improvements on the land — 100% yours — and lease the ground beneath it. The leasehold interest is fully sellable: if you build a resort and sell in 20 years, the buyer steps into your shoes with 79 years remaining. Value decreases as years decrease, so sell early.

**3. Filipino Corporation**
Structure a Philippine corporation where you hold up to 40% and trusted Filipino partners hold 60%. The corporation can own land outright. More complex to set up, but the cleanest exit for large investments — hotels, resorts, commercial properties. Attorney guidance required.`,
        aKo: `네 — 올바른 구조를 통해 가능합니다. 외국인은 토지를 단독으로 소유할 수 없지만, 세 가지 검증된 합법적 방법이 있습니다:

**1. CCT 콘도 소유권 (가장 인기)**
콘도미니엄은 토지 소유 제한에서 명시적으로 제외됩니다. 건물 전체 외국인 소유 비율이 40%를 초과하지 않는 한, 귀하는 분양권증서(CCT)를 받습니다 — 필리핀 부동산 등기부에 귀하의 이름이 올라가며, 공동 소유자가 필요 없습니다. 가장 간단하고 명확한 방법입니다.

**2. 장기 임대 (최대 99년)**
2025년 9월 서명된 공화국법 12252에 따라 외국인은 최대 99년간 사유지를 임대할 수 있습니다. 건물이나 개선물은 100% 본인 소유이며, 그 아래 토지만 임대합니다. 임대 이익은 완전히 양도 가능합니다.

**3. 필리핀 법인**
외국인이 최대 40%, 신뢰할 수 있는 필리핀 파트너가 60%를 보유하는 필리핀 법인을 설립합니다. 법인은 토지를 직접 소유할 수 있습니다.`,
      },
      {
        q: "What is a CCT and why does it matter?",
        qKo: "CCT란 무엇이며 왜 중요한가요?",
        a: `A Condominium Certificate of Title (CCT) is the Philippine government's official proof of condo ownership — the same as a land title, but for a specific unit in a condominium building. Your name is on it. It's registered with the Registry of Deeds. It cannot be disputed or taken away without due legal process.

This matters enormously for foreign buyers because:
- It's real ownership, not a trust arrangement or nominee structure
- It's mortgageable (local banks will lend against it)
- It's inheritable — it passes to your heirs
- It's sellable freely on the open market
- No Filipino co-owner or partner required

The 40% rule: A building can have no more than 40% of its units held by foreigners. Reputable developers track this. All properties listed on this site confirm CCT availability for foreign buyers.`,
        aKo: `분양권증서(CCT)는 필리핀 정부가 발행하는 공식 콘도 소유 증명서입니다 — 토지 권원증서와 동일하지만, 콘도미니엄 건물 내 특정 유닛에 대한 것입니다. 귀하의 이름이 등재되어 있으며, 등기소에 등록됩니다.

외국인 구매자에게 중요한 이유:
- 신탁 구조나 명의 신탁 없는 실제 소유권
- 담보 대출 가능 (현지 은행 대출 가능)
- 상속 가능 — 상속인에게 이전됩니다
- 자유롭게 매각 가능
- 필리핀인 공동 소유자 불필요

40% 규칙: 건물 전체 유닛의 외국인 소유 비율은 40%를 초과할 수 없습니다.`,
      },
    ],
  },
  {
    id: "srrv",
    icon: "🛂",
    title: "The SRRV Visa",
    titleKo: "SRRV 비자",
    color: "bg-[#2D6A4F]",
    items: [
      {
        q: "What is the SRRV and who qualifies?",
        qKo: "SRRV란 무엇이며 누가 자격이 되나요?",
        a: `The Special Resident Retiree's Visa (SRRV) is a permanent, multiple-entry visa issued by the Philippine Retirement Authority (PRA). It lets you live in the Philippines indefinitely — re-enter freely, no annual renewal, no annual embassy visits.

**Who qualifies (as of September 1, 2025):**
- Age 40–49 with pension: $25,000 USD deposit
- Age 40–49 without pension: $50,000 USD deposit
- Age 50+ with pension: $15,000 USD deposit
- Age 50+ without pension: $30,000 USD deposit

**What you get:**
- Permanent residence (no expiry)
- Free re-entry, unlimited times
- Right to work and invest legally
- Exemption from exit clearance requirements
- Tax exemption on pension remittances

**The part most people miss:** If you purchase a qualifying condominium unit valued at $50,000 USD or more, your required deposit is waived entirely. For most buyers over 50 with a pension, the SRRV is effectively free when you buy property.`,
        aKo: `특별 거주 은퇴자 비자(SRRV)는 필리핀 퇴직청(PRA)이 발급하는 영구적 복수입국 비자입니다. 기한 없이 필리핀에 거주할 수 있으며, 자유로운 재입국, 연간 갱신 없음, 연간 대사관 방문 없음이 특징입니다.

**자격 조건 (2025년 9월 1일 기준):**
- 40–49세, 연금 있음: $25,000 USD 예치금
- 40–49세, 연금 없음: $50,000 USD 예치금
- 50세 이상, 연금 있음: $15,000 USD 예치금
- 50세 이상, 연금 없음: $30,000 USD 예치금

**주요 혜택:**
- 영구 거주권 (만료 없음)
- 무제한 자유 재입국
- 합법적 취업 및 투자 권리
- 출국 허가 요건 면제
- 연금 송금 세금 면제

**대부분이 놓치는 부분:** $50,000 USD 이상의 적격 콘도미니엄을 구매하면 필요 예치금이 전액 면제됩니다.`,
      },
      {
        q: "How do I apply for the SRRV?",
        qKo: "SRRV는 어떻게 신청하나요?",
        a: `**Step-by-step process:**

1. **Choose your SRRV tier** — Classic, Smile, or Human Touch (healthcare-focused). Most buyers choose Classic or Smile.
2. **Prepare documents** — passport, birth certificate, police clearance from your home country, medical certificate, bank statements showing deposit capacity.
3. **Open a PRA-accredited bank account** — BDO, BPI, Metrobank, or similar. Deposit your required amount.
4. **Submit application** — to the Philippine Retirement Authority in Manila or through an accredited agent. We can connect you with one.
5. **Receive your ID** — PRA issues your SRRV ID, which is your proof of permanent residence status.

**Timeline:** Approximately 1–3 months from complete document submission.

**Cost:** Application fee around $1,400 USD. Annual fee after that is $360 USD (Classic) — or free if your property purchase replaces the deposit requirement.

We can guide you through the full process. Ask Yuna to get started.`,
        aKo: `**단계별 신청 과정:**

1. **SRRV 등급 선택** — Classic, Smile, 또는 Human Touch (의료 중심). 대부분의 구매자는 Classic 또는 Smile을 선택합니다.
2. **서류 준비** — 여권, 출생증명서, 본국 경찰 클리어런스, 건강진단서, 예치금 능력을 보여주는 은행 잔고 증명서.
3. **PRA 인가 은행 계좌 개설** — BDO, BPI, Metrobank 등. 필요 금액 예치.
4. **신청서 제출** — 마닐라 필리핀 퇴직청 또는 공인 에이전트를 통해 제출.
5. **ID 수령** — PRA가 영구 거주 상태를 증명하는 SRRV ID를 발급합니다.

**소요 기간:** 서류 제출 완료 후 약 1–3개월.

저희가 전체 과정을 안내해 드릴 수 있습니다. 유나에게 문의하여 시작하세요.`,
      },
    ],
  },
  {
    id: "buying",
    icon: "📋",
    title: "The Buying Process",
    titleKo: "구매 절차",
    color: "bg-[#1a4a35]",
    items: [
      {
        q: "Step by step — how does buying a condo in Bohol actually work?",
        qKo: "보홀에서 콘도를 구매하는 실제 절차는 어떻게 되나요?",
        a: `**1. Find your unit (Day 1)**
Browse listings, ask questions, visit in person or via video walkthrough. We can arrange everything remotely if you're not yet in the Philippines.

**2. Reservation (Day 1–7)**
Pay a reservation fee (typically ₱20,000–₱50,000) to hold the unit. This is deducted from your purchase price. The unit is removed from sale.

**3. Review and sign contracts (Week 1–3)**
Contract to Sell is issued by the developer. We strongly recommend having a Philippine attorney review before signing. We can refer one.

**4. Payment (flexible)**
- Spot cash: pay in full, often receive a discount (5–10%)
- In-house financing: direct with developer, no bank needed
- Bank financing: PNB, BDO, Metrobank offer mortgages to foreigners with SRRV

**5. Construction / handover (varies)**
For pre-selling units: 1–3 years to completion. For RFO (Ready for Occupancy): immediate.

**6. Transfer of title (4–8 weeks after full payment)**
Developer processes the CCT in your name. Fees apply (see below).

**7. Registration**
CCT is registered with the Registry of Deeds. You receive the original title. Done — you own it.

**Fees to expect:**
- Transfer Tax: 0.5% of purchase price
- Documentary Stamp Tax: 1.5% of purchase price
- Registration fee: ~0.25%
- Notarial fee: ~0.1%
- Total closing costs: approximately 2.5–3% of purchase price`,
        aKo: `**1. 유닛 선택 (1일차)**
매물을 살펴보고, 질문하고, 직접 방문하거나 영상 워크스루를 통해 확인하세요. 필리핀에 아직 오지 않으셨어도 원격으로 모든 것을 준비해 드릴 수 있습니다.

**2. 예약 (1–7일)**
유닛을 확보하기 위해 예약금(보통 ₱20,000–₱50,000)을 납부합니다. 이 금액은 구매 금액에서 차감됩니다.

**3. 계약서 검토 및 서명 (1–3주)**
개발사가 매매 계약서를 발행합니다. 서명 전 필리핀 변호사 검토를 강력히 권장합니다.

**4. 납부 (유연)**
- 현금 일시불: 종종 5–10% 할인 제공
- 개발사 자체 금융: 은행 불필요
- 은행 금융: PNB, BDO, Metrobank 등이 SRRV 소지 외국인에게 모기지 제공

**5. 공사/인도 (기간 다양)**
분양 유닛: 완공까지 1–3년. RFO(입주 가능 상태): 즉시.

**6. 소유권 이전 (완납 후 4–8주)**
개발사가 귀하의 이름으로 CCT를 처리합니다.

**예상 비용:**
- 이전세: 구매가의 0.5%
- 인지세: 구매가의 1.5%
- 등록비: 약 0.25%
- 공증료: 약 0.1%
- 총 클로징 비용: 구매가의 약 2.5–3%`,
      },
    ],
  },
  {
    id: "living",
    icon: "🌴",
    title: "Living in Bohol",
    titleKo: "보홀에서의 생활",
    color: "bg-[#3D7A5A]",
    items: [
      {
        q: "What is the healthcare situation in Bohol?",
        qKo: "보홀의 의료 환경은 어떤가요?",
        a: `Healthcare in Bohol has improved dramatically and is no longer a valid objection to moving here.

**Cortes General Hospital**
A newly completed billion-peso government hospital in Cortes, Bohol — one of the most modern public hospitals outside Metro Manila. Full surgical suites, ICU, specialist departments. This was a game-changer for the province.

**ACE Medical Center Tagbilaran**
A full-service private hospital in Tagbilaran City. Specialists across cardiology, orthopaedics, OB-GYN, internal medicine. Modern equipment, English-speaking staff. The go-to for expats needing private care.

**Ramiro Community Hospital**
Long-established private hospital in Tagbilaran, well-regarded for general medicine and surgery.

**Dental**
Multiple modern dental clinics across Tagbilaran and Panglao. Costs are a fraction of Western rates — expect $20–$60 USD for most procedures.

**Medical Tourism note:** Manila and Cebu are both reachable in under 2 hours for specialist procedures not available locally. Cebu City has multiple world-class hospitals including Chong Hua Medical Center, one of the best in the Visayas.`,
        aKo: `보홀의 의료 환경은 크게 개선되었으며, 더 이상 이주의 장벽이 아닙니다.

**코르테스 종합병원**
코르테스에 완공된 수십억 페소 규모의 정부 병원 — 마닐라 외 지역에서 가장 현대적인 공립 병원 중 하나. 완전한 수술실, ICU, 전문의 진료과 보유.

**ACE 메디컬 센터 타그빌라란**
타그빌라란 시의 풀서비스 사립 병원. 심장내과, 정형외과, 산부인과, 내과 전문의 상주. 영어 구사 직원.

**라미로 커뮤니티 병원**
타그빌라란의 오래된 사립 병원, 일반 의학 및 외과로 유명.

**의료 관광:** 마닐라와 세부 모두 2시간 이내로 도달 가능. 세부시에는 비사야스 최고 수준의 청화 메디컬 센터 등 세계적 수준의 병원이 있습니다.`,
      },
      {
        q: "What does it actually cost to live in Bohol?",
        qKo: "보홀에서 실제 생활비는 얼마나 드나요?",
        a: `Bohol offers one of the best cost-to-lifestyle ratios in Southeast Asia for foreign retirees and remote workers.

**Monthly living costs (comfortable expat lifestyle):**
- Rent (if not owned): ₱15,000–₱35,000/mo for a nice 1–2BR with ocean view
- Groceries (mix of local and imported): ₱8,000–₱15,000
- Eating out: ₱3,000–₱8,000 (local restaurants ₱100–₱300/meal; Western dining ₱400–₱800)
- Utilities (electric, water, internet): ₱4,000–₱8,000
- Transportation: ₱2,000–₱5,000 (grab + occasional car hire)
- Entertainment, miscellaneous: ₱5,000–₱10,000

**Comfortable total: ₱40,000–₱80,000/month (~$700–$1,400 USD)**

For context: a Canadian or Australian pension alone typically covers this. A US Social Security payment covers it comfortably. A UK state pension covers the basics with room to spare.

**Internet:** Converge Fiber and Globe available. 100–300Mbps plans available in most developed areas. Speeds are solid for remote work.

**Getting around:** No traffic jams. Tagbilaran to Panglao is 20 minutes. Everything is close.`,
        aKo: `보홀은 동남아시아에서 외국인 은퇴자와 원격 근무자에게 최고의 비용 대비 생활 비율을 제공합니다.

**월 생활비 (편안한 외국인 생활 기준):**
- 임대 (미소유 시): 오션뷰 1–2BR 기준 월 ₱15,000–₱35,000
- 식료품: ₱8,000–₱15,000
- 외식: ₱3,000–₱8,000
- 공과금 (전기, 수도, 인터넷): ₱4,000–₱8,000
- 교통: ₱2,000–₱5,000
- 기타: ₱5,000–₱10,000

**편안한 생활 총계: 월 ₱40,000–₱80,000 (약 $700–$1,400 USD)**

캐나다나 호주 연금만으로도 충분히 생활할 수 있는 수준입니다.`,
      },
    ],
  },
  {
    id: "faq",
    icon: "❓",
    title: "Frequently Asked Questions",
    titleKo: "자주 묻는 질문",
    color: "bg-[#4A6741]",
    items: [
      {
        q: "Can I rent out my condo when I'm not using it?",
        qKo: "사용하지 않을 때 콘도를 임대할 수 있나요?",
        a: `Yes. There are no restrictions on renting out your CCT-titled condo. Short-term rental platforms like Airbnb operate freely in Bohol. Yields vary — Panglao beachfront units typically achieve 5–8% gross annually depending on occupancy. Some buildings have on-site management programs that handle it entirely — you receive a quarterly cheque and do nothing.`,
        aKo: `네. CCT 소유 콘도 임대에는 제한이 없습니다. Airbnb 등 단기 임대 플랫폼이 보홀에서 자유롭게 운영됩니다. 팡라오 해변 유닛은 보통 연간 5–8%의 총 수익률을 달성합니다.`,
      },
      {
        q: "Can my Filipino spouse own land in my name?",
        qKo: "필리핀인 배우자가 제 이름으로 토지를 소유할 수 있나요?",
        a: `If you are married to a Filipino citizen, your spouse can own land — and as a married couple, that land is considered conjugal property (both of yours) under Philippine law, unless you have a prenuptial agreement specifying otherwise. However, foreign nationals cannot directly co-own land even in a marriage. The land title would be in your Filipino spouse's name, with conjugal property rights protecting your interest. For condos, you can hold the CCT directly in your own name regardless of your spouse's nationality.`,
        aKo: `필리핀 시민권자와 결혼한 경우, 배우자는 토지를 소유할 수 있으며 필리핀 법에 따라 혼전 계약이 없는 한 그 토지는 부부 공동 재산으로 간주됩니다. 콘도의 경우 배우자의 국적에 관계없이 본인 이름으로 CCT를 직접 보유할 수 있습니다.`,
      },
      {
        q: "Can I get a mortgage as a foreigner?",
        qKo: "외국인으로서 모기지를 받을 수 있나요?",
        a: `Yes, with conditions. Philippine banks including PNB (Philippine National Bank), BDO, and Metrobank offer housing loans to foreign nationals who hold an SRRV or long-term visa. Typical terms: up to 15 years, 6–9% interest rate, requires proof of income or pension. Loan-to-value ratios are typically 70–80%. In practice, many foreign buyers pay spot cash for the discount and simplicity.`,
        aKo: `네, 조건부로 가능합니다. PNB, BDO, Metrobank 등 필리핀 은행들은 SRRV 또는 장기 비자를 소지한 외국인에게 주택 대출을 제공합니다. 일반적인 조건: 최대 15년, 금리 6–9%, 소득 또는 연금 증명 필요. 실제로 많은 외국인 구매자들은 할인과 편의를 위해 현금으로 구매합니다.`,
      },
      {
        q: "What happens to my property if I pass away?",
        qKo: "사망 시 부동산은 어떻게 되나요?",
        a: `Your CCT condo is part of your Philippine estate and passes to your heirs — foreign heirs included, no Filipino citizenship required.

**With a will:**
Your property goes to whoever you name. Simple, fast, clean. A Philippine will costs a few thousand pesos to have drafted by a local attorney and saves your family enormous headaches.

**Without a will:**
Philippine intestate succession law applies. Heirs inherit in this order:
1. Legitimate children (equal shares)
2. If no children — spouse
3. If no spouse or children — parents
4. Then siblings, then more distant relatives

**Estate tax:** 6% on the net estate value above ₱250,000. Must be settled before the title transfers to heirs.

**The practical problem with no will:** If heirs are overseas and don't all agree, it can take months or years to resolve in court. An extrajudicial settlement is faster but requires all heirs to sign.

**Bottom line:** Get a Philippine will drafted. It's cheap, simple, and protects your family. Any competent local attorney handles this routinely.`,
        aKo: `CCT 콘도는 필리핀 유산의 일부로 상속인에게 이전됩니다 — 외국인 상속인도 포함되며, 필리핀 시민권이 필요하지 않습니다.

**유언장이 있는 경우:**
지정한 사람에게 재산이 돌아갑니다. 간단하고 빠르고 명확합니다. 필리핀 유언장은 현지 변호사를 통해 소액으로 작성할 수 있으며, 가족의 큰 번거로움을 방지합니다.

**유언장이 없는 경우:**
필리핀 무유언 상속법이 적용됩니다. 상속 순서:
1. 적출 자녀 (균등 배분)
2. 자녀 없을 시 — 배우자
3. 배우자 및 자녀 없을 시 — 부모
4. 형제자매, 그 이후 먼 친척 순

**상속세:** 순 유산 가치 ₱250,000 초과분의 6%. 소유권 이전 전에 납부해야 합니다.

**결론:** 필리핀 유언장을 작성하세요. 비용이 저렴하고 간단하며 가족을 보호합니다.`,
      },
    ],
  },
];

export default function GuidePage() {
  const locale = useUIStore((s) => s.locale);
  const openYuna = useUIStore((s) => s.openYuna);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return sections;
    const q = search.toLowerCase();
    return sections
      .map((s) => ({
        ...s,
        items: s.items.filter(
          (item) =>
            (locale === "ko" ? item.qKo : item.q).toLowerCase().includes(q) ||
            (locale === "ko" ? item.aKo : item.a).toLowerCase().includes(q)
        ),
      }))
      .filter((s) => s.items.length > 0);
  }, [search, locale]);

  return (
    <main className="min-h-screen bg-[#F5F0E8]">
      {/* Header */}
      <div className="bg-brand-emerald px-6 py-20 text-center sm:px-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
          {locale === "ko" ? "외국인 구매자 안내" : "Foreign Buyer Guide"}
        </p>
        <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
          {locale === "ko" ? "보홀 부동산 완벽 안내서" : "Everything You Need to Know"}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
          {locale === "ko"
            ? "소유권부터 비자, 구매 절차, 생활까지 — 외국인 구매자를 위한 완전한 안내서."
            : "Ownership, visas, the buying process, and life in Bohol — everything a foreign buyer needs, in one place."}
        </p>

        {/* Search */}
        <div className="mx-auto mt-8 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-emerald/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={locale === "ko" ? "질문을 검색하세요..." : "Search any question..."}
              className="w-full rounded-full bg-white py-4 pl-12 pr-6 text-brand-emerald shadow-lg placeholder:text-brand-emerald/40 focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
          </div>
        </div>

        {/* Section Pills */}
        {!search && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/20 hover:text-white"
              >
                {s.icon} {locale === "ko" ? s.titleKo : s.title}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-brand-emerald/60 text-lg">
              {locale === "ko" ? "검색 결과가 없습니다. 유나에게 직접 물어보세요." : "No results found. Try asking Yuna directly."}
            </p>
            <button
              onClick={openYuna}
              className="mt-4 inline-flex items-center gap-2 text-base font-semibold text-[#C9A84C] hover:underline"
            >
              ✦ {locale === "ko" ? "유나에게 물어보기 →" : "Ask Yuna →"}
            </button>
          </div>
        )}

        {filtered.map((section) => (
          <div key={section.id} id={section.id} className="mb-16 scroll-mt-8">
            {/* Big Section Header */}
            <div className={`${section.color} rounded-2xl px-8 py-6 mb-8`}>
              <div className="flex items-center gap-4">
                <span className="text-4xl">{section.icon}</span>
                <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                  {locale === "ko" ? section.titleKo : section.title}
                </h2>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-6">
              {section.items.map((item, i) => (
                <div key={i} className="rounded-2xl bg-white p-8 shadow-sm">
                  <h3 className="font-heading text-xl font-bold text-brand-emerald sm:text-2xl mb-4">
                    {locale === "ko" ? item.qKo : item.q}
                  </h3>
                  <div className="prose prose-emerald max-w-none text-brand-emerald/80 leading-relaxed whitespace-pre-line text-base">
                    {(locale === "ko" ? item.aKo : item.a).split("\n").map((line, j) => {
                      if (line.startsWith("**") && line.endsWith("**")) {
                        return <p key={j} className="font-bold text-brand-emerald mt-4 mb-1">{line.replace(/\*\*/g, "")}</p>;
                      }
                      if (line.startsWith("- ")) {
                        return <p key={j} className="pl-4 before:content-['•'] before:mr-2 before:text-brand-gold">{line.slice(2)}</p>;
                      }
                      if (line.trim() === "") return <div key={j} className="h-2" />;
                      return <p key={j}>{line}</p>;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom CTA */}
        <div className="mt-8 rounded-2xl bg-brand-emerald p-10 text-center">
          <p className="font-heading text-2xl font-bold text-white sm:text-3xl">
            {locale === "ko" ? "더 궁금한 게 있으신가요?" : "Still have questions?"}
          </p>
          <p className="mt-3 text-white/70">
            {locale === "ko"
              ? "유나가 24시간 답변해 드립니다. 한국어와 영어 모두 가능합니다."
              : "Yuna answers 24/7 — in English or Korean. No sales pressure, just answers."}
          </p>
          <button
            onClick={openYuna}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-brand-emerald shadow-lg transition hover:bg-[#d3ad64]"
          >
            ✦ {locale === "ko" ? "유나에게 물어보기" : "Ask Yuna Anything"}
          </button>
        </div>
      </div>
    </main>
  );
}
