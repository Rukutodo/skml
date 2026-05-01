import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const BASE_URL = "https://skmlmotionpictures.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  /* ── Core ── */
  title: {
    default: "SKML Motion Pictures | Premium Film Production & Distribution",
    template: "%s | SKML Motion Pictures",
  },
  description:
    "SKML Motion Pictures — A premier film production and distribution company producing high-quality Telugu cinema and navigating global distribution across theaters, Amazon Prime, and Aha. Founded by Kandregula Adhinarayana.",
  keywords: [
    "SKML Motion Pictures",
    "SKML Films",
    "film production",
    "film distribution",
    "Telugu cinema",
    "Telugu movies",
    "movie production house India",
    "OTT distribution",
    "Kandregula Adhinarayana",
    "Amazon Prime Telugu movies",
    "Aha movies",
    "Indian film production company",
    "Tollywood production house",
  ],
  authors: [{ name: "Kandregula Adhinarayana", url: BASE_URL }],
  creator: "SKML Motion Pictures",
  publisher: "SKML Motion Pictures",
  category: "entertainment",

  /* ── Robots / Indexing ── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Open Graph ── */
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "SKML Motion Pictures",
    title: "SKML Motion Pictures | Premium Film Production & Distribution",
    description:
      "A premier film production and distribution company producing high-quality Telugu cinema. Distributed across theaters, Amazon Prime, and Aha.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SKML Motion Pictures — Premium Film Production & Distribution",
      },
    ],
  },

  /* ── Twitter / X Card ── */
  twitter: {
    card: "summary_large_image",
    title: "SKML Motion Pictures | Premium Film Production & Distribution",
    description:
      "A premier Telugu film production and distribution company. Films on Amazon Prime, Aha, and theatrical releases.",
    images: ["/og-image.jpg"],
    creator: "@SKMLMotion",
    site: "@SKMLMotion",
  },

  /* ── Icons ── */
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png" },
    ],
  },

  /* ── iOS / Mobile Optimization ── */
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SKML Motion Pictures",
  },
  formatDetection: {
    telephone: true,
  },

  /* ── Canonical & alternates ── */
  alternates: {
    canonical: BASE_URL,
  },

  /* ── Verification (add real tokens when available) ── */
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN",
  //   yandex: "YOUR_YANDEX_TOKEN",
  // },

  /* ── Other ── */
  other: {
    "search": "/opensearch.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
