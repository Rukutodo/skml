import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/**
 * Generate an optimized image URL from a Sanity image asset.
 * Usage: urlFor(sanityImageField).width(800).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
