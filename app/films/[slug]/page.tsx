import { getFilmBySlug } from "@/lib/sanity/queries";
import { notFound } from "next/navigation";
import { urlFor } from "@/lib/sanity/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const film = await getFilmBySlug(slug);
  if (!film) return { title: "Film Not Found" };

  return {
    title: `${film.title} | SKML Motion Pictures`,
    description: `Details about the film ${film.title} produced/distributed by SKML.`,
    openGraph: {
      images: [film.poster ? urlFor(film.poster).url() : ""],
    },
  };
}

export default async function FilmPage({ params }: Props) {
  const { slug } = await params;
  const film = await getFilmBySlug(slug);

  if (!film) notFound();

  const posterUrl = film.poster ? urlFor(film.poster).width(800).quality(90).url() : "";
  const bgUrl = film.poster ? urlFor(film.poster).width(1200).quality(40).blur(50).url() : "";

  return (
    <div style={{ background: "#050505", color: "#fff", minHeight: "100vh" }}>
      <Navbar />
      
      {/* Cinematic Hero */}
      <div style={{ position: "relative", height: "70vh", width: "100%", overflow: "hidden" }}>
        <div style={{ 
          position: "absolute", inset: 0, 
          backgroundImage: `url(${bgUrl})`, backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.3) contrast(1.1)", opacity: 0.6
        }} />
        <div style={{ 
          position: "absolute", inset: 0, 
          background: "linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.8) 70%, #050505 100%)" 
        }} />
        
        <div style={{ 
          position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)",
          textAlign: "center", width: "100%", maxWidth: "800px", padding: "0 2rem"
        }}>
          <h1 style={{ 
            fontSize: "clamp(2.5rem, 8vw, 5rem)", fontFamily: "var(--font-playfair)", fontWeight: 700,
            marginBottom: "1rem", letterSpacing: "-0.02em"
          }}>{film.title}</h1>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", color: "rgba(255,255,255,0.6)", fontSize: "1.125rem" }}>
            <span>{film.year}</span>
            <span>•</span>
            <span>{film.genre}</span>
            <span>•</span>
            <span style={{ color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{film.category}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "1200px", margin: "-100px auto 0", position: "relative", zIndex: 10, padding: "0 2rem 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem" }}>
          {/* Poster Column */}
          <div style={{ 
            borderRadius: "12px", overflow: "hidden", 
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.1)"
          }}>
            <img src={posterUrl} alt={film.title} style={{ width: "100%", height: "auto", display: "block" }} />
          </div>

          {/* Details Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", paddingTop: "120px" }}>
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem", color: "var(--gold)" }}>Production Insight</h2>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: "1.125rem" }}>
                {film.title} represents SKML's commitment to cinematic excellence. 
                As a {film.category} project, it showcases our unique approach to storytelling 
                and distribution in the modern film landscape.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Genre</p>
                <p style={{ fontSize: "1.125rem", fontWeight: 500 }}>{film.genre}</p>
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Year</p>
                <p style={{ fontSize: "1.125rem", fontWeight: 500 }}>{film.year}</p>
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Platform</p>
                <p style={{ fontSize: "1.125rem", fontWeight: 500 }}>{film.ottPlatform || "Theatrical Release"}</p>
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", textTransform: "uppercase", marginBottom: "0.5rem" }}>Release</p>
                <p style={{ fontSize: "1.125rem", fontWeight: 500 }}>{film.releaseType || "Worldwide"}</p>
              </div>
            </div>

            {film.ottPlatform && (
              <a href="#" style={{ 
                background: "var(--gold)", color: "#000", padding: "1.25rem", borderRadius: "99px",
                textAlign: "center", fontWeight: 700, textDecoration: "none", marginTop: "1rem",
                display: "block", transition: "transform 0.2s ease"
              }}>
                Watch on {film.ottPlatform}
              </a>
            )}
            
            <a href="/" style={{ 
              color: "rgba(255,255,255,0.5)", textAlign: "center", fontSize: "0.875rem", 
              textDecoration: "none", marginTop: "0.5rem" 
            }}>
              ← Back to Collection
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
