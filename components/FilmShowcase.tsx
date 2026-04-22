"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export interface ShowcaseFilm {
  src: string;
  title: string;
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

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // How far the section top has scrolled past the viewport top
      const scrolled = -rect.top;
      // Total scrollable distance within this section (section height minus viewport)
      const totalScroll = sectionHeight - viewportHeight;

      if (totalScroll <= 0) return;

      const rawProgress = scrolled / totalScroll;
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate horizontal translation based on scroll progress
  const getTranslateX = () => {
    if (!trackRef.current) return 0;
    const trackWidth = trackRef.current.scrollWidth;
    const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    const maxTranslate = trackWidth - viewportWidth;
    return -(progress * maxTranslate);
  };

  const isAtEnd = progress >= 0.95;

  return (
    // The outer section height creates the scrollable "runway" for the sticky container
    <section
      ref={sectionRef}
      id="film-showcase"
      style={{
        position: "relative",
        // Height = viewport + extra scroll distance for the horizontal travel
        height: "300vh",
        background: "#0A0A0F",
      }}
    >
      {/* Sticky container — pins the content in view while the outer section scrolls */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Section Header */}
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            width: "100%",
            padding: "0 2rem",
            marginBottom: "2.5rem",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ height: "1px", width: "2rem", background: "rgba(255,255,255,0.3)" }} />
              <span style={{
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.5)",
              }}>
                Our Films
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
              margin: 0,
            }}>
              Movies Produced Under This Banner
            </h2>
          </div>

          {/* Scroll indicator */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            opacity: isAtEnd ? 0 : 0.6,
            transition: "opacity 0.5s ease",
          }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em" }}>
              Scroll to explore
            </span>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.5)" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* Horizontally scrolling track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "1.5rem",
            paddingLeft: "max(2rem, calc((100vw - 1100px) / 2 + 2rem))",
            paddingRight: "2rem",
            transform: `translateX(${getTranslateX()}px)`,
            transition: "transform 0.1s linear",
            alignItems: "flex-end",
          }}
        >
          {FILMS.map((film, i) => (
            <div
              key={film.title}
              style={{
                position: "relative",
                flexShrink: 0,
                width: "clamp(260px, 22vw, 340px)",
                aspectRatio: "2/3",
                borderRadius: "0.75rem",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              {film.src ? (
                <Image
                  src={film.src}
                  alt={film.title}
                  fill
                  sizes="(max-width: 768px) 65vw, 22vw"
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "rgba(255,255,255,0.05)" }} />
              )}
              {/* Title overlay at bottom */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "3rem 1.25rem 1.25rem",
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
              }}>
                <p style={{
                  margin: 0,
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "#ffffff",
                }}>
                  {film.title}
                </p>
              </div>
            </div>
          ))}

          {/* "See More" card at the end */}
          <a
            href="#movies"
            style={{
              flexShrink: 0,
              width: "clamp(260px, 22vw, 340px)",
              aspectRatio: "2/3",
              borderRadius: "0.75rem",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.25rem",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.03)",
              textDecoration: "none",
              transition: "all 0.4s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <span style={{
              fontSize: "14px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.7)",
            }}>
              See More
            </span>
          </a>
        </div>

        {/* Progress bar at bottom */}
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          padding: "0 2rem",
          marginTop: "2.5rem",
        }}>
          <div style={{
            width: "100%",
            height: "2px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "9999px",
            overflow: "hidden",
          }}>
            <div style={{
              width: `${progress * 100}%`,
              height: "100%",
              background: "#ffffff",
              borderRadius: "9999px",
              transition: "width 0.1s linear",
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}
