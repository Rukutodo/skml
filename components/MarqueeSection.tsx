"use client";

import Image from "next/image";

const PARTNERS = [
  { src: "/assets/marque/Aha.png", alt: "Aha" },
  { src: "/assets/marque/Amazon_Prime_Videopng.png", alt: "Amazon Prime Video" },
  { src: "/assets/marque/Bookmyshow.png", alt: "BookMyShow" },
  { src: "/assets/marque/ETVWINLOGO.png", alt: "ETV WIN" },
  { src: "/assets/marque/PVR_INOX.png", alt: "PVR INOX" },
  { src: "/assets/marque/district.jpg", alt: "District" },
  { src: "/assets/marque/pvp.png", alt: "PVP" },
];

export default function MarqueeSection() {
  return (
    <section 
      style={{ 
        background: "#FAFAFA", // Slight off-white to separate from the pure white About section
        padding: "4rem 0 3rem", 
        borderBottom: "1px solid #EAEAEA", // Clearer partition line
        overflow: "hidden" 
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center", marginBottom: "2rem" }}>
        {/* Section Label */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
          <div style={{ height: "1px", width: "2.5rem", background: "#6A6A7A" }} />
          <span style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#6A6A7A" }}>
            Our Distribution Partners
          </span>
          <div style={{ height: "1px", width: "2.5rem", background: "#6A6A7A" }} />
        </div>
      </div>

      <div className="marquee-container" style={{ position: "relative", width: "100%", maxWidth: "100vw", overflow: "hidden" }}>
        
        {/* Soft gradient masks to fade the edges (must match section background) */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "100px", zIndex: 10, background: "linear-gradient(to right, #FAFAFA, transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "100px", zIndex: 10, background: "linear-gradient(to left, #FAFAFA, transparent)", pointerEvents: "none" }} />

        <div className="marquee-content" style={{ display: "flex", gap: "4rem", width: "max-content" }}>
          {/* We duplicate the array to create a seamless infinite loop */}
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => (
            <div 
              key={`${partner.alt}-${index}`} 
              style={{
                position: "relative",
                height: "50px", // Slightly larger base height
                width: "140px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                fill
                sizes="140px"
                style={{ 
                  objectFit: "contain", 
                }}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-content {
          animation: autoScroll 35s linear infinite;
        }

        @keyframes autoScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Scroll exactly one set of logos. We have 3 sets. Scrolling by -33.33% targets exactly one set's width */
            transform: translateX(-33.3333%);
          }
        }
      `}</style>
    </section>
  );
}
