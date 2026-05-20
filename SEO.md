# 🔍 SKML Motion Pictures SEO Documentation

This document outlines the comprehensive Technical SEO and Meta Tag strategies implemented across the SKML Motion Pictures Next.js application. Our goal is to ensure maximum visibility, perfect rich-link sharing on social media, and readiness for AI-crawlers.

## 1. Global Metadata Architecture (`app/layout.tsx`)

Next.js 14+ Metadata API is utilized to dynamically inject head tags at the server level, ensuring that crawlers see fully rendered meta information without executing JavaScript.

### Core Meta Tags
- **Dynamic Title Template:** Uses a template (`%s | SKML Motion Pictures`) so that individual pages can just pass their specific title while maintaining brand consistency.
- **Detailed Descriptions & Keywords:** Highly targeted keywords relating to Telugu cinema, film production, OTT distribution (Amazon Prime, Aha), and the founder (Kandregula Adhinarayana).
- **Canonical URLs:** Prevents duplicate content penalties by explicitly declaring the canonical base URL (`https://skmlmotionpictures.com`).

### Open Graph (OG) & Social Sharing
Perfectly configured for Facebook, LinkedIn, iMessage, and WhatsApp link previews.
- **Type:** `website`
- **Locale:** `en_IN`
- **Images:** High-resolution `og-image.jpg` (1200x630) to ensure a large, premium card preview.

### Twitter / X Cards
Configured specifically for Twitter's crawler.
- **Card Type:** `summary_large_image` to ensure maximum screen real estate on feeds.
- **Creator & Site Attribution:** Linked to the official `@SKMLMotion` handle.

### Robots & Crawling Directives
Explicit instructions for search engine bots:
- `index: true`, `follow: true`
- **GoogleBot Enhancements:** Enables large image previews (`max-image-preview: "large"`) and unrestricted video previews/snippets.

## 2. Dynamic Route-Level Metadata (`generateMetadata`)

For dynamically generated pages, we fetch data directly from our CMS before the page renders to create unique meta tags tailored to that specific piece of content.

### Film Detail Pages (`app/films/[slug]/page.tsx`)
- **Dynamic Titles & Descriptions:** Automatically constructs rich descriptions (e.g., "*Aghora (2020) — A Horror / Thriller film produced by SKML Motion Pictures, available on Amazon Prime.*").
- **Dynamic Open Graph Images:** Pulls the high-res movie poster directly from Sanity CMS and sets it as the `og:image` and `twitter:image` to ensure sharing a specific film link looks perfect.
- **Dynamic Canonical URLs:** Automatically points to the correct `https://skmlmotionpictures.com/films/{slug}`.
- **OG Type Mutation:** Changes `og:type` from `website` to `video.movie` for optimal categorization on social platforms.

### Page-Specific Overrides (`app/movies/page.tsx`, etc.)
- Specific pages inject customized metadata specific to their content, overriding the global `layout.tsx` defaults. For example, the Movies page gets targeted keywords like "Telugu movies list", "SKML productions", and a dedicated canonical URL.

## 3. Dynamic Sitemap Generation (`app/sitemap.ts`)

A native Next.js `sitemap.ts` file automatically generates a valid `sitemap.xml` file.

- **Static Routes:** Manually prioritizes the Home (`1.0` priority) and Movies (`0.9` priority) pages.
- **Dynamic Film Routes:** Connects directly to our Sanity CMS database (`getFilms()`). Whenever a new film is added with a valid slug, the sitemap automatically updates with the URL, `lastModified`, and a custom priority for indexation without requiring manual intervention.

## 4. JSON-LD Structured Data for Rich Snippets

To help search engines construct rich snippets and the Google Knowledge Panel, we utilize JSON-LD (JavaScript Object Notation for Linked Data) in multiple locations.

### Organization Schema (`app/page.tsx`)
Injected on the Home page.
- **Schema Type:** `Organization`
- **Included Data:** Official Name & URL, Logo URL, Founder Information (`Person` schema for Kandregula Adhinarayana), and Contact points & languages supported.

### Movie Schema (`app/films/[slug]/page.tsx`)
Injected dynamically on every individual film page.
- **Schema Type:** `Movie`
- **Included Data:**
  - Movie Name, Date Published, Genre, High-res Poster Image.
  - Production Company attributed back to the SKML Organization.
  - **Offers/Availability:** Dynamically includes schema data showing the OTT platform (e.g., Amazon Prime) where the film is available to watch, enhancing Google search cards for movie availability.

## 5. Mobile & Apple Device Optimization
- **Icons:** Provides standard SVG/PNG favicons as well as specialized Apple Touch Icons.
- **Apple Web App Meta:** Sets `statusBarStyle` to `black-translucent` and `capable: true` for a native-app-like experience when saved to an iOS home screen.
- **Format Detection:** Forces standard telephone link detection.

## 6. Rendering Strategy & Performance
- **Server-Side Generation (SSG) & ISR:** Because pages are statically generated and incrementally revalidated, bots receive a pre-rendered HTML document instantly, resulting in superior Core Web Vitals and crawlability compared to standard Single Page Applications (SPAs).
- **Semantic HTML:** The UI strictly adheres to modern HTML5 (using `<main>`, `<section>`, `<nav>`, `<header>`) which provides context to screen readers and SEO bots.
