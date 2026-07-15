# 🎬 SKML Motion Pictures — SEO Metadata Reference

> **Last updated:** 2026-04-29  
> **Framework:** Next.js 14+ App Router (`Metadata` API)  
> **Base URL:** `https://skmlmotionpictures.com`

---

## Table of Contents

1. [Overview](#overview)
2. [Root Layout — Global Defaults](#1-root-layout--global-defaults-applayouttsx)
3. [Home Page](#2-home-page-apppagetsx)
4. [Movies Page — `/movies`](#3-movies-page--movies-appmoviespagetsx)
5. [Film Detail Pages — `/films/[slug]`](#4-film-detail-page--filmsslug-appfilmsslugpagetsx)
6. [Sitemap — `sitemap.ts`](#5-sitemap-appsitemapts)
7. [JSON-LD Structured Data](#6-json-ld-structured-data)
8. [Robots Configuration](#7-robots-configuration)
9. [Icons & Favicons](#8-icons--favicons)
10. [Pending / TODO](#9-pending--todo)
11. [Quick Reference Table](#10-quick-reference-table)

---

## Overview

The SKML Motion Pictures platform implements a **multi-layer SEO strategy** using:

| Layer | Purpose |
|---|---|
| **Core Meta Tags** | Title, description, keywords for crawler indexing |
| **Open Graph** | Rich previews on Facebook, LinkedIn, WhatsApp |
| **Twitter Cards** | Rich previews on X (Twitter) |
| **JSON-LD Structured Data** | Google Knowledge Panel, rich snippets (Movie schema, Organization schema) |
| **Canonical URLs** | Prevent duplicate content penalties |
| **Sitemap** | Inform crawlers of all indexable URLs |
| **Robots directives** | Control what Googlebot/Bingbot can crawl |
| **Icons** | Browser tab favicon + Apple touch icon |

---

## 1. Root Layout — Global Defaults (`app/layout.tsx`)

These are **site-wide defaults**. Every page inherits these unless it explicitly overrides them.

### Core Meta Tags

| Field | Value |
|---|---|
| `title.default` | `SKML Motion Pictures \| Premium Film Production & Distribution` |
| `title.template` | `%s \| SKML Motion Pictures` |
| `description` | `SKML Motion Pictures — A premier film production and distribution company producing high-quality Telugu cinema and navigating global distribution across theaters, Amazon Prime, and Aha. Founded by Kandregula Adhinarayana.` |
| `authors` | `Kandregula Adhinarayana` (url: `https://skmlmotionpictures.com`) |
| `creator` | `SKML Motion Pictures` |
| `publisher` | `SKML Motion Pictures` |
| `category` | `entertainment` |
| `metadataBase` | `https://skmlmotionpictures.com` |

### Keywords

```
SKML Motion Pictures, SKML Films, film production, film distribution,
Telugu cinema, Telugu movies, movie production house India,
OTT distribution, Kandregula Adhinarayana, Amazon Prime Telugu movies,
Aha movies, Indian film production company, Tollywood production house
```

### Open Graph

| Field | Value |
|---|---|
| `og:type` | `website` |
| `og:locale` | `en_IN` |
| `og:url` | `https://skmlmotionpictures.com` |
| `og:site_name` | `SKML Motion Pictures` |
| `og:title` | `SKML Motion Pictures \| Premium Film Production & Distribution` |
| `og:description` | `A premier film production and distribution company producing high-quality Telugu cinema. Distributed across theaters, Amazon Prime, and Aha.` |
| `og:image` | `/og-image.jpg` (1200 × 630 px) |
| `og:image:alt` | `SKML Motion Pictures — Premium Film Production & Distribution` |

### Twitter / X Card

| Field | Value |
|---|---|
| `twitter:card` | `summary_large_image` |
| `twitter:title` | `SKML Motion Pictures \| Premium Film Production & Distribution` |
| `twitter:description` | `A premier Telugu film production and distribution company. Films on Amazon Prime, Aha, and theatrical releases.` |
| `twitter:images` | `/og-image.jpg` |
| `twitter:creator` | `@SKMLMotion` |
| `twitter:site` | `@SKMLMotion` |

### Robots (Global)

| Directive | Value |
|---|---|
| `index` | `true` |
| `follow` | `true` |
| `googleBot.index` | `true` |
| `googleBot.follow` | `true` |
| `googleBot.max-video-preview` | `-1` (unlimited) |
| `googleBot.max-image-preview` | `large` |
| `googleBot.max-snippet` | `-1` (unlimited) |

### Canonical

| Field | Value |
|---|---|
| `alternates.canonical` | `https://skmlmotionpictures.com` |

---

## 2. Home Page (`app/page.tsx`)

The home page **inherits all root layout defaults** and adds page-specific overrides:

### Overrides

| Field | Value |
|---|---|
| `alternates.canonical` | `https://skmlmotionpictures.com` |
| `og:url` | `https://skmlmotionpictures.com` |
| `og:type` | `website` |

### JSON-LD — Organization Schema

Injected as an inline `<script type="application/ld+json">` tag. Enables the **Google Knowledge Panel**.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SKML Motion Pictures",
  "url": "https://skmlmotionpictures.com",
  "logo": "https://skmlmotionpictures.com/icon.png",
  "description": "A premier film production and distribution company producing high-quality Telugu cinema. Distributed across theaters, Amazon Prime, and Aha.",
  "founder": {
    "@type": "Person",
    "name": "Kandregula Adhinarayana"
  },
  "sameAs": [],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "availableLanguage": ["Telugu", "English"]
  }
}
```

> [!TIP]
> Add social media profile URLs (YouTube, Instagram, Facebook) to the `sameAs` array to strengthen the Google Knowledge Panel entity.

---

## 3. Movies Page — `/movies` (`app/movies/page.tsx`)

This is a **static page** listing the full filmography. Its metadata is fully overridden from root defaults.

### Core Meta Tags

| Field | Value |
|---|---|
| `title` | `Our Films` → renders as `Our Films \| SKML Motion Pictures` |
| `description` | `Explore the complete filmography of SKML Motion Pictures — from productions to distributions across OTT and theatrical releases.` |
| `alternates.canonical` | `https://skmlmotionpictures.com/movies` |
| `robots` | `index: true, follow: true` |

### Keywords

```
SKML films, Telugu movies list, SKML productions, SKML distributions,
OTT Telugu movies, Tollywood filmography
```

### Open Graph

| Field | Value |
|---|---|
| `og:url` | `https://skmlmotionpictures.com/movies` |
| `og:title` | `Our Films \| SKML Motion Pictures` |
| `og:description` | `Explore the complete filmography of SKML Motion Pictures — from productions to distributions across OTT and theatrical releases.` |
| `og:image` | `/og-image.jpg` (1200 × 630 px) |
| `og:image:alt` | `SKML Motion Pictures Filmography` |

### Twitter / X Card

| Field | Value |
|---|---|
| `twitter:card` | `summary_large_image` |
| `twitter:title` | `Our Films \| SKML Motion Pictures` |
| `twitter:description` | `Explore the complete filmography of SKML Motion Pictures — OTT and theatrical releases.` |
| `twitter:images` | `/og-image.jpg` |

---

## 4. Film Detail Page — `/films/[slug]` (`app/films/[slug]/page.tsx`)

This is a **dynamic page**. Metadata is generated at build/request time via `generateMetadata()` using data fetched from Sanity CMS.

### Core Meta Tags (Dynamic)

| Field | Source |
|---|---|
| `title` | `film.title` from Sanity |
| `description` | `"{title} ({year}) — A {genre} film {produced/distributed} by SKML Motion Pictures, available on {ottPlatform}."` |
| `keywords` | `[film.title, film.genre, film.ottPlatform, "SKML Motion Pictures", "Telugu film", "Telugu production/distribution"]` |
| `alternates.canonical` | `https://skmlmotionpictures.com/films/{slug}` |
| `robots` | `index: true, follow: true` |

### Open Graph (Dynamic)

| Field | Value |
|---|---|
| `og:type` | `video.movie` |
| `og:url` | `https://skmlmotionpictures.com/films/{slug}` |
| `og:title` | `{film.title} \| SKML Motion Pictures` |
| `og:description` | `{film.title} — A {genre} film by SKML Motion Pictures, streaming on {ottPlatform}.` |
| `og:image` | Film poster from Sanity (1200 × 630, WebP via Sanity CDN) or fallback `/og-image.jpg` |
| `og:image:alt` | `{film.title} poster` |

### Twitter / X Card (Dynamic)

| Field | Value |
|---|---|
| `twitter:card` | `summary_large_image` |
| `twitter:title` | `{film.title} \| SKML Motion Pictures` |
| `twitter:description` | `{film.title} — A {genre} film by SKML Motion Pictures.` |
| `twitter:images` | Film poster URL from Sanity CDN |

### JSON-LD — Movie Schema (Dynamic)

Injected as `<script type="application/ld+json">` per film page. Enables **rich snippets** (streaming availability cards) in Google Search.

```json
{
  "@context": "https://schema.org",
  "@type": "Movie",
  "name": "{film.title}",
  "datePublished": "{film.year}",
  "genre": "{film.genre}",
  "image": "{posterUrl}",
  "url": "https://skmlmotionpictures.com/films/{slug}",
  "productionCompany": {
    "@type": "Organization",
    "name": "SKML Motion Pictures",
    "url": "https://skmlmotionpictures.com"
  },
  "countryOfOrigin": { "@type": "Country", "name": "India" },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "{film.ottPlatform}" }
  }
}
```

> [!NOTE]
> `countryOfOrigin` and `offers` blocks are **conditionally included** — they only appear if `film.ottPlatform` has a value.

---

## 5. Sitemap (`app/sitemap.ts`)

The sitemap is **auto-generated** at build time and served at `https://skmlmotionpictures.com/sitemap.xml`.

### Static Routes

| URL | Change Frequency | Priority |
|---|---|---|
| `https://skmlmotionpictures.com` | `weekly` | `1.0` |
| `https://skmlmotionpictures.com/movies` | `weekly` | `0.9` |

### Dynamic Routes (from Sanity)

| URL Pattern | Change Frequency | Priority |
|---|---|---|
| `https://skmlmotionpictures.com/films/{slug}` | `monthly` | `0.7` |

> [!NOTE]
> Dynamic routes are fetched live from Sanity CMS via `getFilms()`. If Sanity is unavailable, the sitemap gracefully falls back to static routes only.

---

## 6. JSON-LD Structured Data

Summary of all **Schema.org** types used:

| Schema Type | Page | Purpose |
|---|---|---|
| `Organization` | `/` (Home) | Google Knowledge Panel, entity linking |
| `Movie` | `/films/[slug]` | Rich snippets, streaming availability cards |

---

## 7. Robots Configuration

The global robots config in `layout.tsx` sets **permissive directives** for all major crawlers:

```
index: true            → Page can appear in search results
follow: true           → Crawlers can follow all links on the page
max-video-preview: -1  → No limit on video preview length (for trailers)
max-image-preview: large → Crawlers may show full-size image previews
max-snippet: -1        → No limit on text snippet length in search results
```

Individual pages (`/movies`, `/films/[slug]`) also explicitly set `robots: { index: true, follow: true }` as a redundant confirmation.

---

## 8. Icons & Favicons

| Icon Type | Path | Format |
|---|---|---|
| Browser favicon | `/favicon.ico` | ICO |
| PNG icon | `/icon.png` | PNG |
| Apple touch icon | `/icon.png` | PNG |

These are configured in `layout.tsx` under the `icons` key and are served from the `/public` directory.

---

## 9. Pending / TODO

> [!CAUTION]
> The following items are **stubbed out** with comments in `layout.tsx` and must be filled in before going live:

| Item | Action Required |
|---|---|
| **Google Search Console** | Verify site ownership → paste token into `verification.google` in `layout.tsx` |
| **Yandex Webmaster** | Verify → paste token into `verification.yandex` in `layout.tsx` |
| **`og-image.jpg`** | Ensure a 1200×630 px branded image exists at `/public/og-image.jpg` |
| **`sameAs` array** | Add official social media URLs (YouTube, Instagram, Facebook) to the Organization schema in `app/page.tsx` |
| **Twitter handle** | Confirm `@SKMLMotion` is the correct handle; update if different |
| **Film OTT links** | The "Watch on {platform}" button in `/films/[slug]` currently links to `#`; update to real streaming URLs |

---

## 10. Quick Reference Table

| Meta Tag | Home (`/`) | `/movies` | `/films/[slug]` |
|---|---|---|---|
| `<title>` | ✅ via root default | ✅ `Our Films` | ✅ `film.title` (dynamic) |
| `meta description` | ✅ via root | ✅ | ✅ dynamic |
| `meta keywords` | ✅ via root (13 terms) | ✅ (6 terms) | ✅ dynamic per film |
| `og:title` | ✅ | ✅ | ✅ |
| `og:description` | ✅ | ✅ | ✅ |
| `og:image` | `/og-image.jpg` | `/og-image.jpg` | Sanity poster / fallback |
| `og:type` | `website` | `website` | `video.movie` |
| `og:locale` | `en_IN` | — | — |
| `og:site_name` | `SKML Motion Pictures` | — | — |
| `twitter:card` | `summary_large_image` | `summary_large_image` | `summary_large_image` |
| `twitter:creator` | `@SKMLMotion` | — | — |
| `canonical URL` | `/` | `/movies` | `/films/{slug}` |
| `robots` | global permissive | `index, follow` | `index, follow` |
| `JSON-LD Organization` | ✅ | ❌ | ❌ |
| `JSON-LD Movie` | ❌ | ❌ | ✅ dynamic |
| Sitemap entry | ✅ priority 1.0 | ✅ priority 0.9 | ✅ priority 0.7 |
| Favicon / Apple icon | ✅ | ✅ | ✅ |

---

*Generated from: `app/layout.tsx` · `app/page.tsx` · `app/movies/page.tsx` · `app/films/[slug]/page.tsx` · `app/sitemap.ts`*
