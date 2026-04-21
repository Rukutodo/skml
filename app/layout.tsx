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

export const metadata: Metadata = {
  title: "SKML Motion Pictures | Premium Film Production & Distribution",
  description:
    "SKML Motion Pictures — A premier film production and distribution company producing high-quality cinema and navigating global distribution across theaters, Amazon Prime, and Aha. Founded by Kandregula Adhinarayana.",
  keywords: [
    "SKML Motion Pictures",
    "film production",
    "film distribution",
    "Telugu cinema",
    "movie production house",
    "OTT distribution",
    "Kandregula Adhinarayana",
    "Amazon Prime movies",
    "Aha movies",
  ],
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
