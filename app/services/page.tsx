"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Link from "next/link";
import Image from "next/image";

/* ── OTT Platform data ── */
const ottPlatforms = [
  { name: "Netflix", color: "#E50914", logo: "/assets/images/logos/netflix.png", featured: true },
  { name: "Amazon Prime", color: "#00A8E1", logo: "/assets/images/logos/Amazon_Prime_Videopng.png", featured: true },
  { name: "Disney+ Hotstar", color: "#1DA1F2", logo: "/assets/images/logos/Disney+_Hotstar.png", featured: true },
  { name: "Zee5", color: "#8230C6", logo: "/assets/images/logos/ZEE5 .png", featured: false },
  { name: "Aha", color: "#FF4500", logo: "/assets/images/logos/Aha.png", featured: true },
];

/* ── Detailed Service data ── */
const services = [
  {
    title: "Film Production",
    desc: "We bring your cinematic vision to life with our comprehensive end-to-end production pipeline. From initial scripting to the final cut, our world-class team ensures every frame meets international standards.",
    items: [
      { name: "Script & Concept", detail: "Developing compelling narratives with commercial viability." },
      { name: "Casting & Direction", detail: "Bringing together the perfect talent and visionary directors." },
      { name: "Line Production", detail: "Efficient budget management and on-ground execution." }
    ],
    mediaType: "video",
    placeholderColor: "#1a1a2e",
    mediaSrc: "/assets/images/vid.gif"
  },
  {
    title: "Post-Production & VFX",
    desc: "Industry-grade finishing ready for theatrical & OTT standards. Our post-production facilities are equipped to handle complex editing, immersive sound design, and stunning visual effects.",
    items: [
      { name: "Editing & DI", detail: "Pacing the narrative and setting the perfect color palette." },
      { name: "Sound Design & Atmos", detail: "Creating immersive audio experiences for the big screen." },
      { name: "VFX & CGI", detail: "Seamlessly blending reality with imagination." }
    ],
    mediaType: "image",
    mediaSrc: "/assets/images/editing.jpg",
    placeholderColor: "#2a1b3d"
  },
  {
    title: "Theatrical Distribution",
    desc: "We ensure your film reaches the right audience at the right scale. With a deep network of exhibitors, we strategize theatrical releases across regional, national, and international markets.",
    items: [
      { name: "Release Strategy", detail: "Identifying the optimal release window and screen count." },
      { name: "Exhibitor Relations", detail: "Securing prime showtimes in top multiplexes and single screens." },
      { name: "International Markets", detail: "Taking your local story to the global diaspora." }
    ],
    mediaType: "image",
    mediaSrc: "/assets/images/theater.png",
    placeholderColor: "#0f3460"
  },
  {
    title: "Film Rights & Monetization",
    desc: "Structured deal-making for maximum Return on Investment. We navigate the complex landscape of film rights to ensure maximum revenue generation across all available platforms.",
    items: [
      { name: "OTT & Digital Rights", detail: "Negotiating premium acquisitions with leading streaming platforms." },
      { name: "Satellite & TV", detail: "Securing lucrative broadcast deals for wider reach." },
      { name: "Music & Audio", detail: "Monetizing soundtracks through major record labels." }
    ],
    mediaType: "video",
    mediaSrc: "/assets/images/ott.png",
    placeholderColor: "#16213e"
  },
  {
    title: "Marketing & PR",
    desc: "Creating buzz and driving audiences to your film's release. Our targeted campaigns build anticipation and ensure a strong opening weekend.",
    items: [
      { name: "Digital Campaigns", detail: "Data-driven social media strategies to engage fans." },
      { name: "Trailer Launches", detail: "High-impact events that capture media attention." },
      { name: "Influencer Tie-ups", detail: "Leveraging digital creators for organic reach." }
    ],
    mediaType: "image",
    mediaSrc: "/assets/images/pr.png",
    placeholderColor: "#1f4068"
  },
];

const pipeline = [
  { step: "01", title: "Ideation", sub: "Concept validation & Market fit" },
  { step: "02", title: "Development", sub: "Script refinement & Budget planning" },
  { step: "03", title: "Production", sub: "End-to-end Execution & Shooting" },
  { step: "04", title: "Post-Production", sub: "Editing, VFX, & Finishing" },
  { step: "05", title: "Distribution & Monetization", sub: "Theatrical + OTT + Rights selling", highlight: true },
];

const stats = [
  { num: "25+", label: "Films Distributed" },
  { num: "10+", label: "OTT Partnerships" },
  { num: "5+", label: "Countries Reached" },
  { num: "15+", label: "Years Experience" },
];

/* ── Shared styles ── */
const colors = {
  dark: "#0A0A0F",
  darkAlt: "#111118",
  bg2: "#F5F5F8",
  bg3: "#EBEBF0",
  textPrimary: "#111118",
  textSecondary: "#2A2A38",
  textMuted: "#6A6A7A",
};

export default function ServicesPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <main style={{ minHeight: "100vh", background: "#fff" }}>
      <Navbar />

      {/* ═══════════════════ 1. HERO ═══════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: colors.dark,
        }}
      >
        {/* Grain overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: 0.15,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 10, textAlign: "center", padding: "0 1.5rem", maxWidth: "56rem", margin: "5rem auto 0", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ display: "inline-block", padding: "0.5rem 1.25rem", marginBottom: "1.5rem", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)" }}
          >
            <span style={{ fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>
              End-to-End Film Services
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "#fff", marginBottom: "1.5rem", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 700 }}
          >
            From Story to Screen —{" "}
            <br style={{ display: "none" }} className="hidden md:inline" />
            <span style={{ color: "rgba(255,255,255,0.55)", fontStyle: "italic" }}>And Beyond.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.65)", maxWidth: "38rem", margin: "0 auto 2.5rem", lineHeight: 1.75 }}
          >
            We don&apos;t just produce films. We package, position, and sell them across theatres, OTT platforms, and global markets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}
          >
            <Link
              href="/#contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", borderRadius: "9999px", background: "#fff", color: colors.dark, fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", transition: "all 0.3s ease" }}
            >
              Start a Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <Link
              href="/#contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2rem", borderRadius: "9999px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}
            >
              Sell Your Film Rights
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════ 2. CORE SERVICES (DETAILED) ═══════════════════ */}
      <section style={{ position: "relative", zIndex: 20, padding: "clamp(5rem, 8vw, 9rem) clamp(1rem, 3vw, 2rem)", overflow: "hidden", background: "#fff" }}>
        <div style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            style={{ textAlign: "center", marginBottom: "clamp(4rem, 8vw, 8rem)" }}
          >
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: colors.textPrimary, marginBottom: "1rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Our Core Capabilities
            </h2>
            <div style={{ width: "80px", height: "4px", background: colors.dark, margin: "0 auto 1.5rem" }} />
            <p style={{ fontSize: "1.2rem", color: colors.textMuted, maxWidth: "42rem", margin: "0 auto", lineHeight: 1.75 }}>
              Structured like a business pipeline, we handle every stage of your film&apos;s lifecycle with cinematic precision.
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(4rem, 8vw, 8rem)" }}>
            {services.map((svc, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "clamp(2rem, 5vw, 4rem)",
                  }}
                  className={`svc-detailed-row ${isEven ? 'md-flex-row' : 'md-flex-row-reverse'}`}
                >
                  {/* Media / Image Placeholder */}
                  <div style={{ flex: 1, width: "100%" }}>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16/10",
                        borderRadius: "1.5rem",
                        overflow: "hidden",
                        background: svc.placeholderColor,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "rgba(255,255,255,0.5)"
                      }}
                    >
                      {svc.mediaSrc ? (
                        <Image
                          src={svc.mediaSrc}
                          alt={svc.title}
                          fill
                          unoptimized
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        /* Placeholder Text / Icon */
                        <div style={{ textAlign: "center" }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 1rem", opacity: 0.7 }}>
                            {svc.mediaType === 'video' ? (
                              <><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></>
                            ) : (
                              <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></>
                            )}
                          </svg>
                          <span style={{ fontSize: "0.9rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>{svc.mediaType === 'video' ? 'Video Placeholder' : 'Image Placeholder'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Text Details */}
                  <div style={{ flex: 1, width: "100%", padding: "1rem 0" }}>
                    <span style={{ display: "inline-block", fontSize: "0.9rem", fontWeight: 700, color: colors.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>
                      0{index + 1}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 700, color: colors.textPrimary, marginBottom: "1.25rem", lineHeight: 1.1 }}>
                      {svc.title}
                    </h3>
                    <p style={{ fontSize: "1.1rem", color: colors.textSecondary, lineHeight: 1.75, marginBottom: "2rem" }}>
                      {svc.desc}
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      {svc.items.map((item, i) => (
                        <div key={i} style={{ display: "flex", gap: "1rem" }}>
                          <div style={{ flexShrink: 0, width: "24px", height: "24px", borderRadius: "50%", background: colors.dark, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "4px" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                          <div>
                            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: colors.textPrimary, marginBottom: "0.25rem" }}>{item.name}</h4>
                            <p style={{ fontSize: "0.95rem", color: colors.textMuted, lineHeight: 1.5 }}>{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Style for the alternating flex direction on desktop */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @media (min-width: 768px) {
            .md-flex-row { flex-direction: row !important; }
            .md-flex-row-reverse { flex-direction: row-reverse !important; }
          }
        `}} />
      </section>

      {/* ═══════════════════ 3. OTT HIGHLIGHT ═══════════════════ */}
      <section style={{ background: colors.dark, position: "relative", overflow: "hidden", padding: "clamp(6rem, 10vw, 12rem) clamp(1rem, 3vw, 2rem)" }}>
        {/* Background effects */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />

        <div style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 10 }}>
          {/* Section header */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            style={{ textAlign: "center", marginBottom: "clamp(4rem, 7vw, 6rem)" }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.5rem 1.25rem", marginBottom: "2rem", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6", boxShadow: "0 0 12px rgba(59,130,246,0.6)", animation: "whatsapp-pulse 2s ease-in-out infinite" }} />
              <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>Monetization Focused</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#fff", marginBottom: "1.25rem", lineHeight: 1.1, fontWeight: 700, letterSpacing: "-0.02em" }}>
              OTT &amp; Digital Rights Selling
            </h2>
            <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.5)", maxWidth: "40rem", margin: "0 auto", lineHeight: 1.75 }}>
              We help filmmakers monetize content by securing the best OTT and satellite deals. Our deep industry connections ensure your work lands on top-tier platforms.
            </p>
          </motion.div>

          {/* Two-column layout */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(3rem, 6vw, 5rem)" }} className="svc-ott-flex">
            {/* Info cards */}
            <div style={{ flex: 1, width: "100%", maxWidth: "600px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
                {[
                  { t: "Platform Deals", d: "Direct licensing to streaming giants like Netflix, Amazon Prime, and Disney+ Hotstar.", icon: "📺" },
                  { t: "Satellite Sales", d: "Regional & national TV broadcasting deals for maximum eyeballs.", icon: "📡" },
                  { t: "Rights Strategy", d: "Exclusive vs Non-exclusive models tailored for maximum revenue.", icon: "⚖️" },
                  { t: "Revenue Optimization", d: "Smart bundling and windowing strategies for the highest ROI.", icon: "📈" },
                ].map((card, i) => (
                  <motion.div
                    key={card.t}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      padding: "1.75rem",
                      borderRadius: "1.25rem",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderLeft: "3px solid rgba(59,130,246,0.5)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.75rem" }}>{card.icon}</span>
                    <h4 style={{ fontWeight: 700, color: "#fff", marginBottom: "0.5rem", fontSize: "1.05rem" }}>{card.t}</h4>
                    <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{card.d}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Connected Platforms Visual (Floating Glassmorphic Cloud) */}
            <div style={{ flex: 1, width: "100%", maxWidth: "520px", position: "relative", margin: "0 auto" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                
                {/* Background ethereal glowing auroras */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15], rotate: [0, 90, 0] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                  style={{ position: "absolute", width: "60%", height: "60%", background: "#E50914", filter: "blur(60px)", top: "10%", left: "10%", borderRadius: "50%", zIndex: 0 }}
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1], rotate: [0, -90, 0] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  style={{ position: "absolute", width: "50%", height: "50%", background: "#00A8E1", filter: "blur(60px)", bottom: "10%", right: "10%", borderRadius: "50%", zIndex: 0 }}
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1], y: [0, -30, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                  style={{ position: "absolute", width: "40%", height: "40%", background: "#8230C6", filter: "blur(50px)", top: "30%", left: "40%", borderRadius: "50%", zIndex: 0 }}
                />

                {/* The Floating Platform Nodes */}
                <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
                  {ottPlatforms.map((platform, index) => {
                    // Pre-calculated perfectly symmetrical positions
                    const positions = [
                      { top: "22%", left: "22%", baseScale: 1.15, zIndex: 15 },  // Netflix (Top Left)
                      { top: "22%", left: "78%", baseScale: 1.1, zIndex: 14 },   // Prime (Top Right)
                      { top: "78%", left: "22%", baseScale: 1.1, zIndex: 16 },   // Hotstar (Bottom Left)
                      { top: "12%", left: "50%", baseScale: 0.85, zIndex: 11 },  // Zee5 (Top Center)
                      { top: "78%", left: "78%", baseScale: 1.15, zIndex: 15 },  // Aha (Bottom Right)
                    ];
                    const pos = positions[index % positions.length];
                    const finalScale = platform.featured ? pos.baseScale : pos.baseScale * 0.9;
                    
                    // Unique continuous floating math per node
                    const floatY = [0, -15 + (index % 3) * 5, 0];
                    const floatX = [0, 8 - (index % 2) * 16, 0];
                    const floatRotate = [0, 4 - (index % 2) * 8, 0];
                    
                    return (
                      <div
                        key={platform.name}
                        style={{
                          position: "absolute",
                          top: pos.top,
                          left: pos.left,
                          zIndex: pos.zIndex,
                          transform: "translate(-50%, -50%)",
                          width: "1px", height: "1px",
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0, y: 40 }}
                          whileInView={{ opacity: 1, scale: finalScale, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            opacity: { duration: 0.8, delay: 0.2 + index * 0.1 },
                            scale: { type: "spring", stiffness: 100, damping: 15, delay: 0.2 + index * 0.1 },
                            y: { type: "spring", stiffness: 100, damping: 15, delay: 0.2 + index * 0.1 }
                          }}
                        >
                        <motion.div
                          animate={{ y: floatY, x: floatX, rotate: floatRotate }}
                          transition={{ 
                            duration: 7 + (index % 4) * 1.5, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: index * 0.4
                          }}
                          style={{
                            width: platform.featured ? "clamp(5.5rem, 22vw, 8.5rem)" : "clamp(4.5rem, 16vw, 6rem)",
                            height: platform.featured ? "clamp(5.5rem, 22vw, 8.5rem)" : "clamp(4.5rem, 16vw, 6rem)",
                            borderRadius: platform.featured ? "clamp(1rem, 4vw, 1.75rem)" : "clamp(0.75rem, 3vw, 1.25rem)",
                            background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.01))",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            border: platform.featured ? `1px solid ${platform.color}80` : `1px solid rgba(255,255,255,0.05)`,
                            borderTop: platform.featured ? `1px solid ${platform.color}` : `1px solid rgba(255,255,255,0.25)`,
                            borderLeft: platform.featured ? `1px solid ${platform.color}` : `1px solid rgba(255,255,255,0.15)`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: platform.featured ? `0 25px 50px rgba(0,0,0,0.6), 0 0 30px ${platform.color}40, inset 0 0 20px ${platform.color}30` : `0 15px 30px rgba(0,0,0,0.4), inset 0 0 10px rgba(255,255,255,0.05)`,
                            padding: "clamp(0.5rem, 2vw, 1rem)",
                            textAlign: "center",
                            gap: "0.6rem",
                          }}
                        >
                          {platform.logo ? (
                            <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Image src={platform.logo} alt={platform.name} fill style={{ objectFit: "contain", padding: "0.5rem" }} unoptimized />
                            </div>
                          ) : (
                            <>
                              <div style={{ position: "relative" }}>
                                <span style={{ display: "block", width: "clamp(12px, 3vw, 16px)", height: "clamp(12px, 3vw, 16px)", borderRadius: "50%", background: platform.color, boxShadow: `0 0 15px ${platform.color}` }} />
                                <span style={{ position: "absolute", inset: -6, borderRadius: "50%", background: platform.color, filter: "blur(8px)", opacity: 0.6 }} />
                              </div>
                              <span style={{ fontSize: "clamp(0.6rem, 1.5vw, 0.8rem)", fontWeight: 700, color: "#fff", letterSpacing: "0.03em", lineHeight: 1.2, textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                                {platform.name}
                              </span>
                            </>
                          )}
                        </motion.div>
                        </motion.div>
                      </div>
                    );
                  })}
                  
                  {/* Central Core: SKML Films */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 20,
                      width: "1px", height: "1px",
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1 }}
                    >
                    <motion.div
                      animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        width: "clamp(7rem, 28vw, 10rem)",
                        height: "clamp(7rem, 28vw, 10rem)",
                        borderRadius: "50%",
                        background: "#ffffff",
                        border: "2px solid #000000",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 30px 60px rgba(0,0,0,0.6), 0 0 60px rgba(255,255,255,0.15)",
                      }}
                    >
                      <div style={{ position: "relative", width: "65%", height: "65%" }}>
                        <Image src="/assets/images/skml-logo.png" alt="SKML Films Logo" fill style={{ objectFit: "contain" }} unoptimized />
                      </div>
                    </motion.div>
                  </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 4. PIPELINE ═══════════════════ */}
      <section style={{ background: "#ffffff", padding: "clamp(5rem, 8vw, 9rem) clamp(1rem, 3vw, 2rem)" }}>
        <div style={{ width: "100%", maxWidth: "80rem", margin: "0 auto" }}>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            style={{ textAlign: "center", marginBottom: "clamp(4rem, 6vw, 6rem)" }}
          >
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: colors.dark, marginBottom: "1rem", fontWeight: 700 }}>
              The Cinematic Pipeline
            </h2>
            <p style={{ fontSize: "1.125rem", color: colors.textMuted, maxWidth: "36rem", margin: "0 auto", lineHeight: 1.7 }}>
              A structured, professional approach from the first spark of an idea to global monetization.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            {pipeline.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 } },
                }}
                style={{
                  position: "relative",
                  padding: "2.5rem 1.75rem",
                  borderRadius: "1.5rem",
                  background: item.highlight ? "linear-gradient(135deg, #111827 0%, #1f2937 100%)" : "#f8f9fa",
                  border: item.highlight ? "1px solid #374151" : "1px solid rgba(0,0,0,0.05)",
                  boxShadow: item.highlight ? "0 20px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)" : "0 4px 12px rgba(0,0,0,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  overflow: "hidden",
                }}
              >
                {/* Decorative background number */}
                <div style={{
                  position: "absolute",
                  top: "-1rem",
                  right: "-1rem",
                  fontSize: "8rem",
                  fontWeight: 900,
                  lineHeight: 1,
                  color: item.highlight ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                  zIndex: 0,
                  pointerEvents: "none",
                  fontFamily: "var(--font-playfair), serif"
                }}>
                  {item.step}
                </div>

                <div style={{
                  position: "relative", zIndex: 1,
                  width: "3.5rem", height: "3.5rem", borderRadius: "50%",
                  background: item.highlight ? "#ffffff" : colors.dark,
                  color: item.highlight ? colors.dark : "#ffffff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem", fontWeight: 800, marginBottom: "2rem",
                  boxShadow: item.highlight ? "0 10px 20px rgba(0,0,0,0.2)" : "0 10px 20px rgba(10,10,15,0.15)",
                }}>
                  {item.step}
                </div>
                
                <h3 style={{ position: "relative", zIndex: 1, fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: item.highlight ? "#ffffff" : colors.dark, lineHeight: 1.3 }}>
                  {item.title}
                </h3>
                <p style={{ position: "relative", zIndex: 1, fontSize: "0.95rem", color: item.highlight ? "rgba(255,255,255,0.65)" : colors.textMuted, lineHeight: 1.6 }}>
                  {item.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 5. STATS ═══════════════════ */}
      <section style={{ background: colors.darkAlt, color: "#fff", padding: "clamp(4rem, 6vw, 5.5rem) clamp(1rem, 3vw, 2rem)" }}>
        <div style={{ width: "100%", maxWidth: "80rem", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "2rem" }}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ textAlign: "center", position: "relative", padding: "1rem 0" }}
              >
                <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, marginBottom: "0.5rem", lineHeight: 1 }}>
                  {stat.num}
                </div>
                <div style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.45)" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 6. CTA ═══════════════════ */}
      <section style={{ background: "#f8f9fa", padding: "clamp(5rem, 8vw, 9rem) clamp(1rem, 3vw, 2rem)", overflow: "hidden" }}>
        <div style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "4rem" }}>
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
            style={{ flex: "1 1 450px", textAlign: "left" }}
          >
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: colors.textPrimary, marginBottom: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Ready to Release <br />Your Film ?
            </h2>
            <p style={{ fontSize: "1.15rem", color: colors.textMuted, maxWidth: "34rem", marginBottom: "3rem", lineHeight: 1.8 }}>
              Whether you have a script ready to shoot, or a finished film ready to sell, we have the network and expertise to make it happen.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "flex-start" }}>
              <Link
                href="/#contact"
                style={{ display: "inline-flex", alignItems: "center", padding: "1.1rem 2.5rem", borderRadius: "9999px", background: colors.dark, color: "#fff", fontWeight: 600, fontSize: "1rem", textDecoration: "none", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", transition: "transform 0.2s ease" }}
              >
                Submit Your Film
              </Link>
              <Link
                href="/#contact"
                style={{ display: "inline-flex", alignItems: "center", padding: "1.1rem 2.5rem", borderRadius: "9999px", background: "transparent", color: colors.textPrimary, fontWeight: 600, fontSize: "1rem", textDecoration: "none", border: "1px solid rgba(0,0,0,0.15)" }}
              >
                Partner With Us
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }} 
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 1, type: "spring", stiffness: 60 }}
            style={{ flex: "1 1 400px", display: "flex", justifyContent: "center", position: "relative" }}
          >
            {/* Soft decorative background glow */}
            <div style={{ position: "absolute", width: "120%", height: "120%", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(255,255,255,0) 70%)", top: "-10%", left: "-10%", zIndex: 0 }} />
            
            {/* The GIF Container */}
            <div style={{ position: "relative", width: "100%", maxWidth: "550px", aspectRatio: "16/9", borderRadius: "1.5rem", overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.15)", zIndex: 1, border: "6px solid #fff" }}>
               <Image src="/assets/images/vid.gif" alt="Film Global Action" fill style={{ objectFit: "cover" }} unoptimized />
            </div>
          </motion.div>
          
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
