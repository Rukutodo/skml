"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const UNSPLASH = {
  hero: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1920",
  set1: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=900",
  set2: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=600",
  set3: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600",
  founder: "/assets/images/producer-portrait.jpeg",
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
  transition: { duration: 0.8, ease: "easeOut" }
} as const;

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } }
};

export default function AboutClient() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      <Navbar />
      <main className="about-main">

        {/* ── HERO ── */}
        <section ref={heroRef} className="about-hero">
          <div className="about-hero__bg">
            <Image src={UNSPLASH.hero} alt="Cinematic" fill style={{ objectFit: "cover", filter: "blur(6px)", transform: "scale(1.05)" }} priority />
            <div className="about-hero__gradient" />
          </div>
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="about-hero__content">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="about-hero__glass">
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="about-eyebrow">
                Est. 2013 · Hyderabad, Telangana
                </motion.p>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="about-hero__title">
                A production house built not on budgets, but on <em className="about-accent">belief.</em>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="about-hero__sub">
                SKML Motion Pictures has spent over a decade giving powerful Telugu stories the screen they deserve.
                </motion.p>
            </motion.div>
          </motion.div>
        </section>

        {/* ── CHAPTER 1: ABOUT SKML ── */}
        <section className="about-section about-section--white section-padding">
          <div className="about-container">
            <motion.div {...fadeIn} className="about-chapter-tag">
              <span className="about-chapter-line" />
              <span className="about-chapter-label">About SKML Production Company</span>
            </motion.div>

            <motion.h2 {...fadeIn} className="about-section-title about-section-title--huge" style={{ maxWidth: '900px', marginBottom: '4rem' }}>
              We started with one belief: "brilliant stories" shouldn't die waiting for a star.
            </motion.h2>

            <div className="about-company-grid">
              {/* Row 1 */}
              <div className="acg-row">
                <motion.div {...fadeIn} className="acg-text">
                  <p className="about-body">
                    Kandregula Adhinarayana founded SKML Motion Pictures in 2013 after witnessing too many talented writers walk away from their dream projects. The industry gatekeepers demanded star power before even reading a script, leaving incredible narratives unheard and unexplored. We decided it was time to shift the paradigm.
                  </p>
                  <p className="about-body">
                    In a modest office in Hyderabad, SKML was born with a promise: every film would be made with full commitment, regardless of scale. We evaluate every project starting with one question: is this a story worth telling? If the answer is yes, we pour our hearts into bringing that vision to life with uncompromising dedication.
                  </p>
                </motion.div>
                <motion.div {...fadeIn} className="acg-image">
                  <div className="img-holder">
                    <Image src={UNSPLASH.set1} alt="Film Production" fill style={{ objectFit: "cover" }} />
                  </div>
                </motion.div>
              </div>

              {/* Row 2 (Reversed) */}
              <div className="acg-row acg-row--reverse">
                 <motion.div {...fadeIn} className="acg-text">
                  <p className="about-body">
                    What started as a small banner has grown into a powerhouse of regional cinema. Over the past 12 years, we've proven that optimized production costs don't mean lower quality. We find efficiencies in the process, not by cutting corners on set. True cinematic magic is born from smart execution and meticulous planning.
                    
                  </p>
                  <p className="about-body">
                    Our approach ensures that every rupee spent appears on the screen. We bring industry-grade finishing, advanced post-production, and strategic marketing to ensure your story reaches the right audience. From color grading to sound design, every technical aspect is fine-tuned to create an immersive theater experience.
                  </p>
                </motion.div>
                <motion.div {...fadeIn} className="acg-image">
                  <div className="img-holder img-holder--tall">
                    <Image src={UNSPLASH.set2} alt="Studio Work" fill style={{ objectFit: "cover" }} />
                  </div>
                </motion.div>
              </div>
              
              {/* Row 3 */}
              <div className="acg-row">
                <motion.div {...fadeIn} className="acg-text">
                  <p className="about-body">
                    We genuinely believe Telugu storytelling belongs on global platforms. Every OTT deal we close, every theatrical release we plan, is part of a larger mission to elevate regional cinema and introduce our vibrant culture to international audiences, breaking down language barriers through universal human emotions.
                  </p>
                  <p className="about-body">
                    At SKML, relationships are more important than transactions. 80% of our directors return for their next film, and our distribution network spans across the globe. We aren't just producers; we are your cinematic partners, deeply invested in building long-lasting collaborations that stand the test of time.
                  </p>
                </motion.div>
                <motion.div {...fadeIn} className="acg-image">
                  <div className="img-holder img-holder--wide">
                    <Image src={UNSPLASH.set3} alt="Cinematic Stage" fill style={{ objectFit: "cover" }} />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        <section className="about-section about-section--black section-padding producer-story-section">
          <div className="about-container producer-story-container">
            <motion.div {...fadeIn} className="about-chapter-tag">
              <span className="about-chapter-line" />
              <span className="about-chapter-label">About the Producer</span>
            </motion.div>

            {/* ── PRODUCER HERO INTRO ── */}
            <div className="producer-hero">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 1.2 }} 
                className="producer-hero__portrait"
              >
                <Image src="/assets/images/producer-portrait.jpeg" alt="Kandregula Adhinarayana" fill style={{ objectFit: "cover", objectPosition: "top" }} />
                <div className="producer-hero__portrait-fade" />
              </motion.div>
              <motion.div {...fadeIn} className="producer-hero__intro">
                <h2 className="producer-hero__name">Kandregula<br />Adhinarayana</h2>
                <p className="producer-hero__role">Founder &amp; Producer — SKML Motion Pictures</p>
                <div className="producer-hero__divider" />
                <blockquote className="producer-hero__quote">
                  <span className="producer-hero__quote-mark">&ldquo;</span>
                  Every story deserves its screen. Budget should never silence a voice that needs to be heard.
                  <span className="producer-hero__quote-mark">&rdquo;</span>
                </blockquote>
              </motion.div>
            </div>

            {/* ── STATS BAR ── */}
            <motion.div {...fadeIn} className="producer-stats-bar">
              <div className="producer-stat">
                <span className="producer-stat__num">12+</span>
                <span className="producer-stat__label">Years in Cinema</span>
              </div>
              <div className="producer-stat">
                <span className="producer-stat__num">186+</span>
                <span className="producer-stat__label">Films Produced</span>
              </div>
              <div className="producer-stat">
                <span className="producer-stat__num">50M+</span>
                <span className="producer-stat__label">Global Audience</span>
              </div>
              <div className="producer-stat">
                <span className="producer-stat__num">80%</span>
                <span className="producer-stat__label">Director Retention</span>
              </div>
            </motion.div>

            {/* ── STORY BLOCK 1: The Beginning ── */}
            <div className="producer-story-block">
              <motion.div {...fadeIn} className="producer-story-block__text">
                <span className="producer-story-block__chapter">Chapter 01</span>
                <h3 className="producer-story-block__heading">A Childhood Shaped by Cinema</h3>
                <p>He didn&apos;t come from a film family. There was no inherited studio, no godfather in the industry, no family connections to fall back on. What Kandregula Adhinarayana had was something far rarer — an obsessive, all-consuming love for cinema and an entrepreneur&apos;s willingness to bet on himself when no one else would.</p>
                <p>Growing up in a modest household in Andhra Pradesh, he watched films not just to be entertained, but to understand how they were made. He studied the way light fell on an actor&apos;s face, how a cut could change the emotion of an entire scene, how background scores told stories that dialogue couldn&apos;t. While other kids played outside, he was in the corner, replaying scenes in his head, frame by frame. This childhood fascination quietly evolved into a deep, almost scholarly understanding of the craft of filmmaking — one that would later become his greatest asset.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 40 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.9, delay: 0.2 }} 
                className="producer-story-block__image"
              >
                <div className="producer-img-frame">
                  {/* PLACEHOLDER: Replace with childhood/early life photo */}
                  <div className="producer-img-placeholder">
                    <span>Photo</span>
                    <small>Early Life / Childhood</small>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── STORY BLOCK 2: The Struggle (Reversed) ── */}
            <div className="producer-story-block producer-story-block--reverse">
              <motion.div {...fadeIn} className="producer-story-block__text">
                <span className="producer-story-block__chapter">Chapter 02</span>
                <h3 className="producer-story-block__heading">Years on the Sidelines</h3>
                <p>Before SKML ever existed, Adhinarayana spent years observing the Telugu film industry from the sidelines. He watched how the business operated — the politics, the favoritism, the way brilliant scripts were shelved because the writer didn&apos;t have the right connections. He studied the delicate balance between creative vision and financial viability that made or broke production houses.</p>
                <p>These weren&apos;t wasted years. Every rejection he witnessed, every flawed production he analyzed, became a lesson. He mapped out what a production house should be — lean, creator-first, and unafraid to back newcomers. He wasn&apos;t just waiting for his turn; he was building a blueprint in his mind, one that would eventually challenge the way Telugu cinema operated at its core.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -40 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.9, delay: 0.2 }} 
                className="producer-story-block__image"
              >
                <div className="producer-img-frame">
                  {/* PLACEHOLDER: Replace with early career / industry photo */}
                  <div className="producer-img-placeholder">
                    <span>Photo</span>
                    <small>Early Career / Industry Days</small>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── PULL QUOTE ── */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }}
              className="producer-pull-quote"
            >
              <div className="producer-pull-quote__line" />
              <p>&ldquo;I saw too many talented writers walk away from their dream projects. The gatekeepers demanded star power before even reading a script. I decided that had to change.&rdquo;</p>
              <cite>— Kandregula Adhinarayana</cite>
              <div className="producer-pull-quote__line" />
            </motion.div>

            {/* ── STORY BLOCK 3: The Founding ── */}
            <div className="producer-story-block">
              <motion.div {...fadeIn} className="producer-story-block__text">
                <span className="producer-story-block__chapter">Chapter 03</span>
                <h3 className="producer-story-block__heading">Birth of SKML Motion Pictures</h3>
                <p>In 2013, from a modest office in Hyderabad, SKML Motion Pictures was born. The name carried weight from the start — not because of any celebrity association, but because of the promise behind it. Adhinarayana made a commitment that every film under the SKML banner would be made with full dedication, regardless of its scale or the star power attached to it.</p>
                <p>His philosophy was deceptively simple: &quot;waste nothing, compromise nothing.&quot; While other producers inflated budgets or cut corners to maximize margins, Adhinarayana built a production system that was ruthlessly efficient without ever sacrificing the quality that audiences could see and feel on screen. Every rupee was accounted for, and every rupee showed up in the final product. This approach became the foundation of SKML&apos;s identity.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 40 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.9, delay: 0.2 }} 
                className="producer-story-block__image"
              >
                <div className="producer-img-frame">
                  {/* PLACEHOLDER: Replace with SKML founding / early office photo */}
                  <div className="producer-img-placeholder">
                    <span>Photo</span>
                    <small>SKML Founding Moments</small>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── STORY BLOCK 4: The Growth (Reversed) ── */}
            <div className="producer-story-block producer-story-block--reverse">
              <motion.div {...fadeIn} className="producer-story-block__text">
                <span className="producer-story-block__chapter">Chapter 04</span>
                <h3 className="producer-story-block__heading">A Legacy Still Being Written</h3>
                <p>Under his leadership, SKML transformed from a small Hyderabad-based banner into a respected name in regional cinema. Film after film, the banner earned a reputation for strategic distribution that ensured every movie found its audience, and an unwavering commitment to debutant directors who brought fresh perspectives to Telugu storytelling. Today, with distribution deals across major OTT platforms like Amazon Prime and Aha, SKML brings Telugu stories to living rooms around the world.</p>
                <p>Looking ahead, Adhinarayana&apos;s goal remains exactly the same as the day he started: to give every deserving story its screen. For him, cinema is not just a business — it&apos;s a legacy of storytelling that will outlast the creators themselves. He envisions SKML not as a company, but as a movement — one that proves you don&apos;t need a dynasty or a fortune to make films that matter. All you need is the courage to believe in a story, and the discipline to bring it to life without compromise.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -40 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.9, delay: 0.2 }} 
                className="producer-story-block__image"
              >
                <div className="producer-img-frame">
                  {/* PLACEHOLDER: Replace with on-set / production photo */}
                  <div className="producer-img-placeholder">
                    <span>Photo</span>
                    <small>On Set / Production</small>
                  </div>
                </div>
              </motion.div>
            </div>



          </div>
        </section>

        {/* ── CHAPTER 3: AWARDSs ── */}
        <section className="about-section about-section--white section-padding">
          <div className="about-container">
            <motion.div {...fadeIn} className="about-chapter-tag">
              <span className="about-chapter-line" />
              <span className="about-chapter-label">Recognition</span>
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
              <span className="about-chapter-label">Process &amp; Craft</span>
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
              <span className="about-chapter-label">The Core</span>
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
        .about-main { background: #FFFFFF; color: #000000; min-height: 100vh; }

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
          background: radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 70%, #000000 100%),
                      linear-gradient(to top, #000000 0%, rgba(0,0,0,0.2) 60%);
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
          display: flex; align-items: center; gap: 1rem;
          margin-bottom: 3rem;
        }
        .about-chapter-line { height: 1px; width: 3rem; opacity: 0.5; }
        .about-section--white .about-chapter-line { background: #6A6A7A; }
        .about-section--black .about-chapter-line { background: #FFFFFF; }
        
        .about-chapter-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3em; }
        .about-section--white .about-chapter-label { color: #6A6A7A; }
        .about-section--black .about-chapter-label { color: rgba(255,255,255,0.6); }

        /* ─── Typography ─── */
        .about-section-title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.15; margin-bottom: 2rem; max-width: 800px;
        }
        .about-section--white .about-section-title { color: #000000; }
        .about-section--black .about-section-title { color: #FFFFFF; }

        .about-section-title--huge {
           font-size: clamp(2.25rem, 6vw, 4.25rem);
           line-height: 1.1;
           margin-bottom: 3rem;
           letter-spacing: -0.02em;
        }
        
        .about-body {
          font-size: 15px; line-height: 1.85;
          margin-bottom: 1.5rem; max-width: 580px;
        }
        .about-section--white .about-body { color: #2A2A38; }
        .about-section--black .about-body { color: rgba(255,255,255,0.6); }
        
        .about-body--wide { max-width: 780px; }

        /* ─── Company Grid ─── */
        .about-company-grid { display: flex; flex-direction: column; gap: 4rem; }
        @media (min-width: 768px) {
           .about-company-grid { gap: 6rem; }
        }
        .acg-row { display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: center; }
        @media (min-width: 1024px) {
           .acg-row { grid-template-columns: 1fr 1fr; gap: 5rem; }
           .acg-row--reverse { grid-template-columns: 1fr 1fr; }
           .acg-row--reverse .acg-text { order: 2; }
           .acg-row--reverse .acg-image { order: 1; }
        }
        .acg-text { display: flex; flex-direction: column; gap: 1.5rem; }
        .acg-image { width: 100%; }
        .img-holder { position: relative; width: 100%; border-radius: 1rem; overflow: hidden; background: #f0f0f0; box-shadow: 0 10px 30px rgba(0,0,0,0.06); }
        .img-holder::before { content: ""; display: block; padding-top: 75%; /* 4:3 */ }
        .img-holder--tall::before { padding-top: 100%; /* 1:1 */ }
        @media (min-width: 1024px) {
           .img-holder--tall::before { padding-top: 120%; }
        }
        .img-holder--wide::before { padding-top: 66.66%; /* 3:2 */ }
        .img-holder img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
        .img-holder:hover img { transform: scale(1.05); }

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

        /* ─── Producer Story Section ─── */
        .producer-story-container { max-width: 1200px; }

        /* Hero Intro */
        .producer-hero {
          display: grid; grid-template-columns: 1fr; gap: 3rem;
          align-items: center; margin-bottom: 5rem;
        }
        @media (min-width: 1024px) {
          .producer-hero { grid-template-columns: 420px 1fr; gap: 5rem; }
        }

        .producer-hero__portrait {
          position: relative; width: 100%; aspect-ratio: 3/4;
          overflow: hidden; border: 1px solid rgba(255,255,255,0.15);
        }
        .producer-hero__portrait-fade {
          position: absolute; inset: 0;
          background: linear-gradient(to top, #000000 0%, transparent 40%);
          pointer-events: none;
        }

        .producer-hero__intro { display: flex; flex-direction: column; }
        .producer-hero__name {
          font-family: var(--font-playfair), serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700; line-height: 1.05; color: #FFFFFF;
          letter-spacing: -0.03em; margin-bottom: 1rem;
        }
        .producer-hero__role {
          font-size: 12px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.25em; color: rgba(255,255,255,0.4);
          margin-bottom: 2rem;
        }
        .producer-hero__divider {
          width: 60px; height: 2px; background: rgba(255,255,255,0.2);
          margin-bottom: 2rem;
        }
        .producer-hero__quote {
          font-family: var(--font-playfair), serif;
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          font-style: italic; line-height: 1.7;
          color: rgba(255,255,255,0.7); margin: 0; padding: 0;
          border: none; max-width: 500px;
        }
        .producer-hero__quote-mark {
          font-size: 2rem; color: rgba(255,255,255,0.25);
          line-height: 0; vertical-align: -0.3em;
        }

        /* Stats Bar */
        .producer-stats-bar {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem;
          padding: 3rem 0; margin-bottom: 5rem;
          border-top: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        @media (min-width: 640px) {
          .producer-stats-bar { grid-template-columns: repeat(4, 1fr); }
        }
        .producer-stat { text-align: center; }
        .producer-stat__num {
          display: block; font-family: var(--font-playfair), serif;
          font-size: clamp(2rem, 4vw, 3rem); font-weight: 700;
          color: #FFFFFF; margin-bottom: 0.5rem;
        }
        .producer-stat__label {
          font-size: 10px; text-transform: uppercase;
          letter-spacing: 0.2em; color: rgba(255,255,255,0.4);
        }

        /* Story Blocks */
        .producer-story-block {
          display: grid; grid-template-columns: 1fr; gap: 2.5rem;
          align-items: center; margin-bottom: 5rem;
        }
        @media (min-width: 1024px) {
          .producer-story-block { grid-template-columns: 1fr 1fr; gap: 5rem; }
          .producer-story-block--reverse .producer-story-block__text { order: 2; }
          .producer-story-block--reverse .producer-story-block__image { order: 1; }
        }

        .producer-story-block__chapter {
          display: inline-block; font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.3em;
          color: rgba(255,255,255,0.3); margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .producer-story-block__heading {
          font-family: var(--font-playfair), serif;
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 700; color: #FFFFFF;
          margin-bottom: 1.5rem; line-height: 1.2;
        }
        .producer-story-block__text p {
          font-size: 15px; line-height: 1.85;
          color: rgba(255,255,255,0.6); margin-bottom: 1.5rem;
        }

        /* Image Frames */
        .producer-img-frame {
          position: relative; width: 100%; aspect-ratio: 4/5;
          overflow: hidden; border: 1px solid rgba(255,255,255,0.12);
          background: #0a0a0a;
        }
        .producer-img-frame--portrait { aspect-ratio: 3/4; }

        .producer-img-placeholder {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background:
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,0.02) 20px,
              rgba(255,255,255,0.02) 40px
            ),
            linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%);
          border: 1px dashed rgba(255,255,255,0.12);
        }
        .producer-img-placeholder span {
          font-size: 14px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.3em; color: rgba(255,255,255,0.2);
          margin-bottom: 0.5rem;
        }
        .producer-img-placeholder small {
          font-size: 11px; color: rgba(255,255,255,0.12);
          letter-spacing: 0.1em;
        }

        /* Pull Quote */
        .producer-pull-quote {
          text-align: center; padding: 4rem 2rem; margin-bottom: 5rem;
          max-width: 800px; margin-left: auto; margin-right: auto;
        }
        .producer-pull-quote__line {
          width: 60px; height: 1px;
          background: rgba(255,255,255,0.15);
          margin: 0 auto 2rem;
        }
        .producer-pull-quote__line:last-child {
          margin: 2rem auto 0;
        }
        .producer-pull-quote p {
          font-family: var(--font-playfair), serif;
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          font-style: italic; line-height: 1.6;
          color: rgba(255,255,255,0.7); margin-bottom: 1.5rem;
        }
        .producer-pull-quote cite {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.25em; color: rgba(255,255,255,0.35);
          font-style: normal; display: block;
        }

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
