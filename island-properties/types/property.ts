export type PropertyCategory = "Residential" | "Commercial" | "Condo";
export type PropertyTitleStatus = "Clean TCT" | "CCT" | "Tax Declaration" | "Mother Title";
export type PropertyOwnership = "Freehold" | "Leasehold";
export type PropertyFurnishing = "Fully Furnished" | "Semi-Furnished" | "Unfurnished";
export type RichTextBlock = { _type: string; [key: string]: unknown };

export type PropertySpecs = {
  generator: boolean;
  waterSource: string;
  internetType: string;
  roadAccess: string;
};

export type PropertyDistances = {
  airportMins: number;
  beachMins: number;
  hospitalMins: number;
};

export type PropertyInvestment = {
  dailyRateUsd: number;
  yieldPercent: number;
};

export type HomepageProperty = {
  title: string;
  slug: string;
  locationLabel: string;
  pricePhp: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  floorArea: number;
  mainImage: string;
};

export type Property = {
  title: string;
  slug: string;
  locationLabel: string;
  pricePhp: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  lotArea: number;
  floorArea: number;
  category: PropertyCategory;
  titleStatus: PropertyTitleStatus;
  ownership: PropertyOwnership;
  hoaFees: number;
  yearBuilt: number;
  furnishing: PropertyFurnishing;
  mainImage: string;
  gallery: string[];
  videoFile?: string;
  content: RichTextBlock[];
  features: string[];
  specs: PropertySpecs;
  distances: PropertyDistances;
  investment: PropertyInvestment;
};
