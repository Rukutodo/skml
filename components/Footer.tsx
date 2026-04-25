"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";

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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <footer id="footer" style={{ background: "#0A0A0F", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      {/* Subtle glowing accents and gradients */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "800px", height: "1px", background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 80%)" }} />
      <div style={{ position: "absolute", top: "-150px", left: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(120,80,255,0.03) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-150px", right: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(80,150,255,0.03) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 1.5rem 3rem", position: "relative", zIndex: 1 }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="footer-grid">
          
          {/* Brand */}
          <motion.div variants={fadeUpItem}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ position: "relative", height: "40px", width: "40px", flexShrink: 0, filter: "drop-shadow(0 0 10px rgba(255,255,255,0.1))" }}
              >
                <Image src="/assets/images/skml-logo.png" alt="SKML Motion Pictures Logo" fill sizes="80px" style={{ objectFit: "contain" }} unoptimized />
              </motion.div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", fontWeight: 700, letterSpacing: "0.02em", color: "#ffffff", lineHeight: 1.2 }}>
                  SKML
                </span>
                <span style={{ fontSize: "9px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.7)", lineHeight: 1.2 }}>
                  Motion Pictures
                </span>
              </div>
            </div>
            <p style={{ marginTop: "1.25rem", maxWidth: "280px", fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.4)" }}>
              A premier film production and distribution company dedicated to producing compelling, high-quality cinema.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUpItem}>
            <h4 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.55)" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", marginTop: "1.25rem", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <motion.a 
                    href={link.href} 
                    style={{ position: "relative", fontSize: "14px", color: "rgba(255,255,255,0.4)", textDecoration: "none", display: "inline-block" }}
                    whileHover="hover"
                    initial="rest"
                  >
                    <motion.span variants={{ rest: { color: "rgba(255,255,255,0.4)", x: 0 }, hover: { color: "rgba(255,255,255,0.9)", x: 4 } }} transition={{ duration: 0.2 }}>
                      {link.label}
                    </motion.span>
                    <motion.div 
                      variants={{ rest: { scaleX: 0, opacity: 0 }, hover: { scaleX: 1, opacity: 1 } }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(255,255,255,0.8), transparent)", transformOrigin: "left" }}
                    />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeUpItem}>
            <h4 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.55)" }}>Services</h4>
            <ul style={{ listStyle: "none", marginTop: "1.25rem", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <motion.a 
                    href={link.href} 
                    style={{ position: "relative", fontSize: "14px", color: "rgba(255,255,255,0.4)", textDecoration: "none", display: "inline-block" }}
                    whileHover="hover"
                    initial="rest"
                  >
                    <motion.span variants={{ rest: { color: "rgba(255,255,255,0.4)", x: 0 }, hover: { color: "rgba(255,255,255,0.9)", x: 4 } }} transition={{ duration: 0.2 }}>
                      {link.label}
                    </motion.span>
                    <motion.div 
                      variants={{ rest: { scaleX: 0, opacity: 0 }, hover: { scaleX: 1, opacity: 1 } }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, rgba(255,255,255,0.8), transparent)", transformOrigin: "left" }}
                    />
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUpItem}>
            <h4 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.55)" }}>Contact Us</h4>
            <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <motion.a href="tel:+919299992173" whileHover={{ x: 4 }} style={{ display: "flex", gap: "12px", alignItems: "flex-start", cursor: "pointer", textDecoration: "none" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.3s" }} className="contact-icon">
                  <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: 0 }}><span style={{ color: "rgba(255,255,255,0.55)", display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>Phone</span>+91 92999 92173</p>
                </div>
              </motion.a>
              
              <motion.a href="mailto:info@skmlmotionpictures.com" whileHover={{ x: 4 }} style={{ display: "flex", gap: "12px", alignItems: "flex-start", cursor: "pointer", textDecoration: "none" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.3s" }} className="contact-icon">
                  <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: 0 }}><span style={{ color: "rgba(255,255,255,0.55)", display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>Email</span>info@skmlmotionpictures.com</p>
                </div>
              </motion.a>

              <motion.a href="https://maps.google.com/?q=Hyderabad,+Telangana,+India" target="_blank" rel="noopener noreferrer" whileHover={{ x: 4 }} style={{ display: "flex", gap: "12px", alignItems: "flex-start", cursor: "pointer", textDecoration: "none" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.3s" }} className="contact-icon">
                  <svg width="14" height="14" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: 0 }}><span style={{ color: "rgba(255,255,255,0.55)", display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>Location</span>Hyderabad, Telangana, India</p>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={fadeUpItem}
          style={{ marginTop: "3.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", gap: "1rem", textAlign: "center", position: "relative", overflow: "hidden" }} 
        >
          {/* Shimmer overlay */}
          <motion.div 
            animate={{ x: ["-200%", "300%"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear", repeatDelay: 2 }}
            style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "30%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", pointerEvents: "none" }}
          />

          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0, position: "relative", zIndex: 1 }}>
            © {new Date().getFullYear()} SKML Motion Pictures. All rights reserved.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em", margin: 0 }}>
              Where Legacy Meets the Silver Screen
            </p>
            
            <motion.a 
              href="https://stackx.co.in" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.02, backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.98 }}
              style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "10px", 
                background: "rgba(255,255,255,0.02)", 
                border: "1px solid rgba(255,255,255,0.08)", 
                padding: "8px 20px", 
                borderRadius: "100px",
                textDecoration: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                backdropFilter: "blur(10px)"
              }}
            >
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Powered By
              </span>
              <div style={{ height: "18px", width: "1px", background: "rgba(255,255,255,0.1)" }} />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image 
                  src="/assets/images/StackX.png" 
                  alt="StackX Logo" 
                  width={65} 
                  height={18} 
                  style={{ objectFit: "contain", filter: "brightness(1.1) contrast(1.1)" }} 
                  unoptimized 
                />
              </div>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .contact-icon { transition: all 0.3s; }
        .contact-icon:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.2) !important;
        }
        .contact-icon:hover svg {
          stroke: #fff !important;
        }
      `}</style>
    </footer>
  );
}
