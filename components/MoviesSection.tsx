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

export default function MoviesSection({ films }: MoviesSectionProps) {
  const MOVIES = films && films.length > 0 ? films : FALLBACK_MOVIES;

  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<MovieCategory | "all">("all");
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
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

  return (
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
        <div className="scroll-reveal" style={{ marginBottom: "3rem", display: "flex", flexDirection: "column", gap: "2rem" }} >
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
                  padding: "0.625rem 1.5rem",
                  fontSize: "13px",
                  fontWeight: 600,
                  borderRadius: "9999px",
                  border: "none",
                  cursor: "pointer",
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

        {/* Movie Grid */}
        <div className="movies-grid" style={{ display: "grid" }}>
          {filteredMovies.map((movie, i) => (
            <div
              key={`${movie.title}-${activeTab}`}
              ref={(el) => { cardRefs.current[i] = el; }}
              data-index={i}
              className="movie-card"
              style={{
                cursor: "pointer",
                opacity: revealedCards.has(i) ? 1 : 0,
                transform: revealedCards.has(i) ? "translateY(0)" : "translateY(50px)",
                transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms`,
              }}
            >
              <div style={{ position: "relative", aspectRatio: "2/3", width: "100%", overflow: "hidden", borderRadius: "1rem", background: "#EBEBF0", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <Image
                  src={movie.poster}
                  alt={`${movie.title} movie poster`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  className="movie-poster"
                  style={{ objectFit: "cover" }}
                  quality={80}
                  unoptimized={movie.poster.startsWith("https://")}
                />
                <div className="movie-overlay" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.3) 50%, transparent)" }}>
                  <span className="movie-category-badge" style={{
                    display: "inline-block",
                    width: "fit-content",
                    marginBottom: "0.5rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    borderRadius: "9999px",
                    background: movie.category === "produced" ? "#ffffff" : "rgba(255,255,255,0.2)",
                    color: movie.category === "produced" ? "#000000" : "#ffffff",
                    border: movie.category === "distributed" ? "1px solid rgba(255,255,255,0.3)" : "none",
                  }}>
                    {movie.category}
                  </span>
                  <h3 className="movie-overlay-title" style={{ fontWeight: 700, color: "#ffffff" }}>{movie.title}</h3>
                  <p className="movie-overlay-year" style={{ color: "rgba(255,255,255,0.6)" }}>{movie.year} • {movie.genre}</p>
                  <p className="movie-overlay-platform" style={{ fontWeight: 600, textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{movie.platform}</p>
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
      </div>

      <style jsx>{`
        /* Mobile default (2 columns) */
        .movies-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .movie-overlay { padding: 1rem; }
        .movie-category-badge {
          padding: 0.2rem 0.6rem;
          font-size: 8px;
          letter-spacing: 0.1em;
        }
        .movie-overlay-title { font-size: 0.9rem; }
        .movie-overlay-year { font-size: 0.75rem; margin-top: 0.2rem; }
        .movie-overlay-platform { font-size: 0.55rem; letter-spacing: 0.05em; margin-top: 0.1rem; }
        
        .movie-info { margin-top: 0.75rem; }
        .movie-info h3 { font-size: 0.85rem; }
        .movie-info p { font-size: 11px; margin-top: 0.15rem; }

        @media (min-width: 640px) {
          .movies-grid { gap: 1.5rem; }
          .movie-overlay { padding: 1.5rem; }
          .movie-category-badge { padding: 0.25rem 0.75rem; font-size: 9px; letter-spacing: 0.15em; }
          .movie-overlay-title { font-size: 1.1rem; }
          .movie-overlay-year { font-size: 0.85rem; margin-top: 0.3rem; }
          .movie-overlay-platform { font-size: 0.65rem; letter-spacing: 0.1em; margin-top: 0.15rem; }
          
          .movie-info { margin-top: 1rem; }
          .movie-info h3 { font-size: 1rem; }
          .movie-info p { font-size: 13px; margin-top: 0.25rem; }
        }
        
        @media (min-width: 1024px) {
          .movies-grid { grid-template-columns: repeat(3, 1fr); gap: 2rem; }
          .movie-overlay { padding: 1.75rem; }
          .movie-category-badge { padding: 0.3rem 0.875rem; font-size: 10px; }
          .movie-overlay-title { font-size: 1.25rem; }
          .movie-overlay-year { font-size: 0.875rem; margin-top: 0.375rem; }
          .movie-overlay-platform { font-size: 0.6875rem; }
          .movie-info { margin-top: 1.125rem; }
        }
      `}</style>
    </section>
  );
}
