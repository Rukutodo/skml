# SKML Motion Pictures — Technical Documentation

> A premium cinematic portfolio platform built with Next.js 16, Sanity CMS, and Framer Motion. Deployed on Vercel.

**Live Site:** [https://skml-delta.vercel.app](https://skml-delta.vercel.app)
**Repository:** [https://github.com/StackXpvt/skml](https://github.com/StackXpvt/skml)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Architecture](#3-architecture)
4. [Project Structure](#4-project-structure)
5. [Sanity CMS Schemas](#5-sanity-cms-schemas)
6. [API Reference](#6-api-reference)
7. [Authentication System](#7-authentication-system)
8. [Frontend Components](#8-frontend-components)
9. [Design System](#9-design-system)
10. [Admin Dashboard](#10-admin-dashboard)
11. [Environment Variables](#11-environment-variables)
12. [Local Development](#12-local-development)
13. [Deployment](#13-deployment)
14. [SEO & Performance](#14-seo--performance)

---

## 1. Project Overview

SKML Motion Pictures is a full-stack web platform for a Telugu film production and distribution house founded by **Kandregula Adhinarayana**. The platform serves two purposes:

- **Public Website** — An immersive, cinematic portfolio showcasing produced and distributed films with premium glassmorphic UI, scroll-driven animations, and responsive design.
- **Admin Dashboard** — A custom-built content management interface (at `/admin`) that allows the owner to manage films, producer bio, and about-page content without touching the raw Sanity Studio.

### Core Capabilities

| Capability | Description |
|---|---|
| Film Management | Full CRUD for films with poster upload, drag-to-reorder, category filtering |
| Producer Profile | Editable bio, portrait upload with hotspot cropping, signature quote |
| About Section | Dynamic headline, description paragraphs, statistics, CTA button |
| Image Pipeline | Client-side compression → server upload → Sanity CDN with automatic optimization |
| Auth | JWT-based admin authentication with httpOnly cookies and middleware protection |
| Theming | Admin dashboard supports 4 themes (Light, Dark, Midnight, Beige) |

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
| Deployment | Vercel | — |

### Typography
- **Primary (Sans):** Inter — Used for body text, UI elements
- **Display (Serif):** Playfair Display — Used for cinematic headings

Both fonts are loaded via `next/font/google` with `display: "swap"` for optimal performance.

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

---

## 4. Project Structure

```
skml/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── page.tsx                  # Landing page (SSR, parallel data fetching)
│   ├── loading.tsx               # Global loading skeleton
│   ├── globals.css               # Design system & animations
│   ├── icon.png                  # Favicon
│   ├── admin/                    # Custom Admin Dashboard
│   │   ├── layout.tsx            # Sidebar, theme switcher, mobile nav
│   │   ├── page.tsx              # Dashboard overview (stats, storage, film table)
│   │   ├── admin.css             # Admin-specific styles (4 themes)
│   │   ├── AdminSelect.tsx       # Reusable styled select component
│   │   ├── login/                # Login page
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
│   │   └── admin/
│   │       ├── about/route.ts    # PUT  — Update about section
│   │       ├── producer/route.ts # PUT  — Update producer profile
│   │       ├── upload/route.ts   # POST — Upload images to Sanity
│   │       └── films/
│   │           ├── route.ts      # POST — Create new film
│   │           ├── [id]/route.ts # PUT/DELETE — Update/delete film
│   │           └── reorder/route.ts # PUT — Batch reorder films
│   ├── films/
│   │   └── [slug]/page.tsx       # Dynamic film detail page (cinematic hero)
│   ├── movies/                   # Movies listing page
│   └── studio/                   # Sanity Studio (embedded at /studio)
│
├── components/                   # Reusable UI Components
│   ├── Navbar.tsx                # Floating navigation bar
│   ├── Hero.tsx                  # Full-screen cinematic hero with scrolling poster columns
│   ├── MarqueeSection.tsx        # Infinite scrolling text marquee
│   ├── AboutSection.tsx          # CMS-driven about section with stats
│   ├── ProducerSection.tsx       # Founder bio, portrait, quote
│   ├── ServicesSection.tsx       # Service cards (Production, Distribution, etc.)
│   ├── FilmShowcase.tsx          # Featured film carousel (produced only)
│   ├── MoviesSection.tsx         # Full movie grid with category tabs
│   ├── WhyChooseUs.tsx           # Interactive frosted-glass feature grid
│   ├── OTTPlatforms.tsx          # OTT platform logos section
│   ├── ContactSection.tsx        # Contact form with WhatsApp integration
│   ├── Footer.tsx                # Site footer
│   ├── FloatingWhatsApp.tsx      # Persistent WhatsApp FAB button
│   ├── ScrollingColumn.tsx       # Reusable vertical scrolling column
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
├── assets/images/                # Static image assets
├── public/assets/                # Public static files
├── proxy.ts                      # Next.js Middleware (JWT auth guard)
├── sanity.config.ts              # Sanity Studio configuration
├── sanity.cli.ts                 # Sanity CLI configuration
├── next.config.ts                # Next.js configuration (image domains)
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies & scripts
```

---

## 5. Sanity CMS Schemas

### 5.1 Film (`film`)

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

### 5.2 Producer (`producer`) — Singleton

Singleton document (ID: `founderSettings`) representing the company founder.

| Field | Type | Description |
|---|---|---|
| `firstName` | `string` | Default: "Kandregula" |
| `lastName` | `string` | Default: "Adhinarayana" |
| `role` | `string` | Default: "Founder & Producer" |
| `portrait` | `image` | Portrait photo with hotspot, alt, caption |
| `bio` | `array<text>` | Array of bio paragraphs |
| `quote` | `string` | Signature quote |

### 5.3 About (`about`) — Singleton

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

---

## 6. API Reference

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

### Upload Target Format
The `target` field in the upload API uses these formats:
- `"film:<sanity_document_id>"` — Links uploaded image as a film's poster
- `"producer"` — Links uploaded image as the producer's portrait

---

## 7. Authentication System

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

---

## 8. Frontend Components

### Landing Page Composition

The landing page (`app/page.tsx`) is a **server component** that fetches all CMS data in parallel using `Promise.all()`:

```typescript
const [aboutData, producerData, filmsData] = await Promise.all([
  getAbout().catch(() => null),
  getProducer().catch(() => null),
  getFilms().catch(() => []),
]);
```

### Component Breakdown

| Component | Type | Key Features |
|---|---|---|
| `Navbar` | Client | Floating, scroll-aware, mobile hamburger with slide-down animation |
| `Hero` | Client | Full-screen with scrolling poster columns, noise grain overlay |
| `MarqueeSection` | Client | Infinite horizontal text scroll |
| `AboutSection` | Client | CMS-driven headline, paragraphs, animated stats counter |
| `ProducerSection` | Client | Portrait with parallax, bio paragraphs, signature quote |
| `ServicesSection` | Client | Hover-lift service cards |
| `FilmShowcase` | Client | Featured films carousel (produced only, max 6) |
| `MoviesSection` | Client | Category-tabbed grid with Intersection Observer stagger animations |
| `WhyChooseUs` | Client | Interactive frosted-glass 2×2 grid with cinematic popups |
| `OTTPlatforms` | Client | Platform logo display |
| `ContactSection` | Client | Contact form with WhatsApp deep link |
| `Footer` | Server | Static footer |
| `FloatingWhatsApp` | Client | Persistent FAB with pulse animation |

### Film Detail Page (`/films/[slug]`)

A dynamic server-rendered page with:
- **Cinematic hero** — Blurred poster background with gradient overlay
- **Dynamic metadata** — Title and OpenGraph image generated from CMS data
- **Production details** — Genre, year, platform, release type
- **CTA button** — "Watch on [Platform]" (conditional on OTT availability)

---

## 9. Design System

### Color Palette (`globals.css`)

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#FFFFFF` | Main background |
| `--bg-secondary` | `#F5F5F8` | Section backgrounds |
| `--bg-dark` | `#0A0A0F` | Dark sections |
| `--text-primary` | `#111118` | Headings |
| `--text-muted` | `#6A6A7A` | Secondary text |
| `--accent` | `#111118` | CTA buttons |
| `--whatsapp` | `#25D366` | WhatsApp FAB |

### Animation System

| Animation | Trigger | Description |
|---|---|---|
| `scroll-up` / `scroll-down` | Auto (CSS) | Hero poster column scrolling |
| `fade-in-up` | Mount | Entry animation with delay classes |
| `scroll-reveal` | Intersection Observer | Fade + translateY on scroll |
| `scroll-reveal-left/right` | Intersection Observer | Directional slide reveals |
| `grain` | Auto (CSS) | Film grain noise overlay |
| `whatsapp-pulse` | Auto (CSS) | WhatsApp button glow pulse |

### Reveal Delay Classes
`reveal-delay-1` through `reveal-delay-6` (100ms increments) for staggered scroll animations.

### Component-Specific Styles
- `.hero-poster` — Scale + brightness on hover
- `.movie-card` — Poster zoom + overlay fade on hover
- `.service-card` — Lift + shadow on hover
- `.cta-glow` — Gradient sweep on hover

---

## 10. Admin Dashboard

### Layout

The admin dashboard uses a **sidebar + main content** layout:
- **Desktop:** Fixed 240px sidebar + scrollable main area
- **Mobile:** Bottom navigation bar + hamburger overlay sidebar

### Theme System

4 built-in themes persisted to `localStorage` (key: `skml-admin-theme`):

| Theme | Background |
|---|---|
| Light | `#FFFFFF` |
| Dark | `#12141C` |
| Midnight | `#0F172A` |
| Beige | `#F7F3F0` |

### Dashboard Overview (`/admin`)

Server component that fetches real-time data from Sanity:
- **Stats cards** — Total Films, Produced count, Distributed count, About status
- **Storage widget** — Cloud storage usage (images + assets) against 500MB capacity
- **Film ledger** — Table of latest 5 films with category badges

### Content Editors

| Page | Route | Operations |
|---|---|---|
| About Editor | `/admin/about` | Edit headline, accent, paragraphs, CTA, stats |
| Founder Editor | `/admin/producer` | Edit name, role, bio, quote, upload portrait |
| Films List | `/admin/films` | View all, filter by category, drag-reorder, delete |
| Film Editor | `/admin/films/[id]` | Edit all fields, upload/replace/remove poster |

---

## 11. Environment Variables

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

## 12. Local Development

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
| `http://localhost:3000/admin/login` | Admin login page |
| `http://localhost:3000/admin` | Admin dashboard |
| `http://localhost:3000/studio` | Sanity Studio |
| `http://localhost:3000/films/[slug]` | Individual film page |

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 13. Deployment

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
- [ ] Admin login works at `your-domain.vercel.app/admin/login`
- [ ] Images load correctly from Sanity CDN

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

## 14. SEO & Performance

### SEO

- **Metadata:** Comprehensive `title`, `description`, and `keywords` set in root layout
- **Dynamic OG images:** Film detail pages generate OpenGraph images from Sanity posters
- **Semantic HTML:** Proper heading hierarchy, landmark elements
- **Alt text:** All Sanity images support custom alt text and captions

### Performance Optimizations

- **Parallel data fetching:** `Promise.all()` for concurrent Sanity queries on the landing page
- **CDN-backed reads:** Read-only client uses `useCdn: true` for edge-cached responses
- **Image optimization:** Sanity CDN with width/quality constraints per context:
  - Hero posters: 400px width, 60% quality
  - Showcase: 700px width, 80% quality
  - Film detail: 800px width, 90% quality
- **Font optimization:** `next/font` with `display: "swap"` prevents FOIT
- **Turbopack:** Development server uses Turbopack for faster HMR

---

*Last updated: April 2026*
