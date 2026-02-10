import type { Property, HomepageProperty } from "@/types/property";

/**
 * Mock property data for development and testing.
 * Replace with Sanity data in production.
 */

export const mockProperties: Property[] = [
  {
    title: "Panglao Cliffside Estate",
    slug: "panglao-cliffside-estate",
    locationLabel: "Panglao, Bohol",
    pricePhp: 45000000,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    lotArea: 800,
    floorArea: 350,
    category: "Residential",
    titleStatus: "Clean TCT",
    ownership: "Freehold",
    hoaFees: 8500,
    yearBuilt: 2022,
    furnishing: "Fully Furnished",
    mainImage: "/assets/listings/panglao-hero.png",
    gallery: [
      "/assets/listings/panglao-hero.png",
      "/assets/listings/villa-interior.png",
      "/assets/listings/beachfront-sunset.png",
    ],
    videoFile: undefined,
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Perched on the limestone cliffs of Panglao's most exclusive coastline, this estate commands uninterrupted views of the Bohol Sea. The architecture is a masterclass in tropical modernism — floor-to-ceiling glass, cantilevered terraces, and an infinity pool that dissolves into the horizon.",
          },
        ],
        style: "normal",
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "The property includes a secure gated entrance, dedicated staff quarters, a temperature-controlled wine cellar, and a rooftop observation deck. Starlink internet ensures connectivity even in paradise.",
          },
        ],
        style: "normal",
      },
    ],
    features: [
      "Infinity Pool",
      "Ocean View",
      "Private Beach Access",
      "Rooftop Deck",
      "Wine Cellar",
      "Staff Quarters",
      "Gated Entrance",
      "Landscaped Gardens",
    ],
    specs: {
      generator: true,
      waterSource: "Municipal + Deep Well Backup",
      internetType: "Starlink + PLDT Fiber",
      roadAccess: "Paved Private Road",
    },
    distances: {
      airportMins: 15,
      beachMins: 2,
      hospitalMins: 20,
    },
    investment: {
      dailyRateUsd: 250,
      yieldPercent: 7.2,
    },
  },
  {
    title: "Dauis Lagoon Residence",
    slug: "dauis-lagoon-residence",
    locationLabel: "Dauis, Bohol",
    pricePhp: 28000000,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    lotArea: 500,
    floorArea: 220,
    category: "Residential",
    titleStatus: "Clean TCT",
    ownership: "Freehold",
    hoaFees: 5000,
    yearBuilt: 2023,
    furnishing: "Semi-Furnished",
    mainImage: "/assets/listings/beachfront-sunset.png",
    gallery: [
      "/assets/listings/beachfront-sunset.png",
      "/assets/listings/villa-interior.png",
    ],
    videoFile: undefined,
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "A serene retreat nestled along Dauis' protected lagoon shoreline. This contemporary residence blends indoor-outdoor living with covered lanais, a saltwater pool, and direct water access for kayaking.",
          },
        ],
        style: "normal",
      },
    ],
    features: [
      "Saltwater Pool",
      "Lagoon Frontage",
      "Covered Lanai",
      "Modern Kitchen",
      "Security System",
      "Tropical Garden",
    ],
    specs: {
      generator: false,
      waterSource: "Municipal Water",
      internetType: "PLDT Fiber",
      roadAccess: "Paved Barangay Road",
    },
    distances: {
      airportMins: 10,
      beachMins: 5,
      hospitalMins: 15,
    },
    investment: {
      dailyRateUsd: 150,
      yieldPercent: 6.5,
    },
  },
  {
    title: "Tagbilaran Executive Penthouse",
    slug: "tagbilaran-executive-penthouse",
    locationLabel: "Tagbilaran City, Bohol",
    pricePhp: 18500000,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    lotArea: 0,
    floorArea: 165,
    category: "Condo",
    titleStatus: "CCT",
    ownership: "Freehold",
    hoaFees: 12000,
    yearBuilt: 2024,
    furnishing: "Fully Furnished",
    mainImage: "/assets/listings/villa-interior.png",
    gallery: ["/assets/listings/villa-interior.png"],
    videoFile: undefined,
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "The crown jewel of Tagbilaran's newest mixed-use development. This penthouse unit offers city and sea views, premium finishes, and direct foreign ownership eligibility under CCT.",
          },
        ],
        style: "normal",
      },
    ],
    features: [
      "City & Sea Views",
      "Concierge Service",
      "Gym Access",
      "Rooftop Lounge",
      "Smart Home System",
      "Secure Parking",
    ],
    specs: {
      generator: true,
      waterSource: "Building Supply + Tank Reserve",
      internetType: "Converge Fiber",
      roadAccess: "City Main Road",
    },
    distances: {
      airportMins: 25,
      beachMins: 15,
      hospitalMins: 5,
    },
    investment: {
      dailyRateUsd: 95,
      yieldPercent: 5.8,
    },
  },
];

export const mockHomepageProperties: HomepageProperty[] = mockProperties.map((p) => ({
  title: p.title,
  slug: p.slug,
  locationLabel: p.locationLabel,
  pricePhp: p.pricePhp,
  bedrooms: p.bedrooms,
  bathrooms: p.bathrooms,
  parking: p.parking,
  floorArea: p.floorArea,
  mainImage: p.mainImage,
}));

export function getMockPropertyBySlug(slug: string): Property | null {
  return mockProperties.find((p) => p.slug === slug) ?? null;
}
