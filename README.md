# 🎬 SKML Motion Pictures

Welcome to the official website repository for **SKML Motion Pictures** — a premium, highly dynamic, and responsive web application built to showcase a curated portfolio of produced and distributed films.

This project features a modern frontend for visitors to explore films, alongside a custom-built Admin Dashboard integrated with Sanity CMS for seamless content management.

![SKML Motion Pictures Overview](/assets/images/skml-logo.png) *(Note: Ensure the logo image exists in this path or update accordingly)*

---

## 🌟 Overview

The SKML Motion Pictures website is designed with a premium, cinematic aesthetic. It provides users with a fluid, interactive experience while exploring the production company's catalogue of films. The application is fully responsive, optimized for performance and SEO, and boasts smooth micro-animations.

Behind the scenes, the site is powered by a custom Next.js server-side rendered architecture, communicating with Sanity CMS. It also features a secure, custom Admin Dashboard for managing movies, producers, and general site content.

## 🚀 Tech Stack

This project is built using modern, industry-standard web technologies:

- **Framework:** [Next.js](https://nextjs.org/) (App Router, v16+)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS for specific UI components
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & native CSS transitions
- **Content Management:** [Sanity CMS](https://www.sanity.io/) (`next-sanity`, `@sanity/vision`)
- **Authentication:** Custom JWT-based admin authentication using `jose`
- **Media Handling:** `browser-image-compression` for client-side uploads

## ✨ Key Features

- **Dynamic Cinematic Design:** A premium UI with dark/light themes, smooth scrolling, and scroll-reveal micro-animations.
- **Film Portfolio:** A categorized (Produced vs. Distributed) movie gallery that gracefully adapts to mobile (6 items) and desktop (8 items).
- **Custom Admin Dashboard:** A beautifully crafted, secure login page and dashboard. Replaces generic browser dialogs with custom branded UI elements.
- **Sanity CMS Integration:** Real-time content synchronization. Easy-to-use editor schemas for managing Producer details and Movie entries.
- **Advanced SEO:** Server-side generated metadata, Open Graph tags, and Twitter cards to ensure perfect search engine visibility and social sharing.
- **Performance Optimized:** Employs Next.js Image components, proper font loading (Inter, Playfair Display), and responsive design principles.

---

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (Pages, Layouts, API routes)
│   ├── admin/            # Custom Admin Dashboard & Login
│   ├── api/              # API endpoints (Auth, Sanity webhooks, etc.)
│   └── (public pages)    # Home, Movies, About, etc.
├── components/           # Reusable UI components (MoviesSection, Navbar, etc.)
├── docs/                 # Detailed architectural and setup documentation
├── lib/                  # Utility functions and library wrappers
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
1. Navigate to the `/sanity` directory.
2. Run `npx sanity manage` to open the Sanity project dashboard.
3. Schemas for **Movies**, **Producers**, and other entities are located in the `sanity/schemas` folder.

## 🔐 Admin Dashboard Access

To access the custom admin panel:
1. Navigate to `/admin/login`
2. Enter the credentials defined in your `.env.local` (`ADMIN_EMAIL` & `ADMIN_PASSWORD`).
3. From here, you can seamlessly add, edit, or delete movies and producer data with a custom, branded UI experience.

---

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Runs the built production application.
- `npm run lint`: Runs ESLint to check for code issues.

## 📚 Further Reading

For a deeper dive into the architectural breakdown, deployment guides, and advanced configurations, please check the [`docs/`](./docs/README.md) directory within this repository.

## 👨‍💻 Credits

Design and Development by **[StackX](https://github.com/skmlmotionpictures)**.
*Made with Next.js, Sanity, and a lot of coffee.*
