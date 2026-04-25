"use client";

import { useEffect, useRef } from "react";

interface Stat {
  value: string;
  label: string;
}

interface AboutSectionProps {
  headline?: string;
  headlineAccent?: string;
  description?: string[];
  ctaText?: string;
  stats?: Stat[];
}

const DEFAULT_STATS: Stat[] = [
  { value: "6+", label: "Films Produced" },
  { value: "50M+", label: "Audience Reached" },
  { value: "3", label: "OTT Platforms" },
  { value: "2018", label: "Established" },
];

const DEFAULT_DESC = [
  "SKML Motion Pictures is a dynamic film production and distribution company dedicated to producing compelling, high-quality cinema. We specialize in optimizing production costs without compromising on artistic vision, and navigate global distribution across theatrical releases, Amazon Prime, and Aha.",
  "From script to screen, our mission is to bring untold stories to audiences worldwide — blending legacy storytelling with modern cinematic excellence.",
];

export default function AboutSection({
  headline = "Crafting Stories",
  headlineAccent = "That Resonate",
  description = DEFAULT_DESC,
  ctaText = "View Our Films",
  stats = DEFAULT_STATS,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll(
              ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right"
            );
            els.forEach((el) => el.classList.add("revealed"));
          } else {
            const els = entry.target.querySelectorAll(
              ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right"
            );
            els.forEach((el) => el.classList.remove("revealed"));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding"
      style={{ background: "#FFFFFF", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Section Label */}
        <div className="scroll-reveal" style={{ marginBottom: "3rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ height: "1px", width: "3rem", background: "#6A6A7A" }} />
          <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#6A6A7A" }}>
            About SKML
          </span>
        </div>

        {/* Main Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem" }} className="lg-two-cols">
          {/* Left — Headline */}
          <div className="scroll-reveal-left">
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2.25rem, 5vw, 3.75rem)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.02em", color: "#111118" }}>
              {headline}
              <br />
              <span style={{ color: "#6A6A7A", fontStyle: "italic", fontWeight: 400 }}>{headlineAccent}</span>
            </h2>
          </div>

          {/* Right — Description */}
          <div className="scroll-reveal-right" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {description.map((para, i) => (
              <p key={i} style={{ marginTop: i > 0 ? "1.5rem" : 0, fontSize: "15px", lineHeight: 1.85, color: "#2A2A38" }}>
                {para}
              </p>
            ))}

            {/* CTA */}
            <div style={{ marginTop: "2rem" }}>
              <a
                href="#movies"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  padding: "0.9375rem 2rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  borderRadius: "9999px",
                  backgroundColor: "#111118",
                  color: "#ffffff",
                  textDecoration: "none",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#3A3A4A";
                  e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.2)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#111118";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.15)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {ctaText}
                <svg style={{ width: "16px", height: "16px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div
          style={{
            marginTop: "5rem",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            overflow: "hidden",
            borderRadius: "1rem",
            border: "1px solid rgba(0,0,0,0.08)",
            background: "rgba(0,0,0,0.06)",
          }}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`scroll-reveal reveal-delay-${i + 1}`}
              style={{
                background: "#FFFFFF",
                padding: "2rem 1.5rem",
                textAlign: "center",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#F5F5F8"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFFFF"; }}
            >
              <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#111118" }}>
                {stat.value}
              </div>
              <div style={{ marginTop: "0.5rem", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "#6A6A7A" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive grid CSS */}
      
    </section>
  );
}
