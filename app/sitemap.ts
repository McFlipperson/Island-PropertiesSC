import { MetadataRoute } from "next";

const BASE_URL = "https://islandpropertiesph.com";

const slugs = [
  "palm-oasis-residences",
  "royal-oceancrest-panglao-2",
  "atharra-suites-panglao",
  "panglao-vista-suites",
  "costa-mira-beachtown-panglao",
  "riviera-residences-tagbilaran",
  "panglao-cliffside-estate",
  "dauis-lagoon-residence",
  "tagbilaran-executive-penthouse",
  "anda-beach-timeshare-suite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/listings`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/getting-here`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const listingPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/listings/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...listingPages];
}
