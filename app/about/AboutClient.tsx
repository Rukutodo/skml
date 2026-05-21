"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const UNSPLASH = {
  hero: "/assets/images/about-hero.jpg",
  set1: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=900",
  set2: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=600",
  set3: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600",
  set4: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600",
  set5: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=600",
  set6: "https://images.unsplash.com/photo-1524712245354-2c4e5e7124c5?auto=format&fit=crop&q=80&w=600",
  founder: "/assets/images/producer-portrait.jpeg",
  bts1: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=900",
  bts2: "https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&q=80&w=600",
  bts3: "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?auto=format&fit=crop&q=80&w=600",
  bts4: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=600",
};

const POSTERS = [
  "/assets/images/poster-aaj.jpeg",
  "/assets/images/poster-aghora.jpeg",
  "/assets/images/poster-ddd.jpeg",
  "/assets/images/poster-hb.jpeg",
  "/assets/images/poster-mrlonely.jpeg",
  "/assets/images/poster-vyuntapali.jpeg",
];

const WALL_IMAGES = [
  ...POSTERS,
  UNSPLASH.set1,
  UNSPLASH.set2,
  UNSPLASH.set3,
  UNSPLASH.set4,
  UNSPLASH.set5,
  UNSPLASH.set6,
];

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
  transition: { duration: 0.8, ease: "easeOut" }
} as const;

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
            <Image src={UNSPLASH.hero} alt="Cinematic" fill style={{ objectFit: "cover" }} priority />
            <div className="about-hero__gradient" />
          </motion.div>
          <div className="about-hero__content">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="about-hero__glass">
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="about-eyebrow">
                Est. 2013 · Hyderabad, Telangana
                </motion.p>
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="about-hero__title">
                A production house built not on budgets, but on <em className="about-accent">belief.</em>
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="about-hero__sub">
                SKML Motion Pictures has spent over a decade giving powerful Telugu stories the screen they deserve.
                </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── CHAPTER 1: THE BEGINNING ── */}
        <section className="about-section about-section--white section-padding">
          <div className="about-container">
            <motion.div {...fadeIn} className="about-chapter-tag">
              <span className="about-chapter-line" />
              <h2 className="about-chapter-label">The Beginning</h2>
            </motion.div>

            <div className="about-two-col about-two-col--flipped">
              <motion.div {...fadeIn} className="about-two-col__left">
                <h2 className="about-section-title about-section-title--huge">
                  In 2013, Telugu cinema had a problem. <em className="about-accent">Brilliant stories were dying</em> because few were willing to take a risk.
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
                  <p>&quot;The first film we produced felt like climbing a mountain with no map. But we got to the top, and the view from there changed everything.&quot;</p>
                  <cite>— Kandregula Adhinarayana</cite>
                </motion.blockquote>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="about-two-col__right">
                <div className="about-brick-wall">
                  {WALL_IMAGES.slice(0, 4).map((img, idx) => (
                    <motion.div 
                      key={idx}
                      variants={fadeIn} 
                      initial="initial" 
                      whileInView="whileInView" 
                      viewport={{ once: true }} 
                      className={`about-wall-item about-wall-item--${idx + 1}`}
                    >
                      <Image src={img} alt="Film Story" fill style={{ objectFit: "cover" }} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 2: THE FOUNDER (Large Centered Feature) ── */}
        <section className="about-section about-section--black section-padding">
          <div className="about-container">
            <motion.div {...fadeIn} className="about-chapter-tag">
              <span className="about-chapter-line" />
              <h2 className="about-chapter-label">The Man Behind the Banner</h2>
            </motion.div>

            <div className="about-founder-feature">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    whileInView={{ opacity: 1, scale: 1 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 1 }} 
                    className="about-founder-feature__visual"
                >
                    <div className="about-founder-feature__img">
                        <Image src={UNSPLASH.founder} alt="Kandregula Adhinarayana" fill style={{ objectFit: "cover", objectPosition: "top" }} />
                    </div>
                    <div className="about-founder-feature__card">
                        <h3>Kandregula Adhinarayana</h3>
                        <p>Founder & Producer</p>
                    </div>
                </motion.div>

                <motion.div {...fadeIn} className="about-founder-feature__content">
                    <h2 className="about-section-title about-section-title--centered">A Vision Built on Persistence</h2>
                    <div className="about-founder-feature__text">
                        <p>He didn&apos;t come from a film family. There was no inherited studio, no godfather in the industry. What Adhinarayana had was something rarer — an obsessive love for cinema and an entrepreneur&apos;s willingness to bet on himself when no one else would. Growing up in Andhra Pradesh, he watched films not just to be entertained, but to understand how they were made. This childhood fascination evolved into a deep technical understanding of the craft.</p>
                        
                        <p>He spent years observing the industry from the sidelines, learning the delicate balance between creative vision and financial viability. When he founded SKML Motion Pictures in 2013, he didn&apos;t just want to produce movies; he wanted to build a ecosystem where quality Telugu storytelling could thrive without being stifled by exorbitant budgets or traditional gatekeeping. His philosophy of &quot;waste nothing, compromise nothing&quot; became the blueprint for the company&apos;s success.</p>
                        
                        <p>Under his leadership, SKML has transformed from a small Hyderabad-based banner into a respected name in regional cinema, known for its strategic distribution and commitment to debutant directors. Every film produced under his banner carries his signature — a blend of commercial appeal and narrative depth. He believes that the future of cinema lies in stories that are rooted in local culture but possess a universal emotional language.</p>
                        
                        <p>Today, as he looks back on over a decade of production, his goal remains the same: to give every deserving story its screen. Whether it&apos;s a small-budget experimental film or a large-scale commercial venture, the commitment to quality remains unwavering. For Adhinarayana, cinema is not just a business; it&apos;s a legacy of storytelling that will outlast the creators themselves.</p>
                    </div>
                    
                    <div className="about-stats-clean">
                        <div className="about-stat-item">
                            <span className="about-stat-item__num">12+</span>
                            <span className="about-stat-item__label">Years</span>
                        </div>
                        <div className="about-stat-item">
                            <span className="about-stat-item__num">186+</span>
                            <span className="about-stat-item__label">Films</span>
                        </div>
                        <div className="about-stat-item">
                            <span className="about-stat-item__num">50M+</span>
                            <span className="about-stat-item__label">Audience</span>
                        </div>
                    </div>
                </motion.div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 3: AWARDS ── */}
        <section className="about-section about-section--white section-padding">
          <div className="about-container">
            <motion.div {...fadeIn} className="about-chapter-tag">
              <span className="about-chapter-line" />
              <h2 className="about-chapter-label">Recognition</h2>
            </motion.div>
            <div className="about-awards-layout">
              <motion.div {...fadeIn} className="about-awards-intro">
                <h2 className="about-section-title">The industry&apos;s recognition of a decade&apos;s work</h2>
                <p className="about-body">Awards don&apos;t define us, but they reflect the industry&apos;s trust in what we&apos;ve built. SKML films have been recognised across regional and national platforms.</p>
              </motion.div>
              <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="about-awards-list">
                {AWARDS.map((a) => (
                  <motion.div variants={fadeIn} key={a.title} className="about-award-row">
                    <div className="about-award-row__year">{a.year}</div>
                    <div className="about-award-row__content">
                        <h3>{a.title}</h3>
                        <p>{a.body}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 4: PROCESS (Services) ── */}
        <section className="about-section about-section--black section-padding">
          <div className="about-container">
            <motion.div {...fadeIn} className="about-chapter-tag">
              <span className="about-chapter-line" />
              <h2 className="about-chapter-label">Process &amp; Craft</h2>
            </motion.div>

            <motion.h2 {...fadeIn} className="about-section-title">Where every film is made</motion.h2>
            <motion.p {...fadeIn} className="about-body about-body--wide">
              Great cinema doesn&apos;t happen by accident. It&apos;s the result of hundreds of decisions made under pressure — on set, in the edit room, and in distribution meetings.
            </motion.p>

            <div className="about-bts-modern">
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="about-bts-hero">
                <Image src={UNSPLASH.bts1} alt="Film set" fill style={{ objectFit: "cover" }} />
                <div className="about-bts-hero__overlay">On Location</div>
              </motion.div>
              <div className="about-bts-grid-side">
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="about-bts-card">
                  <div className="about-bts-card__img">
                    <Image src={UNSPLASH.bts2} alt="Cinematography" fill style={{ objectFit: "cover" }} />
                  </div>
                  <h4>Precision Cinematography</h4>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="about-bts-card">
                  <div className="about-bts-card__img">
                    <Image src={UNSPLASH.bts4} alt="Sound" fill style={{ objectFit: "cover" }} />
                  </div>
                  <h4>Advanced Post-Production</h4>
                </motion.div>
              </div>
            </div>

            <motion.div {...fadeIn} className="about-process-grid">
              <div className="about-process-card">
                <h3>Waste Nothing, Compromise Nothing</h3>
                <p>SKML&apos;s production process is built around one principle: efficiency. Every project begins with a detailed breakdown of the script to identify where the budget can be optimised without affecting visual or emotional impact.</p>
              </div>
              <div className="about-process-card">
                <h3>Global Distribution Standards</h3>
                <p>Post-production at SKML is treated with the same seriousness as the shoot itself. We ensure that when a viewer watches an SKML film on Amazon Prime or Aha, they experience world-class quality.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CHAPTER 5: VALUES ── */}
        <section className="about-section about-section--white section-padding">
          <div className="about-container">
            <motion.div {...fadeIn} className="about-chapter-tag">
              <span className="about-chapter-line" />
              <h2 className="about-chapter-label">The Core</h2>
            </motion.div>
            <motion.h2 {...fadeIn} className="about-section-title">The values that drive every decision we make</motion.h2>
            
            <div className="about-values-grid">
              {VALUES.map((v, i) => (
                <motion.div 
                  key={v.num} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.1 }}
                  className="about-value-item"
                >
                  <span className="about-value-item__num">{v.num}</span>
                  <h3 className="about-value-item__title">{v.title}</h3>
                  <p className="about-value-item__desc">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <motion.section {...fadeIn} className="about-cta">
          <div className="about-container">
            <h2 className="about-cta__title">Your story deserves its screen.</h2>
            <p className="about-cta__sub">Whether you&apos;re a director looking for a production partner or a distributor seeking quality Telugu content — let&apos;s talk.</p>
            <div className="about-cta__btns">
                <a href="/#contact" className="about-btn about-btn--dark">Get in touch</a>
                <a href="/movies" className="about-btn about-btn--outline">View our films</a>
            </div>
          </div>
        </motion.section>

      </main>
      <Footer />
      <FloatingWhatsApp />

      <style>{`
        /* ─── DESIGN SYSTEM: STRICT B&W ─── */
        .about-main { background: #FFFFFF; color: #000000; position: relative; }

        /* ─── Hero ─── */
        .about-hero {
          position: relative; height: 100vh; min-height: 600px;
          display: flex; align-items: center; justify-content: center;
          text-align: center; overflow: hidden;
          background: #000000;
        }
        .about-hero__bg { position: absolute; inset: 0; z-index: 0; opacity: 0.5; }
        .about-hero__gradient {
          position: absolute; inset: 0;
          background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.6) 70%, #000000 100%),
                      linear-gradient(to top, #000000 0%, transparent 40%);
        }
        .about-hero__content {
          position: relative; z-index: 1; max-width: 900px;
          padding: 0 1.5rem;
        }
        .about-hero__glass {
            padding: 3rem;
        }
        .about-eyebrow {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.35em; color: rgba(255,255,255,0.4); margin-bottom: 2rem;
        }
        .about-hero__title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 700; line-height: 1.1; color: #ffffff;
          margin-bottom: 2rem; letter-spacing: -0.03em;
        }
        .about-hero__sub {
          font-size: clamp(1rem, 2.5vw, 1.25rem); line-height: 1.8;
          color: rgba(255,255,255,0.5); max-width: 600px; margin: 0 auto;
        }
        .about-accent { color: #ffffff; font-style: italic; font-weight: 400; opacity: 0.9; }

        /* ─── Sections ─── */
        .about-section--white { background: #FFFFFF; color: #000000; }
        .about-section--black { background: #000000; color: #FFFFFF; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); }
        .about-container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }

        /* ─── Chapter Tag ─── */
        .about-chapter-tag {
          display: flex; align-items: center; gap: 1.25rem;
          margin-bottom: 4rem;
        }
        .about-chapter-num { font-size: 16px; font-weight: 800; letter-spacing: 0.1em; }
        .about-section--white .about-chapter-num { color: #000000; }
        .about-section--black .about-chapter-num { color: #FFFFFF; }
        
        .about-chapter-line { height: 2px; width: 5rem; opacity: 0.8; }
        .about-section--white .about-chapter-line { background: #000000; }
        .about-section--black .about-chapter-line { background: #FFFFFF; }
        
        .about-chapter-label { 
          font-size: 16px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.4em; 
          margin: 0; line-height: 1;
        }
        .about-section--white .about-chapter-label { color: #000000; }
        .about-section--black .about-chapter-label { color: #FFFFFF; }

        /* ─── Typography ─── */
        .about-section-title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1; margin-bottom: 2.5rem; max-width: 900px;
          letter-spacing: -0.02em;
        }
        .about-section--white .about-section-title { color: #000000; }
        .about-section--black .about-section-title { color: #FFFFFF; }

        .about-section-title--huge {
           font-size: clamp(3rem, 8vw, 5.5rem);
           line-height: 1.05;
           margin-bottom: 3.5rem;
           letter-spacing: -0.04em;
        }
        
        .about-body {
          font-size: 15px; line-height: 1.85;
          margin-bottom: 1.5rem; max-width: 580px;
        }
        .about-section--white .about-body { color: #2A2A38; }
        .about-section--black .about-body { color: rgba(255,255,255,0.6); }
        
        .about-body--wide { max-width: 780px; }

        /* ─── 2-col Storytelling ─── */
        .about-two-col {
          display: grid; grid-template-columns: 1fr;
          gap: 4rem; align-items: center;
        }
        @media (min-width: 1024px) {
          .about-two-col { grid-template-columns: 1.2fr 0.8fr; gap: 6rem; }
          .about-two-col--flipped { grid-template-columns: 1.3fr 0.7fr; }
        }
        .about-story-text { margin-bottom: 3rem; }
        .about-img-story-hero {
          position: relative; width: 100%; aspect-ratio: 4/5;
          border-radius: 0; overflow: hidden;
          border: 1px solid #000000;
          box-shadow: 20px 20px 0px #000000;
        }
        .about-two-col__right {
           position: relative;
        }
        .about-two-col__right {
           position: relative;
           width: 100%;
           height: 100%; min-height: 700px;
           overflow: hidden;
        }
        .about-brick-wall {
          position: absolute;
          inset: 0;
          width: 130%;
          margin-right: -30%;
        }
        .about-wall-item {
          position: absolute;
          border: 1px solid #000;
          box-shadow: 15px 15px 0px #000;
          overflow: hidden;
          background: #f0f0f0;
          transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-wall-item:hover {
          transform: scale(1.1) rotate(0deg) !important;
          box-shadow: 30px 30px 0px #000;
          z-index: 100;
        }

        /* Truly Random Scattering */
        .about-wall-item--1 {
          width: 280px; aspect-ratio: 3/4;
          top: 0; left: 0;
          transform: rotate(-6deg);
          z-index: 1;
        }
        .about-wall-item--2 {
          width: 240px; aspect-ratio: 1/1;
          top: 15%; right: 5%;
          transform: rotate(8deg);
          z-index: 2;
        }
        .about-wall-item--3 {
          width: 320px; aspect-ratio: 16/9;
          bottom: 15%; left: 10%;
          transform: rotate(-4deg);
          z-index: 3;
        }
        .about-wall-item--4 {
          width: 260px; aspect-ratio: 4/5;
          bottom: 0; right: 0;
          transform: rotate(5deg);
          z-index: 4;
        }

        @media (max-width: 1024px) {
          .about-two-col__right { min-height: 500px; margin-top: 4rem; }
          .about-brick-wall { width: 100%; margin: 0; position: relative; display: flex; flex-wrap: wrap; gap: 2rem; }
          .about-wall-item { position: relative !important; top: auto !important; left: auto !important; right: auto !important; bottom: auto !important; width: 45%; transform: none !important; }
        }

        /* ─── Blockquote ─── */
        .about-quote {
          padding: 2.5rem; border-radius: 0;
          margin: 4rem 0; border: 1px solid #000000;
          background: #FFFFFF;
        }
        .about-quote p {
          font-family: var(--font-playfair), serif;
          font-size: 1.35rem; font-style: italic; color: #000000;
          line-height: 1.5; margin-bottom: 1.5rem;
        }
        .about-quote cite {
          font-size: 11px; text-transform: uppercase;
          letter-spacing: 0.2em; color: #000000; font-weight: 800;
          display: block;
        }

        /* ─── Founder Story ─── */
        .about-founder-feature {
            display: grid; grid-template-columns: 1fr; gap: 4rem; align-items: center;
        }
        @media (min-width: 1024px) {
            .about-founder-feature { grid-template-columns: 480px 1fr; gap: 7rem; }
        }
        .about-founder-feature__visual { position: relative; }
        .about-founder-feature__img {
            position: relative; width: 100%; aspect-ratio: 3/4;
            border-radius: 0; overflow: hidden;
            border: 1px solid #FFFFFF;
        }
        .about-founder-feature__card {
            background: #ffffff; padding: 1.5rem 2rem; border-radius: 0;
            border: 2px solid #000000;
            position: absolute; bottom: -2rem; left: 2rem; right: -1rem;
            box-shadow: 10px 10px 0px #000000;
        }
        .about-founder-feature__card h3 { font-size: 1.1rem; font-weight: 800; color: #000000; }
        .about-founder-feature__card p { font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #000000; margin-top: 0.25rem; opacity: 0.6; }

        .about-founder-feature__text { margin-bottom: 4rem; }
        .about-founder-feature__text p {
            font-size: 16px; line-height: 1.8; margin-bottom: 2rem;
        }

        .about-stats-clean {
            display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;
            border-top: 1px solid rgba(255,255,255,0.2); padding-top: 3rem;
        }
        .about-stat-item__num { display: block; font-family: var(--font-playfair), serif; font-size: 2.5rem; font-weight: 700; color: #FFFFFF; }
        .about-stat-item__label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.5); margin-top: 0.5rem; display: block; }

        /* ─── Awards ─── */
        .about-awards-layout {
          display: grid; grid-template-columns: 1fr; gap: 4rem;
        }
        @media (min-width: 1024px) { .about-awards-layout { grid-template-columns: 1fr 2fr; gap: 6rem; } }
        .about-awards-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .about-award-row {
            display: grid; grid-template-columns: 100px 1fr; gap: 2rem;
            padding-bottom: 2rem; border-bottom: 1px solid rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        .about-award-row:hover { transform: translateX(10px); }
        .about-award-row:last-child { border-bottom: none; }
        .about-award-row__year { font-size: 14px; font-weight: 800; color: #000000; }
        .about-award-row__content h3 { font-family: var(--font-inter), sans-serif; font-size: 1.1rem; font-weight: 700; color: #000000; margin-bottom: 0.5rem; }
        .about-award-row__content p { font-size: 13px; color: #6A6A7A; }

        /* ─── BTS ─── */
        .about-bts-modern {
          display: grid; grid-template-columns: 1fr; gap: 2rem; margin: 4rem 0;
        }
        @media (min-width: 1024px) { .about-bts-modern { grid-template-columns: 2fr 1fr; } }
        .about-bts-hero {
          position: relative; height: 500px; border-radius: 0; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .about-bts-hero__overlay {
          position: absolute; bottom: 2rem; left: 2rem; background: #fff;
          padding: 0.625rem 1.5rem; border-radius: 0;
          font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; color: #000000;
          box-shadow: 10px 10px 0px #000000;
        }
        .about-bts-grid-side { display: flex; flex-direction: column; gap: 2rem; }
        .about-bts-card { flex: 1; display: flex; flex-direction: column; gap: 1rem; }
        .about-bts-card__img {
          position: relative; height: 200px; border-radius: 0; overflow: hidden;
          background: #000000; border: 1px solid rgba(255,255,255,0.1);
        }
        .about-bts-card h4 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #FFFFFF; font-weight: 700; }

        .about-process-grid {
          display: grid; grid-template-columns: 1fr; gap: 2.5rem; margin-top: 5rem;
        }
        @media (min-width: 768px) { .about-process-grid { grid-template-columns: 1fr 1fr; } }
        .about-process-card {
           padding: 2.5rem; background: #000000; border-radius: 0;
           border: 1px solid rgba(255,255,255,0.2);
        }
        .about-process-card h3 { font-family: var(--font-playfair), serif; font-size: 1.35rem; color: #FFFFFF; margin-bottom: 1.25rem; }
        .about-process-card p { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.8; }

        /* ─── Values ─── */
        .about-values-grid {
          display: grid; grid-template-columns: repeat(1, 1fr); gap: 2.5rem; margin-top: 4rem;
        }
        @media (min-width: 640px) { .about-values-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .about-values-grid { grid-template-columns: repeat(4, 1fr); } }
        
        .about-value-item {
          display: flex; flex-direction: column; gap: 1.25rem;
        }
        .about-value-item__num { font-size: 14px; font-weight: 800; color: #000000; position: relative; width: fit-content; }
        .about-value-item__num::after { content: ""; position: absolute; bottom: -4px; left: 0; width: 100%; height: 2px; background: #000000; }
        .about-value-item__title { font-size: 1.15rem; font-weight: 700; color: #000000; letter-spacing: -0.01em; }
        .about-value-item__desc { font-size: 14px; line-height: 1.7; color: #2A2A38; }

        /* ─── CTA ─── */
        .about-cta {
          padding: 9rem 0; text-align: center; background: #000000;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .about-cta__title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(2rem, 5vw, 3.75rem);
          font-weight: 700; color: #FFFFFF; margin-bottom: 1.5rem;
        }
        .about-cta__sub { font-size: 16px; color: rgba(255,255,255,0.5); line-height: 1.7; max-width: 560px; margin: 0 auto 3.5rem; }
        .about-cta__btns { display: flex; justify-content: center; flex-wrap: wrap; gap: 1.25rem; }
        
        .about-btn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 1rem 2.5rem; font-size: 14px; font-weight: 700; border-radius: 0;
          text-decoration: none; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); cursor: pointer;
          text-transform: uppercase; letter-spacing: 0.1em;
        }
        .about-btn--dark { background: #FFFFFF; color: #000000; border: 2px solid #FFFFFF; }
        .about-btn--dark:hover { background: transparent; color: #FFFFFF; }
        .about-btn--outline { background: transparent; color: #FFFFFF; border: 2px solid #FFFFFF; }
        .about-btn--outline:hover { background: #FFFFFF; color: #000000; }
      `}</style>
    </>
  );
}
