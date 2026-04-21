import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/MarqueeSection";
import AboutSection from "@/components/AboutSection";
import ProducerSection from "@/components/ProducerSection";
import ServicesSection from "@/components/ServicesSection";
import FilmShowcase from "@/components/FilmShowcase";
import MoviesSection from "@/components/MoviesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import OTTPlatforms from "@/components/OTTPlatforms";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

import { getAbout, getProducer, getFilms } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export default async function Home() {
  // Fetch all CMS data in parallel
  const [aboutData, producerData, filmsData] = await Promise.all([
    getAbout().catch(() => null),
    getProducer().catch(() => null),
    getFilms().catch(() => []),
  ]);

  // Transform producer portrait to URL
  const producerPortraitUrl = producerData?.portrait
    ? urlFor(producerData.portrait).width(800).quality(85).url()
    : undefined;

  // Transform films for MoviesSection
  const moviesForSection = filmsData.map((f) => ({
    title: f.title,
    year: f.year || "",
    genre: f.genre || "",
    platform: f.ottPlatform || "",
    poster: f.poster ? urlFor(f.poster).width(600).quality(80).url() : "",
    category: f.category as "produced" | "distributed",
  }));

  // Transform films for FilmShowcase (first 5)
  const showcaseFilms = filmsData.slice(0, 5).map((f) => ({
    src: f.poster ? urlFor(f.poster).width(700).quality(80).url() : "",
    title: f.title,
  }));

  return (
    <main>
      <Navbar />
      <Hero />
      <MarqueeSection />
      <AboutSection
        headline={aboutData?.headline || undefined}
        headlineAccent={aboutData?.headlineAccent || undefined}
        description={aboutData?.description || undefined}
        ctaText={aboutData?.ctaText || undefined}
        stats={aboutData?.stats || undefined}
      />
      <ProducerSection
        firstName={producerData?.firstName || undefined}
        lastName={producerData?.lastName || undefined}
        role={producerData?.role || undefined}
        portraitUrl={producerPortraitUrl || undefined}
        bio={producerData?.bio || undefined}
        quote={producerData?.quote || undefined}
      />
      <ServicesSection />
      <FilmShowcase films={showcaseFilms.length > 0 ? showcaseFilms : undefined} />
      <MoviesSection films={moviesForSection.length > 0 ? moviesForSection : undefined} />
      <WhyChooseUs />
      <OTTPlatforms />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
