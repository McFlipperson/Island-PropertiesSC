// sanity.js - Sanity CMS Client Configuration
// Purpose: Connect Island Properties frontend to Sanity headless CMS

import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID, // Get from Nov's Sanity dashboard
  dataset: 'production',
  apiVersion: '2024-02-11',
  useCdn: true, // Use CDN for faster reads
  token: '', // Read-only token (frontend uses public endpoint, no token needed)
})

// Query: Get all featured properties
export const getFeaturedProperties = () => {
  return client.fetch(`
    *[_type == "property" && featured == true] | order(publishedAt desc) {
      _id,
      title,
      price,
      location,
      bedrooms,
      bathrooms,
      squareMeters,
      keyFeatures,
      annualYield,
      roi,
      images,
      description,
      availability,
      featured
    }
  `)
}

// Query: Get all properties
export const getAllProperties = () => {
  return client.fetch(`
    *[_type == "property"] | order(publishedAt desc) {
      _id,
      title,
      price,
      location,
      bedrooms,
      bathrooms,
      squareMeters,
      keyFeatures,
      annualYield,
      roi,
      images,
      description,
      availability,
      featured
    }
  `)
}

// Query: Get property by ID
export const getPropertyById = (id) => {
  return client.fetch(
    `*[_type == "property" && _id == $id][0]`,
    { id }
  )
}

