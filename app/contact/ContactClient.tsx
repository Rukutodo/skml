"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const WHATSAPP_NUMBER = "919299992173";

const CONTACT_INFO = [
  {
    icon: "phone",
    label: "Phone",
    value: "+91 92999 92173",
    href: "tel:+919299992173",
    description: "Mon – Sat, 10 AM – 7 PM IST",
  },
  {
    icon: "email",
    label: "Email",
    value: "info@skmlmotionpictures.com",
    href: "mailto:info@skmlmotionpictures.com",
    description: "We reply within 24 hours",
  },
  {
    icon: "location",
    label: "Office",
    value: "Hyderabad, Telangana, India",
    href: "https://maps.google.com/?q=Hyderabad,+Telangana,+India",
    description: "Film Nagar, Hyderabad",
  },
];

const INQUIRY_TYPES = [
  "Film Production",
  "OTT Distribution",
  "Theatrical Release",
  "Creative Collaboration",
  "Media & Press",
  "Other",
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: "easeOut" },
} as const;

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" },
};

/* ── SVG Icons ── */
function PhoneIcon() {
  return (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L15 22l-4-9-9-4 20-7z"/>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
    </svg>
  );
}

const ICON_MAP: Record<string, React.FC> = {
  phone: PhoneIcon,
  email: EmailIcon,
  location: LocationIcon,
};

export default function ContactClient() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi, I'm ${formData.name}.%0A%0AInquiry: ${formData.inquiryType || "General"}%0A%0A${formData.message}%0A%0AEmail: ${formData.email}${formData.phone ? `%0APhone: ${formData.phone}` : ""}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  return (
    <>
      <Navbar />
      <main className="contact-main">
        {/* ═══════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════ */}
        <section ref={heroRef} className="contact-hero">
          {/* Animated background */}
          <div className="contact-hero__bg">
            <div className="contact-hero__gradient" />
            {/* Floating orbs */}
            <motion.div
              className="contact-hero__orb contact-hero__orb--1"
              animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="contact-hero__orb contact-hero__orb--2"
              animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.div
              className="contact-hero__orb contact-hero__orb--3"
              animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />
          </div>

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="contact-hero__content">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="contact-hero__eyebrow"
              >
                <div className="contact-hero__eyebrow-line" />
                <span>Get In Touch</span>
                <div className="contact-hero__eyebrow-line" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="contact-hero__title"
              >
                Let&apos;s Create
                <br />
                <span className="contact-hero__title-accent">Together</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="contact-hero__subtitle"
              >
                Whether you&apos;re a filmmaker looking for production support, seeking OTT
                distribution, or exploring a creative collaboration — we&apos;d love to hear your story.
              </motion.p>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="contact-hero__scroll"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="contact-hero__scroll-dot"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            CONTACT CARDS SECTION
        ═══════════════════════════════════════════ */}
        <section className="contact-cards-section">
          <div className="contact-page-container">
            <motion.div {...fadeIn} className="contact-section-label">
              <div className="contact-section-label__line" />
              <span>Reach Us</span>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
              className="contact-cards-grid"
            >
              {CONTACT_INFO.map((info) => {
                const Icon = ICON_MAP[info.icon];
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target={info.icon === "location" ? "_blank" : undefined}
                    rel={info.icon === "location" ? "noopener noreferrer" : undefined}
                    variants={staggerItem}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="contact-info-card"
                  >
                    <div className="contact-info-card__icon">
                      <Icon />
                    </div>
                    <div className="contact-info-card__content">
                      <span className="contact-info-card__label">{info.label}</span>
                      <span className="contact-info-card__value">{info.value}</span>
                      <span className="contact-info-card__desc">{info.description}</span>
                    </div>
                    <div className="contact-info-card__arrow">
                      <ArrowIcon />
                    </div>
                  </motion.a>
                );
              })}

              {/* WhatsApp Card — special styling */}
              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I'm%20interested%20in%20your%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                variants={staggerItem}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="contact-info-card contact-info-card--whatsapp"
              >
                <div className="contact-info-card__icon contact-info-card__icon--whatsapp">
                  <WhatsAppIcon />
                </div>
                <div className="contact-info-card__content">
                  <span className="contact-info-card__label">WhatsApp</span>
                  <span className="contact-info-card__value">Chat with Us</span>
                  <span className="contact-info-card__desc">Instant replies during business hours</span>
                </div>
                <div className="contact-info-card__arrow">
                  <ArrowIcon />
                </div>
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FORM + MAP SECTION
        ═══════════════════════════════════════════ */}
        <section className="contact-form-section">
          <div className="contact-page-container">
            <div className="contact-form-grid">
              {/* ── LEFT: Form ── */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="contact-form-wrapper"
              >
                <div className="contact-form-header">
                  <h2 className="contact-form-header__title">Send us a Message</h2>
                  <p className="contact-form-header__desc">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                  {/* Name & Email row */}
                  <div className="contact-form__row">
                    <div className={`contact-form__field ${focusedField === "name" ? "contact-form__field--focused" : ""}`}>
                      <label htmlFor="cp-name" className="contact-form__label">Full Name</label>
                      <input
                        id="cp-name"
                        type="text"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className="contact-form__input"
                      />
                    </div>
                    <div className={`contact-form__field ${focusedField === "email" ? "contact-form__field--focused" : ""}`}>
                      <label htmlFor="cp-email" className="contact-form__label">Email Address</label>
                      <input
                        id="cp-email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="contact-form__input"
                      />
                    </div>
                  </div>

                  {/* Phone & Inquiry row */}
                  <div className="contact-form__row">
                    <div className={`contact-form__field ${focusedField === "phone" ? "contact-form__field--focused" : ""}`}>
                      <label htmlFor="cp-phone" className="contact-form__label">Phone <span className="contact-form__optional">(Optional)</span></label>
                      <input
                        id="cp-phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        className="contact-form__input"
                      />
                    </div>
                    <div className={`contact-form__field ${focusedField === "inquiry" ? "contact-form__field--focused" : ""}`}>
                      <label htmlFor="cp-inquiry" className="contact-form__label">Inquiry Type</label>
                      <select
                        id="cp-inquiry"
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        onFocus={() => setFocusedField("inquiry")}
                        onBlur={() => setFocusedField(null)}
                        className="contact-form__input contact-form__select"
                      >
                        <option value="">Select one…</option>
                        {INQUIRY_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className={`contact-form__field ${focusedField === "message" ? "contact-form__field--focused" : ""}`}>
                    <label htmlFor="cp-message" className="contact-form__label">Your Message</label>
                    <textarea
                      id="cp-message"
                      required
                      rows={5}
                      placeholder="Tell us about your project, idea, or inquiry…"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className="contact-form__input contact-form__textarea"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="contact-form__submit"
                  >
                    <SendIcon />
                    Send Message
                  </motion.button>
                </form>
              </motion.div>

              {/* ── RIGHT: Map + Extra Info ── */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                className="contact-sidebar"
              >
                {/* Map embed */}
                <div className="contact-map-wrapper">
                  <iframe
                    title="SKML Motion Pictures Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.90509786404!2d78.26795874999999!3d17.4123487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1716450000000!5m2!1sen!2sin"
                    className="contact-map-iframe"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  <div className="contact-map-overlay">
                    <span className="contact-map-overlay__badge">
                      <LocationIcon /> Hyderabad, India
                    </span>
                  </div>
                </div>

                {/* Office hours card */}
                <motion.div {...fadeIn} className="contact-hours-card">
                  <h3 className="contact-hours-card__title">Office Hours</h3>
                  <div className="contact-hours-card__grid">
                    <div className="contact-hours-card__row">
                      <span className="contact-hours-card__day">Monday – Friday</span>
                      <span className="contact-hours-card__time">10:00 AM – 7:00 PM</span>
                    </div>
                    <div className="contact-hours-card__row">
                      <span className="contact-hours-card__day">Saturday</span>
                      <span className="contact-hours-card__time">10:00 AM – 4:00 PM</span>
                    </div>
                    <div className="contact-hours-card__row">
                      <span className="contact-hours-card__day">Sunday</span>
                      <span className="contact-hours-card__time contact-hours-card__time--closed">Closed</span>
                    </div>
                  </div>
                </motion.div>

                {/* Quick note */}
                <motion.div {...fadeIn} className="contact-note">
                  <div className="contact-note__icon">💡</div>
                  <p>
                    <strong>Quick Tip:</strong> For fastest response, reach out via WhatsApp.
                    We typically respond within minutes during business hours.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
