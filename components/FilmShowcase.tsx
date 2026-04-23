"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export interface ShowcaseFilm {
  src: string;
  title: string;
  year?: string;
  genre?: string;
  category?: "produced" | "distributed";
  ottPlatform?: string;
  releaseType?: string;
}

interface FilmShowcaseProps {
  films?: ShowcaseFilm[];
}

const FALLBACK_FILMS: ShowcaseFilm[] = [
  { src: "/assets/images/poster-aghora.png", title: "Aghora" },
  { src: "/assets/images/poster-antha-akkade.png", title: "Antha Akkade" },
  { src: "/assets/images/poster-hello-baby.png", title: "Hello Baby" },
  { src: "/assets/images/poster-mr-lonely.png", title: "Mr. Lonely" },
  { src: "/assets/images/poster-prema-kadha.png", title: "Prema Kadha" },
];

export default function FilmShowcase({ films }: FilmShowcaseProps) {
  const FILMS = films && films.length > 0 ? films : FALLBACK_FILMS;
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [selectedFilm, setSelectedFilm] = useState<ShowcaseFilm | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const totalScroll = sectionHeight - viewportHeight;
      if (totalScroll <= 0) return;
      const rawProgress = scrolled / totalScroll;
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close modal on Escape + lock body scroll
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedFilm(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedFilm ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedFilm]);

  const getTranslateX = () => {
    if (!trackRef.current) return 0;
    const trackWidth = trackRef.current.scrollWidth;
    const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    const maxTranslate = trackWidth - viewportWidth;
    return -(progress * maxTranslate);
  };

  const isAtEnd = progress >= 0.95;
  const getReleaseLabel = (rt?: string) => {
    if (!rt) return null;
    if (rt === "theatrical") return "🎬 Theatrical";
    if (rt === "ott") return "📺 OTT";
    return "🎬 Theatrical + 📺 OTT";
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="film-showcase"
        style={{ position: "relative", height: "300vh", background: "#0A0A0F" }}
      >
        <div style={{
          position: "sticky", top: 0, height: "100vh", overflow: "hidden",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          {/* Header */}
          <div style={{
            maxWidth: "1100px", margin: "0 auto", width: "100%",
            padding: "0 2rem", marginBottom: "2.5rem",
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ height: "1px", width: "2rem", background: "rgba(255,255,255,0.3)" }} />
                <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.5)" }}>
                  Our Films
                </span>
              </div>
              <h2 style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 700, color: "#ffffff", lineHeight: 1.2, margin: 0,
              }}>
                Movies Produced Under This Banner
              </h2>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              opacity: isAtEnd ? 0 : 0.6, transition: "opacity 0.5s ease",
            }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em" }}>Scroll to explore</span>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.5)" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          {/* Film track */}
          <div
            ref={trackRef}
            style={{
              display: "flex", gap: "1.5rem",
              paddingLeft: "max(2rem, calc((100vw - 1100px) / 2 + 2rem))",
              paddingRight: "2rem",
              transform: `translateX(${getTranslateX()}px)`,
              transition: "transform 0.1s linear",
              alignItems: "flex-end",
            }}
          >
            {FILMS.map((film, i) => (
              <div
                key={film.title + i}
                onClick={() => setSelectedFilm(film)}
                style={{
                  position: "relative", flexShrink: 0,
                  width: "clamp(260px, 22vw, 340px)", aspectRatio: "2/3",
                  borderRadius: "0.75rem", overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  cursor: "pointer",
                }}
              >
                {film.src ? (
                  <Image
                    src={film.src}
                    alt={film.title}
                    fill
                    sizes="(max-width: 768px) 65vw, 22vw"
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                    unoptimized
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "rgba(255,255,255,0.05)" }} />
                )}
                {/* Hover overlay */}
                <div className="sc-film-hover">
                  <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.8)" }}>
                    View Details
                  </span>
                </div>
                {/* Title overlay */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "3rem 1.25rem 1.25rem",
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
                }}>
                  <p style={{ margin: 0, fontFamily: "var(--font-playfair), serif", fontSize: "1.125rem", fontWeight: 700, color: "#ffffff" }}>
                    {film.title}
                  </p>
                </div>
              </div>
            ))}

            {/* See More card */}
            <a
              href="/movies"
              style={{
                flexShrink: 0, width: "clamp(260px, 22vw, 340px)", aspectRatio: "2/3",
                borderRadius: "0.75rem", overflow: "hidden",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: "1.25rem", border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)", textDecoration: "none",
                transition: "all 0.4s ease", cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
            >
              <div style={{ width: "56px", height: "56px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <span style={{ fontSize: "14px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.7)" }}>
                See More
              </span>
            </a>
          </div>

          {/* Progress bar */}
          <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", padding: "0 2rem", marginTop: "2.5rem" }}>
            <div style={{ width: "100%", height: "2px", background: "rgba(255,255,255,0.08)", borderRadius: "9999px", overflow: "hidden" }}>
              <div style={{ width: `${progress * 100}%`, height: "100%", background: "#ffffff", borderRadius: "9999px", transition: "width 0.1s linear" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FILM DETAIL MODAL ── */}
      {selectedFilm && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
            padding: "1rem", animation: "scFadeIn 0.2s ease",
          }}
          onClick={() => setSelectedFilm(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="sc-modal-card"
          >
            {/* Close */}
            <button
              onClick={() => setSelectedFilm(null)}
              style={{
                position: "absolute", top: "0.5rem", right: "0.5rem", zIndex: 10,
                width: "24px", height: "24px", borderRadius: "50%",
                background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#fff",
              }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Poster */}
            <div className="sc-modal-thumb">
              {selectedFilm.src ? (
                <Image src={selectedFilm.src} alt={selectedFilm.title} fill style={{ objectFit: "cover" }} sizes="300px" unoptimized />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "#111" }} />
              )}
            </div>

            {/* Info */}
            <div className="sc-modal-info">
              <h2 style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "1.1rem", fontWeight: 600, color: "#fff",
                lineHeight: 1.3, margin: "0 0 0.25rem",
                overflow: "hidden", textOverflow: "ellipsis",
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const,
              }}>
                {selectedFilm.title}
              </h2>

              {(selectedFilm.year || selectedFilm.genre) && (
                <p style={{ margin: "0 0 0.65rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", display: "flex", gap: "0.35rem", alignItems: "center" }}>
                  {selectedFilm.year && <span>{selectedFilm.year}</span>}
                  {selectedFilm.year && selectedFilm.genre && <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>}
                  {selectedFilm.genre && <span>{selectedFilm.genre}</span>}
                </p>
              )}

              {/* Tags row */}
              <div style={{
                display: "flex", flexWrap: "wrap", gap: "0.35rem",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: "0.65rem", marginBottom: selectedFilm.ottPlatform ? "0.5rem" : 0,
              }}>
                {selectedFilm.category && (
                  <span style={{
                    padding: "0.15rem 0.45rem", fontSize: "0.6rem", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.06em", borderRadius: "4px",
                    background: selectedFilm.category === "produced" ? "#fff" : "transparent",
                    color: selectedFilm.category === "produced" ? "#000" : "#fff",
                    border: selectedFilm.category === "produced" ? "none" : "1px solid rgba(255,255,255,0.3)",
                  }}>
                    {selectedFilm.category}
                  </span>
                )}
                {selectedFilm.releaseType && (
                  <span style={{
                    padding: "0.15rem 0.45rem", fontSize: "0.6rem", fontWeight: 600,
                    borderRadius: "4px", color: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.05)",
                  }}>
                    {getReleaseLabel(selectedFilm.releaseType)}
                  </span>
                )}
              </div>

              {/* Platform */}
              {selectedFilm.ottPlatform && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem" }}>
                  <span style={{ color: "rgba(255,255,255,0.35)" }}>On</span>
                  <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{selectedFilm.ottPlatform}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scPopIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        .sc-film-hover {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.5); opacity: 0;
          transition: opacity 0.3s ease;
        }
        div:hover > .sc-film-hover { opacity: 1; }

        /* Modal card — mobile: vertical */
        .sc-modal-card {
          position: relative; display: flex; flex-direction: column;
          width: 100%; max-width: 260px;
          background: #111; border-radius: 0.75rem; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 40px rgba(0,0,0,0.8);
          animation: scPopIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        /* Desktop: horizontal */
        @media (min-width: 640px) {
          .sc-modal-card { flex-direction: row; max-width: 480px; }
        }
        .sc-modal-thumb {
          position: relative; width: 100%; aspect-ratio: 2/3;
          flex-shrink: 0; overflow: hidden; background: #000;
        }
        @media (min-width: 640px) {
          .sc-modal-thumb { width: 180px; aspect-ratio: unset; min-height: 240px; }
        }
        .sc-modal-info {
          padding: 1rem; display: flex; flex-direction: column;
        }
        @media (min-width: 640px) {
          .sc-modal-info { flex: 1; padding: 1.25rem; justify-content: center; min-width: 0; }
        }
      `}</style>
    </>
  );
}
