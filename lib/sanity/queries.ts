import { groq } from "next-sanity";

export const HOMEPAGE_PROPERTIES_QUERY = groq`
  *[
    _type == "property" &&
    defined(slug.current)
  ] | order(_updatedAt desc)[0...3]{
    title,
    "slug": slug.current,
    locationLabel,
    pricePhp,
    bedrooms,
    bathrooms,
    parking,
    floorArea,
    "mainImage": mainImage.asset->url
  }
`;

export const PROPERTY_BY_SLUG_QUERY = groq`
  *[_type == "property" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    locationLabel,
    pricePhp,
    bedrooms,
    bathrooms,
    parking,
    lotArea,
    floorArea,
    category,
    titleStatus,
    ownership,
    hoaFees,
    yearBuilt,
    furnishing,
    content,
    features,
    "mainImage": mainImage.asset->url,
    "gallery": gallery[].asset->url,
    "videoFile": videoFile.asset->url,
    specs{
      generator,
      waterSource,
      internetType,
      roadAccess
    },
    distances{
      airportMins,
      beachMins,
      hospitalMins
    },
    investment{
      dailyRateUsd,
      yieldPercent
    }
  }
`;
