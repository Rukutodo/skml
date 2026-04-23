"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type MovieCategory = "produced" | "distributed";

export interface MovieItem {
  title: string;
  year: string;
  genre: string;
  platform: string;
  poster: string;
  category: MovieCategory;
  releaseType?: string;
  alt?: string;
  caption?: string;
}

interface MoviesSectionProps {
  films?: MovieItem[];
}

const FALLBACK_MOVIES: MovieItem[] = [
  { title: "Aghora", year: "2020", genre: "Horror / Thriller", platform: "Amazon Prime", poster: "/assets/images/poster-aghora.png", category: "produced" },
  { title: "Antha Akkade", year: "2021", genre: "Drama", platform: "Aha", poster: "/assets/images/poster-antha-akkade.png", category: "produced" },
  { title: "Hello Baby", year: "2023", genre: "Comedy / Drama", platform: "Amazon Prime", poster: "/assets/images/poster-hello-baby.png", category: "distributed" },
  { title: "Mr. Lonely", year: "2022", genre: "Romance / Drama", platform: "Aha", poster: "/assets/images/poster-mr-lonely.png", category: "produced" },
  { title: "Prema Kadha", year: "2021", genre: "Romance", platform: "Amazon Prime", poster: "/assets/images/poster-prema-kadha.png", category: "distributed" },
  { title: "Visakha Express", year: "2023", genre: "Thriller / Action", platform: "Aha", poster: "/assets/images/poster-visakha-express.png", category: "produced" },
];

const TABS: { label: string; value: MovieCategory | "all" }[] = [
  { label: "All Films", value: "all" },
  { label: "Produced", value: "produced" },
  { label: "Distributed", value: "distributed" },
];

const getReleaseLabel = (rt?: string) => {
  if (!rt) return null;
  if (rt === "theatrical") return "🎬 Theatrical";
  if (rt === "ott") return "📺 OTT";
  return "🎬 Theatrical + 📺 OTT";
};

export default function MoviesSection({ films }: MoviesSectionProps) {
  const MOVIES = films && films.length > 0 ? films : FALLBACK_MOVIES;

  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<MovieCategory | "all">("all");
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
  const [selectedFilm, setSelectedFilm] = useState<MovieItem | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredMovies = activeTab === "all" ? MOVIES : MOVIES.filter((m) => m.category === activeTab);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll(".scroll-reveal");
            els.forEach((el) => el.classList.add("revealed"));
          } else {
            const els = entry.target.querySelectorAll(".scroll-reveal");
            els.forEach((el) => el.classList.remove("revealed"));
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setRevealedCards((prev) => new Set([...prev, index]));
          } else {
            const index = Number(entry.target.getAttribute("data-index"));
            setRevealedCards((prev) => {
              const next = new Set(prev);
              next.delete(index);
              return next;
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, [filteredMovies]);

  useEffect(() => {
    setRevealedCards(new Set());
    const timeout = setTimeout(() => {
      cardRefs.current.forEach((ref, i) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            setRevealedCards((prev) => new Set([...prev, i]));
          }
        }
      });
    }, 100);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  // Escape key + body scroll lock
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedFilm(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedFilm ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedFilm]);

  return (
    <>
      <section ref={sectionRef} id="movies" className="section-padding" style={{ background: "#FFFFFF", overflow: "hidden" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Section Label */}
          <div className="scroll-reveal" style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ height: "1px", width: "3rem", background: "#6A6A7A" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#6A6A7A" }}>
              Our Portfolio
            </span>
          </div>

          {/* Heading + Tabs */}
          <div className="scroll-reveal" style={{ marginBottom: "3rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ maxWidth: "560px" }}>
              <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2.25rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#111118" }}>
                Featured Films
              </h2>
              <p style={{ marginTop: "1.25rem", fontSize: "15px", lineHeight: 1.7, color: "#2A2A38" }}>
                A curated showcase of films we&apos;ve brought to life — from production to global distribution.
              </p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: "flex", gap: "0.25rem", borderRadius: "9999px", border: "1px solid rgba(0,0,0,0.08)", background: "#F5F5F8", padding: "0.375rem", width: "fit-content" }}>
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  style={{
                    padding: "0.625rem 1.5rem", fontSize: "13px", fontWeight: 600,
                    borderRadius: "9999px", border: "none", cursor: "pointer",
                    transition: "all 0.3s ease",
                    background: activeTab === tab.value ? "#111118" : "transparent",
                    color: activeTab === tab.value ? "#ffffff" : "#6A6A7A",
                    boxShadow: activeTab === tab.value ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Movie Grid with Fade-out Bleed Effect */}
          <div style={{ position: "relative" }}>
            <div className="movies-grid" style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(2, 1fr)", 
              gap: "1.5rem",
              position: "relative"
            }}>
              {filteredMovies.slice(0, 9).map((movie, i) => (
                <div
                  key={`${movie.title}-${activeTab}`}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  data-index={i}
                  className="movie-card"
                  onClick={() => setSelectedFilm(movie)}
                  style={{
                    textDecoration: "none", cursor: "pointer",
                    opacity: revealedCards.has(i) ? 1 : 0,
                    transform: revealedCards.has(i) ? "translateY(0)" : "translateY(50px)",
                    transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms`,
                    visibility: i >= 9 ? 'hidden' : 'visible'
                  }}
                >
                  <div style={{ position: "relative", aspectRatio: "2/3", width: "100%", overflow: "hidden", borderRadius: "1rem", background: "#EBEBF0", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                    {movie.poster ? (
                      <Image
                        src={movie.poster}
                        alt={movie.alt || `${movie.title} movie poster`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                        className="movie-poster"
                        style={{ objectFit: "cover" }}
                        quality={80}
                        unoptimized={movie.poster.startsWith("https://")}
                      />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "#EBEBF0" }} />
                    )}
                    {/* Hover overlay */}
                    <div className="movie-overlay" style={{
                      position: "absolute", inset: 0, display: "flex",
                      flexDirection: "column", justifyContent: "flex-end",
                      padding: "1.25rem",
                      background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4) 40%, transparent 80%)",
                    }}>
                      <span className="movie-category-badge" style={{
                        display: "inline-block", width: "fit-content", fontWeight: 700,
                        textTransform: "uppercase", borderRadius: "9999px",
                        background: String(movie.category).toLowerCase() === "produced" ? "#ffffff" : "rgba(255,255,255,0.2)",
                        color: String(movie.category).toLowerCase() === "produced" ? "#000000" : "#ffffff",
                        border: String(movie.category).toLowerCase() === "distributed" ? "1px solid rgba(255,255,255,0.3)" : "none",
                        padding: "0.25rem 0.75rem", fontSize: "10px", letterSpacing: "0.15em",
                      }}>
                        {movie.category}
                      </span>
                    </div>
                  </div>
                  {/* Info below poster */}
                  <div className="movie-info" style={{ paddingLeft: "0.25rem" }}>
                    <h3 style={{ fontWeight: 700, color: "#111118" }}>{movie.title}</h3>
                    <p style={{ color: "#6A6A7A" }}>{movie.year} • {movie.genre}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bleed / Shade Overlay */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40%",
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.8) 40%, #ffffff 95%)",
              pointerEvents: "none",
              zIndex: 10
            }} />

            {/* View More CTA */}
            <div style={{
              position: "absolute",
              bottom: "-1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 20,
              textAlign: "center",
              width: "100%"
            }}>
              <a 
                href="/movies"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1.25rem 3rem",
                  background: "#111118",
                  color: "#ffffff",
                  borderRadius: "9999px",
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 20px 40px -10px rgba(0,0,0,0.2)";
                }}
              >
                Explore Full Catalog
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (min-width: 1024px) {
            .movies-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 2rem !important; }
          .movie-overlay { padding: 1rem; }
          .movie-category-badge { padding: 0.2rem 0.6rem; font-size: 8px; letter-spacing: 0.1em; }
          .movie-info { margin-top: 0.75rem; }
          .movie-info h3 { font-size: 0.85rem; }
          .movie-info p { font-size: 11px; margin-top: 0.15rem; }
          @media (min-width: 640px) {
            .movies-grid { gap: 1.5rem; }
            .movie-overlay { padding: 1.5rem; }
            .movie-category-badge { padding: 0.25rem 0.75rem; font-size: 9px; letter-spacing: 0.15em; }
            .movie-info { margin-top: 1rem; }
            .movie-info h3 { font-size: 1rem; }
            .movie-info p { font-size: 13px; margin-top: 0.25rem; }
          }
          @media (min-width: 1024px) {
            .movies-grid { grid-template-columns: repeat(3, 1fr); gap: 2rem; }
            .movie-overlay { padding: 1.75rem; }
            .movie-category-badge { padding: 0.3rem 0.875rem; font-size: 10px; }
            .movie-info { margin-top: 1.125rem; }
          }
        `}</style>
      </section>

      {/* ── FILM DETAIL MODAL ── */}
      {selectedFilm && (
        <div
          className="ms-backdrop"
          onClick={() => setSelectedFilm(null)}
        >
          <div className="ms-card" onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            <button className="ms-close" onClick={() => setSelectedFilm(null)}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Poster */}
            <div className="ms-thumb">
              {selectedFilm.poster ? (
                <Image src={selectedFilm.poster} alt={selectedFilm.title} fill style={{ objectFit: "cover" }} sizes="300px" unoptimized={selectedFilm.poster.startsWith("https://")} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "#111" }} />
              )}
            </div>

            {/* Info */}
            <div className="ms-info">
              <h2 className="ms-title">{selectedFilm.title}</h2>
              <p className="ms-meta">{selectedFilm.year}<span className="ms-dot"> • </span>{selectedFilm.genre}</p>

              <div className="ms-tags">
                <span className={`ms-badge ${String(selectedFilm.category).toLowerCase() === "produced" ? "ms-badge--produced" : "ms-badge--distributed"}`}>
                  {selectedFilm.category}
                </span>
                {selectedFilm.releaseType && (
                  <span className="ms-release-tag">{getReleaseLabel(selectedFilm.releaseType)}</span>
                )}
              </div>

              {selectedFilm.platform && (
                <div className="ms-platform">
                  <span className="ms-platform-label">On</span>
                  <span className="ms-platform-value">{selectedFilm.platform}</span>
                </div>
              )}
            </div>
          </div>

          <style jsx>{`
            @keyframes msFadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes msPopIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }

            .ms-backdrop {
              position: fixed; inset: 0; z-index: 9999;
              display: flex; align-items: center; justify-content: center;
              background: rgba(0,0,0,0.75); backdrop-filter: blur(8px);
              padding: 1rem; animation: msFadeIn 0.2s ease;
            }
            /* Mobile: vertical */
            .ms-card {
              position: relative; display: flex; flex-direction: column;
              width: 100%; max-width: 260px;
              background: #111; border-radius: 0.75rem; overflow: hidden;
              border: 1px solid rgba(255,255,255,0.1);
              box-shadow: 0 10px 40px rgba(0,0,0,0.8);
              animation: msPopIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .ms-thumb {
              position: relative; width: 100%; aspect-ratio: 2/3;
              flex-shrink: 0; overflow: hidden; background: #000;
            }
            .ms-info {
              padding: 1rem; display: flex; flex-direction: column;
            }
            /* Desktop: horizontal — image left, data right */
            @media (min-width: 640px) {
              .ms-card {
                flex-direction: row; max-width: 480px; min-height: 0;
              }
              .ms-thumb {
                width: 180px; aspect-ratio: unset; min-height: 240px;
              }
              .ms-info {
                flex: 1; padding: 1.25rem; justify-content: center; min-width: 0;
              }
            }
            .ms-close {
              position: absolute; top: 0.5rem; right: 0.5rem; z-index: 10;
              width: 24px; height: 24px; border-radius: 50%;
              background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
              border: 1px solid rgba(255,255,255,0.2);
              display: flex; align-items: center; justify-content: center;
              cursor: pointer; color: #fff; transition: background 0.2s;
            }
            .ms-close:hover { background: rgba(255,255,255,0.25); }
            .ms-title {
              font-family: var(--font-inter), sans-serif;
              font-size: 1.1rem; font-weight: 600; color: #fff;
              line-height: 1.3; margin: 0 0 0.25rem;
              overflow: hidden; text-overflow: ellipsis;
              display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
            }
            .ms-meta {
              margin: 0 0 0.65rem; font-size: 0.8rem; color: rgba(255,255,255,0.6);
            }
            .ms-dot { color: rgba(255,255,255,0.3); }
            .ms-tags {
              display: flex; flex-wrap: wrap; gap: 0.35rem;
              border-top: 1px solid rgba(255,255,255,0.1);
              padding-top: 0.65rem;
              margin-bottom: 0.5rem;
            }
            .ms-badge {
              padding: 0.15rem 0.45rem; font-size: 0.6rem; font-weight: 700;
              text-transform: uppercase; letter-spacing: 0.06em; border-radius: 4px;
            }
            .ms-badge--produced { background: #fff; color: #000; }
            .ms-badge--distributed { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.3); }
            .ms-release-tag {
              padding: 0.15rem 0.45rem; font-size: 0.6rem; font-weight: 600;
              border-radius: 4px; color: rgba(255,255,255,0.7);
              border: 1px solid rgba(255,255,255,0.15);
              background: rgba(255,255,255,0.05);
            }
            .ms-platform {
              display: flex; align-items: center; gap: 0.3rem; font-size: 0.75rem;
            }
            .ms-platform-label { color: rgba(255,255,255,0.35); }
            .ms-platform-value { color: rgba(255,255,255,0.8); font-weight: 500; }
          `}</style>
        </div>
      )}
    </>
  );
}
