"use client";

import { useEffect, useRef } from "react";

const PLATFORMS = [
  { name: "Amazon Prime Video", description: "Global streaming reach" },
  { name: "Aha", description: "Telugu OTT leader" },
  { name: "YouTube", description: "Worldwide accessibility" },
  { name: "Theatrical", description: "Cinema exhibitions" },
];

export default function OTTPlatforms() {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} id="platforms" className="section-padding" style={{ background: "#FFFFFF", overflow: "hidden" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
        {/* Centered Label */}
        <div className="scroll-reveal" style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
          <div style={{ height: "1px", width: "3rem", background: "#6A6A7A" }} />
          <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#6A6A7A" }}>
            Distribution Network
          </span>
          <div style={{ height: "1px", width: "3rem", background: "#6A6A7A" }} />
        </div>

        <div className="scroll-reveal" style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2.25rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#111118" }}>
            Our Platforms
          </h2>
          <p style={{ marginTop: "1.25rem", maxWidth: "520px", marginLeft: "auto", marginRight: "auto", fontSize: "15px", lineHeight: 1.7, color: "#2A2A38" }}>
            We distribute across the biggest platforms to ensure maximum reach for every film we produce.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }} className="platforms-grid">
          {PLATFORMS.map((platform, i) => (
            <div
              key={platform.name}
              className={`scroll-reveal reveal-delay-${i + 1}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "2.5rem 1.5rem",
                borderRadius: "1rem",
                border: "1px solid rgba(0,0,0,0.08)",
                background: "#F5F5F8",
                transition: "all 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FFFFFF";
                e.currentTarget.style.borderColor = "#6A6A7A";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#F5F5F8";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#111118" }}>{platform.name}</h3>
              <p style={{ marginTop: "0.5rem", fontSize: "12px", color: "#6A6A7A" }}>{platform.description}</p>
            </div>
          ))}
        </div>
      </div>

      
    </section>
  );
}
