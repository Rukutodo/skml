"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface ProducerSectionProps {
  firstName?: string;
  lastName?: string;
  role?: string;
  portraitUrl?: string;
  bio?: string[];
  quote?: string;
}

const DEFAULT_BIO = [
  "With a deep passion for cinema and a visionary approach to filmmaking, Kandregula Adhinarayana founded SKML Motion Pictures in 2018. His journey in the film industry began with a simple belief — that great stories deserve to be told, regardless of budget constraints.",
  "Under his leadership, SKML has produced over 6 feature films and successfully navigated OTT distribution across major platforms including Amazon Prime Video and Aha.",
  "Adhinarayana continues to champion affordable production solutions, making cinema accessible to emerging directors and storytellers who share his vision for impactful storytelling.",
];

export default function ProducerSection({
  firstName = "Kandregula",
  lastName = "Adhinarayana",
  role = "Founder & Producer",
  portraitUrl = "/assets/images/producer-portrait.jpeg",
  bio = DEFAULT_BIO,
  quote = "Every story deserves its screen.",
}: ProducerSectionProps) {
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
      id="producer"
      className="section-padding"
      style={{ background: "#0A0A0F", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Section Label */}
        <div className="scroll-reveal" style={{ marginBottom: "3rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ height: "1px", width: "3rem", background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>
            The Visionary
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "center" }} className="producer-grid">
          {/* Left — Portrait */}
          <div className="scroll-reveal-left">
            <div style={{
              position: "relative",
              aspectRatio: "3/4",
              width: "100%",
              maxWidth: "380px",
              margin: "0 auto",
              overflow: "hidden",
              borderRadius: "1rem",
              boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
            }}>
              <Image
                src={portraitUrl}
                alt={`${firstName} ${lastName} — ${role}`}
                fill
                sizes="(max-width: 768px) 80vw, 30vw"
                style={{ objectFit: "cover" }}
                quality={85}
                unoptimized={portraitUrl.startsWith("https://cdn.sanity.io")}
              />
              <div style={{ position: "absolute", inset: 0, bottom: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 50%)", pointerEvents: "none" }} />
            </div>
          </div>

          {/* Right — Bio */}
          <div className="scroll-reveal-right">
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#ffffff" }}>
              {firstName}
              <br />
              <span style={{ fontWeight: 400, fontStyle: "italic", color: "rgba(255,255,255,0.4)" }}>{lastName}</span>
            </h2>
            <p style={{ marginTop: "0.75rem", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(255,255,255,0.3)" }}>
              {role}
            </p>

            <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {bio.map((para, i) => (
                <p key={i} style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(255,255,255,0.6)" }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Quote */}
            <div style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <div style={{ height: "1px", width: "4rem", background: "rgba(255,255,255,0.2)" }} />
              <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.125rem", fontStyle: "italic", color: "rgba(255,255,255,0.3)" }}>
                &ldquo;{quote}&rdquo;
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .producer-grid {
            grid-template-columns: 2fr 3fr !important;
            gap: 5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
