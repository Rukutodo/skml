"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const UNSPLASH = {
  hero: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1600",
  set1: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=900",
  set2: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=600",
  set3: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600",
  founder: "/assets/images/producer-portrait.jpeg", // Using local asset if available, fallback to portrait
  bts1: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=900",
  bts2: "https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&q=80&w=600",
  bts3: "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?auto=format&fit=crop&q=80&w=600",
  bts4: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=600",
};

const VALUES = [
  { num: "01", title: "Story first, always", desc: "We evaluate every project starting with one question: is this a story worth telling? Budget, star power, and genre come after." },
  { num: "02", title: "Affordable without compromise", desc: "We've proven over 12 years that optimised production costs don't mean lower quality. We find efficiencies in process, not in cutting corners." },
  { num: "03", title: "Relationships over transactions", desc: "Every director, crew member, and distribution partner is a long-term relationship. 80% of directors return for their next film." },
  { num: "04", title: "Telugu cinema on the world stage", desc: "We genuinely believe Telugu storytelling belongs on global platforms. Every OTT deal we close is part of a larger mission." },
];

const AWARDS = [
  { year: "2022", title: "Best Regional Production House", body: "South Indian Film Awards, Chennai" },
  { year: "2023", title: "OTT Distribution Partner of the Year", body: "Aha Platform Annual Recognition" },
  { year: "2021", title: "Emerging Banner of the Year", body: "Tollywood Producers Guild" },
  { year: "2019 – 2024", title: "5 National Festival Selections", body: "Multiple Categories" },
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } }
};

export default function AboutClient() {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <>
      <Navbar />
      <main className="about-main">

        {/* ── HERO ── */}
        <section className="about-hero">
          <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="about-hero__bg">
            <Image src={UNSPLASH.hero} alt="Cinematic" fill style={{ objectFit: "cover", opacity: 0.45 }} priority />
            <div className="about-hero__gradient" />
          </motion.div>
          <div className="about-hero__content">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="about-eyebrow">
              Est. 2013 · Hyderabad, Telangana
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="about-hero__title">
              A production house built not on budgets,<br />
              but on <em className="about-gold">belief.</em>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="about-hero__sub">
              SKML Motion Pictures has spent over a decade giving powerful Telugu stories the screen they deserve.
            </motion.p>
          </div>
        </section>

        {/* ── CHAPTER 1: THE BEGINNING (SKML) ── */}
        <section className="about-section about-section--large">
          <div className="about-container">
            <motion.div {...fadeIn} className="about-chapter-tag">
              <span className="about-chapter-num">01</span>
              <span className="about-chapter-line" />
              <span className="about-chapter-label">The Beginning</span>
            </motion.div>

            <div className="about-two-col about-two-col--flipped">
              <motion.div {...fadeIn} className="about-two-col__left">
                <h2 className="about-section-title about-section-title--huge">
                  In 2013, Telugu cinema had a problem. <em className="about-gold">Brilliant stories were dying</em> in the hands of directors who couldn't find a banner willing to take a risk.
                </h2>
                <div className="about-story-text">
                  <p className="about-body">
                    Kandregula Adhinarayana had seen this happen one too many times. He watched talented writers walk away from their dream projects because industry gatekeepers demanded star power before reading a script.
                  </p>
                  <p className="about-body">
                    So he decided to do something about it. In a modest office in Hyderabad, SKML Motion Pictures was born — with a promise that every film would be made with full commitment, regardless of scale.
                  </p>
                </div>
                <motion.blockquote {...fadeIn} className="about-quote">
                  <p>"The first film we produced felt like climbing a mountain with no map. But we got to the top, and the view from there changed everything."</p>
                  <cite>— Kandregula Adhinarayana</cite>
                </motion.blockquote>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="about-two-col__right">
                <div className="about-img-story-hero">
                  <Image src={UNSPLASH.set1} alt="Film Production" fill style={{ objectFit: "cover" }} />
                  <div className="about-img-overlay" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 2: THE FOUNDER ── */}
        <section className="about-section about-section--mid">
          <div className="about-container">
            <motion.div {...fadeIn} className="about-chapter-tag">
              <span className="about-chapter-num">02</span>
              <span className="about-chapter-line" />
              <span className="about-chapter-label">The Man Behind the Banner</span>
            </motion.div>

            <div className="about-founder">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="about-founder__photo">
                <Image src={UNSPLASH.founder} alt="Kandregula Adhinarayana" fill style={{ objectFit: "cover" }} />
                <div className="about-founder__caption">
                  <h3 className="about-founder__name">Kandregula Adhinarayana</h3>
                  <p className="about-founder__role">Founder &amp; Producer</p>
                </div>
              </motion.div>

              <motion.div {...fadeIn} className="about-founder__bio">
                <p className="about-body about-body--large">
                  He didn't come from a film family. There was no inherited studio, no godfather in the industry. What Adhinarayana had was something rarer — an obsessive love for cinema and an entrepreneur's willingness to bet on himself when no one else would.
                </p>
                <p className="about-body">
                  Growing up in Andhra Pradesh, he watched films not just to be entertained, but to understand how they were made. That depth of understanding shows in every SKML production — budgets are optimised by knowing exactly where every rupee creates value on screen.
                </p>
                <div className="about-stats-modern">
                  <div className="about-stat-pill">
                    <span className="about-stat-pill__num">12+</span>
                    <span className="about-stat-pill__label">Years</span>
                  </div>
                  <div className="about-stat-pill">
                    <span className="about-stat-pill__num">186+</span>
                    <span className="about-stat-pill__label">Films</span>
                  </div>
                  <div className="about-stat-pill">
                    <span className="about-stat-pill__num">50M+</span>
                    <span className="about-stat-pill__label">Viewers</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 3: AWARDS (Moved Up) ── */}
        <section className="about-section about-section--dark">
          <div className="about-container">
            <motion.div {...fadeIn} className="about-chapter-tag">
              <span className="about-chapter-num">03</span>
              <span className="about-chapter-line" />
              <span className="about-chapter-label">Recognition</span>
            </motion.div>
            <div className="about-awards-layout">
              <motion.div {...fadeIn} className="about-awards-intro">
                <h2 className="about-section-title">The industry's recognition of a decade's work</h2>
                <p className="about-body">Awards don't define us, but they reflect the industry's trust in what we've built. SKML films have been recognised across regional and national platforms.</p>
              </motion.div>
              <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="about-awards-grid">
                {AWARDS.map((a) => (
                  <motion.div variants={fadeIn} key={a.title} className="about-award-card">
                    <span className="about-award-year">{a.year}</span>
                    <h3 className="about-award-title">{a.title}</h3>
                    <p className="about-award-body">{a.body}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 4: WHERE EVERY FILM IS MADE (Services) ── */}
        <section className="about-section about-section--mid">
          <div className="about-container">
            <motion.div {...fadeIn} className="about-chapter-tag">
              <span className="about-chapter-num">04</span>
              <span className="about-chapter-line" />
              <span className="about-chapter-label">Process &amp; Craft</span>
            </motion.div>

            <motion.h2 {...fadeIn} className="about-section-title">Where every film is made</motion.h2>
            <motion.p {...fadeIn} className="about-body about-body--wide">
              Great cinema doesn't happen by accident. It's the result of hundreds of decisions made under pressure — on set, in the edit room, and in distribution meetings.
            </motion.p>

            <div className="about-bts-visual">
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="about-bts-main-wide">
                <Image src={UNSPLASH.bts1} alt="Film set" fill style={{ objectFit: "cover" }} />
                <div className="about-bts-label">On Location</div>
              </motion.div>
              <div className="about-bts-details">
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="about-bts-detail-item">
                  <div className="about-bts-detail-img">
                    <Image src={UNSPLASH.bts2} alt="Cinematography" fill style={{ objectFit: "cover" }} />
                  </div>
                  <h4>Precision Cinematography</h4>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="about-bts-detail-item">
                  <div className="about-bts-detail-img">
                    <Image src={UNSPLASH.bts4} alt="Sound" fill style={{ objectFit: "cover" }} />
                  </div>
                  <h4>Advanced Post-Production</h4>
                </motion.div>
              </div>
            </div>

            <motion.div {...fadeIn} className="about-two-text-modern">
              <div className="about-modern-text-card">
                <h3>Waste Nothing, Compromise Nothing</h3>
                <p>SKML's production process is built around one principle: efficiency. Every project begins with a detailed breakdown of the script to identify where the budget can be optimised without affecting visual or emotional impact.</p>
              </div>
              <div className="about-modern-text-card">
                <h3>Global Distribution Standards</h3>
                <p>Post-production at SKML is treated with the same seriousness as the shoot itself. We ensure that when a viewer watches an SKML film on Amazon Prime or Aha, they experience world-class quality.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CHAPTER 5: VALUES (Why Choose Us) ── */}
        <section className="about-section about-section--dark">
          <div className="about-container">
            <motion.div {...fadeIn} className="about-chapter-tag">
              <span className="about-chapter-num">05</span>
              <span className="about-chapter-line" />
              <span className="about-chapter-label">The Core</span>
            </motion.div>
            <motion.h2 {...fadeIn} className="about-section-title">The values that drive every decision we make</motion.h2>
            
            <div className="about-values-modern">
              {VALUES.map((v, i) => (
                <motion.div 
                  key={v.num} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.1 }}
                  className="about-value-pill"
                >
                  <div className="about-value-pill__header">
                    <span className="about-value-pill__num">{v.num}</span>
                    <h3 className="about-value-pill__title">{v.title}</h3>
                  </div>
                  <p className="about-value-pill__desc">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <motion.section {...fadeIn} className="about-cta">
          <h2 className="about-cta__title">Your story deserves its screen.</h2>
          <p className="about-cta__sub">Whether you're a director looking for a production partner or a distributor seeking quality Telugu content — let's talk.</p>
          <div className="about-cta__btns">
            <a href="/#contact" className="about-btn about-btn--gold">Get in touch</a>
            <a href="/movies" className="about-btn about-btn--outline">View our films</a>
          </div>
        </motion.section>

      </main>
      <Footer />
      <FloatingWhatsApp />

      <style>{`
        /* ─── Base ─── */
        .about-main { background: #0A0A0F; color: #fff; min-height: 100vh; overflow-x: hidden; }

        /* ─── Hero ─── */
        .about-hero {
          position: relative; height: 100vh; min-height: 600px;
          display: flex; align-items: center; justify-content: center;
          text-align: center; overflow: hidden;
        }
        .about-hero__bg { position: absolute; inset: 0; z-index: 0; }
        .about-hero__gradient {
          position: absolute; inset: 0;
          background: radial-gradient(circle at center, transparent 0%, rgba(10,10,15,0.4) 50%, #0A0A0F 100%),
                      linear-gradient(to top, #0A0A0F 0%, transparent 40%);
        }
        .about-hero__content {
          position: relative; z-index: 1; max-width: 900px;
          padding: 0 1.5rem;
        }
        .about-eyebrow {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.35em; color: #c9a84c; margin-bottom: 2rem;
        }
        .about-hero__title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 700; line-height: 1.1; color: #F5F5F8;
          margin-bottom: 2rem; letter-spacing: -0.03em;
        }
        .about-hero__sub {
          font-size: clamp(1rem, 2.5vw, 1.25rem); line-height: 1.8;
          color: rgba(255,255,255,0.6); max-width: 600px; margin: 0 auto;
        }
        .about-gold { color: #c9a84c; font-style: italic; }

        /* ─── Sections ─── */
        .about-section { padding: 8rem 0; }
        .about-section--large { padding: 12rem 0; }
        .about-section--dark { background: #0A0A0F; }
        .about-section--mid { background: #0E0E14; border-top: 1px solid #1A1A24; border-bottom: 1px solid #1A1A24; }
        .about-container { max-width: 1240px; margin: 0 auto; padding: 0 2rem; }

        /* ─── Chapter Tag ─── */
        .about-chapter-tag {
          display: flex; align-items: center; gap: 1rem;
          margin-bottom: 4rem;
        }
        .about-chapter-num { font-size: 14px; font-weight: 800; color: #c9a84c; letter-spacing: 0.1em; }
        .about-chapter-line { height: 1px; width: 4rem; background: #c9a84c; opacity: 0.3; }
        .about-chapter-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3em; color: #555; }

        /* ─── Typography ─── */
        .about-section-title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 600; color: #F5F5F8;
          line-height: 1.2; margin-bottom: 2rem; max-width: 800px;
        }
        .about-section-title--huge {
           font-size: clamp(2.5rem, 6vw, 4.5rem);
           line-height: 1.1;
           margin-bottom: 3rem;
        }
        .about-body {
          font-size: 17px; line-height: 1.8; color: #A0A0AB;
          margin-bottom: 1.5rem; max-width: 600px;
        }
        .about-body--large { font-size: 20px; color: #D4D4D8; font-weight: 400; line-height: 1.6; }
        .about-body--wide { max-width: 800px; }

        /* ─── Storytelling Layout ─── */
        .about-two-col {
          display: grid; grid-template-columns: 1fr;
          gap: 5rem; align-items: center;
        }
        @media (min-width: 1024px) {
          .about-two-col { grid-template-columns: 1.2fr 0.8fr; gap: 8rem; }
          .about-two-col--flipped { grid-template-columns: 1.3fr 0.7fr; }
        }
        
        .about-story-text { margin-bottom: 3rem; position: relative; }
        .about-story-text::before {
          content: ""; position: absolute; left: -2rem; top: 0.5rem; bottom: 0.5rem;
          width: 2px; background: linear-gradient(to bottom, #c9a84c, transparent);
          opacity: 0.4;
        }

        .about-img-story-hero {
          position: relative; width: 100%; aspect-ratio: 4/5;
          border-radius: 24px; overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }
        .about-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(45deg, rgba(201,168,76,0.1), transparent);
        }

        /* ─── Blockquote ─── */
        .about-quote {
          padding: 2.5rem; background: #16161E; border-radius: 20px;
          margin: 4rem 0; position: relative;
        }
        .about-quote p {
          font-family: var(--font-playfair), serif;
          font-size: 1.4rem; font-style: italic; color: #F5F5F8;
          line-height: 1.5; margin-bottom: 1.5rem;
        }
        .about-quote cite {
          font-size: 12px; text-transform: uppercase;
          letter-spacing: 0.2em; color: #c9a84c; font-weight: 700;
          display: block;
        }

        /* ─── Founder Section ─── */
        .about-founder {
          display: grid; grid-template-columns: 1fr;
          gap: 5rem; margin-top: 2rem;
        }
        @media (min-width: 1024px) {
          .about-founder { grid-template-columns: 420px 1fr; gap: 8rem; align-items: center; }
        }
        .about-founder__photo {
          position: relative; width: 100%; aspect-ratio: 3/4;
          border-radius: 30px; overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
        }
        .about-founder__caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 3rem 2rem;
          background: linear-gradient(to top, #0A0A0F, transparent);
        }
        .about-founder__name { font-family: var(--font-playfair), serif; font-size: 2rem; color: #fff; margin-bottom: 0.5rem; }
        .about-founder__role { font-size: 12px; text-transform: uppercase; letter-spacing: 0.25em; color: #c9a84c; font-weight: 700; }

        .about-stats-modern {
          display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 4rem;
        }
        .about-stat-pill {
          background: #1A1A24; padding: 1.5rem 2.5rem; border-radius: 100px;
          border: 1px solid #2A2A38; transition: all 0.3s ease;
        }
        .about-stat-pill:hover { border-color: #c9a84c; transform: translateY(-5px); }
        .about-stat-pill__num { display: block; font-size: 2.5rem; font-weight: 700; color: #c9a84c; font-family: var(--font-playfair), serif; }
        .about-stat-pill__label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #71717A; margin-top: 0.25rem; display: block; }

        /* ─── Awards ─── */
        .about-awards-layout {
          display: grid; grid-template-columns: 1fr;
          gap: 4rem; margin-top: 2rem;
        }
        @media (min-width: 1024px) { .about-awards-layout { grid-template-columns: 1fr 2fr; gap: 8rem; } }
        .about-awards-grid {
          display: grid; grid-template-columns: 1fr; gap: 1.5rem;
        }
        @media (min-width: 640px) { .about-awards-grid { grid-template-columns: 1fr 1fr; } }
        .about-award-card {
          background: #111118; border: 1px solid #1A1A24;
          border-radius: 20px; padding: 2.5rem;
          transition: all 0.3s ease;
        }
        .about-award-card:hover { border-color: #c9a84c; background: #16161E; }
        .about-award-year { font-size: 12px; font-weight: 800; color: #c9a84c; display: block; margin-bottom: 1rem; }
        .about-award-title { font-family: var(--font-playfair), serif; font-size: 1.25rem; color: #fff; margin-bottom: 0.75rem; line-height: 1.3; }
        .about-award-body { font-size: 14px; color: #71717A; line-height: 1.6; }

        /* ─── BTS Visual ─── */
        .about-bts-visual {
          display: grid; grid-template-columns: 1fr; gap: 2rem; margin: 4rem 0;
        }
        @media (min-width: 1024px) { .about-bts-visual { grid-template-columns: 2fr 1fr; } }
        .about-bts-main-wide {
          position: relative; height: 500px; border-radius: 30px; overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }
        .about-bts-label {
          position: absolute; top: 2rem; left: 2rem; background: rgba(0,0,0,0.6);
          backdrop-filter: blur(10px); padding: 0.5rem 1.5rem; border-radius: 50px;
          font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #c9a84c;
        }
        .about-bts-details { display: flex; flex-direction: column; gap: 2rem; }
        .about-bts-detail-item { flex: 1; position: relative; }
        .about-bts-detail-img {
          position: relative; height: 200px; border-radius: 20px; overflow: hidden;
          margin-bottom: 1rem; border: 1px solid #1A1A24;
        }
        .about-bts-detail-item h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.15em; color: #F5F5F8; }

        .about-two-text-modern {
          display: grid; grid-template-columns: 1fr; gap: 3rem; margin-top: 5rem;
        }
        @media (min-width: 768px) { .about-two-text-modern { grid-template-columns: 1fr 1fr; } }
        .about-modern-text-card {
           padding: 3rem; background: #0E0E14; border-radius: 24px;
           border: 1px solid #1A1A24;
        }
        .about-modern-text-card h3 { font-family: var(--font-playfair), serif; font-size: 1.5rem; color: #c9a84c; margin-bottom: 1.5rem; }
        .about-modern-text-card p { font-size: 15px; color: #A0A0AB; line-height: 1.8; }

        /* ─── Values Modern ─── */
        .about-values-modern {
          display: grid; grid-template-columns: 1fr; gap: 2rem; margin-top: 4rem;
        }
        @media (min-width: 768px) { .about-values-modern { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1200px) { .about-values-modern { grid-template-columns: repeat(4, 1fr); } }
        
        .about-value-pill {
          background: #111118; border: 1px solid #1A1A24;
          padding: 3rem 2rem; border-radius: 24px;
          height: 100%; display: flex; flex-direction: column;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-value-pill:hover { border-color: #c9a84c; background: #16161E; transform: translateY(-10px); }
        .about-value-pill__num { font-size: 12px; font-weight: 800; color: #c9a84c; letter-spacing: 0.2em; display: block; margin-bottom: 1.5rem; }
        .about-value-pill__title { font-family: var(--font-playfair), serif; font-size: 1.4rem; color: #fff; margin-bottom: 1rem; line-height: 1.3; }
        .about-value-pill__desc { font-size: 14px; line-height: 1.7; color: #71717A; }

        /* ─── CTA ─── */
        .about-cta {
          padding: 10rem 2rem; text-align: center;
          background: radial-gradient(circle at center, #16161E 0%, #0A0A0F 100%);
          border-top: 1px solid #1A1A24;
        }
        .about-cta__title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 700; color: #fff; margin-bottom: 1.5rem;
        }
        .about-cta__sub { font-size: 18px; color: #71717A; line-height: 1.7; max-width: 600px; margin: 0 auto 4rem; }
        .about-cta__btns { display: flex; justify-content: center; flex-wrap: wrap; gap: 1.5rem; }
        .about-btn {
          display: inline-block; padding: 1.25rem 3rem;
          font-size: 14px; font-weight: 700; border-radius: 100px;
          text-decoration: none; transition: all 0.3s ease; cursor: pointer;
          letter-spacing: 0.05em; text-transform: uppercase;
        }
        .about-btn--gold { background: #c9a84c; color: #000; box-shadow: 0 10px 30px rgba(201,168,76,0.2); }
        .about-btn--gold:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(201,168,76,0.3); }
        .about-btn--outline { background: transparent; color: #c9a84c; border: 2px solid #c9a84c; }
        .about-btn--outline:hover { background: rgba(201,168,76,0.1); transform: translateY(-5px); }
      `}</style>
    </>
  );
}
