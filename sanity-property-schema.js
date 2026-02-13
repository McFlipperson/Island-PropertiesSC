// schemas/property.js - Sanity Schema for Island Properties

export default {
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Property Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "Beachfront Villa, Panglao"',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price (PHP)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
      description: 'Total property price in Philippine Pesos',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      options: {
        list: [
          { title: 'Panglao', value: 'Panglao' },
          { title: 'Mactan', value: 'Mactan' },
          { title: 'Bohol', value: 'Bohol' },
          { title: 'Cebu', value: 'Cebu' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'squareMeters',
      title: 'Size (sq. meters)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    },
    {
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., ["100% foreign ownership", "beach access", "resort access"]',
    },
    {
      name: 'annualYield',
      title: 'Annual Yield (%)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
      description: 'Expected annual rental yield percentage',
    },
    {
      name: 'roi',
      title: 'Annual ROI (PHP)',
      type: 'number',
      validation: (Rule) => Rule.positive(),
      description: 'Expected annual rental income in PHP',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'url',
              title: 'Image URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed property description',
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
          { title: 'Negotiating', value: 'negotiating' },
          { title: 'Coming Soon', value: 'coming-soon' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured Property',
      type: 'boolean',
      description: 'Show on homepage carousel',
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
  ],
}

