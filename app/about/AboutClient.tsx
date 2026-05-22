"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { useRef } from "react";

const POSTERS = [
  "/assets/images/poster-aghora.jpeg",
  "/assets/images/poster-aaj.jpeg",
  "/assets/images/poster-ddd.jpeg",
  "/assets/images/poster-vyuntapali.jpeg",
  "/assets/images/poster-mrlonely.jpeg",
  "/assets/images/poster-hb.jpeg",
];

const VALUES = [
  { num: "01", title: "Story first, always", desc: "We evaluate every project starting with one question: is this a story worth telling? Budget, star power, and genre come after." },
  { num: "02", title: "Affordable without compromise", desc: "We've proven over 12 years that optimised production costs don't mean lower quality. We find efficiencies in process, not in cutting corners." },
  { num: "03", title: "Relationships over transactions", desc: "Every director, crew member, and distribution partner is a long-term relationship." },
  { num: "04", title: "Telugu cinema on the world stage", desc: "We genuinely believe Telugu storytelling belongs on global platforms. Every OTT deal we close is part of a larger mission." },
];

const AWARDS = [
  { year: "2022", title: "Best Regional Production House", body: "South Indian Film Awards" },
  { year: "2023", title: "OTT Partner of the Year", body: "Aha Platform" },
  { year: "2021", title: "Emerging Banner", body: "Tollywood Producers Guild" },
  { year: "2019 – 2024", title: "National Festival Selections", body: "Multiple Categories" },
];

function PosterSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const r1 = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const r2 = useTransform(scrollYProgress, [0, 1], [4, -4]);

  return (
    <div ref={containerRef} className="poster-sequence">
      <motion.div style={{ y: y1, rotate: r1 }} className="poster-item poster-item--1">
        <Image src={POSTERS[0]} alt="Film" fill style={{ objectFit: "cover" }} />
      </motion.div>
      <motion.div style={{ y: y2, rotate: r2 }} className="poster-item poster-item--2">
        <Image src={POSTERS[1]} alt="Film" fill style={{ objectFit: "cover" }} />
      </motion.div>
      <motion.div style={{ y: y3 }} className="poster-item poster-item--3">
        <Image src={POSTERS[2]} alt="Film" fill style={{ objectFit: "cover" }} />
      </motion.div>
      <motion.div style={{ y: y1 }} className="poster-item poster-item--4">
        <Image src={POSTERS[3]} alt="Film" fill style={{ objectFit: "cover" }} />
      </motion.div>
    </div>
  );
}

export default function AboutClient() {
  const { scrollYProgress } = useScroll();
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const heroOpacity = useTransform(smoothY, [0, 0.15], [1, 0]);
  const heroScale = useTransform(smoothY, [0, 0.15], [1, 1.05]);

  return (
    <>
      <Navbar />
      <main className="sk-about">
        
        {/* ── MONOCHROME HERO (WHITE) ── */}
        <section className="sk-hero">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="sk-hero__bg">
            <Image 
              src="/assets/images/about-hero.jpg" 
              alt="Film set" 
              fill 
              style={{ objectFit: "cover", brightness: "1.1", contrast: "1.1" }} 
              priority 
            />
            <div className="sk-hero__overlay" />
          </motion.div>
          
          <div className="sk-container">
            <div className="sk-hero__content">
              <motion.div 
                initial={{ opacity: 0, y: 40 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="sk-meta">Est. 2013 · Hyderabad</span>
                <h1 className="sk-title-xl">
                  Built on <br/>
                  <em className="sk-accent-serif">Belief.</em>
                </h1>
                <p className="sk-body-lg">
                  SKML Motion Pictures is a boutique production house giving powerful Telugu stories the screen they deserve.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 1 (BLACK) ── */}
        <section className="sk-section sk-section--black">
          <div className="sk-container">
            <div className="sk-grid-editorial">
              <div className="sk-col-text">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="sk-chapter"
                >
                  <span className="sk-chapter__line" />
                  <span className="sk-chapter__label">Chapter 01</span>
                </motion.div>
                
                <h2 className="sk-title-lg">
                  In 2013, Telugu cinema <br/>
                  had a <em className="sk-accent-serif">problem.</em>
                </h2>
                <h3 className="sk-title-sub">
                   Because few were willing <br/> to take a risk.
                </h3>
                
                <div className="sk-story">
                  <p>Brilliant stories were dying in the hands of directors who couldn&apos;t find a banner willing to take a risk on them.</p>
                  <p>Kandregula Adhinarayana had seen this happen one too many times. Talent was walking away not because stories weren&apos;t good — but because gatekeepers demanded names over narratives.</p>
                </div>

                <motion.blockquote 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="sk-quote"
                >
                  &quot;The first film felt like climbing a mountain without a map. But the view from the top changed everything.&quot;
                  <cite>— Founder</cite>
                </motion.blockquote>
              </div>

              <div className="sk-col-visual">
                <PosterSequence />
              </div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 2 (WHITE) ── */}
        <section className="sk-section sk-section--white">
          <div className="sk-container">
            <div className="sk-grid-founder">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="sk-founder-img"
              >
                <Image src="/assets/images/producer-portrait.jpeg" alt="Kandregula Adhinarayana" fill style={{ objectFit: "cover" }} />
                <div className="sk-founder-badge">
                   <h3>Adhinarayana</h3>
                   <span>Founder & Producer</span>
                </div>
              </motion.div>

              <div className="sk-founder-content">
                <span className="sk-meta">The Visionary</span>
                <h2 className="sk-title-md">A Vision Built on Persistence</h2>
                <div className="sk-story">
                   <p>He didn&apos;t come from a film family. No inherited studio, no industry godfather. What he had was an obsessive love for cinema and the grit to bet on himself.</p>
                   <p>Today, SKML stands as a testament to that persistence — transforming from a small Hyderabad-based banner into a respected name in regional cinema.</p>
                </div>
                
                <div className="sk-stats">
                  <div className="sk-stat">
                    <span className="sk-stat__val">12+</span>
                    <span className="sk-stat__label">Years</span>
                  </div>
                  <div className="sk-stat">
                    <span className="sk-stat__val">186+</span>
                    <span className="sk-stat__label">Films distributed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 3 (BLACK) ── */}
        <section className="sk-section sk-section--black">
          <div className="sk-container">
            <div className="sk-awards-grid">
               <div className="sk-awards-intro">
                  <span className="sk-meta">Honors</span>
                  <h2 className="sk-title-md">The industry&apos;s recognition <br/> of a decade&apos;s work</h2>
                  <p className="sk-body-muted">Awards reflect the industry&apos;s trust in our craft over the last decade.</p>
               </div>
               <div className="sk-awards-list">
                  {AWARDS.map((a, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="sk-award-item"
                    >
                      <span className="sk-award-year">{a.year}</span>
                      <div className="sk-award-body">
                         <h4>{a.title}</h4>
                         <p>{a.body}</p>
                      </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            <div className="sk-values-grid">
               {VALUES.map((v, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="sk-value"
                 >
                   <span className="sk-value__num">{v.num}</span>
                   <h3>{v.title}</h3>
                   <p>{v.desc}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        {/* ── CTA (WHITE) ── */}
        <section className="sk-cta sk-section--white">
           <div className="sk-container">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="sk-cta-card"
              >
                 <h2 className="sk-title-lg">Your story deserves <br/> its screen.</h2>
                 <div className="sk-cta-actions">
                    <a href="/#contact" className="sk-btn sk-btn--primary">Get in touch</a>
                    <a href="/movies" className="sk-btn sk-btn--outline">View our films</a>
                 </div>
              </motion.div>
           </div>
        </section>

      </main>
      <Footer />
      <FloatingWhatsApp />

      <style>{`
        /* ─── MONOCHROME EDITORIAL DESIGN SYSTEM ─── */
        :root {
          --sk-bg: oklch(99% 0.002 280);
          --sk-surface: oklch(96% 0.002 280);
          --sk-accent: oklch(12% 0.01 280);
          --sk-text: oklch(12% 0.01 280);
          --sk-text-muted: oklch(50% 0.01 280);
        }

        .sk-about { background: var(--sk-bg); color: var(--sk-text); }
        .sk-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

        /* Hero */
        .sk-hero { position: relative; height: 100vh; display: flex; align-items: center; overflow: hidden; background: #fff; }
        .sk-hero__bg { position: absolute; inset: 0; z-index: 0; }
        .sk-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent, var(--sk-bg)); }
        .sk-hero__content { position: relative; z-index: 1; max-width: 800px; }

        /* Typography */
        .sk-title-xl { font-family: var(--font-serif); font-size: clamp(4rem, 12vw, 8rem); line-height: 0.9; letter-spacing: -0.04em; margin-bottom: 2rem; color: var(--sk-text); }
        .sk-title-lg { font-family: var(--font-serif); font-size: clamp(2.5rem, 6vw, 4.5rem); line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 1rem; }
        .sk-title-sub { font-family: var(--font-serif); font-size: clamp(1.5rem, 3vw, 2.5rem); color: var(--sk-text-muted); line-height: 1.2; margin-bottom: 2.5rem; font-weight: 500; }
        .sk-title-md { font-family: var(--font-serif); font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1.2; margin-bottom: 1.5rem; }
        .sk-accent-serif { font-style: italic; color: var(--sk-text); font-weight: 400; text-decoration: underline; text-underline-offset: 8px; text-decoration-thickness: 1px; text-decoration-color: rgba(0,0,0,0.1); }
        .sk-meta { font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.4em; color: var(--sk-text); display: block; margin-bottom: 1rem; opacity: 0.6; }
        .sk-body-lg { font-size: 1.25rem; line-height: 1.6; color: var(--sk-text-muted); max-width: 500px; }
        .sk-body-muted { color: var(--sk-text-muted); line-height: 1.7; }

        /* Sections */
        .sk-section { padding: 15vh 0; }
        .sk-section--white { background: var(--sk-bg); color: var(--sk-text); }
        .sk-section--black { 
          background: oklch(12% 0.01 280); 
          color: #fff; 
          --sk-text: #fff; 
          --sk-text-muted: oklch(70% 0.01 280);
          --sk-accent: #fff;
        }

        /* Editorial Grid */
        .sk-grid-editorial { display: grid; grid-template-columns: 1fr; gap: 4rem; align-items: center; }
        @media (min-width: 1024px) { .sk-grid-editorial { grid-template-columns: 1fr 1.2fr; gap: 8rem; } }

        .sk-chapter { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
        .sk-chapter__line { width: 40px; height: 1px; background: var(--sk-accent); }
        .sk-chapter__label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--sk-accent); font-weight: 700; }

        .sk-story { font-size: 1.125rem; line-height: 1.8; color: var(--sk-text-muted); display: flex; flex-direction: column; gap: 1.5rem; }
        .sk-quote { margin: 4rem 0; font-family: var(--font-serif); font-size: 1.75rem; line-height: 1.4; color: var(--sk-text); font-style: italic; border-left: 1px solid var(--sk-accent); padding-left: 2rem; }
        .sk-quote cite { display: block; font-size: 0.75rem; font-style: normal; text-transform: uppercase; letter-spacing: 0.2em; color: var(--sk-text-muted); margin-top: 1rem; }

        /* Poster Sequence */
        .sk-col-visual { position: relative; min-height: 600px; }
        .poster-sequence { position: relative; width: 100%; height: 100%; }
        .poster-item { position: absolute; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.15); transition: transform 0.5s ease; }
        .poster-item:hover { transform: scale(1.05); z-index: 10; }
        .poster-item--1 { width: 280px; aspect-ratio: 2/3; top: 0; left: 10%; z-index: 2; }
        .poster-item--2 { width: 220px; aspect-ratio: 2/3; top: 150px; right: 10%; z-index: 1; opacity: 0.8; }
        .poster-item--3 { width: 200px; aspect-ratio: 2/3; top: 400px; left: 0; z-index: 3; }
        .poster-item--4 { width: 240px; aspect-ratio: 2/3; top: 450px; right: 0; z-index: 2; }

        /* Founder Grid */
        .sk-grid-founder { display: grid; grid-template-columns: 1fr; gap: 4rem; align-items: center; }
        @media (min-width: 1024px) { .sk-grid-founder { grid-template-columns: 1fr 1fr; gap: 10vw; } }

        .sk-founder-img { position: relative; aspect-ratio: 4/5; background: #eee; }
        .sk-founder-badge { position: absolute; bottom: -2rem; right: -2rem; background: var(--sk-accent); color: var(--sk-bg); padding: 2rem; }
        .sk-section--black .sk-founder-badge { background: #fff; color: #000; }
        .sk-founder-badge h3 { font-family: var(--font-serif); font-size: 1.5rem; line-height: 1; }
        .sk-founder-badge span { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.8; }

        .sk-stats { display: flex; gap: 4rem; margin-top: 4rem; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 3rem; }
        .sk-section--black .sk-stats { border-top-color: rgba(255,255,255,0.1); }
        .sk-stat__val { display: block; font-family: var(--font-serif); font-size: 3rem; color: var(--sk-accent); }
        .sk-stat__label { font-size: 0.75rem; text-transform: uppercase; color: var(--sk-text-muted); }

        /* Awards & Values */
        .sk-awards-grid { display: grid; grid-template-columns: 1fr; gap: 4rem; margin-bottom: 20vh; }
        @media (min-width: 1024px) { .sk-awards-grid { grid-template-columns: 1fr 2fr; gap: 8rem; } }
        
        .sk-awards-list { display: flex; flex-direction: column; border-top: 1px solid rgba(0,0,0,0.05); }
        .sk-section--black .sk-awards-list { border-top-color: rgba(255,255,255,0.1); }
        .sk-award-item { display: grid; grid-template-columns: 120px 1fr; padding: 2.5rem 0; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .sk-section--black .sk-award-item { border-bottom-color: rgba(255,255,255,0.1); }
        .sk-award-year { font-family: var(--font-mono); font-size: 0.875rem; color: var(--sk-accent); font-weight: 700; }
        .sk-award-body h4 { font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; }
        .sk-award-body p { font-size: 0.875rem; color: var(--sk-text-muted); }

        .sk-values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 4rem; }
        .sk-value__num { display: block; font-family: var(--font-serif); font-size: 1.5rem; color: var(--sk-accent); margin-bottom: 1.5rem; position: relative; width: fit-content; }
        .sk-value__num::after { content: ""; position: absolute; bottom: -4px; left: 0; width: 100%; height: 1px; background: currentColor; opacity: 0.2; }
        .sk-value h3 { font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; }
        .sk-value p { font-size: 0.95rem; line-height: 1.7; color: var(--sk-text-muted); }

        /* CTA */
        .sk-cta { padding: 20vh 0; text-align: center; }
        .sk-cta-card { padding: 10vh 2rem; position: relative; }
        .sk-cta-actions { display: flex; justify-content: center; gap: 1.5rem; margin-top: 4rem; }

        .sk-btn { padding: 1.25rem 2.5rem; font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.4s ease; border-radius: 2px; }
        .sk-btn--primary { background: var(--sk-accent); color: var(--sk-bg); }
        .sk-section--black .sk-btn--primary { background: #fff; color: #000; }
        .sk-btn--primary:hover { background: #000; color: #fff; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .sk-section--black .sk-btn--primary:hover { background: #eee; color: #000; }
        
        .sk-btn--outline { border: 1px solid var(--sk-accent); color: var(--sk-accent); }
        .sk-btn--outline:hover { background: var(--sk-accent); color: var(--sk-bg); }
        .sk-section--black .sk-btn--outline:hover { background: #fff; color: #000; }

        @media (max-width: 768px) {
          .sk-col-visual { min-height: 800px; }
          .poster-item { width: 180px !important; }
          .sk-stats { gap: 2rem; }
          .sk-award-item { grid-template-columns: 1fr; gap: 1rem; }
        }
      `}</style>
    </>
  );
}
