# SKML Motion Pictures — Technical Documentation

```text
   ███████╗████████╗ █████╗  ██████╗██╗  ██╗██╗  ██╗
   ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝╚██╗██╔╝
   ███████╗   ██║   ███████║██║     █████╔╝  ╚███╔╝
   ╚════██║   ██║   ██╔══██║██║     ██╔═██╗  ██╔██╗
   ███████║   ██║   ██║  ██║╚██████╗██║  ██╗██╔╝ ██╗
   ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝
              ENGINEERED BY STACKX
```

> A premium cinematic portfolio platform built with Next.js 16, Sanity CMS, and Framer Motion. Deployed on Vercel.

**Live Site:** [https://skml-delta.vercel.app](https://skml-delta.vercel.app)
**Repository:** [https://github.com/StackXpvt/skml](https://github.com/StackXpvt/skml)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Architecture](#3-architecture)
4. [Project Structure](#4-project-structure)
5. [Public Website — Pages & Features](#5-public-website--pages--features)
6. [Frontend Components Deep Dive](#6-frontend-components-deep-dive)
7. [Admin Dashboard](#7-admin-dashboard)
8. [Sanity CMS Schemas](#8-sanity-cms-schemas)
9. [API Reference](#9-api-reference)
10. [Authentication System](#10-authentication-system)
11. [Design System](#11-design-system)
12. [SEO & Structured Data](#12-seo--structured-data)
13. [Performance Optimizations](#13-performance-optimizations)
14. [Environment Variables](#14-environment-variables)
15. [Local Development](#15-local-development)
16. [Deployment](#16-deployment)

---

## 1. Project Overview

SKML Motion Pictures is a full-stack web platform for a Telugu film production and distribution house founded by **Kandregula Adhinarayana**. The platform serves two distinct purposes:

- **Public Website** — An immersive, cinematic portfolio showcasing produced and distributed films with premium glassmorphic UI, scroll-driven animations, and fully responsive design across mobile, tablet, and desktop.
- **Admin Dashboard** — A custom-built content management interface (at `/admin`) that allows the owner to manage films, producer bio, and about-page content without touching the raw Sanity Studio.

### Core Capabilities

| Capability | Description |
|---|---|
| Film Management | Full CRUD for films with poster upload, drag-to-reorder, category filtering (Produced / Distributed) |
| Producer Profile | Editable bio, portrait upload with hotspot cropping, signature quote |
| About Section | Dynamic headline, description paragraphs, statistics counters, CTA button |
| Image Pipeline | Client-side compression → server upload → Sanity CDN with automatic optimization |
| Auth | JWT-based admin authentication with httpOnly cookies and middleware protection |
| Theming | Admin dashboard supports 4 themes (Light, Dark, Midnight, Beige) |
| SEO Engine | JSON-LD structured data (Organization + Movie schemas), dynamic OG images, sitemap generation |
| ISR Revalidation | Sanity webhook triggers on-demand cache purge so the public site always has fresh data |
| Contact System | WhatsApp-integrated contact form that constructs a pre-filled message and opens the WhatsApp app |
| Custom 404 Page | Cinematic film-reel themed "not found" page with glitch effects and parallax |

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.2.4 |
| UI Library | React | 19.2.4 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Animations | Framer Motion | 12.38+ |
| CMS | Sanity | 5.21+ |
| Image Handling | `@sanity/image-url`, `browser-image-compression` | Latest |
| Authentication | `jose` (JWT signing/verification) | 6.2.2 |
| Lottie Animations | `@lottiefiles/dotlottie-react` | 0.19.2 |
| Deployment | Vercel | — |

### Typography
- **Primary (Sans):** Inter — Used for body text, UI elements
- **Display (Serif):** Playfair Display — Used for cinematic headings

Both fonts are loaded via `next/font/google` with `display: "swap"` for optimal performance and zero FOIT (Flash of Invisible Text).

---

## 3. Architecture

```
┌──────────────────────────────────────────────────────────┐
│                        VERCEL                            │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │  Next.js     │  │  API Routes  │  │  Middleware     │  │
│  │  App Router  │  │  /api/admin  │  │  (proxy.ts)    │  │
│  │  (SSR/SSG)   │  │  /api/auth   │  │  JWT Verify    │  │
│  └──────┬───────┘  └──────┬───────┘  └────────────────┘  │
│         │                 │                               │
│         │    GROQ Queries │    Mutations (writeClient)    │
│         └────────┬────────┘                               │
└──────────────────┼───────────────────────────────────────┘
                   │
          ┌────────▼────────┐
          │   SANITY CMS    │
          │  (Hosted CDN)   │
          │                 │
          │  Schemas:       │
          │  • film         │
          │  • producer     │
          │  • about        │
          └─────────────────┘
```

### Data Flow

1. **Public pages** use a read-only Sanity client (`lib/sanity/client.ts`) with CDN enabled for fast cached reads.
2. **Admin mutations** use a server-side write client (`lib/sanity/writeClient.ts`) with a secret token — never exposed to the browser.
3. **Image uploads** flow through `/api/admin/upload` → `writeClient.assets.upload()` → Sanity CDN.
4. **Authentication** is handled by `proxy.ts` middleware intercepting all `/admin/*` routes (except `/admin/login`).
5. **ISR Revalidation** — Sanity webhooks POST to `/api/revalidate` on content changes, which triggers `revalidatePath()` and `revalidateTag()` to purge the Next.js cache.

---

## 4. Project Structure

```
skml/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, global metadata, structured data)
│   ├── page.tsx                  # Landing page (SSR, parallel data fetching)
│   ├── loading.tsx               # Global loading skeleton
│   ├── not-found.tsx             # Custom cinematic 404 page
│   ├── sitemap.ts                # Dynamic sitemap generator (static + film routes)
│   ├── globals.css               # Design system & animations
│   ├── icon.png                  # Favicon
│   ├── about/                    # Dedicated About page
│   │   ├── page.tsx              # Server component (metadata + SEO)
│   │   └── AboutClient.tsx       # Client component (full about page UI)
│   ├── movies/                   # Dedicated Movies listing page
│   │   └── page.tsx              # Server component (fetches all films)
│   ├── services/                 # Services page
│   │   └── page.tsx              # Full-page services showcase with parallax
│   ├── contact/                  # Contact page
│   │   ├── page.tsx              # Server component (metadata)
│   │   └── ContactClient.tsx     # Client component (contact form UI)
│   ├── films/
│   │   └── [slug]/page.tsx       # Dynamic film detail page (cinematic hero)
│   ├── admin/                    # Custom Admin Dashboard
│   │   ├── layout.tsx            # Sidebar, theme switcher, mobile nav
│   │   ├── page.tsx              # Dashboard overview (stats, storage, film table)
│   │   ├── admin.css             # Admin-specific styles (4 themes)
│   │   ├── AdminSelect.tsx       # Reusable styled select component
│   │   ├── login/page.tsx        # Admin login page
│   │   ├── about/                # About section editor
│   │   ├── producer/             # Producer profile editor
│   │   └── films/                # Film list + detail editor
│   │       ├── page.tsx          # Films list page (server component)
│   │       ├── FilmsListClient.tsx # Client-side film management
│   │       └── [id]/             # Individual film editor
│   ├── api/                      # Serverless API Routes
│   │   ├── auth/
│   │   │   ├── login/route.ts    # POST — Validate credentials, set JWT cookie
│   │   │   ├── logout/route.ts   # POST — Clear session cookie
│   │   │   └── session/route.ts  # GET  — Check current session
│   │   ├── admin/
│   │   │   ├── about/route.ts    # PUT  — Update about section
│   │   │   ├── producer/route.ts # PUT  — Update producer profile
│   │   │   ├── upload/route.ts   # POST — Upload images to Sanity
│   │   │   └── films/
│   │   │       ├── route.ts      # POST — Create new film
│   │   │       ├── [id]/route.ts # PUT/DELETE — Update/delete film
│   │   │       └── reorder/route.ts # PUT — Batch reorder films
│   │   └── revalidate/route.ts   # POST — Sanity webhook ISR revalidation
│   └── studio/                   # Sanity Studio (embedded at /studio)
│
├── components/                   # Reusable UI Components
│   ├── Navbar.tsx                # Floating glassmorphic navigation bar
│   ├── Hero.tsx                  # Full-screen cinematic hero with scrolling poster columns
│   ├── MarqueeSection.tsx        # Infinite scrolling text marquee
│   ├── AboutSection.tsx          # CMS-driven about section with animated stats
│   ├── ProducerSection.tsx       # Founder bio, portrait, quote
│   ├── ServicesSection.tsx       # Service cards with hover-lift effects
│   ├── FilmShowcase.tsx          # Featured film carousel (produced only)
│   ├── MoviesSection.tsx         # Full movie grid with category tabs + detail modal
│   ├── WhyChooseUs.tsx           # Interactive clapboard-themed feature grid
│   ├── OTTPlatforms.tsx          # OTT platform logos section
│   ├── ContactSection.tsx        # Contact form with WhatsApp deep-link integration
│   ├── Footer.tsx                # Animated site footer with StackX branding
│   ├── FloatingWhatsApp.tsx      # Persistent WhatsApp FAB button with pulse animation
│   ├── ScrollingColumn.tsx       # Reusable vertical scrolling column (used in Hero)
│   └── skeletons/
│       └── SectionSkeleton.tsx   # Loading skeleton placeholder
│
├── lib/                          # Utilities & Configurations
│   ├── auth.ts                   # JWT helpers (create, verify, session management)
│   └── sanity/
│       ├── client.ts             # Read-only Sanity client (CDN enabled)
│       ├── writeClient.ts        # Server-only write client (token-authenticated)
│       ├── image.ts              # Image URL builder helper
│       ├── queries.ts            # GROQ queries (getAbout, getProducer, getFilms, etc.)
│       └── mutations.ts          # Write operations (create, update, delete, upload)
│
├── sanity/                       # Sanity Studio Configuration
│   ├── schemas/
│   │   ├── index.ts              # Schema registry
│   │   ├── film.ts               # Film document schema
│   │   ├── producer.ts           # Producer document schema (singleton)
│   │   └── about.ts              # About document schema (singleton)
│   ├── structure.ts              # Custom studio structure (singletons + categorized lists)
│   ├── theme.ts                  # Custom Sanity Studio theme (SKML Gold branding)
│   └── components/
│       └── StudioLogo.tsx        # Custom logo for Sanity Studio
│
├── public/assets/                # Public static files (logos, posters, images)
├── proxy.ts                      # Next.js Middleware (JWT auth guard)
├── sanity.config.ts              # Sanity Studio configuration
├── sanity.cli.ts                 # Sanity CLI configuration
├── next.config.ts                # Next.js configuration (image domains)
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies & scripts
```

---

## 5. Public Website — Pages & Features

### 5.1 Landing Page (`/`)

The landing page is a **server component** that fetches all CMS data in parallel using `Promise.all()`. It is composed of 13 sections that render sequentially to create a cinematic scrolling experience:

| Order | Section | Description |
|---|---|---|
| 1 | **Navbar** | Floating glassmorphic navigation bar with scroll-aware color inversion |
| 2 | **Hero** | Full-screen viewport with auto-scrolling poster grid columns, noise grain overlay, gradient CTA |
| 3 | **MarqueeSection** | Infinite horizontal text scroller creating a visual break |
| 4 | **AboutSection** | CMS-driven headline, accent text, description paragraphs, animated stats counters |
| 5 | **ProducerSection** | Founder portrait (from CMS), bio paragraphs, signature quote, parallax effects |
| 6 | **ServicesSection** | Static service cards (Production, Distribution, Marketing, Post-Production) with hover-lift |
| 7 | **FilmShowcase** | Featured film carousel — shows only "produced" category films (max 6), with poster previews |
| 8 | **MoviesSection** | Full movie grid with "All / Produced / Distributed" category tabs, stagger reveal on scroll, click-to-open detail modal |
| 9 | **WhyChooseUs** | Interactive clapboard-themed section with scroll-driven clapper animation. Desktop: frosted-glass cards. Mobile: tap-to-open popup modals |
| 10 | **OTTPlatforms** | Platform logo showcase (Netflix, Amazon Prime, Disney+ Hotstar, Aha, Zee5) |
| 11 | **ContactSection** | Dark glassmorphic contact card with form (name, email, message) that submits via WhatsApp deep link, plus direct contact info |
| 12 | **Footer** | Full site footer with Quick Links, Services links, Contact details, Framer Motion stagger animations, StackX "Powered By" badge |
| 13 | **FloatingWhatsApp** | Persistent floating action button (bottom-right) with a pulse glow animation for instant WhatsApp contact |

**Key Features of the Landing Page:**
- **ISR Fallback:** `revalidate = 60` ensures data freshness with a 60-second fallback, on top of webhook-driven on-demand revalidation.
- **JSON-LD Structured Data:** Organization schema injected as `<script type="application/ld+json">` for Google Knowledge Panel.
- **Parallel Data Fetching:** All three CMS queries (About, Producer, Films) run concurrently via `Promise.all()` with graceful error handling (`.catch(() => null)`).
- **Poster Distribution:** Films are split — "distributed" films populate the Hero background columns, "produced" films are featured in the FilmShowcase carousel.

---

### 5.2 About Page (`/about`)

A dedicated, standalone About page with its own SEO metadata and Open Graph tags.

**Features:**
- Server component wrapper with full metadata (title, description, keywords, canonical URL, OG images, Twitter card).
- Client component (`AboutClient.tsx`) renders the full visual experience.
- Cinematic layout featuring the company origin story, founder biography, and visual storytelling.
- Fully responsive design with dedicated mobile, tablet, and desktop layouts.

---

### 5.3 Movies Page (`/movies`)

A complete filmography page that lists all films from Sanity CMS.

**Features:**
- Server-side data fetching with `getFilms()` and graceful fallback to hardcoded film data if Sanity is unavailable.
- Client component (`MoviesPageClient`) renders the interactive film grid.
- Films can be filtered by category (All Films / Produced / Distributed).
- Each film card shows the poster, title, year, genre, OTT platform, and category badge.
- Click on any film to open a detail modal with full metadata.
- ISR with 60-second revalidation.
- Full SEO metadata with canonical URL, OG tags, and Twitter cards.

---

### 5.4 Services Page (`/services`)

An elaborate, scroll-driven services showcase page.

**Features:**
- 5 detailed service sections: **Film Production**, **Post-Production & VFX**, **Theatrical Distribution**, **Film Rights & Monetization**, and **Marketing & PR**.
- Each service includes a description, 3 sub-items with detailed explanations, and a media element (image or animated GIF).
- Framer Motion `useScroll` and `useTransform` hooks for parallax effects on scroll.
- OTT platform partnership showcase (Netflix, Amazon Prime, Disney+ Hotstar, Zee5, Aha) with branded color accents.
- CTA section at the bottom linking to the Contact page.
- Floating WhatsApp button included on this page.

---

### 5.5 Contact Page (`/contact`)

A dedicated contact page with full SEO metadata.

**Features:**
- Server component wrapper for metadata.
- Client component (`ContactClient.tsx`) with an interactive contact form.
- WhatsApp-integrated form submission — the form constructs a pre-filled WhatsApp message with the user's name, email, and message, then opens `wa.me` in a new tab.
- Direct contact information displayed (Phone, Email, Location).

---

### 5.6 Film Detail Page (`/films/[slug]`)

A dynamic, server-rendered page for each individual film.

**Features:**
- **Cinematic Hero Section:** Full-viewport hero with a blurred poster background, dark gradient overlay, and the film title with metadata (year, genre, category).
- **Production Insight:** Auto-generated descriptive text about the film.
- **Detail Grid:** Genre, Year, Platform, Release Type displayed in a clean 2×2 grid.
- **CTA Button:** "Watch on [Platform]" button rendered conditionally if an OTT platform is specified.
- **JSON-LD Movie Schema:** Full `schema.org/Movie` structured data injected for search engine rich snippets.
- **Dynamic Metadata:** `generateMetadata()` produces per-film title, description, OG images, and Twitter cards using the film's poster from Sanity CDN.
- **Static Params Generation:** `generateStaticParams()` pre-generates routes for all films at build time (SSG).
- **Back Navigation:** "Back to Collection" link for easy return.

---

### 5.7 Custom 404 Page (`not-found.tsx`)

A fully custom "Page Not Found" experience themed around film production.

**Features:**
- **Film Reel Aesthetic:** Animated film reel borders on both sides of the screen (scrolling perforations), created with Framer Motion.
- **Glitch Effect 404:** The "404" text uses a Playfair Display font with CSS stroke effect, and an overlaid glitch animation that creates a flickering, distorted VHS look.
- **Film Grain Overlay:** SVG fractal noise filter simulating old-film grain texture.
- **Cinematic Spotlight/Vignette:** Radial gradient creating a spotlight effect.
- **Mouse Parallax:** The entire content block subtly follows the mouse cursor with spring physics.
- **Animated Scratches:** Horizontal lines animating across the screen mimicking film damage.
- **Two CTAs:**
  - "Rewind" button — Uses `router.back()` to go to the previous page, styled with a custom rewind icon.
  - "Return to Studio" button — Links back to the homepage with a slide-in hover animation.
- **Tagline:** "This scene is missing from the reel."

---

## 6. Frontend Components Deep Dive

### 6.1 Navbar (`components/Navbar.tsx`)

A fully custom, floating glassmorphic navigation bar.

**Behavior:**
- **Transparent by default** when the user is at the top of the page.
- **Glassmorphic dark mode** (`rgba(0,0,0,0.55)` + `blur(24px)`) when scrolled past 50px.
- **Glassmorphic light mode** (`rgba(255,255,255,0.85)` + `blur(24px)`) when scrolled past 85% of the viewport height (i.e., past the dark Hero section into white content).
- **All colors invert** based on scroll position — link text, logo text, hamburger lines, WhatsApp button all switch between white and dark.
- **Pill shape** with full `border-radius: 9999px`.

**Navigation Links:** Home, About, Movies, Services, Contact.

**WhatsApp Integration:**
- Desktop: Full "WhatsApp" button with icon and label in the navbar.
- Mobile: Compact circular WhatsApp icon button.

**Mobile Menu:**
- Hamburger icon with smooth open/close animation (middle line fades out, top and bottom rotate to form an X).
- Slide-down glassmorphic dropdown panel with all navigation links + a full-width "Chat on WhatsApp" CTA.
- Body scroll is locked when the mobile menu is open.

---

### 6.2 Hero (`components/Hero.tsx`)

A full-viewport cinematic hero section.

**Visual Composition:**
- **Background Poster Grid:** Film posters from the CMS are distributed across vertical scrolling columns that auto-scroll continuously.
  - Desktop: 4 columns
  - Tablet: 3 columns
  - Mobile: 2 columns
- Each column scrolls in an alternating direction (up/down) at slightly different speeds for an organic, non-uniform feel.
- The entire grid is rotated -12 degrees and scaled 1.15x for a dynamic, tilted poster-wall effect.
- **Dark Gradient Overlay:** Two overlapping gradient layers — a linear gradient (top to bottom) and a radial vignette (center to edges) — create depth.
- **Film Grain:** A CSS noise overlay (`noise-overlay` class) adds cinematic grain texture.
- **Bottom Fade:** A white strip at the very bottom with a CSS mask creates a seamless transition into the next (white) section.

**Content:**
- Small label pill: "Est. 2013 • Film Production & Distribution"
- Main heading: "Where Legacy Meets the Silver Screen" with a gradient text effect.
- Subtext paragraph.
- CTA Button: "Explore Our Work" linking to `#movies`, with a glow hover effect (`cta-glow` class).

**Animations:**
- Entry animations use `animate-fade-in-up` with staggered delays (200ms, 400ms, 600ms).

---

### 6.3 MoviesSection (`components/MoviesSection.tsx`)

The main film grid component used on the landing page.

**Features:**
- **Category Tabs:** "All Films", "Produced", "Distributed" — styled as a pill-shaped toggle group.
- **Responsive Grid:** 2 columns on mobile, expanding to 3-4 on larger screens.
- **Stagger Reveal Animation:** Individual cards use Intersection Observer — each card fades in and translates upward with a staggered delay (`i * 150ms`).
- **Cards re-animate on tab switch:** Clearing and rebuilding the reveal state on category change.
- **Movie Card UI:**
  - 2:3 aspect ratio poster with rounded corners.
  - Hover overlay with gradient and category badge ("Produced" = solid white, "Distributed" = bordered).
  - Poster zoom on hover (CSS `movie-poster` class).
  - Title, year, and genre displayed below.
- **Click-to-Open Detail Modal:**
  - Full-screen backdrop with blur.
  - Card with poster thumbnail, title, year, genre, category badge, release type tag, and OTT platform.
  - Closeable via close button, backdrop click, or Escape key.
  - Body scroll is locked while the modal is open.
- **"Explore More" CTA:** If there are more films than the display limit (8 on desktop, 6 on mobile), a cinematic link appears at the bottom with a "+N" counter pill, linking to `/movies`.
- **Fallback Data:** If no CMS data is available, hardcoded fallback films are displayed.

---

### 6.4 WhyChooseUs (`components/WhyChooseUs.tsx`)

An interactive section themed as a film clapboard.

**Clapboard Animation:**
- The entire section is wrapped in a clapboard visual container.
- The **top clapper** is animated based on scroll position — it starts open (-35°) and gradually closes to 0° as the user scrolls through the section, using `window.scrollY` to calculate progress.
- The bottom stripe has subtle diagonal film stripes and metadata text ("SKML Motion Pictures" / "PROD. 2013 — PRESENT").

**Content:**
- 4 reasons to choose SKML: Affordable Production, OTT Release Expertise, End-to-End Support, Proven Track Record.
- **Desktop:** Frosted-glass cards with numbered badges, hover-lift effects (translate + shadow), scroll-reveal animations with staggered delays.
- **Mobile:** Compact 2×2 grid of tappable tiles. Tapping a tile opens a **full-screen modal popup** with the reason's title and detailed description, closeable via close button or backdrop tap.

---

### 6.5 ContactSection (`components/ContactSection.tsx`)

A dark glassmorphic contact card embedded in a white section.

**Layout:**
- Left side: Heading ("Let's Create Together"), description, direct contact info (Phone, Email, Location), and a green WhatsApp CTA button.
- Right side: Contact form inside a nested frosted-glass card with fields for Name, Email, Message.

**Form Behavior:**
- On submit, the form constructs a WhatsApp deep link: `wa.me/919299992173?text=...` with the user's name, email, and message URL-encoded.
- Opens in a new browser tab.

**Visual Effects:**
- Multiple glass layers with different opacities.
- Subtle rim light at the top edge.
- Radial gradient orb accent in the top-right corner.
- Input fields change border and background on focus.

---

### 6.6 Footer (`components/Footer.tsx`)

A comprehensive, animated site footer.

**Sections:**
- **Brand Column:** SKML logo + name + tagline description.
- **Quick Links:** Home, About, Movies, Services, Contact — each with a Framer Motion hover animation (text slides right + underline sweeps in).
- **Services Links:** Film Production, OTT Distribution, Promotion Support, Theatrical Release.
- **Contact Us:** Phone, Email, Location — each with an icon in a circular container that glows on hover.

**Bottom Bar:**
- Copyright notice with dynamic year.
- "Where Legacy Meets the Silver Screen" tagline.
- **"Powered By StackX"** glassmorphic pill badge with StackX logo, linking to `stackx.co.in`.
- Shimmer overlay animation sweeping across the bottom bar.

**Animations:**
- All sections use Framer Motion `staggerContainer` and `fadeUpItem` variants that trigger on viewport entry (`whileInView`).

---

### 6.7 FloatingWhatsApp (`components/FloatingWhatsApp.tsx`)

A persistent floating action button fixed to the bottom-right of the screen.

**Features:**
- Always visible on all pages.
- Green circular button (`#25D366`) with WhatsApp icon.
- CSS `whatsapp-pulse` animation creates a glowing ring pulse effect.
- Links to `wa.me/919299992173` with a pre-filled greeting message.

---

### 6.8 Other Components

| Component | Description |
|---|---|
| **MarqueeSection** | Infinite horizontal text scroller with configurable content. Creates a visual break between the Hero and About sections. |
| **AboutSection** | Receives CMS data as props: headline, accent text, description paragraphs, CTA text, and stats array. Stats render as animated counters. Intersection Observer drives scroll-reveal animations. |
| **ProducerSection** | Displays the company founder's portrait (from CMS), full name, role, bio paragraphs, and a signature quote. Portrait uses parallax-style effects. |
| **ServicesSection** | Static service cards (Film Production, OTT Distribution, Marketing & PR, Post-Production). Each card has a hover-lift animation with increased shadow. |
| **FilmShowcase** | A horizontal carousel of featured films (only "produced" category, max 6). Each card shows the poster, title, year, genre, OTT platform. |
| **OTTPlatforms** | Displays platform logos (Netflix, Amazon Prime, Disney+ Hotstar, Aha, Zee5) in a grid or row. |
| **ScrollingColumn** | A reusable component that infinitely scrolls a list of images vertically. Accepts `direction` (up/down), `speed`, and `images` props. Used in the Hero background. |
| **SectionSkeleton** | Loading skeleton component used as a fallback while sections are loading. |

---

## 7. Admin Dashboard

### 7.1 Admin Login Page (`/admin/login`)

A custom-branded admin login page.

**Visual Design:**
- Dark gradient background with a subtle dot grid overlay and a gold radial glow effect.
- White login card with a gold accent strip at the top.
- SKML logo in a dark rounded container.
- "Admin Dashboard" heading in Playfair Display.
- Email and password fields with focus states (border darkens, background lightens, box-shadow appears).
- Password field includes a **show/hide password toggle** button with an eye icon.
- Error messages appear in a pink/red alert box with a slide-down animation.
- Full-width "Sign In" button with hover-lift animation.
- Footer: "SKML Motion Pictures © [Year]".

---

### 7.2 Admin Layout (`/admin/layout.tsx`)

The dashboard uses a **sidebar + main content** layout:

**Desktop:**
- Fixed sidebar (240px) with brand header (SKML logo + "Admin Control"), navigation links grouped by section ("Overview" and "Content"), and a "Sign Out" button at the bottom.
- Active link is highlighted with a dot indicator.
- Scrollable main content area to the right.

**Mobile:**
- Bottom navigation bar (`mob-nav`) with icon-based links.
- Hamburger button in the top header opens a slide-in overlay sidebar.
- Overlay backdrop for dismissing the sidebar.

**Theme System:**
- 4 built-in themes persisted to `localStorage` (key: `skml-admin-theme`):
  - **Light** (`#FFFFFF`)
  - **Dark** (`#12141C`)
  - **Midnight** (`#0F172A`)
  - **Beige** (`#F7F3F0`)
- Theme switcher: 4 small colored squares in the header, each setting a `data-theme` attribute on the root element.
- All admin CSS variables cascade from `[data-theme]` selectors.

**Header Bar:**
- Current page title (dynamic based on active route).
- Theme switcher.
- "View Site" link (opens the public site in a new tab) with a live status indicator.

**Login Route Exception:**
- If the current path is `/admin/login`, the layout renders only the children (no sidebar/header).

---

### 7.3 Dashboard Overview (`/admin`)

A server component that fetches real-time data from Sanity using the write client.

**Stats Cards (4):**
| Stat | Data Source |
|---|---|
| Total Films | Count of all `film` documents |
| Produced | Count of films with `category === "produced"` |
| Distributed | Count of films with `category === "distributed"` |
| About Page | Whether the `aboutSettings` document exists (Live / Draft) |

**Cloud Storage Widget:**
- Fetches all `sanity.imageAsset` and `sanity.fileAsset` documents.
- Calculates total storage in MB, broken down by Images vs. Assets.
- Displays a progress bar against a 500MB capacity (visual reference).
- Gold gradient progress bar with glow effect.

**Content Management Quick Actions:**
- 3 action cards linking to: About Banner, Founder, Films editors.
- Each card has a colored icon, label, and description.

**Global Distribution Ledger:**
- A table of the latest 5 films showing: Asset Title, Release Year, Category (with colored badge), and Primary Platform.
- "Manage Assets →" link to the full films page.

---

### 7.4 Content Editors

| Page | Route | Operations |
|---|---|---|
| About Editor | `/admin/about` | Edit headline, accent text, description paragraphs, CTA button text, stats (value + label pairs) |
| Founder Editor | `/admin/producer` | Edit first name, last name, role, bio paragraphs, signature quote, upload/replace portrait image |
| Films List | `/admin/films` | View all films, filter by category, drag-to-reorder display order, delete films |
| Film Editor | `/admin/films/[id]` | Edit all fields (title, genre, year, category, OTT platform, release type), upload/replace/remove poster |

**Film Management Features:**
- `FilmsListClient.tsx` — A rich client-side interface for managing the film list.
- Category filter tabs.
- Drag-to-reorder functionality that batch-updates the `order` field via the `/api/admin/films/reorder` endpoint.
- Delete with confirmation.
- Click-to-navigate to the individual film editor.

---

## 8. Sanity CMS Schemas

### 8.1 Film (`film`)

The primary content type. Each film represents a movie in the portfolio.

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | ✅ | Film title |
| `slug` | `slug` | — | URL-safe identifier (auto-generated from title) |
| `genre` | `string` | — | e.g. "Horror / Thriller" |
| `poster` | `image` | ✅ | Poster with hotspot, alt text, and caption |
| `year` | `string` | — | Release year |
| `category` | `string` | ✅ | `"produced"` or `"distributed"` (radio buttons) |
| `ottPlatform` | `string` | — | e.g. "Amazon Prime", "Aha" |
| `releaseType` | `string` | — | `"theatrical"`, `"ott"`, or `"both"` |
| `order` | `number` | — | Display sort order (lower = first) |

**Field Groups:** Basic Info, Release Details, Media
**Orderings:** Display Order (asc), Year (desc)

### 8.2 Producer (`producer`) — Singleton

Singleton document (ID: `founderSettings`) representing the company founder.

| Field | Type | Description |
|---|---|---|
| `firstName` | `string` | Default: "Kandregula" |
| `lastName` | `string` | Default: "Adhinarayana" |
| `role` | `string` | Default: "Founder & Producer" |
| `portrait` | `image` | Portrait photo with hotspot, alt, caption |
| `bio` | `array<text>` | Array of bio paragraphs |
| `quote` | `string` | Signature quote |

### 8.3 About (`about`) — Singleton

Singleton document (ID: `aboutSettings`) for the About section.

| Field | Type | Description |
|---|---|---|
| `headline` | `string` | Primary heading |
| `headlineAccent` | `string` | Italic accent text |
| `description` | `array<text>` | Array of description paragraphs |
| `ctaText` | `string` | CTA button label |
| `stats` | `array<{value, label}>` | Statistics grid items |

### Studio Structure

The Sanity Studio (`/studio`) uses a custom structure:
- **Singletons** (About Banner, Founder Profile) open directly to their editor
- **Films** are split into "Produced Films" and "Distributed Films" filtered lists
- An "All Films Database" fallback list is also available
- Custom SKML Gold branded theme applied to the studio UI

---

## 9. API Reference

All admin API routes are serverless functions. They use the `writeClient` for Sanity mutations.

### Authentication

| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/login` | `POST` | Validates `{email, password}` against env vars, sets JWT cookie |
| `/api/auth/logout` | `POST` | Clears the `skml-admin-session` cookie |
| `/api/auth/session` | `GET` | Returns current session payload or `null` |

### Content Management

| Endpoint | Method | Body | Description |
|---|---|---|---|
| `/api/admin/about` | `PUT` | `{headline, headlineAccent, description[], ctaText, stats[]}` | Upsert about section |
| `/api/admin/producer` | `PUT` | `{firstName, lastName, role, bio[], quote}` | Upsert producer profile |
| `/api/admin/films` | `POST` | `{title, genre, year, category, ottPlatform, releaseType, posterAssetId?}` | Create new film |
| `/api/admin/films/[id]` | `PUT` | Same fields as POST | Update existing film |
| `/api/admin/films/[id]` | `DELETE` | — | Delete film + cleanup poster asset |
| `/api/admin/films/reorder` | `PUT` | `{updates: [{id, order}]}` | Batch update display order |
| `/api/admin/upload` | `POST` | `FormData {file, target}` | Upload image to Sanity CDN |

### Revalidation

| Endpoint | Method | Description |
|---|---|---|
| `/api/revalidate` | `POST` | Sanity webhook endpoint for on-demand ISR cache purging |

**Revalidation Logic:**
- Verifies a shared webhook secret via `x-sanity-webhook-secret` header or `?secret=` query param.
- Maps `_type` from the webhook body to cache tags: `film` → `["films"]`, `about` → `["about"]`, `producer` → `["producer"]`.
- Calls `revalidateTag()` for matching tags with immediate expiry.
- Also calls `revalidatePath("/", "layout")` and `revalidatePath("/movies", "page")` as a safety net.

### Upload Target Format
The `target` field in the upload API uses these formats:
- `"film:<sanity_document_id>"` — Links uploaded image as a film's poster
- `"producer"` — Links uploaded image as the producer's portrait

---

## 10. Authentication System

### Flow

```
Login Page ──POST /api/auth/login──▶ Validate credentials
                                         │
                                    ┌────▼────┐
                                    │ Create   │
                                    │ JWT      │
                                    │ (HS256)  │
                                    └────┬────┘
                                         │
                                    Set httpOnly cookie
                                    "skml-admin-session"
                                    (7-day expiry)
                                         │
                                    ┌────▼────┐
                                    │ Redirect │
                                    │ /admin   │
                                    └─────────┘
```

### Middleware (`proxy.ts`)

The middleware intercepts every request matching `/admin/:path*`:

1. **Skip** `/admin/login` (public)
2. **Read** the `skml-admin-session` cookie
3. **Verify** the JWT using `jose.jwtVerify()`
4. **Redirect** to `/admin/login` if missing or invalid (also clears stale cookie)
5. **Allow** through via `NextResponse.next()` if valid

### Session Utilities (`lib/auth.ts`)

| Function | Purpose |
|---|---|
| `createToken(payload)` | Signs a JWT with HS256, 7-day expiry |
| `verifyToken(token)` | Verifies and decodes a JWT |
| `setSession(payload)` | Creates token and sets httpOnly cookie |
| `getSession()` | Reads and verifies the session cookie |
| `clearSession()` | Deletes the session cookie |
| `validateCredentials(email, password)` | Checks against `ADMIN_EMAIL` and `ADMIN_PASSWORD` env vars |

### Security Features
- **httpOnly cookies** — Cannot be accessed by client-side JavaScript
- **Secure flag** — Enabled in production (HTTPS only)
- **SameSite: lax** — CSRF protection
- **7-day expiry** — Automatic session invalidation
- **Server-only tokens** — Sanity write token and admin credentials never reach the browser

---

## 11. Design System

### Color Palette (`globals.css`)

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#FFFFFF` | Main background |
| `--bg-secondary` | `#F5F5F8` | Section backgrounds |
| `--bg-dark` | `#0A0A0F` | Dark sections (Hero, Footer, WhyChooseUs, Contact card) |
| `--text-primary` | `#111118` | Headings |
| `--text-secondary` | `#2A2A38` | Body text |
| `--text-muted` | `#6A6A7A` | Secondary/muted text |
| `--accent` | `#111118` | CTA buttons |
| `--gold` | `#d4af37` | Gold accent (admin, film detail) |
| `--whatsapp` | `#25D366` | WhatsApp FAB |

### Animation System

| Animation | Trigger | Description |
|---|---|---|
| `scroll-up` / `scroll-down` | Auto (CSS) | Hero poster column scrolling |
| `fade-in-up` | Mount | Entry animation with delay classes |
| `animate-fade-in-up` | Mount | Tailwind-style fade-in-up utility |
| `scroll-reveal` | Intersection Observer | Fade + translateY on scroll |
| `scroll-reveal-left/right` | Intersection Observer | Directional slide reveals |
| `grain` | Auto (CSS) | Film grain noise overlay |
| `whatsapp-pulse` | Auto (CSS) | WhatsApp button glow pulse |
| `animate-slide-down` | Mount | Mobile menu slide-down entry |
| `fadeIn` | Mount | Generic fade-in (used in modals) |
| `slideUp` | Mount | Slide-up with spring easing (used in mobile modal) |

### Reveal Delay Classes
`reveal-delay-1` through `reveal-delay-6` (100ms increments) for staggered scroll animations.

### Component-Specific Styles
- `.hero-poster` — Scale + brightness on hover
- `.movie-card` — Poster zoom + overlay fade on hover
- `.movie-overlay` — Gradient overlay on movie cards
- `.service-card` — Lift + shadow on hover
- `.cta-glow` — Gradient sweep on hover
- `.noise-overlay` — Film grain texture via pseudo-element

---

## 12. SEO & Structured Data

### Metadata Strategy

Every page has comprehensive, page-specific metadata:

| Page | Title | Canonical URL |
|---|---|---|
| Landing | "SKML Motion Pictures \| Premium Film Production & Distribution" | `https://skmlmotionpictures.com` |
| About | "About Us \| SKML Motion Pictures" | `https://skmlmotionpictures.com/about` |
| Movies | "Our Films \| SKML Motion Pictures" | `https://skmlmotionpictures.com/movies` |
| Film Detail | "[Film Title] \| SKML Motion Pictures" | `https://skmlmotionpictures.com/films/[slug]` |

**Root Layout (`layout.tsx`) includes:**
- Title template: `"%s | SKML Motion Pictures"` — All child pages inherit this suffix.
- Comprehensive keyword list targeting Telugu cinema, Tollywood, OTT platforms.
- Open Graph tags with `locale: "en_IN"`, site name, and OG image.
- Twitter cards with `@SKMLMotion` creator handle.
- Robots directives: `index: true, follow: true`, with Google Bot max-preview settings.
- Apple Web App configuration: `capable: true`, `statusBarStyle: "black-translucent"`.
- Multiple icon formats: SVG and PNG.

### Structured Data (JSON-LD)

| Schema | Page | Data |
|---|---|---|
| `Organization` | Landing (`/`) | Company name, URL, logo, founder (Person), contact point, description |
| `Movie` | Film Detail (`/films/[slug]`) | Film name, year, genre, poster image, production company, OTT offers |

### Dynamic Sitemap (`sitemap.ts`)

Generates a sitemap at build time with:
- Static routes: `/` (priority 1.0, weekly), `/movies` (priority 0.9, weekly)
- Dynamic routes: `/films/[slug]` for every film in Sanity (priority 0.7, monthly)
- Graceful fallback if Sanity is unavailable.

---

## 13. Performance Optimizations

| Optimization | Implementation |
|---|---|
| **Parallel data fetching** | `Promise.all()` for concurrent Sanity queries on the landing page |
| **CDN-backed reads** | Read-only client uses `useCdn: true` for edge-cached responses |
| **Image optimization** | Sanity CDN with width/quality constraints per context (see below) |
| **Font optimization** | `next/font` with `display: "swap"` prevents FOIT |
| **Turbopack** | Development server uses Turbopack for faster HMR |
| **ISR + On-Demand Revalidation** | Pages are statically generated and only rebuild when content changes (via webhook) |
| **Fallback data** | All pages gracefully degrade with hardcoded fallback content if Sanity is unavailable |
| **60-second revalidation** | Safety net ISR fallback in addition to webhook-driven revalidation |

### Image Quality Tiers

| Context | Width | Quality | Purpose |
|---|---|---|---|
| Hero posters | 400px | 60% | Background imagery (blurred/overlaid, low detail needed) |
| FilmShowcase | 700px | 80% | Featured carousel |
| MoviesSection | 600px | 80% | Movie grid cards |
| Producer portrait | 800px | 85% | Founder section |
| Film detail page | 800px | 90% | Full detail view (highest quality) |
| Film detail hero BG | 1200px | 40% + blur(50) | Blurred cinematic background |
| OG Image | 1200px | 80% | Social sharing |

---

## 14. Environment Variables

Create a `.env.local` file in the project root:

```env
# ── Sanity CMS ──────────────────────────────────────
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# Generate from: sanity.io/manage > [Project] > API > Tokens
# Must have "Editor" or higher permissions
SANITY_API_WRITE_TOKEN=your_write_token

# ── Admin Authentication ────────────────────────────
ADMIN_EMAIL=admin@skml.com
ADMIN_PASSWORD=your_secure_password

# ── JWT ─────────────────────────────────────────────
# Random string for signing session tokens
JWT_SECRET=your_random_secret_string
```

| Variable | Scope | Required | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Client + Server | ✅ | Sanity project identifier |
| `NEXT_PUBLIC_SANITY_DATASET` | Client + Server | ✅ | Dataset name (usually `production`) |
| `SANITY_API_WRITE_TOKEN` | Server only | ✅ | Token for write operations |
| `ADMIN_EMAIL` | Server only | ✅ | Admin login email |
| `ADMIN_PASSWORD` | Server only | ✅ | Admin login password |
| `JWT_SECRET` | Server only | ✅ | JWT signing secret |

> ⚠️ **Important:** `NEXT_PUBLIC_` variables are exposed to the browser. The write token and credentials are server-only and never sent to the client.

---

## 15. Local Development

### Prerequisites
- **Node.js** v18+
- **npm** (or yarn/pnpm/bun)
- A Sanity project ([create one here](https://www.sanity.io/get-started))

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/StackXpvt/skml.git
cd skml

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.local.example .env.local
# Edit .env.local with your Sanity credentials

# 4. Start the dev server
npm run dev
```

### Available URLs

| URL | Description |
|---|---|
| `http://localhost:3000` | Public website |
| `http://localhost:3000/about` | About page |
| `http://localhost:3000/movies` | Movies listing page |
| `http://localhost:3000/services` | Services page |
| `http://localhost:3000/contact` | Contact page |
| `http://localhost:3000/films/[slug]` | Individual film page |
| `http://localhost:3000/admin/login` | Admin login page |
| `http://localhost:3000/admin` | Admin dashboard |
| `http://localhost:3000/studio` | Sanity Studio |

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 16. Deployment

### Vercel (Recommended)

This project is deployed on Vercel with zero configuration needed for the framework.

#### Step-by-Step

1. **Push code to GitHub**
2. **Import project** in [Vercel Dashboard](https://vercel.com/new)
3. **Add all environment variables** under Settings → Environment Variables
4. **Deploy** — Vercel auto-detects Next.js and runs `npm run build`

#### CLI Deployment

```bash
# Install and link
npx vercel link --yes

# Add environment variables
npx vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production --value "your_id" --yes

# Deploy to production
npx vercel --prod --yes
```

#### Post-Deployment Checklist

- [ ] All 6 environment variables are set in Vercel
- [ ] Sanity CORS origins include your Vercel URL (`sanity.io/manage` → API → CORS)
- [ ] Sanity webhook is configured to POST to `https://your-domain.vercel.app/api/revalidate`
- [ ] Admin login works at `your-domain.vercel.app/admin/login`
- [ ] Images load correctly from Sanity CDN
- [ ] WhatsApp links open correctly
- [ ] Dynamic film pages are accessible via `/films/[slug]`

### Image Configuration

The `next.config.ts` allowlists Sanity's CDN for remote images:

```typescript
images: {
  remotePatterns: [
    { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }
  ],
  qualities: [75, 80, 85],
}
```

---

*Engineered by [StackX](https://stackx.co.in). Last updated: July 2026.*
