"use client";

import { SectionSkeleton } from "@/components/skeletons/SectionSkeleton";

export default function Loading() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <div style={{ height: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ 
          width: "40px", height: "40px", border: "3px solid rgba(255,255,255,0.1)", 
          borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" 
        }} />
      </div>
      <SectionSkeleton />
      <SectionSkeleton />
      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
