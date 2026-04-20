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

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MarqueeSection />
      <AboutSection />
      <ProducerSection />
      <ServicesSection />
      <FilmShowcase />
      <MoviesSection />
      <WhyChooseUs />
      <OTTPlatforms />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
