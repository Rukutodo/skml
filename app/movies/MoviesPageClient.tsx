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
  releaseType?: string;
  poster: string;
}

interface MoviesPageClientProps {
  films: Film[];
}

type FilterTab = "all" | "produced" | "distributed";

export default function MoviesPageClient({ films }: MoviesPageClientProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
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

  // Close modal on Escape + lock body scroll
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedFilm(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (selectedFilm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedFilm]);

  const TABS: { label: string; value: FilterTab; count: number }[] = [
    { label: "All", value: "all", count: films.length },
    { label: "Produced", value: "produced", count: producedCount },
    { label: "Distributed", value: "distributed", count: distributedCount },
  ];

  const isProduced = (cat: string) => String(cat).toLowerCase() === "produced";
  const isDistributed = (cat: string) => String(cat).toLowerCase() === "distributed";

  return (
    <>
      {/* ── HERO ── */}
      <section className="movies-hero">
        <div className="movies-hero__grain" />
        <div className="movies-hero__content">
          <div className="movies-hero__eyebrow">
            <div className="movies-hero__line" />
            <span>Our Filmography</span>
            <div className="movies-hero__line" />
          </div>
          <h1 className="movies-hero__title">
            Every Frame,{" "}
            <span className="movies-hero__title-accent">A Story</span>
          </h1>
          <p className="movies-hero__desc">
            Explore the complete collection of films produced and distributed by SKML Motion Pictures.
          </p>
        </div>
        <div className="movies-hero__fade" />
      </section>

      {/* ── FILTER & GRID ── */}
      <section className="movies-section">
        <div className="movies-container">
          {/* Filter bar */}
          <div className="movies-filter">
            <div className="movies-tabs">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`movies-tab ${activeTab === tab.value ? "movies-tab--active" : ""}`}
                >
                  {tab.label}
                  <span className={`movies-tab__count ${activeTab === tab.value ? "movies-tab__count--active" : ""}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
            <span className="movies-filter__result-count">
              {filtered.length} {filtered.length === 1 ? "film" : "films"}
            </span>
          </div>

          {/* Card grid */}
          <div className="movies-grid">
            {filtered.map((film, i) => (
              <div
                key={`${film.id}-${activeTab}`}
                ref={(el) => { cardRefs.current[i] = el; }}
                data-index={i}
                onClick={() => setSelectedFilm(film)}
                className="film-card"
                style={{
                  opacity: revealedCards.has(i) ? 1 : 0,
                  transform: revealedCards.has(i) ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${Math.min(i * 80, 400)}ms`,
                }}
              >
                <div className="film-card__poster">
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
                  <div className="film-card__overlay">
                    <div className="film-card__overlay-icon">
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <span className="film-card__overlay-text">View Details</span>
                  </div>
                  {/* Category badge */}
                  <div className="film-card__badge-wrap">
                    <span className={`film-card__badge ${isProduced(film.category) ? "film-card__badge--produced" : "film-card__badge--distributed"}`}>
                      {film.category}
                    </span>
                  </div>
                </div>
                <div className="film-card__info">
                  <h3 className="film-card__title">{film.title}</h3>
                  <p className="film-card__meta">{film.year} • {film.genre}</p>
                  {film.ottPlatform && (
                    <p className="film-card__platform">{film.ottPlatform}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILM DETAIL MODAL ── */}
      {selectedFilm && (
        <div className="modal-backdrop" onClick={() => setSelectedFilm(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            <button className="modal-close" onClick={() => setSelectedFilm(null)}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Poster thumbnail */}
            <div className="modal-thumb">
              {selectedFilm.poster ? (
                <Image
                  src={selectedFilm.poster}
                  alt={selectedFilm.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="260px"
                  unoptimized={selectedFilm.poster.startsWith("https://")}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "#111" }} />
              )}
            </div>

            {/* Details */}
            <div className="modal-info">
              <h2 className="modal-title">{selectedFilm.title}</h2>
              <div className="modal-meta">
                <span>{selectedFilm.year}</span>
                <span className="modal-dot">•</span>
                <span>{selectedFilm.genre}</span>
              </div>

              <div className="modal-tags">
                <span className={`modal-badge ${isProduced(selectedFilm.category) ? "modal-badge--produced" : "modal-badge--distributed"}`}>
                  {selectedFilm.category}
                </span>
                {selectedFilm.releaseType && (
                  <span className="modal-release-tag">
                    {selectedFilm.releaseType === "theatrical" ? "🎬 Theatrical" : selectedFilm.releaseType === "ott" ? "📺 OTT" : "🎬 Theatrical + 📺 OTT"}
                  </span>
                )}
              </div>

              {selectedFilm.ottPlatform && (
                <div className="modal-platform-row">
                  <span className="modal-platform-label">On</span>
                  <span className="modal-platform-value">{selectedFilm.ottPlatform}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ═══════════════════════════════════════
           HERO
        ═══════════════════════════════════════ */
        .movies-hero {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          background: #0A0A0F;
          padding: 6rem 1.25rem 2rem;
          overflow: hidden;
          min-height: 30vh;
        }
        @media (min-width: 640px) {
          .movies-hero { min-height: 45vh; padding: 8rem 1.5rem 3.5rem; }
        }
        .movies-hero__grain {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%);
          pointer-events: none;
        }
        .movies-hero__content {
          text-align: center; position: relative; z-index: 1; max-width: 600px;
        }
        .movies-hero__eyebrow {
          display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 1rem;
        }
        .movies-hero__line {
          height: 1px; width: 2rem; background: rgba(255,255,255,0.2);
        }
        @media (min-width: 640px) { .movies-hero__line { width: 3rem; } }
        .movies-hero__eyebrow span {
          font-size: 10px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.3em; color: rgba(255,255,255,0.4);
        }
        @media (min-width: 640px) { .movies-hero__eyebrow span { font-size: 11px; } }
        .movies-hero__title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(1.75rem, 5vw, 4rem);
          font-weight: 700; color: #fff; line-height: 1.15; letter-spacing: -0.02em;
        }
        .movies-hero__title-accent {
          font-style: italic; font-weight: 400; color: rgba(255,255,255,0.4);
        }
        .movies-hero__desc {
          margin-top: 1rem; font-size: 13px; line-height: 1.7;
          color: rgba(255,255,255,0.4); max-width: 460px; margin-left: auto; margin-right: auto;
        }
        @media (min-width: 640px) { .movies-hero__desc { font-size: 15px; margin-top: 1.25rem; } }
        .movies-hero__fade {
          position: absolute; bottom: 0; left: 0; right: 0; height: 5rem;
          background: linear-gradient(to top, #111118, transparent); pointer-events: none;
        }

        /* ═══════════════════════════════════════
           FILTER & GRID SECTION
        ═══════════════════════════════════════ */
        .movies-section { background: #111118; padding: 2rem 0 5rem; min-height: 60vh; }
        @media (min-width: 640px) { .movies-section { padding: 3rem 0 6rem; } }
        .movies-container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        @media (min-width: 640px) { .movies-container { padding: 0 1.5rem; } }

        /* Filter */
        .movies-filter {
          display: flex; flex-direction: column; align-items: center;
          gap: 0.75rem; margin-bottom: 2rem; padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        @media (min-width: 640px) {
          .movies-filter {
            flex-direction: row; justify-content: space-between;
            margin-bottom: 3rem; padding-bottom: 2rem;
          }
        }
        .movies-tabs {
          display: flex; gap: 0.25rem; border-radius: 2rem;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03); padding: 0.25rem;
        }
        .movies-tab {
          display: flex; align-items: center; gap: 0.375rem;
          padding: 0.5rem 0.875rem; font-size: 12px; font-weight: 600;
          border-radius: 9999px; border: none; cursor: pointer;
          white-space: nowrap; transition: all 0.3s ease;
          background: transparent; color: rgba(255,255,255,0.45);
        }
        @media (min-width: 640px) {
          .movies-tab { padding: 0.625rem 1.25rem; font-size: 13px; }
        }
        .movies-tab--active { background: #fff; color: #0A0A0F; }
        .movies-tab__count {
          font-size: 10px; font-weight: 700; padding: 0.1rem 0.4rem;
          border-radius: 9999px; background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.3);
        }
        @media (min-width: 640px) { .movies-tab__count { font-size: 11px; } }
        .movies-tab__count--active { background: rgba(0,0,0,0.1); color: #0A0A0F; }
        .movies-filter__result-count {
          font-size: 12px; color: rgba(255,255,255,0.25); display: none;
        }
        @media (min-width: 640px) { .movies-filter__result-count { display: block; font-size: 13px; } }

        /* ── Grid: Always 2 cols on mobile ── */
        .movies-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;
        }
        @media (min-width: 640px) { .movies-grid { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; } }
        @media (min-width: 1024px) { .movies-grid { grid-template-columns: repeat(4, 1fr); gap: 2rem; } }

        /* ── Film Card ── */
        .film-card { cursor: pointer; }
        .film-card__poster {
          position: relative; aspect-ratio: 2/3; width: 100%;
          overflow: hidden; border-radius: 0.5rem; background: #1A1A24;
        }
        @media (min-width: 640px) { .film-card__poster { border-radius: 0.75rem; } }
        .film-card__overlay {
          position: absolute; inset: 0; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 0.5rem;
          background: rgba(0,0,0,0.55); opacity: 0; transition: opacity 0.35s ease;
        }
        .film-card:hover .film-card__overlay { opacity: 1; }
        .film-card:hover .film-card__poster img { transform: scale(1.06); }
        .film-card__overlay-icon {
          width: 40px; height: 40px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.4);
          display: flex; align-items: center; justify-content: center;
        }
        @media (min-width: 640px) { .film-card__overlay-icon { width: 48px; height: 48px; } }
        .film-card__overlay-text {
          font-size: 10px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.15em; color: rgba(255,255,255,0.7);
        }
        @media (min-width: 640px) { .film-card__overlay-text { font-size: 12px; } }
        .film-card__badge-wrap { position: absolute; top: 0.5rem; left: 0.5rem; z-index: 2; }
        @media (min-width: 640px) { .film-card__badge-wrap { top: 0.75rem; left: 0.75rem; } }
        .film-card__badge {
          padding: 0.2rem 0.5rem; font-size: 8px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em; border-radius: 9999px;
          backdrop-filter: blur(8px);
        }
        @media (min-width: 640px) { .film-card__badge { padding: 0.25rem 0.75rem; font-size: 9px; } }
        .film-card__badge--produced { background: #fff; color: #000; }
        .film-card__badge--distributed {
          background: rgba(255,255,255,0.15); color: #fff;
          border: 1px solid rgba(255,255,255,0.25);
        }
        .film-card__info { margin-top: 0.625rem; padding-left: 0.125rem; }
        @media (min-width: 640px) { .film-card__info { margin-top: 1rem; } }
        .film-card__title {
          font-size: 0.8rem; font-weight: 700; color: #fff; letter-spacing: -0.01em;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        @media (min-width: 640px) { .film-card__title { font-size: 1rem; } }
        .film-card__meta { margin-top: 0.15rem; font-size: 11px; color: rgba(255,255,255,0.4); }
        @media (min-width: 640px) { .film-card__meta { font-size: 13px; margin-top: 0.25rem; } }
        .film-card__platform {
          margin-top: 0.15rem; font-size: 9px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.2);
        }
        @media (min-width: 640px) { .film-card__platform { font-size: 11px; margin-top: 0.25rem; } }

        /* ═══════════════════════════════════════
           MODAL — Compact Vertical Card
        ═══════════════════════════════════════ */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }

        .modal-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.75); backdrop-filter: blur(8px);
          animation: fadeIn 0.2s ease; padding: 1rem;
        }

        .modal-card {
          position: relative;
          display: flex; flex-direction: column;
          width: 100%; max-width: 260px;
          background: #111;
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 40px rgba(0,0,0,0.8);
          animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        /* Desktop: horizontal */
        @media (min-width: 640px) {
          .modal-card { flex-direction: row; max-width: 480px; }
        }

        .modal-close {
          position: absolute; top: 0.5rem; right: 0.5rem; z-index: 10;
          width: 24px; height: 24px; border-radius: 50%;
          background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #fff; transition: all 0.2s ease;
        }
        .modal-close:hover { background: rgba(255,255,255,0.3); }

        .modal-thumb {
          position: relative; width: 100%; aspect-ratio: 2/3;
          flex-shrink: 0; overflow: hidden; background: #000;
        }
        @media (min-width: 640px) {
          .modal-thumb { width: 180px; aspect-ratio: unset; min-height: 240px; }
        }

        .modal-info {
          padding: 1rem;
          display: flex; flex-direction: column;
        }
        @media (min-width: 640px) {
          .modal-info { flex: 1; padding: 1.25rem; justify-content: center; min-width: 0; }
        }

        .modal-title {
          font-family: var(--font-inter), sans-serif;
          font-size: 1.1rem; font-weight: 600; color: #fff;
          line-height: 1.3; margin-bottom: 0.25rem;
          overflow: hidden; text-overflow: ellipsis;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        }

        .modal-meta {
          display: flex; align-items: center; gap: 0.35rem;
          font-size: 0.8rem; color: rgba(255,255,255,0.6);
          margin-bottom: 0.75rem;
        }
        .modal-dot { color: rgba(255,255,255,0.3); }

        .modal-tags {
          display: flex; flex-wrap: wrap; gap: 0.35rem;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 0.65rem; margin-bottom: 0.5rem;
        }

        .modal-badge {
          display: inline-block;
          padding: 0.15rem 0.45rem; font-size: 0.6rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
          border-radius: 4px;
        }
        .modal-badge--produced { background: #fff; color: #000; }
        .modal-badge--distributed {
          background: transparent; color: #fff;
          border: 1px solid rgba(255,255,255,0.3);
        }

        .modal-release-tag {
          display: inline-block;
          padding: 0.15rem 0.45rem; font-size: 0.6rem; font-weight: 600;
          border-radius: 4px; color: rgba(255,255,255,0.7);
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
        }

        .modal-platform-row {
          display: flex; align-items: center; gap: 0.3rem;
          font-size: 0.75rem;
        }
        .modal-platform-label { color: rgba(255,255,255,0.35); }
        .modal-platform-value { color: rgba(255,255,255,0.8); font-weight: 500; }
      `}</style>
    </>
  );
}
