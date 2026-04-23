"use client";

import { useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "919299992173";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll(".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right");
            els.forEach((el) => el.classList.add("revealed"));
          } else {
            const els = entry.target.querySelectorAll(".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right");
            els.forEach((el) => el.classList.remove("revealed"));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi, I'm ${formData.name}. ${formData.message} (Email: ${formData.email})`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "1rem 1.25rem",
    fontSize: "15px",
    color: "#ffffff",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "0.75rem",
    outline: "none",
    transition: "border-color 0.3s ease, background 0.3s ease",
  };

  return (
    <section ref={sectionRef} id="contact" style={{ background: "#000000", overflow: "hidden", padding: "8rem 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Section Label */}
        <div className="scroll-reveal" style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ height: "1px", width: "3rem", background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.35)" }}>
            Get In Touch
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem" }} className="contact-grid">
          {/* Left — Contact Info */}
          <div className="scroll-reveal-left">
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2.25rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.02em", color: "#ffffff" }}>
              Let&apos;s Create
              <br />
              <span style={{ fontWeight: 400, fontStyle: "italic", color: "rgba(255,255,255,0.35)" }}>Together</span>
            </h2>
            <p style={{ marginTop: "1.5rem", maxWidth: "400px", fontSize: "15px", lineHeight: 1.85, color: "rgba(255,255,255,0.5)" }}>
              Whether you&apos;re a filmmaker looking for production support or seeking OTT distribution for your film, we&apos;d love to hear from you.
            </p>

            {/* Contact Details */}
            <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                { label: "Phone", value: "+91 92999 92173" },
                { label: "Email", value: "info@skmlmotionpictures.com" },
                { label: "Location", value: "Hyderabad, Telangana, India" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)" }}>{item.label}</span>
                  <span style={{ marginTop: "0.375rem", fontSize: "16px", fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I'm%20interested%20in%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                marginTop: "2.5rem",
                padding: "1rem 2rem",
                fontSize: "14px",
                fontWeight: 700,
                borderRadius: "9999px",
                background: "#25D366",
                color: "#ffffff",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(37,211,102,0.25)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(37,211,102,0.35)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.25)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg style={{ width: "20px", height: "20px" }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Right — Form */}
          <div className="scroll-reveal-right">
            <div style={{ 
              padding: "3rem", 
              borderRadius: "1.5rem", 
              border: "1px solid rgba(255,255,255,0.12)", 
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255,255,255,0.05)"
            }}>
              <h3 style={{ marginBottom: "2rem", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)" }}>
                Send us a message
              </h3>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label htmlFor="contact-name" style={{ display: "block", marginBottom: "0.625rem", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)" }}>Your Name</label>
                  <input id="contact-name" type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="John Doe" style={{...inputStyle}} onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }} />
                </div>
                <div>
                  <label htmlFor="contact-email" style={{ display: "block", marginBottom: "0.625rem", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)" }}>Email Address</label>
                  <input id="contact-email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required placeholder="you@example.com" style={{...inputStyle}} onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }} />
                </div>
                <div>
                  <label htmlFor="contact-message" style={{ display: "block", marginBottom: "0.625rem", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)" }}>Your Message</label>
                  <textarea id="contact-message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required placeholder="Tell us about your project..." rows={5} style={{...inputStyle, resize: "none" as const}} onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }} />
                </div>
                <button
                  type="submit"
                  style={{
                    marginTop: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    width: "100%",
                    padding: "1.0625rem",
                    fontSize: "14px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    borderRadius: "0.75rem",
                    border: "none",
                    background: "#ffffff",
                    color: "#0A0A0F",
                    cursor: "pointer",
                    boxShadow: "0 2px 12px rgba(255,255,255,0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,255,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(255,255,255,0.1)";
                  }}
                >
                  Send Message
                  <svg style={{ width: "16px", height: "16px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.15); }
      `}</style>
    </section>
  );
}
