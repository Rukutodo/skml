"use client";

import { useEffect, useRef } from "react";

const SERVICES = [
  {
    icon: (
      <svg style={{ width: "24px", height: "24px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: "Film Production",
    description: "End-to-end production services from script development to post-production. We deliver high-quality cinema at optimized budgets without compromising artistic vision.",
  },
  {
    icon: (
      <svg style={{ width: "24px", height: "24px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
    title: "OTT Distribution",
    description: "Strategic distribution across major OTT platforms including Amazon Prime Video, Aha, and YouTube. We handle content delivery, metadata, and compliance.",
  },
  {
    icon: (
      <svg style={{ width: "24px", height: "24px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
    title: "Promotion Support",
    description: "Comprehensive marketing strategies including trailer production, social media campaigns, press releases, and release event coordination.",
  },
];

export default function ServicesSection() {
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
    <section
      ref={sectionRef}
      id="services"
      className="section-padding"
      style={{ background: "#F5F5F8", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Section Label */}
        <div className="scroll-reveal" style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ height: "1px", width: "3rem", background: "#6A6A7A" }} />
          <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#6A6A7A" }}>
            What We Do
          </span>
        </div>

        {/* Section Heading */}
        <div className="scroll-reveal" style={{ marginBottom: "3.5rem", maxWidth: "600px" }}>
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2.25rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#111118" }}>
            Our Services
          </h2>
          <p style={{ marginTop: "1.25rem", fontSize: "15px", lineHeight: 1.7, color: "#2A2A38" }}>
            From production to distribution, we provide comprehensive filmmaking solutions designed to bring your vision to screens worldwide.
          </p>
        </div>

        {/* Service Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="services-grid">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className={`scroll-reveal reveal-delay-${i + 1} service-card`}
              style={{
                padding: "2.25rem",
                borderRadius: "1rem",
                border: "1px solid rgba(0,0,0,0.08)",
                background: "#FFFFFF",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                borderRadius: "0.75rem",
                background: "#111118",
                color: "#ffffff",
              }}>
                {service.icon}
              </div>

              <h3 style={{ fontSize: "1.125rem", fontWeight: 700, letterSpacing: "-0.01em", color: "#111118" }}>
                {service.title}
              </h3>
              <p style={{ marginTop: "0.875rem", fontSize: "14px", lineHeight: 1.75, color: "#6A6A7A" }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      
    </section>
  );
}
