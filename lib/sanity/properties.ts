import { getSanityClient, getSanityPreviewClient, projectId } from "@/lib/sanity/client";
import { HOMEPAGE_PROPERTIES_QUERY, PROPERTY_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import type { HomepageProperty, Property } from "@/types/property";

type SanityPropertyRecord = {
  title?: string;
  slug?: string;
  locationLabel?: string;
  pricePhp?: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  lotArea?: number;
  floorArea?: number;
  category?: Property["category"];
  titleStatus?: Property["titleStatus"];
  ownership?: Property["ownership"];
  hoaFees?: number;
  yearBuilt?: number;
  furnishing?: Property["furnishing"];
  content?: Property["content"] | null;
  features?: Array<string | null> | null;
  mainImage?: string;
  gallery?: Array<string | null> | null;
  videoFile?: string;
  specs?: {
    generator?: boolean;
    waterSource?: string;
    internetType?: string;
    roadAccess?: string;
  };
  distances?: {
    airportMins?: number;
    beachMins?: number;
    hospitalMins?: number;
  };
  investment?: {
    dailyRateUsd?: number;
    yieldPercent?: number;
  };
};

type SanityHomepagePropertyRecord = {
  title?: string;
  slug?: string;
  locationLabel?: string;
  pricePhp?: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  floorArea?: number;
  mainImage?: string;
};

const DEFAULT_PROPERTY_IMAGE =
  "https://images.unsplash.com/photo-1613977257364-707ba9348227?auto=format&fit=crop&w=1600&q=80";

function mapSanityHomepageProperty(record: SanityHomepagePropertyRecord): HomepageProperty | null {
  if (!record.slug) {
    return null;
  }

  return {
    title: record.title || "Untitled Property",
    slug: record.slug,
    locationLabel: record.locationLabel || "Confidential Location",
    pricePhp: record.pricePhp ?? 0,
    bedrooms: record.bedrooms ?? 0,
    bathrooms: record.bathrooms ?? 0,
    parking: record.parking ?? 0,
    floorArea: record.floorArea ?? 0,
    mainImage: record.mainImage || DEFAULT_PROPERTY_IMAGE,
  };
}

function mapSanityPropertyToDomain(record: SanityPropertyRecord): Property | null {
  if (
    !record.title ||
    !record.slug ||
    !record.locationLabel ||
    record.pricePhp == null ||
    !record.category ||
    !record.titleStatus ||
    !record.ownership ||
    !record.furnishing
  ) {
    return null;
  }

  const gallery = (record.gallery ?? []).filter((url): url is string => Boolean(url));
  const features = (record.features ?? []).filter((item): item is string => Boolean(item));
  const mainImage = record.mainImage ?? gallery[0] ?? "";
  const content = record.content ?? [];

  if (!mainImage) {
    return null;
  }

  return {
    title: record.title,
    slug: record.slug,
    locationLabel: record.locationLabel,
    pricePhp: record.pricePhp,
    bedrooms: record.bedrooms ?? 0,
    bathrooms: record.bathrooms ?? 0,
    parking: record.parking ?? 0,
    lotArea: record.lotArea ?? 0,
    floorArea: record.floorArea ?? 0,
    category: record.category,
    titleStatus: record.titleStatus,
    ownership: record.ownership,
    hoaFees: record.hoaFees ?? 0,
    yearBuilt: record.yearBuilt ?? 0,
    furnishing: record.furnishing,
    mainImage,
    gallery: gallery.length > 0 ? gallery : [mainImage],
    videoFile: record.videoFile,
    content,
    features,
    specs: {
      generator: record.specs?.generator ?? false,
      waterSource: record.specs?.waterSource ?? "On request",
      internetType: record.specs?.internetType ?? "On request",
      roadAccess: record.specs?.roadAccess ?? "On request",
    },
    distances: {
      airportMins: record.distances?.airportMins ?? 0,
      beachMins: record.distances?.beachMins ?? 0,
      hospitalMins: record.distances?.hospitalMins ?? 0,
    },
    investment: {
      dailyRateUsd: record.investment?.dailyRateUsd ?? 0,
      yieldPercent: record.investment?.yieldPercent ?? 0,
    },
  };
}

export async function getHomepageProperties(): Promise<HomepageProperty[]> {
  if (!projectId) {
    // Fall back to mock data when Sanity is not configured
    const { mockHomepageProperties } = await import("@/lib/mock/properties");
    return mockHomepageProperties;
  }

  try {
    const previewClient = process.env.NODE_ENV === "development" ? getSanityPreviewClient() : null;

    const records = previewClient
      ? await previewClient.fetch<SanityHomepagePropertyRecord[]>(HOMEPAGE_PROPERTIES_QUERY)
      : await getSanityClient().fetch<SanityHomepagePropertyRecord[]>(HOMEPAGE_PROPERTIES_QUERY);

    const mapped = records
      .map(mapSanityHomepageProperty)
      .filter((property): property is HomepageProperty => Boolean(property));

    // Fall back to mock if Sanity returns empty
    if (mapped.length === 0) {
      const { mockHomepageProperties } = await import("@/lib/mock/properties");
      return mockHomepageProperties;
    }

    return mapped;
  } catch {
    try {
      const fallbackRecords = await getSanityClient().fetch<SanityHomepagePropertyRecord[]>(
        HOMEPAGE_PROPERTIES_QUERY,
      );
      return fallbackRecords
        .map(mapSanityHomepageProperty)
        .filter((property): property is HomepageProperty => Boolean(property));
    } catch {
      // Ultimate fallback to mock data
      const { mockHomepageProperties } = await import("@/lib/mock/properties");
      return mockHomepageProperties;
    }
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (!projectId) {
    // Fall back to mock data when Sanity is not configured
    const { getMockPropertyBySlug } = await import("@/lib/mock/properties");
    return getMockPropertyBySlug(slug);
  }

  try {
    const previewClient = process.env.NODE_ENV === "development" ? getSanityPreviewClient() : null;
    const record = previewClient
      ? await previewClient.fetch<SanityPropertyRecord | null>(PROPERTY_BY_SLUG_QUERY, { slug })
      : await getSanityClient().fetch<SanityPropertyRecord | null>(PROPERTY_BY_SLUG_QUERY, { slug });

    if (!record) {
      // Fall back to mock if Sanity doesn't have this slug
      const { getMockPropertyBySlug } = await import("@/lib/mock/properties");
      return getMockPropertyBySlug(slug);
    }

    return mapSanityPropertyToDomain(record);
  } catch {
    try {
      const fallbackRecord = await getSanityClient().fetch<SanityPropertyRecord | null>(
        PROPERTY_BY_SLUG_QUERY,
        { slug },
      );
      if (!fallbackRecord) {
        return null;
      }
      return mapSanityPropertyToDomain(fallbackRecord);
    } catch {
      // Ultimate fallback to mock data
      const { getMockPropertyBySlug } = await import("@/lib/mock/properties");
      return getMockPropertyBySlug(slug);
    }
  }
}

export async function getAllProperties(): Promise<HomepageProperty[]> {
  if (!projectId) {
    const { getMockAllProperties } = await import("@/lib/mock/properties");
    return getMockAllProperties();
  }
  // When Sanity is live, fetch all active listings
  return getHomepageProperties();
}
