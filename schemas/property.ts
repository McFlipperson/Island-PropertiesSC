import { defineField, defineType } from "sanity";

export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "locationLabel",
      title: "Location Label",
      type: "string",
      description: 'e.g. "Panglao"',
    }),
    defineField({
      name: "pricePhp",
      title: "Price (PHP)",
      type: "number",
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
    }),
    defineField({
      name: "parking",
      title: "Parking",
      type: "number",
    }),
    defineField({
      name: "lotArea",
      title: "Lot Size (sqm)",
      type: "number",
    }),
    defineField({
      name: "floorArea",
      title: "Floor Area (sqm)",
      type: "number",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Residential", value: "Residential" },
          { title: "Commercial", value: "Commercial" },
          { title: "Condo", value: "Condo" },
        ],
      },
    }),
    defineField({
      name: "titleStatus",
      title: "Title Status",
      type: "string",
      options: {
        list: [
          { title: "Clean TCT", value: "Clean TCT" },
          { title: "CCT", value: "CCT" },
          { title: "Tax Declaration", value: "Tax Declaration" },
          { title: "Mother Title", value: "Mother Title" },
        ],
      },
    }),
    defineField({
      name: "ownership",
      title: "Ownership",
      type: "string",
      options: {
        list: [
          { title: "Freehold", value: "Freehold" },
          { title: "Leasehold", value: "Leasehold" },
        ],
      },
    }),
    defineField({
      name: "hoaFees",
      title: "Monthly HOA (PHP)",
      type: "number",
    }),
    defineField({
      name: "yearBuilt",
      title: "Year Built",
      type: "number",
    }),
    defineField({
      name: "furnishing",
      title: "Furnishing",
      type: "string",
      options: {
        list: [
          { title: "Fully Furnished", value: "Fully Furnished" },
          { title: "Semi-Furnished", value: "Semi-Furnished" },
          { title: "Unfurnished", value: "Unfurnished" },
        ],
      },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "videoFile",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/mp4",
      },
    }),
    defineField({
      name: "specs",
      title: "Specs",
      type: "object",
      fields: [
        defineField({
          name: "generator",
          title: "Generator",
          type: "boolean",
        }),
        defineField({
          name: "waterSource",
          title: "Water Source",
          type: "string",
        }),
        defineField({
          name: "internetType",
          title: "Internet Type",
          type: "string",
        }),
        defineField({
          name: "roadAccess",
          title: "Road Access",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "distances",
      title: "Distances",
      type: "object",
      fields: [
        defineField({
          name: "airportMins",
          title: "Airport (mins)",
          type: "number",
        }),
        defineField({
          name: "beachMins",
          title: "Beach (mins)",
          type: "number",
        }),
        defineField({
          name: "hospitalMins",
          title: "Hospital (mins)",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "investment",
      title: "Investment",
      type: "object",
      fields: [
        defineField({
          name: "dailyRateUsd",
          title: "Daily Rate (USD)",
          type: "number",
        }),
        defineField({
          name: "yieldPercent",
          title: "Yield Percent",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "agent",
      title: "Agent",
      type: "reference",
      to: [{ type: "agent" }],
    }),
  ],
});

export default property;
