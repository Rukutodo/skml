"use client";

import { useEffect, useState } from "react";
import ScrollingColumn from "./ScrollingColumn";

// Poster images from public directory
const POSTERS = [
  "/assets/images/poster-aghora.png",
  "/assets/images/poster-antha-akkade.png",
  "/assets/images/poster-hello-baby.png",
  "/assets/images/poster-mr-lonely.png",
  "/assets/images/poster-prema-kadha.png",
  "/assets/images/poster-visakha-express.png",
];

// Distribute posters across columns with varied arrangements
function getColumnImages(colIndex: number, totalCols: number): string[] {
  const shuffled = [...POSTERS];
  const offset = colIndex * 2;
  const result: string[] = [];
  for (let i = 0; i < POSTERS.length; i++) {
    result.push(shuffled[(i + offset) % shuffled.length]);
  }
  return result;
}

// Vary speed per column for organic feel
function getColumnSpeed(colIndex: number): number {
  const speeds = [60, 50, 65, 55, 58];
  return speeds[colIndex % speeds.length];
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const desktopCols = 4;

  return (
    <section
      id="hero"
      className="noise-overlay"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* ── Scrolling Poster Grid Background ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, transform: 'rotate(-12deg) scale(1.15)', transformOrigin: 'center center' }}>
        {/* Desktop: 4 columns */}
        <div className="hidden h-full gap-1.5 px-1 lg:grid lg:grid-cols-4">
          {Array.from({ length: desktopCols }).map((_, i) => (
            <ScrollingColumn
              key={`desktop-${i}`}
              images={getColumnImages(i, desktopCols)}
              direction={i % 2 === 0 ? "up" : "down"}
              speed={getColumnSpeed(i)}
              columnIndex={i}
            />
          ))}
        </div>

        {/* Tablet: 3 columns */}
        <div className="hidden h-full gap-1.5 px-1 md:grid md:grid-cols-3 lg:hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <ScrollingColumn
              key={`tablet-${i}`}
              images={getColumnImages(i, 3)}
              direction={i % 2 === 0 ? "up" : "down"}
              speed={getColumnSpeed(i) + 10}
              columnIndex={i}
            />
          ))}
        </div>

        {/* Mobile: 2 columns */}
        <div className="grid h-full grid-cols-2 gap-1 px-1 md:hidden">
          {Array.from({ length: 2 }).map((_, i) => (
            <ScrollingColumn
              key={`mobile-${i}`}
              images={getColumnImages(i, 2)}
              direction={i % 2 === 0 ? "up" : "down"}
              speed={getColumnSpeed(i) + 20}
              columnIndex={i}
            />
          ))}
        </div>
      </div>

      {/* ── Dark Gradient Overlay ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none", background: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.85))" }} />

      {/* ── Radial vignette for extra depth ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.65) 100%)" }} />

      {/* ── Hero Content ── */}
      <div style={{ position: "relative", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "56rem", padding: "0 1.5rem", textAlign: "center" }}>
        {/* Small label */}
        <div
          className={mounted ? "animate-fade-in-up" : ""}
          style={{
            marginBottom: "1.5rem",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)",
            padding: "0.375rem 1.25rem",
            fontSize: "11px",
            fontWeight: 500,
            textTransform: "uppercase" as const,
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.5)",
            opacity: mounted ? undefined : 0,
          }}
        >
          Est. 2018 • Film Production & Distribution
        </div>

        {/* Main Heading */}
        <h1
          className={mounted ? "animate-fade-in-up animation-delay-200" : ""}
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            opacity: mounted ? undefined : 0,
          }}
        >
          Where Legacy Meets
          <br />
          <span style={{ backgroundImage: "linear-gradient(to right, #ffffff, rgba(255,255,255,0.9), rgba(255,255,255,0.6))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            the Silver Screen
          </span>
        </h1>

        {/* Subtext */}
        <p
          className={mounted ? "animate-fade-in-up animation-delay-400" : ""}
          style={{
            marginTop: "1.75rem",
            maxWidth: "40rem",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.5)",
            opacity: mounted ? undefined : 0,
          }}
        >
          Producing high-quality cinema at optimized costs and navigating global
          distribution across theaters, Amazon Prime, and Aha.
        </p>

        {/* CTA Button */}
        <div
          className={`
            mt-8 md:mt-10
            ${mounted ? "animate-fade-in-up animation-delay-600" : "opacity-0"}
          `}
        >
          <a
            href="#movies"
            id="cta-explore"
            className="cta-glow group"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.625rem",
              borderRadius: "9999px",
              backgroundColor: "#ffffff",
              color: "#000000",
              padding: "1rem 2.25rem",
              fontSize: "0.9375rem",
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.01em",
              boxShadow: "0 4px 20px rgba(255,255,255,0.15)",
              transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(255,255,255,0.15), inset 0 0 0 1.5px rgba(255,255,255,0.3)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.color = "#000000";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,255,255,0.15)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Explore Our Work
            <svg
              style={{ width: "16px", height: "16px", transition: "transform 0.3s ease" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Bottom fade to white ── */}
<div
  style={{
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    pointerEvents: "none",
    height: "3rem",
    backgroundColor: "white",
    WebkitMaskImage: `
      linear-gradient(
        to top,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,0.8) 30%,
        rgba(0,0,0,0.4) 60%,
        rgba(0,0,0,0) 100%
      )
    `,
    maskImage: `
      linear-gradient(
        to top,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,0.8) 30%,
        rgba(0,0,0,0.4) 60%,
        rgba(0,0,0,0) 100%
      )
    `,
  }}
/>
    </section>
  );
}
