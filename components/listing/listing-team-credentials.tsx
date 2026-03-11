"use client";

import Image from "next/image";
import { useTranslations } from "@/lib/i18n/translations";
import { useUIStore } from "@/store/use-ui-store";

const TEAM_MEMBERS = [
  {
    id: "joeylene",
    name: "Dr. Joeylene Omega DMD",
    nameKo: "조엘린 오메가 박사 DMD",
    title: "Senior Property Consultant",
    titleKo: "선임 부동산 컨설턴트",
    credentials: "Senior Property Consultant",
    license: "PRC/DHSUD: [License #]",
    licenseKo: "PRC/DHSUD: [라이선스 #]",
    photo: "/team/dr-joeylene-omega.jpg",
  },
  {
    id: "team-2",
    name: "[Team Member 2]",
    nameKo: "[팀 멤버 2]",
    title: "[Title]",
    titleKo: "[직책]",
    credentials: "[Professional Credential]",
    license: "PRC/DHSUD: [License #]",
    licenseKo: "PRC/DHSUD: [라이선스 #]",
    photo: "/team/placeholder-2.jpg",
  },
  {
    id: "nova",
    name: "Nova Brunet",
    nameKo: "노바 브르네",
    title: "Operations Manager",
    titleKo: "운영 관리자",
    credentials: "Real Estate Operations",
    license: "nova@sikatproperties.com",
    licenseKo: "nova@sikatproperties.com",
    photo: "/team/nova-brunet.jpg",
  },
];

export function ListingTeamCredentials() {
  const locale = useUIStore((s) => s.locale);
  const t = useTranslations(locale);

  return (
    <article className="space-y-6 rounded-3xl border border-brand-emerald/10 bg-white/60 p-6 shadow-glass">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-brand-emerald/70">
          {locale === "ko" ? "인증된 팀" : "Licensed Team"}
        </p>
        <p className="mt-2 text-sm text-brand-emerald/75">
          {locale === "ko"
            ? "PRC/DHSUD 인증 부동산 전문가"
            : "PRC/DHSUD Certified Real Estate Professionals"}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center space-y-3 rounded-2xl border border-brand-emerald/10 bg-white/50 p-4"
          >
            {/* Photo */}
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-brand-emerald/20">
              {member.photo.includes("placeholder") ? (
                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                  <span className="text-2xl">📸</span>
                </div>
              ) : (
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Name */}
            <p className="text-center font-semibold text-brand-emerald">
              {locale === "ko" ? member.nameKo : member.name}
            </p>

            {/* Title */}
            <p className="text-center text-xs uppercase tracking-[0.12em] text-brand-emerald/70">
              {locale === "ko" ? member.titleKo : member.title}
            </p>

            {/* Credentials - Logo */}
            <Image
              src="/assets/logo-sikat-properties.png"
              alt="Sikat Properties"
              width={1280}
              height={518}
              className="h-8 w-auto"
            />

            {/* License */}
            <p className="text-center text-xs text-brand-gold font-semibold border-t border-brand-emerald/10 pt-2 w-full">
              {locale === "ko" ? member.licenseKo : member.license}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
