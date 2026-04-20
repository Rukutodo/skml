"use client";

import Image from "next/image";

const QUICK_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Movies", href: "#movies" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const SERVICES_LINKS = [
  { label: "Film Production", href: "#services" },
  { label: "OTT Distribution", href: "#services" },
  { label: "Promotion Support", href: "#services" },
  { label: "Theatrical Release", href: "#services" },
];

export default function Footer() {
  return (
    <footer id="footer" style={{ background: "#0A0A0F", borderTop: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 1.5rem 3rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ position: "relative", height: "40px", width: "40px", overflow: "hidden", flexShrink: 0 }}>
                <Image
                  src="/assets/images/skml-logo.png"
                  alt="SKML Motion Pictures Logo"
                  fill
                  sizes="80px"
                  style={{ objectFit: "contain" }}
                  unoptimized
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ 
                  fontFamily: "var(--font-playfair), serif", 
                  fontSize: "18px", 
                  fontWeight: 700, 
                  letterSpacing: "0.02em", 
                  color: "#ffffff",
                  lineHeight: 1.2
                }}>
                  SKML
                </span>
                <span style={{ 
                  fontSize: "9px", 
                  fontWeight: 600, 
                  textTransform: "uppercase", 
                  letterSpacing: "0.3em", 
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.2
                }}>
                  Motion Pictures
                </span>
              </div>
            </div>
            <p style={{ marginTop: "1.25rem", maxWidth: "280px", fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.4)" }}>
              A premier film production and distribution company dedicated to producing compelling, high-quality cinema.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.55)" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", marginTop: "1.25rem", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
                  >{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.55)" }}>Services</h4>
            <ul style={{ listStyle: "none", marginTop: "1.25rem", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
                  >{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.55)" }}>Contact Us</h4>
            <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
                <span style={{ color: "rgba(255,255,255,0.55)" }}>Phone:</span><br />+91 92999 92173
              </p>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
                <span style={{ color: "rgba(255,255,255,0.55)" }}>Email:</span><br />info@skmlmotionpictures.com
              </p>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
                <span style={{ color: "rgba(255,255,255,0.55)" }}>Location:</span><br />Hyderabad, Telangana, India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          marginTop: "3.5rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          textAlign: "center",
        }} className="footer-bottom">
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} SKML Motion Pictures. All rights reserved.
          </p>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>
            Where Legacy Meets the Silver Screen
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr !important; }
          .footer-bottom { flex-direction: row !important; text-align: left !important; }
        }
      `}</style>
    </footer>
  );
}
