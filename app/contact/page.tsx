import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with SKML Motion Pictures — reach out for film production partnerships, OTT distribution enquiries, or creative collaborations. Based in Hyderabad, Telangana.",
  keywords: [
    "SKML Motion Pictures contact",
    "Telugu film production enquiry",
    "OTT distribution contact",
    "Hyderabad production house",
    "film collaboration India",
  ],
  alternates: {
    canonical: "https://skmlmotionpictures.com/contact",
  },
  openGraph: {
    url: "https://skmlmotionpictures.com/contact",
    title: "Contact Us | SKML Motion Pictures",
    description:
      "Reach out for film production, distribution, or creative collaboration. Let's create cinema together.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SKML Motion Pictures Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | SKML Motion Pictures",
    description:
      "Reach out for film production, distribution, or creative collaboration.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return <ContactClient />;
}
