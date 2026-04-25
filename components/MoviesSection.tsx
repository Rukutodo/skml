"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

const MAX_DISPLAY = 6;

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

  const allFiltered = activeTab === "all" ? MOVIES : MOVIES.filter((m) => m.category === activeTab);
  const filteredMovies = allFiltered.slice(0, MAX_DISPLAY);
  const hasMore = allFiltered.length > MAX_DISPLAY;
  const remainingCount = allFiltered.length - MAX_DISPLAY;

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
        <div className="ms-container">
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

          {/* Movie Grid */}
          <div className="movies-grid" style={{ display: "grid" }}>
            {filteredMovies.map((movie, i) => (
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

          {/* ── CINEMATIC "EXPLORE MORE" CTA ── */}
          {hasMore && (
            <a href="/movies" className="ms-explore-cta">
              {/* Left accent line */}
              <span className="ms-cta-line" />

              {/* Counter pill */}
              <span className="ms-cta-count">+{remainingCount}</span>

              {/* Text */}
              <span className="ms-cta-text">
                Explore all movies
              </span>

              {/* Arrow */}
              <span className="ms-cta-arrow">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          )}
        </div>
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
        </div>
      )}
    </>
  );
}
