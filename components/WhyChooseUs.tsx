"use client";

import { useEffect, useRef, useState } from "react";

const REASONS = [
  {
    number: "01",
    title: "Affordable Production",
    description: "We optimize every aspect of the production pipeline, delivering cinema-quality results at budgets that make filmmaking accessible to emerging creators.",
  },
  {
    number: "02",
    title: "OTT Release Expertise",
    description: "Deep relationships with Amazon Prime Video, Aha, and YouTube enable seamless content delivery with optimized metadata and compliance.",
  },
  {
    number: "03",
    title: "End-to-End Support",
    description: "From pre-production planning and casting to post-production, marketing, and distribution — we handle the complete filmmaking journey.",
  },
  {
    number: "04",
    title: "Proven Track Record",
    description: "With 6+ films produced and distributed, reaching over 50 million viewers across multiple platforms, our results speak for themselves.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [clapAngle, setClapAngle] = useState(-30); // starts open
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Calculate how far the section is through the viewport
      // When section top hits bottom of viewport: progress = 0
      // When section top hits top of viewport: progress = 1
      const progress = 1 - (rect.top / vh);
      const clamped = Math.max(0, Math.min(1, progress));

      // Map progress to clapper angle: -35deg (open) -> 0deg (closed)
      // We use a power function to make the 'clap' feel more snappy
      const angle = -35 * Math.pow(1 - clamped, 1.5);
      setClapAngle(angle);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // For the reveal animations
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose"
      style={{
        background: "#111118",
        overflow: "hidden",
        padding: "3.5rem 1rem",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* ═══════ CLAPBOARD CONTAINER ═══════ */}
        <div
          className="clapboard-wrapper"
          style={{
            position: "relative",
            borderRadius: "1rem",
            overflow: "visible",
          }}
        >
          {/* ── TOP CLAPPER (animated) ── */}
          <div
            className="clapper-hinge"
            style={{
              position: "relative",
              zIndex: 3,
              transformOrigin: "left bottom",
              transform: `rotate(${clapAngle}deg)`,
              transition: "transform 0.05s linear",
            }}
          >
            <div style={{
              height: "clamp(30px, 8vw, 44px)",
              borderRadius: "0.75rem 0.75rem 0 0",
              overflow: "hidden",
              position: "relative",
              background: "#0A0A0F",
              boxShadow: clapAngle > -3 ? "0 4px 25px rgba(0,0,0,0.7)" : "none",
            }}>
              {/* Diagonal stripes */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "repeating-linear-gradient(135deg, #ffffff 0px, #ffffff 10px, #0A0A0F 10px, #0A0A0F 20px)",
                opacity: 0.85,
              }} />
              {/* Text on the clapper */}
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 1.5rem",
              }}>
                <span style={{ fontSize: "clamp(8px, 2.5vw, 11px)", fontWeight: 800, letterSpacing: "0.2em", color: "#ffffff", textShadow: "0 1px 3px rgba(0,0,0,0.8)", zIndex: 1 }}>
                  SCENE
                </span>
                <span style={{ fontSize: "clamp(8px, 2.5vw, 11px)", fontWeight: 800, letterSpacing: "0.2em", color: "#ffffff", textShadow: "0 1px 3px rgba(0,0,0,0.8)", zIndex: 1 }}>
                  TAKE
                </span>
              </div>
            </div>
          </div>

          {/* ── BOTTOM STRIPE (fixed, sits under the clapper) ── */}
          <div style={{
            position: "relative",
            zIndex: 2,
            height: "36px",
            overflow: "hidden",
            background: "#0A0A0F",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{
              position: "absolute",
              inset: 0,
              background: "repeating-linear-gradient(135deg, #ffffff 0px, #ffffff 8px, #0A0A0F 8px, #0A0A0F 16px)",
              opacity: 0.12,
            }} />
            {/* Board info text */}
            <div style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 1.5rem",
              zIndex: 1,
            }}>
              <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                SKML Motion Pictures
              </span>
              <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.25)" }}>
                PROD. 2018 — PRESENT
              </span>
            </div>
          </div>

          {/* ═══════ BOARD CONTENT (the actual section content) ═══════ */}
          <div 
            onClick={() => {
              if (window.innerWidth < 768) setIsPopupOpen(true);
            }}
            style={{
              position: "relative",
              zIndex: 1,
              background: "#0A0A0F",
              borderRadius: "0 0 1rem 1rem",
              padding: "2rem 1.25rem 2.5rem",
              border: "1px solid rgba(255,255,255,0.06)",
              borderTop: "none",
              cursor: "pointer",
            }}
          >
            {/* Section Label */}
            <div className="scroll-reveal" style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
              <div style={{ height: "1px", width: "3rem", background: "rgba(255,255,255,0.2)" }} />
              <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>Why Us</span>
              <div style={{ height: "1px", width: "3rem", background: "rgba(255,255,255,0.2)" }} />
            </div>

            <div className="scroll-reveal" style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto" }}>
              <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(1.75rem, 4.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#ffffff" }}>
                Why Choose SKML
              </h2>
              <p className="desktop-only" style={{ marginTop: "1.25rem", fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>
                We combine passion for storytelling with practical expertise to deliver exceptional value at every stage of filmmaking.
              </p>
              <div className="mobile-only" style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: "rgba(255,255,255,0.3)" }}>
                <span style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Tap to see why</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="reasons-grid desktop-only">
              {REASONS.map((reason, i) => (
                <div
                  key={reason.number}
                  className={`scroll-reveal reveal-delay-${i + 1}`}
                  style={{
                    padding: "1.75rem 2rem",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1.25rem",
                    transition: "transform 0.4s ease, box-shadow 0.4s ease, background 0.4s ease, border-color 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  <div style={{
                    flexShrink: 0,
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "0.625rem",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#ffffff",
                  }}>
                    {reason.number}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.01em", color: "#ffffff" }}>
                      {reason.title}
                    </h3>
                    <p style={{ marginTop: "0.5rem", fontSize: "13.5px", lineHeight: 1.75, color: "rgba(255,255,255,0.4)" }}>
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE POPUP MODAL ── */}
      {isPopupOpen && (
        <div 
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            animation: "fadeIn 0.3s ease"
          }}
          onClick={() => setIsPopupOpen(false)}
        >
          <div 
            style={{
              width: "100%",
              maxWidth: "500px",
              maxHeight: "85vh",
              background: "#0A0A0F",
              borderRadius: "2rem",
              padding: "2.5rem 1.5rem",
              border: "1px solid rgba(255,255,255,0.1)",
              overflowY: "auto",
              position: "relative",
              animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsPopupOpen(false)}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                background: "rgba(255,255,255,0.05)",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                cursor: "pointer"
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.75rem", fontWeight: 700, color: "#ffffff", marginBottom: "2rem", textAlign: "center" }}>
              Why Choose Us
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {REASONS.map((reason) => (
                <div key={reason.number} style={{ padding: "1.25rem", background: "rgba(255,255,255,0.03)", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "1rem" }}>
                  <div style={{ flexShrink: 0, width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontWeight: 700, fontSize: "13px" }}>
                    {reason.number}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff" }}>{reason.title}</h3>
                    <p style={{ marginTop: "0.25rem", fontSize: "12.5px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .mobile-only { display: flex; }
        .desktop-only { display: none; }

        @media (min-width: 768px) {
          .mobile-only { display: none; }
          .desktop-only { display: block; }
          .reasons-grid.desktop-only { display: grid; }
        }

        /* ── Mobile compact ── */
        .reasons-grid { gap: 0.75rem !important; }

        .reasons-grid > div {
          padding: 1.25rem 1rem !important;
          gap: 1rem !important;
        }

        .reasons-grid > div > div:first-child {
          width: 36px !important;
          height: 36px !important;
          font-size: 0.875rem !important;
        }

        .reasons-grid h3 { font-size: 0.9rem !important; }

        .reasons-grid p {
          font-size: 12.5px !important;
          margin-top: 0.25rem !important;
          line-height: 1.6 !important;
        }

        @media (min-width: 768px) {
          .reasons-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1.25rem !important; }
          .reasons-grid > div { padding: 1.75rem 2rem !important; gap: 1.25rem !important; }
          .reasons-grid > div > div:first-child { width: 44px !important; height: 44px !important; font-size: 1rem !important; }
          .reasons-grid h3 { font-size: 1rem !important; }
          .reasons-grid p { font-size: 13.5px !important; margin-top: 0.5rem !important; line-height: 1.75 !important; }
          #why-choose { padding: 6rem 1.5rem !important; }
        }
      `}</style>
    </section>
  );
}
