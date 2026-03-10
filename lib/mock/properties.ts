import type { Property, HomepageProperty } from "@/types/property";

/**
 * Property data — Island Properties
 * Western expat + SRRV focus. Replace with Sanity/API data in production.
 * KRW rate: approx 1 PHP = ₩23.4 (update periodically)
 */

const KRW_RATE = 23.4;

export const mockProperties: Property[] = [
  // ── FLAGSHIP LISTING — Palm Oasis Residences ─────────────────────────────
  {
    title: "Palm Oasis Residences",
    title_ko: "팜 오아시스 레지던스",
    slug: "palm-oasis-residences",
    address: "Brgy. Dao, Dauis, Panglao Island, Bohol 6339, Philippines",
    locationLabel: "Panglao Island, Bohol",
    locationLabel_ko: "보홀, 팡라오 섬",
    pricePhp: 2900000,
    priceKrw: Math.round(2900000 * KRW_RATE),
    tier: "Yield",
    status: "Active",
    srrv: true,
    hook: "Your permanent home on Panglao. Residential CCT. 9 minutes from the airport — own a piece of the island legally, outright.",
    hook_ko: "팡라오에 짓는 영구 거주지. 레지덴셜 CCT. 공항에서 9분 — 합법적, 단독 소유.",
    bedrooms: 0,
    bathrooms: 1,
    parking: 1,
    lotArea: 0,
    floorArea: 24,
    category: "Residential",
    titleStatus: "CCT",
    ownership: "Freehold",
    hoaFees: 0,
    yearBuilt: 2024,
    furnishing: "Unfurnished",
    mainImage: "/properties/palm-oasis/palm-oasis-main.jpg",
    videoFile: "/properties/palm-oasis/palm-oasis.mp4",
    gallery: [
      "/properties/palm-oasis/palm-oasis-main.jpg",
      "/properties/palm-oasis/pool-building.jpg",
      "/properties/palm-oasis/exterior-render.jpg",
      "/properties/palm-oasis/aerial-site-plan.jpg",
      "/properties/palm-oasis/interior-living.jpg",
      "/properties/palm-oasis/interior-render.jpg",
      "/properties/palm-oasis/unit-photo.jpg",
      "/properties/palm-oasis/amenity-01.jpg",
      "/properties/palm-oasis/amenity-02.jpg",
      "/properties/palm-oasis/gym.jpg",
    ],
    content: [
      {
        _type: "block",
        children: [{ _type: "span", text: "Palm Oasis Residences is a residential condominium on Panglao Island, Bohol. Studio units include a private balcony as standard. The amenity deck features a swimming pool, fitness gym, basketball and tennis courts, chapel, clubhouse, lounge, and 24-hour gated security. Located in Brgy. Dao, Dauis — 9 minutes from Panglao International Airport and 4 minutes from white sand beach." }],
        style: "normal",
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "Palm Oasis is a four-building masterplan by Primeland Development Corporation, Bohol's largest vertical condominium developer with 3.6 hectares of Panglao land under development." }],
        style: "normal",
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "For foreign buyers: units are available under Condominium Certificate of Title (CCT) — no Filipino co-owner required. Palm Oasis is also SRRV-eligible; your required retirement deposit can convert directly toward your unit purchase." }],
        style: "normal",
      },
    ],
    features: [
      "Residential CCT — Not a Condotel", "Studio Units with Balcony", "Swimming Pool", "Fitness Gym",
      "Basketball & Tennis Court", "Chapel", "Clubhouse & Lounge", "Gated 24/7 Security", "Parking Available",
      "9 Min to Airport", "4 Min to White Sand Beach", "SRRV Eligible", "Foreign CCT Ownership",
      "Phase 1 of 4-Building Masterplan",
    ],
    content_ko: [
      { _type: "block", children: [{ _type: "span", text: "팜 오아시스 레지던스는 콘도텔이 아닙니다. 호텔 운영 계약도, 15년 락업도, 수익 배분 구조도 없습니다. 팡라오 섬에 위치한 진정한 주거용 콘도미니엄으로, 분양권증서(CCT)를 통한 단독 소유가 가능합니다. 외국인도 필리핀인 파트너 없이 단독으로 소유권을 취득할 수 있는, 가장 명확한 법적 소유 구조입니다." }], style: "normal" },
      { _type: "block", children: [{ _type: "span", text: "단지는 다우이스 바랑가이 다오에 위치하며, 팡라오 국제공항에서 9분, 백사장 해변에서 4분, 알로나 비치에서 10분 거리입니다. 모든 스튜디오 유닛에 전용 발코니가 기본 제공됩니다. 커뮤니티 시설로는 수영장, 피트니스 센터, 농구·테니스 코트, 채플, 라운지, 클럽하우스, 24시간 게이트 보안이 갖추어져 있습니다." }], style: "normal" },
      { _type: "block", children: [{ _type: "span", text: "팜 오아시스는 프라임랜드 개발 법인의 4개 동 마스터플랜입니다. 팡라오에 3.6헥타르의 부지를 보유한 보홀 최대 수직 콘도 개발사입니다. SRRV 적격: 예치금이 유닛 구매 금액으로 직접 전환됩니다." }], style: "normal" },
    ],
    features_ko: [
      "주거용 CCT — 콘도텔 아님", "발코니 포함 스튜디오 유닛", "수영장", "피트니스 센터",
      "농구 & 테니스 코트", "채플", "클럽하우스 & 라운지", "24시간 게이트 보안", "주차 가능",
      "공항 9분", "백사장 해변 4분", "SRRV 신청 가능", "외국인 CCT 소유권",
      "4개 동 마스터플랜 1단계",
    ],
    specs: { },
    specs_ko: { },
    distances: { airportMins: 9, beachMins: 4, hospitalMins: 19 },
    investment: { dailyRateUsd: 0, yieldPercent: 0 },
  },
  // ── END FLAGSHIP ──────────────────────────────────────────────────────────
  {
    title: "Royal Oceancrest Panglao 2",
    title_ko: "로열 오션크레스트 팡라오 2",
    slug: "royal-oceancrest-panglao-2",
    address: "Brgy. Dao, Dauis, Bohol 6339, Philippines",
    locationLabel: "Dauis, Panglao, Bohol",
    locationLabel_ko: "보홀, 팡라오, 다우이스",
    pricePhp: 3237000,
    priceKrw: Math.round(3237000 * KRW_RATE),
    tier: "Yield",
    status: "Archived",
    srrv: true,
    hook: "1BR & 2BR residential condo. 30sqm from ₱3.24M. Completing March 2026 — 9 minutes from Panglao Airport. SRRV-eligible.",
    hook_ko: "네오 아시안 미니멀리즘. 1BR 30sqm부터. 공항에서 9분 — 2026년 3월 완공. ₱3.24M부터 SRRV 신청 가능.",
    bedrooms: 1,
    bathrooms: 1,
    parking: 0,
    lotArea: 0,
    floorArea: 30,
    category: "Residential",
    titleStatus: "CCT",
    ownership: "Freehold",
    hoaFees: 0,
    yearBuilt: 2026,
    furnishing: "Unfurnished",
    mainImage: "/properties/royal-oceancrest/events-space.jpg",
    gallery: [
      "/properties/royal-oceancrest/events-space.jpg",
      "/properties/royal-oceancrest/koi-pond.jpg",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
    ],
    content: [
      {
        _type: "block",
        children: [{ _type: "span", text: "Royal Oceancrest Panglao 2 is developed by Primary Homes Inc. — a Cebu-based developer with an established track record across the Visayas. The project sits on 28,052 sqm of Panglao Island with a Neo-Asian Minimalist design. Units are 1BR and 2BR. Prices start at ₱3,237,000 (1BR B, 44sqm) and ₱3,450,000 (1BR A, 30sqm). As a residential condominium, CCT title is issued to each owner — no Filipino co-owner required. SRRV-eligible from entry price." }],
        style: "normal",
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "Located in Brgy. Dao, Dauis — approximately 9–10 minutes from Bohol-Panglao International Airport. The amenity deck includes an infinity pool, kiddie pool, fitness gym, amphitheater, jogging and bike trails, playground, meditation garden and koi pond, sunken garden, grill stations, and clubhouse. DHSUD licensed: LTS-R07-22-088. Scheduled completion: March 26, 2026 (35% complete as of early 2026)." }],
        style: "normal",
      },
    ],
    features: [
      "1BR & 2BR Units Available", "Neo-Asian Minimalist Design", "Infinity Pool", "Fitness Gym", "Walking Distance to Beach",
      "10 Min to Airport", "Amphitheater & Events Garden", "24/7 CCTV", "2 Elevators", "SRRV Eligible", "CCT Foreign Ownership", "DHSUD Licensed"
    ],
    content_ko: [
      { _type: "block", children: [{ _type: "span", text: "로열 오션크레스트 팡라오 2는 세부 기반의 검증된 디벨로퍼인 Primary Homes Inc.가 개발하는 팡라오 섬의 대표 미드라이즈 프로젝트입니다. 2.8헥타르 부지에 조성되는 이 단지는 네오 아시안 미니멀리즘 디자인으로, 동아시아 구매자들의 미적 감각과 보홀의 열대 자연환경이 조화롭게 어우러집니다. 클린한 라인, 자연 소재의 마감, 리조트급 편의시설이 SRRV 거주 비자 신청 기준(₱2.9M)을 충족하는 합리적인 가격대에서 제공됩니다." }], style: "normal" },
      { _type: "block", children: [{ _type: "span", text: "백사장 해변까지 도보 거리이며, 보홀-팡라오 국제공항에서 10분, 모아토 스트립 쇼핑몰도 10분 거리입니다. 인피니티 풀, 피트니스 센터, 야외 원형극장, 조깅 트레일, 명상 정원 등 풍부한 커뮤니티 시설을 갖추고 있습니다. DHSUD 인허가 완료(LTS-R07-22-088), 2026년 3월 준공 예정 — 입주 전 가격으로 지금 선점하실 수 있습니다." }], style: "normal" },
    ],
    features_ko: [
      "1BR · 2BR 유닛", "네오 아시안 미니멀 디자인", "인피니티 풀", "피트니스 센터", "해변 도보 거리",
      "공항 10분", "야외 원형극장 & 이벤트 가든", "24시간 CCTV", "엘리베이터 2기", "SRRV 신청 가능", "CCT 외국인 소유", "DHSUD 인허가"
    ],
    specs: { generator: true, roadAccess: "Paved Subdivision Road" },
    specs_ko: { },
    distances: { airportMins: 10, beachMins: null, hospitalMins: null },
    investment: { dailyRateUsd: 0, yieldPercent: 0 },
  },
  {
    title: "Panglao Vista Suites",
    title_ko: "팡라오 비스타 스위츠",
    slug: "panglao-vista-suites",
    address: "Panglao Island Circumferential Road, Brgy. Dao, Dauis, Bohol 6339, Philippines",
    locationLabel: "Dauis, Panglao, Bohol",
    locationLabel_ko: "보홀, 팡라오, 다우이스",
    pricePhp: 3630000,
    priceKrw: Math.round(3630000 * KRW_RATE),
    tier: "Yield",
    status: "Active",
    srrv: false,
    hook: "Ready for occupancy. SMS Hospitality managed condotel. Buy a unit, the hotel runs it — quarterly income, 10 free nights/year.",
    hook_ko: "즉시 입주 가능 (RFO). SMS 호스피탈리티 운영. 입주 즉시 수익 시작 또는 즉시 거주.",
    bedrooms: 0,
    bathrooms: 1,
    parking: 1,
    lotArea: 0,
    floorArea: 0,
    category: "Condotel",
    titleStatus: "CCT",
    ownership: "Freehold",
    hoaFees: 0,
    yearBuilt: 2024,
    furnishing: "Fully Furnished",
    mainImage: "/properties/vista-suites/vista-suites-main.jpg",
    gallery: [
      "/properties/vista-suites/vista-suites-main.jpg",
      "/properties/vista-suites/pool-hero.jpg",
      "/properties/vista-suites/exterior.jpg",
      "/properties/vista-suites/entrance.jpg",
      "/properties/vista-suites/room-interior.jpg",
      "/properties/vista-suites/bedroom.jpg",
      "/properties/vista-suites/restaurant.jpg",
      "/properties/vista-suites/pool-cover.jpg",
      "/properties/vista-suites/hotel-view.jpg",
      "/properties/vista-suites/pool-aerial.jpg",
      "/properties/vista-suites/room-detail.jpg",
      "/properties/vista-suites/bedroom-2.jpg",
      "/properties/vista-suites/lobby.jpg",
    ],
    content: [
      {
        _type: "block",
        children: [{ _type: "span", text: "Panglao Vista Suites is a Ready-for-Occupancy condotel on Panglao Island, operated by SMS Hospitality. As a condotel, units are under hotel management — owners receive a share of rental income and 10 complimentary nights per year. This is an investment vehicle, not a permanent residence." }],
        style: "normal",
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "Located along Panglao Island Circumferential Road in Dao, Dauis. The property features an outdoor pool, on-site amenities, and concierge services already operational. Pag-IBIG and bank financing available. Contact us to confirm unit sizes, current availability, and income distribution terms." }],
        style: "normal",
      },
    ],
    features: [
      "Ready for Occupancy (RFO)", "SMS Hospitality Managed", "Investment — Not for Full-Time Residence", "Outdoor Pool", "On-Site Amenities",
      "Concierge Service", "10 Free Nights/Year (Owner Benefit)", "Pag-IBIG / Bank Financing", "CCT Foreign Title"
    ],
    content_ko: [
      { _type: "block", children: [{ _type: "span", text: "팡라오 비스타 스위츠는 현재 보홀 CCT 매물 중 유일하게 즉시 입주 가능(RFO)한 콘도텔입니다. SMS 호스피탈리티가 운영하며, 야외 수영장, 피트니스 센터, 스파, 레스토랑, 컨시어지 서비스가 이미 운영 중입니다. 분양가 ₱3,630,000은 SRRV 거주 비자 기준(₱2.9M)을 상회하므로, 이 단지의 모든 유닛이 50세 이상 외국인의 필리핀 거주 비자 취득을 위한 적격 투자 자산이 됩니다." }], style: "normal" },
      { _type: "block", children: [{ _type: "span", text: "다우이스의 한적한 코너, 산 이시드로 해변에서 1.5km 거리에 위치하여 관광 번화가의 혼잡함 없이 팡라오 라이프스타일을 누리실 수 있습니다. PAG-IBIG 및 은행 대출 이용 가능합니다. 기다릴 필요 없이, 지금 바로 입주하시거나 소유 첫째 주부터 임대 수익을 시작하실 수 있습니다." }], style: "normal" },
    ],
    features_ko: [
      "즉시 입주 가능 (RFO)", "SMS 호스피탈리티 운영", "₱3.63M SRRV 적격", "야외 풀 & 피트니스", "스파 & 레스토랑",
      "컨시어지 서비스", "산 이시드로 해변 1.5km", "PAG-IBIG / 은행 대출", "CCT 외국인 소유권", "즉시 수익 또는 거주"
    ],
    specs: { roadAccess: "Panglao Island Circumferential Road (National Highway)" },
    specs_ko: { },
    distances: { airportMins: null, beachMins: null, hospitalMins: null },
    investment: { dailyRateUsd: 0, yieldPercent: 0 },
  },
  {
    title: "Costa Mira Beachtown Panglao",
    title_ko: "코스타 미라 비치타운 팡라오",
    slug: "costa-mira-beachtown-panglao",
    address: "Brgy. Totolan, Dauis, Panglao Island, Bohol 6339, Philippines",
    locationLabel: "Brgy. Totolan, Dauis, Panglao",
    locationLabel_ko: "보홀, 팡라오, 다우이스 토톨란",
    pricePhp: 4054320,
    priceKrw: Math.round(4054320 * KRW_RATE),
    tier: "Trophy",
    status: "Archived",
    srrv: true,
    hook: "220m of beachfront. 3 towers, 1,056 units. Panglao's southwestern coast — Cebu Landmasters, Philippines' best developer.",
    hook_ko: "220m 비치프론트. 3개 타워 1,056세대. 팡라오 남서 해안 — 세부 랜드마스터스, 필리핀 최우수 디벨로퍼.",
    bedrooms: 0,
    bathrooms: 1,
    parking: 1,
    lotArea: 0,
    floorArea: 22,
    category: "Residential",
    titleStatus: "CCT",
    ownership: "Freehold",
    hoaFees: 0,
    yearBuilt: 2025,
    furnishing: "Semi-Furnished",
    mainImage: "/properties/costa-mira/hero.jpg",
    gallery: [
      "/properties/costa-mira/hero.jpg",
      "https://images.unsplash.com/photo-1540541338537-b499ac5f6f08?auto=format&fit=crop&w=1600&q=80",
    ],
    content: [
      {
        _type: "block",
        children: [{ _type: "span", text: "Costa Mira Beachtown is developed by Cebu Landmasters Inc. (PSE: CLI) — a publicly listed developer with projects across the Visayas and Mindanao. The development sits in Barangay Totolan, Dauis, on Panglao's southwestern coast with 220 metres of direct beach frontage. Phase 1 comprises 3 towers with 1,056 units. Studio units from 22sqm. Estimated completion: 2028." }],
        style: "normal",
      },
      {
        _type: "block",
        children: [{ _type: "span", text: "Entry price ₱4,054,320 — SRRV-eligible. Direct beachfront access on Panglao's southwestern coast. Tagbilaran City, malls, banks, and ACE Medical Center are accessible via the main road. Inquire through Island Properties to confirm current availability and unit options." }],
        style: "normal",
      },
    ],
    features: [
      "Direct Beachfront", "Integrated Resort Community", "Resort Pools", "Tropical Architecture", "8 Min to Tagbilaran City",
      "8 Min to Malls & Hospital", "Gated Community", "Lush Tropical Greenery", "SRRV Eligible", "CCT Foreign Ownership"
    ],
    content_ko: [
      { _type: "block", children: [{ _type: "span", text: "코스타 미라 비치타운은 팡라오 섬 남서쪽 해안, 다우이스 토톨란 바랑가이에 자리한 통합형 비치프론트 리조트 커뮤니티입니다. 현지 열대 건축 양식의 저층 단지가 자연 경관과 자연스럽게 어우러지며, 리조트 수영장과 울창한 녹지, 전용 해변 접근로가 조용한 게이티드 환경 안에 배치되어 있습니다. 이곳은 타워 콘도가 아닙니다 — 수변의 삶을 위해 설계된 비치프론트 타운입니다." }], style: "normal" },
      { _type: "block", children: [{ _type: "span", text: "분양가 ₱4,054,320 — SRRV 신청 적격. 팡라오 남서 해안의 직접 비치프론트 입지. 타그빌라란 시내, 쇼핑몰, 은행, ACE 메디컬 센터는 주요 도로를 통해 접근 가능합니다. 아일랜드 프로퍼티스를 통해 현재 매물 및 유닛 옵션을 문의하십시오." }], style: "normal" },
    ],
    features_ko: [
      "직접 비치프론트", "통합형 리조트 커뮤니티", "리조트 수영장", "열대 건축 디자인", "타그빌라란 8분",
      "쇼핑몰 & 병원 8분", "게이티드 커뮤니티", "울창한 열대 조경", "SRRV 신청 가능", "CCT 외국인 소유권"
    ],
    specs: { roadAccess: "Coastal Road, Brgy. Totolan" },
    specs_ko: { },
    distances: { airportMins: null, beachMins: 0, hospitalMins: null },
    investment: { dailyRateUsd: 0, yieldPercent: 0 },
  },
  // ── PLACEHOLDER LISTINGS ──────────────────────────────────────────────────
  // ── END NEW CCT LISTINGS ───────────────────────────────────────────────────
];

export const mockHomepageProperties: HomepageProperty[] = mockProperties.filter((p) => p.status === "Active").map((p) => ({
  title: p.title,
  title_ko: p.title_ko,
  slug: p.slug,
  locationLabel: p.locationLabel,
  locationLabel_ko: p.locationLabel_ko,
  pricePhp: p.pricePhp,
  priceKrw: p.priceKrw,
  tier: p.tier,
  status: p.status,
  srrv: p.srrv,
  hook: p.hook,
  hook_ko: p.hook_ko,
  bedrooms: p.bedrooms,
  bathrooms: p.bathrooms,
  parking: p.parking,
  floorArea: p.floorArea,
  mainImage: p.mainImage,
  yieldPercent: p.investment.yieldPercent,
  category: p.category,
}));

export function getMockPropertyBySlug(slug: string): Property | null {
  return mockProperties.find((p) => p.slug === slug) ?? null;
}

export function getMockAllProperties(): HomepageProperty[] {
  return mockHomepageProperties;
}
