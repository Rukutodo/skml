import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MoviesPageClient from "./MoviesPageClient";
import { getFilms } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "Our Films | SKML Motion Pictures",
  description:
    "Explore the complete filmography of SKML Motion Pictures — from productions to distributions across OTT and theatrical releases.",
};

// Fallback if Sanity has no data yet
const FALLBACK_FILMS = [
  { id: "1", title: "Aghora", year: "2020", genre: "Horror / Thriller", category: "produced" as const, ottPlatform: "Amazon Prime", poster: "/assets/images/poster-aghora.png" },
  { id: "2", title: "Antha Akkade", year: "2021", genre: "Drama", category: "produced" as const, ottPlatform: "Aha", poster: "/assets/images/poster-antha-akkade.png" },
  { id: "3", title: "Hello Baby", year: "2023", genre: "Comedy / Drama", category: "distributed" as const, ottPlatform: "Amazon Prime", poster: "/assets/images/poster-hello-baby.png" },
  { id: "4", title: "Mr. Lonely", year: "2022", genre: "Romance / Drama", category: "produced" as const, ottPlatform: "Aha", poster: "/assets/images/poster-mr-lonely.png" },
  { id: "5", title: "Prema Kadha", year: "2021", genre: "Romance", category: "distributed" as const, ottPlatform: "Amazon Prime", poster: "/assets/images/poster-prema-kadha.png" },
  { id: "6", title: "Visakha Express", year: "2023", genre: "Thriller / Action", category: "produced" as const, ottPlatform: "Aha", poster: "/assets/images/poster-visakha-express.png" },
];

export default async function MoviesPage() {
  const filmsData = await getFilms().catch(() => []);

  const films =
    filmsData.length > 0
      ? filmsData.map((f) => ({
          id: f._id,
          title: f.title,
          year: f.year || "",
          genre: f.genre || "",
          category: f.category,
          ottPlatform: f.ottPlatform || "",
          poster: f.poster ? urlFor(f.poster).width(800).quality(85).url() : "",
        }))
      : FALLBACK_FILMS;

  return (
    <>
      <Navbar />
      <MoviesPageClient films={films} />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
