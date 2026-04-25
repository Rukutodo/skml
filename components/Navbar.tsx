"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Movies", href: "/movies" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const WHATSAPP_NUMBER = "919299992173";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setIsPastHero(scrollY > window.innerHeight * 0.85);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out"
      style={{ paddingTop: isScrolled ? "0.625rem" : "1.25rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "9999px",
          padding: isScrolled ? "0.5rem 1.75rem" : "0.75rem 2rem",
          transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          background: isScrolled
            ? isPastHero
              ? "rgba(255,255,255,0.85)"
              : "rgba(0,0,0,0.55)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(24px)" : "none",
          border: isScrolled
            ? isPastHero
              ? "1px solid rgba(0,0,0,0.06)"
              : "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",
          boxShadow: isScrolled
            ? isPastHero
              ? "0 4px 30px rgba(0,0,0,0.06)"
              : "0 4px 30px rgba(0,0,0,0.3)"
            : "none",
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0, textDecoration: "none" }} id="navbar-logo">
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              height: isScrolled ? "32px" : "40px",
              width: isScrolled ? "32px" : "40px", // Makes it a square/icon if we are adding text, or keep it wide if the original logo includes text. Assuming user wants it alongside the main logo graphic.
              transition: "all 0.5s ease",
            }}
          >
            <Image
              src="/assets/images/skml-logo.png"
              alt="SKML Motion Pictures"
              fill
              sizes="80px"
              style={{ objectFit: "contain" }}
              unoptimized
              priority
            />
          </div>
          
          <div
            className="logo-text"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span style={{ 
              fontFamily: "var(--font-playfair), serif", 
              fontSize: isScrolled ? "13px" : "15px", 
              fontWeight: 700, 
              letterSpacing: "0.02em", 
              color: isPastHero ? "#111118" : "#ffffff",
              lineHeight: 1.2,
              transition: "all 0.5s ease"
            }}>
              SKML
            </span>
            <span className="text-[7px] lg:text-[9px] tracking-[0.2em] lg:tracking-[0.3em] font-semibold uppercase transition-all duration-500" style={{ 
              color: isPastHero ? "#6A6A7A" : "rgba(255,255,255,0.7)",
              lineHeight: 1.2
            }}>
              Motion Pictures
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul
          style={{
            alignItems: "center",
            gap: "1.25rem", // increased spacing here for better arrangement
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="hidden lg:flex"
          id="nav-links-desktop"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                style={{
                  display: "block",
                  padding: "0.5rem 1.125rem",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: isPastHero ? "rgba(17,17,24,0.6)" : "rgba(255,255,255,0.7)",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                  borderRadius: "9999px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isPastHero ? "#111118" : "#ffffff";
                  e.currentTarget.style.background = isPastHero ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isPastHero ? "rgba(17,17,24,0.6)" : "rgba(255,255,255,0.7)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right group: Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                  {/* WhatsApp CTA — Desktop */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I'm%20interested%20in%20your%20film%20production%20services.`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex"
            style={{
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.625rem 1.375rem",
              fontSize: "0.8125rem",
              fontWeight: 600,
              borderRadius: "9999px",
              textDecoration: "none",
              transition: "all 0.3s ease",
              background: isPastHero ? "#111118" : "#ffffff",
              color: isPastHero ? "#ffffff" : "#000000",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            id="navbar-whatsapp"
          >
            <svg style={{ width: "16px", height: "16px" }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>

          {/* WhatsApp Icon — Mobile */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex lg:hidden"
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "9999px",
              background: isPastHero ? "#111118" : "rgba(255,255,255,0.15)",
              color: isPastHero ? "#ffffff" : "#ffffff",
              transition: "all 0.3s ease",
            }}
            aria-label="Contact on WhatsApp"
          >
            <svg style={{ width: "16px", height: "16px" }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>


          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex lg:hidden"
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              width: "36px",
              height: "36px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Toggle menu"
            id="navbar-hamburger"
          >
            <span style={{
              display: "block",
              height: "1.5px",
              width: "20px",
              borderRadius: "9999px",
              backgroundColor: isPastHero ? "#111118" : "#ffffff",
              transition: "all 0.3s ease",
              transform: isMobileOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block",
              height: "1.5px",
              width: "20px",
              borderRadius: "9999px",
              backgroundColor: isPastHero ? "#111118" : "#ffffff",
              transition: "all 0.3s ease",
              opacity: isMobileOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block",
              height: "1.5px",
              width: "20px",
              borderRadius: "9999px",
              backgroundColor: isPastHero ? "#111118" : "#ffffff",
              transition: "all 0.3s ease",
              transform: isMobileOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
            }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div
          className="animate-slide-down lg:hidden"
          style={{
            position: "fixed",
            left: "1rem",
            right: "1rem",
            top: "72px",
            zIndex: 99,
            borderRadius: "1rem",
            padding: "1.5rem",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            background: isPastHero ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.85)",
            border: isPastHero ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          }}
          id="mobile-menu"
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {NAV_LINKS.map((link, i) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  style={{
                    display: "block",
                    padding: "0.875rem 1rem",
                    fontSize: "1rem",
                    fontWeight: 500,
                    borderRadius: "0.75rem",
                    textDecoration: "none",
                    color: isPastHero ? "#2A2A38" : "rgba(255,255,255,0.7)",
                    transition: "all 0.2s ease",
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "1rem",
              padding: "0.875rem",
              fontSize: "0.875rem",
              fontWeight: 700,
              borderRadius: "0.75rem",
              textDecoration: "none",
              background: "#111118",
              color: "#ffffff",
            }}
          >
            <svg style={{ width: "16px", height: "16px" }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      )}

    </nav>
  );
}
