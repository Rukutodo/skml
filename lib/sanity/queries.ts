import { client } from "./client";

// ── Types ──────────────────────────────────────────────

export interface AboutData {
  headline: string;
  headlineAccent: string;
  description: string[];
  ctaText: string;
  stats: { value: string; label: string }[];
}

export interface ProducerData {
  firstName: string;
  lastName: string;
  role: string;
  portrait: any; // Sanity image object
  bio: string[];
  quote: string;
}

export interface FilmData {
  _id: string;
  title: string;
  slug: { current: string };
  poster: any; // Sanity image object
  genre: string;
  year: string;
  category: "produced" | "distributed";
  ottPlatform?: string;
  releaseType?: string;
  order: number;
}

// ── Queries ────────────────────────────────────────────

export async function getAbout(): Promise<AboutData | null> {
  return client.fetch(
    `*[_type == "about"][0]{
      headline,
      headlineAccent,
      description,
      ctaText,
      stats[] { value, label }
    }`
  );
}

export async function getProducer(): Promise<ProducerData | null> {
  return client.fetch(
    `*[_type == "producer"][0]{
      firstName,
      lastName,
      role,
      portrait,
      bio,
      quote
    }`
  );
}

export async function getFilms(): Promise<FilmData[]> {
  return client.fetch(
    `*[_type == "film"] | order(order asc) {
      _id,
      title,
      slug,
      poster,
      genre,
      year,
      category,
      ottPlatform,
      releaseType,
      order
    }`
  );
}

export async function getFilmsByCategory(
  category: "produced" | "distributed"
): Promise<FilmData[]> {
  return client.fetch(
    `*[_type == "film" && category == $category] | order(order asc) {
      _id,
      title,
      slug,
      poster,
      genre,
      year,
      category,
      ottPlatform,
      releaseType,
      order
    }`,
    { category }
  );
}
export async function getFilmBySlug(slug: string): Promise<FilmData | null> {
  return client.fetch(
    `*[_type == "film" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      poster,
      genre,
      year,
      category,
      ottPlatform,
      releaseType,
      order
    }`,
    { slug }
  );
}
