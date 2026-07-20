# 🎬 SKML Motion Pictures With PR Template Something

Welcome to the official repository for **SKML Motion Pictures** — a premium, highly dynamic, and responsive web application built to showcase a curated portfolio of produced and distributed films.

This project features a modern frontend for visitors to explore films, alongside a custom-built Admin Dashboard integrated with Sanity CMS for seamless content management.

![SKML Motion Pictures Overview](/public/favicon.ico) *(Note: Ensure the logo image exists in this path or update accordingly)*

---

## 🌟 Overview

The SKML Motion Pictures website is designed with a premium, cinematic aesthetic. It provides users with a fluid, interactive experience while exploring the production company's catalogue of films. The application is fully responsive, optimized for performance and SEO, and boasts smooth micro-animations.

Behind the scenes, the site is powered by a custom Next.js server-side rendered architecture, communicating with Sanity CMS. It also features a secure, custom Admin Dashboard for managing movies, producers, and general site content.

## 🚀 Tech Stack & Architecture

This project is built using modern, industry-standard web technologies and follows a decoupled architecture pattern, separating the frontend presentation layer from the headless CMS backend.

### Core Technologies
- **Framework:** [Next.js](https://nextjs.org/) (App Router, v16+) - Handles server-side rendering, API routes, and routing.
- **Language:** TypeScript - Provides type safety across the entire application.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS (`globals.css`) - For utility-first styling and custom complex animations/layouts.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & Native CSS - Used extensively for scroll reveals, component entry animations, and interactive elements.
- **Content Management:** [Sanity CMS](https://www.sanity.io/) (`next-sanity`, `@sanity/vision`) - A headless CMS storing all dynamic data (films, producers, about section).
- **Authentication:** Custom JWT-based admin authentication using `jose`.
- **Media Handling:** `browser-image-compression` for client-side uploads, Next.js `<Image />` for optimized delivery.

### System Architecture
1. **Frontend Client (Next.js):** The public-facing UI. Fetches data statically at build time and revalidates via ISR (Incremental Static Regeneration) on-demand using webhooks.
2. **Admin Dashboard (Next.js Client/Server):** A custom built dashboard located under `/admin`. Uses protected API routes for communicating with Sanity.
3. **API Layer (Next.js Route Handlers):** Located in `app/api/`. Acts as a proxy between the frontend/admin and Sanity, ensuring secure operations (CRUD) without exposing private Sanity tokens to the client.
4. **Backend/Database (Sanity):** Stores all structured content and media assets.

## 🎨 UI & Design System

The visual language of SKML Motion Pictures emphasizes a "Premium Cinematic" aesthetic.

- **Color Palette:**
  - Backgrounds: Deep cinematic blacks (`#000000`, `#0a0a0a`) with subtle dark grays.
  - Accents: Gold/Amber (`#d4af37`, `#e5b80b`) for a touch of prestige and elegance.
  - Text: High-contrast white (`#ffffff`) for headings and softened grays (`#a1a1aa`, `#d1d5db`) for readable body text.
- **Typography:**
  - Headings: Bold, commanding fonts (typically sans-serif like Inter or a serif like Playfair Display).
  - Body: Clean, readable sans-serif (Inter).
- **UI Elements:**
  - **Glassmorphism:** Used in navigation and floating elements for a modern layered feel.
  - **Hover States:** Interactive elements scale slightly, adjust brightness, or reveal underlying details (e.g., Movie Cards showing descriptions on hover).
  - **Micro-Animations:** Fade-ins, slide-ups on scroll, staggered list appearances.

### Key Components
- **Navbar:** Sticky, glassmorphic header with responsive mobile menu.
- **Hero / MarqueeSection:** Dynamic entry points grabbing user attention with auto-scrolling logos or cinematic visuals.
- **MoviesSection / FilmShowcase:** Grid layouts showcasing posters with hover overlays for details.
- **ProducerSection:** Clean layout for spotlighting key personnel.
- **FloatingWhatsApp:** Fixed contact widget for instant communication.
- **Footer:** Comprehensive site map and legal links.

## ✨ Key Features

- **Dynamic Cinematic Design:** A premium UI with dark/light themes, smooth scrolling, and scroll-reveal micro-animations.
- **Film Portfolio:** A categorized (Produced vs. Distributed) movie gallery that gracefully adapts to mobile and desktop.
- **Custom Admin Dashboard:** A beautifully crafted, secure login page and dashboard. Replaces generic browser dialogs with custom branded UI elements.
- **Sanity CMS Integration:** Real-time content synchronization. Easy-to-use editor schemas for managing Producer details and Movie entries.
- **Advanced SEO:** Server-side generated metadata, Open Graph tags, and Twitter cards to ensure perfect search engine visibility and social sharing.
- **Performance Optimized:** Employs Next.js Image components, proper font loading, and responsive design principles.

---

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (Pages, Layouts, API routes)
│   ├── admin/            # Custom Admin Dashboard & Login
│   ├── api/              # API endpoints (Auth, Sanity webhooks, CRUD proxies)
│   ├── (public pages)    # Home, Movies, About, Services, etc.
│   └── globals.css       # Global styles and custom CSS variables
├── components/           # Reusable UI components
│   ├── about/            # Components specific to the About page
│   ├── skeletons/        # Loading skeleton fallbacks
│   └── (shared files)    # Navbar, Footer, Hero, MoviesSection, etc.
├── docs/                 # Detailed architectural and setup documentation
├── lib/                  # Utility functions (auth, sanity client wrappers)
├── public/               # Static assets (Images, Fonts, Favicons)
└── sanity/               # Sanity CMS configuration and schemas
```

## 🛠️ Installation & Setup

### Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- A [Sanity.io](https://www.sanity.io/) account

### 1. Clone the repository

```bash
git clone https://github.com/skmlmotionpictures/skml.git
cd "skml motion pictures/final code"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory. You will need to populate it with your specific Sanity credentials and JWT secrets:

```env
# Next.js Application URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03

# Sanity API Token (for write access in Admin Dashboard)
SANITY_API_TOKEN=your_sanity_api_read_write_token

# Admin Authentication
JWT_SECRET=your_super_secret_jwt_string
ADMIN_EMAIL=admin@skml.com
ADMIN_PASSWORD=your_secure_password
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📝 Content Management (Sanity Studio)

The content backend is managed via Sanity. The studio configuration is embedded directly within the Next.js app (often accessible via `/admin/studio` or `/studio` depending on routing config).

To manage data directly from the CLI:
1. Navigate to the `/sanity` directory (if applicable, else root).
2. Run `npx sanity start` or `npm run dev` to access the local studio.
3. Schemas for **Movies**, **Producers**, and other entities are located in the `sanity/schemaTypes` or similar configured folder.

## 🔐 Admin Dashboard Access

To access the custom admin panel:
1. Navigate to `/admin/login`
2. Enter the credentials defined in your `.env.local` (`ADMIN_EMAIL` & `ADMIN_PASSWORD`).
3. From here, you can seamlessly add, edit, or delete movies and producer data with a custom, branded UI experience without ever touching the Sanity interface.

---

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Runs the built production application.
- `npm run lint`: Runs ESLint to check for code issues.

## 📚 Documentation

- [API Reference](./API.md) - Details on internal API routes and integrations.
- [Docs Directory](./docs) - Further architectural reading.

## 👨‍💻 Credits

Design and Development by **[StackX](https://github.com/skmlmotionpictures)**.
*Made with Next.js, Sanity, and a lot of coffee.*
