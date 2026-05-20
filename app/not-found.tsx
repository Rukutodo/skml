"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen flex flex-col selection:bg-white selection:text-black">
      <Navbar />
      
      <main className="relative flex-1 w-full min-h-[75vh] md:min-h-[800px] overflow-hidden text-white flex flex-col items-center justify-center py-24 sm:py-32">
        {/* Film Grain Filter Background */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.25] mix-blend-screen">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 h-full w-full opacity-50">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Cinematic Spotlight / Vignette */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_80%)]" />

      {/* Moving Scratches (CSS animated lines mimicking film damage) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-30">
        <motion.div
          animate={{ x: ["-50%", "150%", "-20%", "80%"] }}
          transition={{ duration: 0.4, repeat: Infinity, repeatType: "mirror" }}
          className="absolute top-0 h-full w-[1px] bg-white/40"
          style={{ left: "30%" }}
        />
        <motion.div
          animate={{ x: ["110%", "-10%", "50%", "0%"] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "mirror" }}
          className="absolute top-0 h-full w-[2px] bg-white/20"
          style={{ left: "70%" }}
        />
      </div>

      {/* Content Wrapper with Parallax */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4"
        animate={{
          x: mousePosition.x * -1,
          y: mousePosition.y * -1,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        {/* Distorted 404 Heading */}
        <motion.div className="relative">
          <motion.h1
            className="font-playfair text-[8rem] md:text-[14rem] lg:text-[18rem] font-bold leading-none tracking-tighter text-transparent relative z-10"
            style={{
              WebkitTextStroke: "2px rgba(255,255,255,0.9)",
              textShadow: "0 0 30px rgba(255,255,255,0.1)",
            }}
            animate={{
              opacity: [1, 0.8, 1, 0.5, 1, 1],
              x: [0, -3, 3, -1, 0],
              textShadow: [
                "0 0 30px rgba(255,255,255,0.1)",
                "15px 0 30px rgba(255,255,255,0.5)",
                "-15px 0 30px rgba(255,255,255,0.3)",
                "0 0 30px rgba(255,255,255,0.1)"
              ]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            404
          </motion.h1>

          {/* Glitch Overlay Layers */}
          <motion.h1
            className="font-playfair absolute top-0 left-[4px] text-[8rem] md:text-[14rem] lg:text-[18rem] font-bold leading-none tracking-tighter text-white mix-blend-overlay z-0 opacity-50"
            animate={{ x: [-2, 2, -1, 3, 0], y: [1, -1, 0, 2, -1] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
          >
            404
          </motion.h1>
        </motion.div>

        <motion.p
          className="font-inter mt-4 max-w-md text-sm md:text-lg font-light tracking-[0.3em] text-white/60 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          This scene is missing from the reel.
        </motion.p>

        <motion.div
          className="mt-14 flex flex-col sm:flex-row items-center justify-center font-inter"
          style={{ gap: "24px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {/* Vintage Rewind / Back Button */}
          <button
            onClick={() => router.back()}
            className="group relative uppercase tracking-[0.2em] text-white/50 transition-all duration-300 hover:text-white"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              padding: "12px 24px",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              background: "transparent",
              border: "none",
            }}
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-white/60 group-hover:bg-white/5">
              {/* Rewind Icon created with CSS */}
              <span className="flex items-center -ml-1 transition-transform duration-300 group-hover:-translate-x-1">
                <span className="block border-[5px] border-transparent border-r-current" />
                <span className="block border-[5px] border-transparent border-r-current -ml-1" />
              </span>
            </span>
            Rewind
          </button>

          {/* Modern Cinematic CTA / Home Button*/}
          <Link
            href="/"
            className="group relative overflow-hidden rounded-sm transition-all duration-500 hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              padding: "16px 38px",
              fontSize: "15px",
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              fontWeight: 600,
              textDecoration: "none",
              background: "#ffffff",
              color: "#000000",
              border: "1px solid #ffffff",
            }}
          >
            <span className="relative z-10 flex items-center gap-3 transition-colors duration-500 group-hover:text-white">
              Return to Studio
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </span>
            {/* Background hover slide/fade fill */}
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Side Film Reel Borders - Left (Scrolling Down) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 sm:left-4 w-8 sm:w-12 overflow-hidden mix-blend-screen z-0 border-x border-white/10 bg-black/40">
        <motion.div
          animate={{ y: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 8 }}
          className="flex flex-col gap-6 py-3"
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={`l-${i}`} className="w-[50%] mx-auto h-3 sm:h-5 bg-white/70 rounded-[2px] shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
          ))}
        </motion.div>
      </div>

      {/* Side Film Reel Borders - Right (Scrolling Up) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 sm:right-4 w-8 sm:w-12 overflow-hidden mix-blend-screen z-0 border-x border-white/10 bg-black/40">
        <motion.div
          animate={{ y: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 8 }}
          className="flex flex-col gap-6 py-3"
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={`r-${i}`} className="w-[50%] mx-auto h-3 sm:h-5 bg-white/70 rounded-[2px] shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
          ))}
        </motion.div>
      </div>
      </main>

      <Footer />
    </div>
  );
}
