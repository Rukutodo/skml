"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Film {
  id: string;
  title: string;
  year: string;
  genre: string;
  category: "produced" | "distributed";
  ottPlatform: string;
  poster: string;
}

interface MoviesPageClientProps {
  films: Film[];
}

type FilterTab = "all" | "produced" | "distributed";

export default function MoviesPageClient({ films }: MoviesPageClientProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filtered = activeTab === "all" ? films : films.filter((f) => f.category === activeTab);

  const producedCount = films.filter((f) => f.category === "produced").length;
  const distributedCount = films.filter((f) => f.category === "distributed").length;

  // Scroll-triggered staggered card reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setRevealedCards((prev) => new Set([...prev, idx]));
          } else {
            setRevealedCards((prev) => {
              const next = new Set(prev);
              next.delete(idx);
              return next;
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [filtered]);

  // Reset reveals on tab switch
  useEffect(() => {
    setRevealedCards(new Set());
    const t = setTimeout(() => {
      cardRefs.current.forEach((ref, i) => {
        if (ref && ref.getBoundingClientRect().top < window.innerHeight) {
          setRevealedCards((prev) => new Set([...prev, i]));
        }
      });
    }, 80);
    return () => clearTimeout(t);
  }, [activeTab]);



  const TABS: { label: string; value: FilterTab; count: number }[] = [
    { label: "All Films", value: "all", count: films.length },
    { label: "Produced", value: "produced", count: producedCount },
    { label: "Distributed", value: "distributed", count: distributedCount },
  ];

  return (
    <>
      {/* ── HERO BANNER ── */}
      <section
        style={{
          position: "relative",
          minHeight: "50vh",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          background: "#0A0A0F",
          paddingBottom: "4rem",
          paddingTop: "8rem",
          overflow: "hidden",
        }}
      >
        {/* Film grain texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ textAlign: "center", position: "relative", zIndex: 1, padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ height: "1px", width: "3rem", background: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>
              Our Filmography
            </span>
            <div style={{ height: "1px", width: "3rem", background: "rgba(255,255,255,0.2)" }} />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Every Frame,{" "}
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>
              A Story
            </span>
          </h1>
          <p style={{ marginTop: "1.5rem", maxWidth: "520px", marginLeft: "auto", marginRight: "auto", fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,0.45)" }}>
            Explore the complete collection of films produced and distributed by SKML Motion Pictures.
          </p>
        </div>

        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6rem",
            background: "linear-gradient(to top, #111118, transparent)",
            pointerEvents: "none",
          }}
        />
      </section>

      {/* ── FILTER & GRID ── */}
      <section
        style={{
          background: "#111118",
          padding: "3rem 0 6rem",
          minHeight: "60vh",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Filter bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
              marginBottom: "3.5rem",
              paddingBottom: "2rem",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Tabs */}
            <div style={{ display: "flex", gap: "0.375rem", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", padding: "0.375rem" }}>
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.625rem 1.25rem",
                    fontSize: "13px",
                    fontWeight: 600,
                    borderRadius: "9999px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    background: activeTab === tab.value ? "#ffffff" : "transparent",
                    color: activeTab === tab.value ? "#0A0A0F" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {tab.label}
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "0.125rem 0.5rem",
                      borderRadius: "9999px",
                      background: activeTab === tab.value ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.08)",
                      color: activeTab === tab.value ? "#0A0A0F" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Results count */}
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
              Showing {filtered.length} {filtered.length === 1 ? "film" : "films"}
            </span>
          </div>

          {/* ── CARD GRID ── */}
          <div className="films-page-grid" style={{ display: "grid" }}>
            {filtered.map((film, i) => (
              <div
                key={`${film.id}-${activeTab}`}
                ref={(el) => { cardRefs.current[i] = el; }}
                data-index={i}
                className="film-card-wrap"
                style={{
                  opacity: revealedCards.has(i) ? 1 : 0,
                  transform: revealedCards.has(i) ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
                  transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
                }}
              >
                {/* Poster */}
                <div
                  className="film-card-poster"
                  style={{
                    position: "relative",
                    aspectRatio: "2/3",
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: "0.75rem",
                    background: "#1A1A24",
                  }}
                >
                  {film.poster ? (
                    <Image
                      src={film.poster}
                      alt={`${film.title} poster`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      style={{ objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}
                      unoptimized={film.poster.startsWith("https://")}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "#1A1A24" }} />
                  )}
                  {/* Hover overlay */}
                  <div
                    className="film-card-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "1.25rem",
                      background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4) 40%, transparent 80%)",
                      opacity: 0,
                      transition: "opacity 0.4s ease",
                    }}
                  >
                    <span style={{
                      display: "inline-block",
                      width: "fit-content",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      borderRadius: "9999px",
                      background: String(film.category).toLowerCase() === "produced" ? "#ffffff" : "rgba(255,255,255,0.2)",
                      color: String(film.category).toLowerCase() === "produced" ? "#000000" : "#ffffff",
                      border: String(film.category).toLowerCase() === "distributed" ? "1px solid rgba(255,255,255,0.3)" : "none",
                      padding: "0.25rem 0.75rem",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                    }}>
                      {film.category}
                    </span>
                  </div>

                </div>

                {/* Film info */}
                <div style={{ marginTop: "1rem", paddingLeft: "0.125rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#ffffff", letterSpacing: "-0.01em" }}>
                    {film.title}
                  </h3>
                  <p style={{ marginTop: "0.25rem", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                    {film.year} • {film.genre}
                  </p>
                  {film.ottPlatform && (
                    <p style={{ marginTop: "0.25rem", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)" }}>
                      {film.ottPlatform}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Grid */
        .films-page-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .films-page-grid { grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        }
        @media (min-width: 1024px) {
          .films-page-grid { grid-template-columns: repeat(4, 1fr); gap: 2rem; }
        }

        /* Card hover effects */
        .film-card-wrap:hover .film-card-overlay { opacity: 1 !important; }
        .film-card-wrap:hover .film-card-poster img { transform: scale(1.06) !important; }
      `}</style>
    </>
  );
}
