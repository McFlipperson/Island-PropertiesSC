export type PropertyCategory = "Residential" | "Commercial" | "Condo";
export type PropertyTier = "Trophy" | "Yield" | "Timeshare" | "Land";
export type PropertyStatus = "Active" | "Reserved" | "Sold" | "Coming Soon";
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
  title_ko?: string;
  slug: string;
  locationLabel: string;
  locationLabel_ko?: string;
  hook?: string;
  hook_ko?: string;
  pricePhp: number;
  priceKrw?: number;
  tier?: PropertyTier;
  status?: PropertyStatus;
  srrv?: boolean;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  floorArea: number;
  mainImage: string;
  yieldPercent?: number;
};

export type Property = {
  title: string;
  title_ko?: string;
  slug: string;
  locationLabel: string;
  locationLabel_ko?: string;
  hook?: string;
  hook_ko?: string;
  pricePhp: number;
  priceKrw?: number;
  tier?: PropertyTier;
  status?: PropertyStatus;
  srrv?: boolean;
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
  content_ko?: RichTextBlock[];
  features: string[];
  features_ko?: string[];
  specs: PropertySpecs;
  specs_ko?: PropertySpecs;
  distances: PropertyDistances;
  investment: PropertyInvestment;
};
