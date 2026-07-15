import { createClient } from "next-sanity";

/**
 * Server-side Sanity client with write permissions.
 * Uses the SANITY_API_WRITE_TOKEN (not NEXT_PUBLIC_) so it's never exposed to the browser.
 */
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-04-21",
  useCdn: false, // Never use CDN for writes
  token: process.env.SANITY_API_WRITE_TOKEN,
});
