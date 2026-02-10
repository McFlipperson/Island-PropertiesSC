import { createClient } from "next-sanity";

export const apiVersion = "2024-06-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const token = process.env.SANITY_API_TOKEN;

export function getSanityClient() {
  if (!projectId) {
    throw new Error("Sanity project ID is missing.");
  }

  return createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn: false,
    perspective: "published",
  });
}

export function getSanityPreviewClient() {
  if (!projectId || !token) {
    return null;
  }

  return createClient({
    apiVersion,
    dataset,
    projectId,
    token,
    useCdn: false,
    perspective: "previewDrafts",
  });
}
