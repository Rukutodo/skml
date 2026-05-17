"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const UNSPLASH = {
  hero: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1600",
  set1: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=900",
  set2: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=600",
  set3: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600",
  founder: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=700",
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

export default function AboutClient() {
  return (
    <>
      <Navbar />
      <main className="about-main">

        {/* ── HERO ── */}
        <section className="about-hero">
          <div className="about-hero__bg">
            <Image src={UNSPLASH.hero} alt="Cinematic" fill style={{ objectFit: "cover", opacity: 0.45 }} priority />
            <div className="about-hero__gradient" />
          </div>
          <div className="about-hero__content">
            <p className="about-eyebrow">Est. 2013 · Hyderabad, Telangana</p>
            <h1 className="about-hero__title">
              A production house built not on budgets,<br />
              but on <em className="about-gold">belief.</em>
            </h1>
            <p className="about-hero__sub">
              SKML Motion Pictures has spent over a decade giving powerful Telugu stories the screen they deserve.
            </p>
          </div>
        </section>

        {/* ── CHAPTER 1: THE BEGINNING ── */}
        <section className="about-section about-section--dark">
          <div className="about-container">
            <div className="about-chapter-tag">
              <span className="about-chapter-num">01</span>
              <span className="about-chapter-line" />
              <span className="about-chapter-label">The Beginning</span>
            </div>

            <div className="about-two-col">
              <div className="about-two-col__left">
                <h2 className="about-section-title">
                  In 2013, Telugu cinema had a problem. <em className="about-gold">Brilliant stories were dying</em> in the hands of directors who couldn't find a banner willing to take a risk.
                </h2>
                <p className="about-body">
                  Kandregula Adhinarayana had seen this happen one too many times. He watched talented writers walk away from their dream projects because industry gatekeepers demanded star power before reading a script.
                </p>
                <p className="about-body">
                  So he decided to do something about it. In a modest office in Hyderabad, SKML Motion Pictures was born — with a promise that every film would be made with full commitment, regardless of scale.
                </p>
                <blockquote className="about-quote">
                  <p>"The first film we produced felt like climbing a mountain with no map. But we got to the top, and the view from there changed everything."</p>
                  <cite>— Kandregula Adhinarayana</cite>
                </blockquote>
              </div>
              <div className="about-two-col__right">
                <div className="about-img-main">
                  <Image src={UNSPLASH.set1} alt="Film Production" fill style={{ objectFit: "cover" }} />
                </div>
                <div className="about-img-row">
                  <div className="about-img-half">
                    <Image src={UNSPLASH.set2} alt="Script Reading" fill style={{ objectFit: "cover" }} />
                  </div>
                  <div className="about-img-half">
                    <Image src={UNSPLASH.set3} alt="Film Reel" fill style={{ objectFit: "cover" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 2: THE FOUNDER ── */}
        <section className="about-section about-section--mid">
          <div className="about-container">
            <div className="about-chapter-tag">
              <span className="about-chapter-num">02</span>
              <span className="about-chapter-line" />
              <span className="about-chapter-label">The Man Behind the Banner</span>
            </div>

            <div className="about-founder">
              <div className="about-founder__photo">
                <Image src={UNSPLASH.founder} alt="Kandregula Adhinarayana" fill style={{ objectFit: "cover" }} />
                <div className="about-founder__caption">
                  <h3 className="about-founder__name">Kandregula Adhinarayana</h3>
                  <p className="about-founder__role">Founder &amp; Producer</p>
                </div>
              </div>

              <div className="about-founder__bio">
                <p className="about-body">
                  He didn't come from a film family. There was no inherited studio, no godfather in the industry. What Adhinarayana had was something rarer — an obsessive love for cinema and an entrepreneur's willingness to bet on himself when no one else would.
                </p>
                <p className="about-body">
                  Growing up in Andhra Pradesh, he watched films not just to be entertained, but to understand how they were made. That depth of understanding shows in every SKML production — budgets are optimised by knowing exactly where every rupee creates value on screen.
                </p>
                <div className="about-stats">
                  <div className="about-stat">
                    <span className="about-stat__num">12+</span>
                    <span className="about-stat__label">Years</span>
                  </div>
                  <div className="about-stat">
                    <span className="about-stat__num">186+</span>
                    <span className="about-stat__label">Films</span>
                  </div>
                  <div className="about-stat">
                    <span className="about-stat__num">50M+</span>
                    <span className="about-stat__label">Viewers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 3: BEHIND THE CAMERA ── */}
        <section className="about-section about-section--dark">
          <div className="about-container">
            <div className="about-chapter-tag">
              <span className="about-chapter-num">03</span>
              <span className="about-chapter-line" />
              <span className="about-chapter-label">Behind the Camera</span>
            </div>

            <h2 className="about-section-title">Where every film is made</h2>
            <p className="about-body about-body--wide">
              Great cinema doesn't happen by accident. It's the result of hundreds of decisions made under pressure — on set, in the edit room, and in distribution meetings.
            </p>

            <div className="about-bts-grid">
              <div className="about-bts-main">
                <Image src={UNSPLASH.bts1} alt="Film set" fill style={{ objectFit: "cover" }} />
              </div>
              <div className="about-bts-side">
                <Image src={UNSPLASH.bts2} alt="Cinematography" fill style={{ objectFit: "cover" }} />
              </div>
              <div className="about-bts-bottom-left">
                <Image src={UNSPLASH.bts3} alt="Sound Recording" fill style={{ objectFit: "cover" }} />
              </div>
              <div className="about-bts-bottom-right">
                <Image src={UNSPLASH.bts4} alt="Edit Suite" fill style={{ objectFit: "cover" }} />
              </div>
            </div>

            <div className="about-two-text">
              <p className="about-body">SKML's production process is built around one principle: waste nothing, compromise nothing. Every project begins with a detailed breakdown of the script to identify where the budget can be optimised without affecting visual or emotional impact.</p>
              <p className="about-body">Post-production at SKML is treated with the same seriousness as the shoot itself. From colour grading to sound design, each department is managed so that when a viewer watches an SKML film on Amazon Prime or Aha, they cannot tell it was made on an optimised budget.</p>
            </div>
          </div>
        </section>

        {/* ── CHAPTER 4: VALUES ── */}
        <section className="about-section about-section--mid">
          <div className="about-container">
            <div className="about-chapter-tag">
              <span className="about-chapter-num">04</span>
              <span className="about-chapter-line" />
              <span className="about-chapter-label">What We Stand For</span>
            </div>
            <h2 className="about-section-title">The values that drive every decision we make</h2>
            <p className="about-body about-body--wide">
              A production house is only as good as the principles it operates by. At SKML, these aren't values written for a website — they're decisions made every single day on set and in negotiations.
            </p>
            <div className="about-values">
              {VALUES.map((v) => (
                <div key={v.num} className="about-value-card">
                  <span className="about-value-num">{v.num}</span>
                  <h3 className="about-value-title">{v.title}</h3>
                  <p className="about-value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CHAPTER 5: AWARDS ── */}
        <section className="about-section about-section--dark">
          <div className="about-container">
            <div className="about-chapter-tag">
              <span className="about-chapter-num">05</span>
              <span className="about-chapter-line" />
              <span className="about-chapter-label">Recognition</span>
            </div>
            <div className="about-awards-layout">
              <div className="about-awards-intro">
                <h2 className="about-section-title">The industry's recognition of a decade's work</h2>
                <p className="about-body">Awards don't define us, but they reflect the industry's trust in what we've built. SKML films have been recognised across regional and national platforms.</p>
              </div>
              <div className="about-awards-grid">
                {AWARDS.map((a) => (
                  <div key={a.title} className="about-award-card">
                    <span className="about-award-year">{a.year}</span>
                    <h3 className="about-award-title">{a.title}</h3>
                    <p className="about-award-body">{a.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="about-cta">
          <h2 className="about-cta__title">Your story deserves its screen.</h2>
          <p className="about-cta__sub">Whether you're a director looking for a production partner or a distributor seeking quality Telugu content — let's talk.</p>
          <div className="about-cta__btns">
            <a href="/#contact" className="about-btn about-btn--gold">Get in touch</a>
            <a href="/movies" className="about-btn about-btn--outline">View our films</a>
          </div>
        </section>

      </main>
      <Footer />
      <FloatingWhatsApp />

      <style>{`
        /* ─── Base ─── */
        .about-main { background: #0A0A0F; color: #fff; min-height: 100vh; overflow-x: hidden; }

        /* ─── Hero ─── */
        .about-hero {
          position: relative; height: 90vh; min-height: 560px;
          display: flex; align-items: center; justify-content: center;
          text-align: center; overflow: hidden;
        }
        .about-hero__bg { position: absolute; inset: 0; z-index: 0; }
        .about-hero__gradient {
          position: absolute; inset: 0;
          background: linear-gradient(to top, #0A0A0F 0%, rgba(10,10,15,0.55) 50%, rgba(10,10,15,0.3) 100%);
        }
        .about-hero__content {
          position: relative; z-index: 1; max-width: 820px;
          padding: 0 1.5rem; padding-top: 5rem;
        }
        .about-eyebrow {
          font-size: 11px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.28em; color: #c9a84c; margin-bottom: 1.5rem;
        }
        .about-hero__title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 700; line-height: 1.2; color: #F5F5F8;
          margin-bottom: 1.5rem; letter-spacing: -0.02em;
        }
        .about-hero__sub {
          font-size: clamp(1rem, 2vw, 1.15rem); line-height: 1.7;
          color: rgba(255,255,255,0.5); max-width: 560px; margin: 0 auto;
        }
        .about-gold { color: #c9a84c; font-style: italic; }

        /* ─── Sections ─── */
        .about-section { padding: 6rem 0; }
        .about-section--dark { background: #0d0d12; }
        .about-section--mid { background: #111118; }
        .about-container { max-width: 1180px; margin: 0 auto; padding: 0 1.5rem; }
        @media (min-width: 768px) { .about-container { padding: 0 2.5rem; } }

        /* ─── Chapter Tag ─── */
        .about-chapter-tag {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 2.5rem;
        }
        .about-chapter-num { font-size: 13px; font-weight: 700; color: #c9a84c; letter-spacing: 0.1em; }
        .about-chapter-line { height: 1px; width: 2.5rem; background: #2a2a38; flex-shrink: 0; }
        .about-chapter-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.22em; color: #444; }

        /* ─── Typography ─── */
        .about-section-title {
          font-size: clamp(1.5rem, 3.5vw, 2.5rem);
          font-weight: 500; color: #e8e0d0;
          line-height: 1.3; margin-bottom: 1.25rem; max-width: 680px;
        }
        .about-body {
          font-size: 15px; line-height: 1.85; color: #888;
          margin-bottom: 1.25rem; max-width: 580px;
        }
        .about-body--wide { max-width: 680px; }

        /* ─── 2-col layout (ch1) ─── */
        .about-two-col {
          display: grid; grid-template-columns: 1fr;
          gap: 3rem; margin-top: 1rem;
        }
        @media (min-width: 1024px) {
          .about-two-col { grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        }
        .about-two-col__left {}
        .about-two-col__right { display: flex; flex-direction: column; gap: 0.75rem; }
        .about-img-main {
          position: relative; width: 100%; height: 280px;
          border-radius: 12px; overflow: hidden;
          background: #1a1a24;
        }
        @media (min-width: 640px) { .about-img-main { height: 360px; } }
        .about-img-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .about-img-half {
          position: relative; height: 150px;
          border-radius: 12px; overflow: hidden; background: #1a1a24;
        }
        @media (min-width: 640px) { .about-img-half { height: 190px; } }

        /* ─── Blockquote ─── */
        .about-quote {
          border-left: 2px solid #c9a84c; padding: 1.25rem 1.5rem;
          background: #111; border-radius: 0 8px 8px 0;
          margin: 2rem 0;
        }
        .about-quote p {
          font-family: var(--font-playfair), serif;
          font-size: 1.05rem; font-style: italic; color: #c9a84c;
          line-height: 1.6; margin-bottom: 0.75rem;
        }
        .about-quote cite {
          font-size: 11px; text-transform: uppercase;
          letter-spacing: 0.18em; color: #444;
        }

        /* ─── Founder ─── */
        .about-founder {
          display: grid; grid-template-columns: 1fr;
          gap: 3rem; margin-top: 1rem;
        }
        @media (min-width: 1024px) {
          .about-founder { grid-template-columns: 380px 1fr; gap: 4rem; align-items: start; }
        }
        .about-founder__photo {
          position: relative; width: 100%; aspect-ratio: 3/4;
          max-height: 500px; border-radius: 16px; overflow: hidden;
          background: #1a1a24;
        }
        .about-founder__caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 2rem 1.5rem;
          background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
        }
        .about-founder__name { font-size: 1.4rem; font-weight: 500; color: #f0ebe0; margin-bottom: 0.25rem; }
        .about-founder__role { font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #c9a84c; }
        .about-stats {
          display: grid; grid-template-columns: repeat(3,1fr);
          border: 1px solid #222; border-radius: 12px;
          overflow: hidden; margin-top: 2rem;
        }
        .about-stat {
          padding: 1.5rem 1rem; text-align: center;
          background: #161616; border-right: 1px solid #222;
          transition: background 0.2s;
        }
        .about-stat:last-child { border-right: none; }
        .about-stat:hover { background: #1c1c24; }
        .about-stat__num { display: block; font-size: 2rem; font-weight: 600; color: #c9a84c; }
        .about-stat__label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.16em; color: #555; margin-top: 0.3rem; display: block; }

        /* ─── BTS Grid ─── */
        .about-bts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 260px 220px;
          gap: 0.75rem;
          margin: 2.5rem 0;
          border-radius: 12px; overflow: hidden;
        }
        @media (min-width: 768px) {
          .about-bts-grid {
            grid-template-columns: 2fr 1fr;
            grid-template-rows: 320px 260px;
            gap: 1rem;
          }
        }
        .about-bts-main {
          position: relative; border-radius: 10px; overflow: hidden;
          background: #1a1a24; grid-column: 1; grid-row: 1;
        }
        .about-bts-side {
          position: relative; border-radius: 10px; overflow: hidden;
          background: #1a1a24; grid-column: 2; grid-row: 1 / 3;
        }
        .about-bts-bottom-left {
          position: relative; border-radius: 10px; overflow: hidden;
          background: #1a1a24; grid-column: 1; grid-row: 2;
        }
        .about-bts-bottom-right { display: none; }

        .about-two-text {
          display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-top: 0.5rem;
        }
        @media (min-width: 768px) { .about-two-text { grid-template-columns: 1fr 1fr; gap: 3rem; } }

        /* ─── Values ─── */
        .about-values {
          display: grid; grid-template-columns: 1fr;
          gap: 1px; background: #222;
          border-radius: 16px; overflow: hidden;
          margin-top: 2.5rem;
        }
        @media (min-width: 768px) { .about-values { grid-template-columns: 1fr 1fr; } }
        .about-value-card {
          background: #161616; padding: 2.5rem 2rem;
          transition: background 0.2s;
        }
        .about-value-card:hover { background: #1c1c24; }
        .about-value-num { font-size: 11px; font-weight: 700; color: #c9a84c; letter-spacing: 0.2em; display: block; margin-bottom: 0.75rem; }
        .about-value-title { font-size: 1.1rem; font-weight: 600; color: #e8e0d0; margin-bottom: 0.75rem; }
        .about-value-desc { font-size: 13px; line-height: 1.7; color: #666; }

        /* ─── Awards ─── */
        .about-awards-layout {
          display: grid; grid-template-columns: 1fr;
          gap: 2.5rem; margin-top: 1rem;
        }
        @media (min-width: 1024px) { .about-awards-layout { grid-template-columns: 1fr 2fr; gap: 4rem; align-items: start; } }
        .about-awards-grid {
          display: grid; grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 640px) { .about-awards-grid { grid-template-columns: 1fr 1fr; } }
        .about-award-card {
          background: #161616; border: 1px solid #222;
          border-radius: 12px; padding: 1.75rem 1.5rem;
          transition: border-color 0.2s;
        }
        .about-award-card:hover { border-color: #333; }
        .about-award-year { font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #c9a84c; display: block; margin-bottom: 0.5rem; }
        .about-award-title { font-size: 1rem; font-weight: 600; color: #f0ebe0; margin-bottom: 0.4rem; line-height: 1.4; }
        .about-award-body { font-size: 13px; color: #666; }

        /* ─── CTA ─── */
        .about-cta {
          background: #0a0a0f; border-top: 1px solid #1a1a24;
          padding: 6rem 1.5rem; text-align: center;
        }
        .about-cta__title {
          font-family: var(--font-playfair), serif;
          font-size: clamp(1.75rem, 4vw, 3rem);
          font-weight: 500; color: #f0ebe0; margin-bottom: 1rem;
        }
        .about-cta__sub { font-size: 15px; color: #555; line-height: 1.7; max-width: 520px; margin: 0 auto 2.5rem; }
        .about-cta__btns { display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem; }
        .about-btn {
          display: inline-block; padding: 0.875rem 2rem;
          font-size: 13px; font-weight: 600; border-radius: 8px;
          text-decoration: none; transition: all 0.25s ease; cursor: pointer;
        }
        .about-btn--gold { background: #c9a84c; color: #080808; }
        .about-btn--gold:hover { background: #d4b55a; }
        .about-btn--outline { background: transparent; color: #c9a84c; border: 1px solid #c9a84c; }
        .about-btn--outline:hover { background: rgba(201,168,76,0.1); }
      `}</style>
    </>
  );
}
