import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SKML Motion Pictures — a production house built on belief, founded by Kandregula Adhinarayana. Discover our origin, values, and behind-the-scenes process.",
  keywords: [
    "SKML Motion Pictures about",
    "Kandregula Adhinarayana",
    "Telugu film producer",
    "SKML history",
    "Tollywood production house",
  ],
  alternates: {
    canonical: "https://skmlmotionpictures.com/about",
  },
  openGraph: {
    url: "https://skmlmotionpictures.com/about",
    title: "About Us | SKML Motion Pictures",
    description:
      "A production house built not on budgets, but on belief. Learn about our story, founder, and cinematic vision.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SKML Motion Pictures About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | SKML Motion Pictures",
    description:
      "A production house built not on budgets, but on belief. Learn about our story, founder, and cinematic vision.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return <AboutClient />;
}
