"use client";

export function Skeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div 
      className={`skeleton ${className}`} 
      style={{
        background: "linear-gradient(90deg, #f0f0f5 25%, #e0e0eb 50%, #f0f0f5 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite linear",
        borderRadius: "4px",
        ...style
      }}
    />
  );
}

export function SectionSkeleton() {
  return (
    <div style={{ padding: "100px 0", maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
      <Skeleton style={{ width: "100px", height: "16px", marginBottom: "24px" }} />
      <Skeleton style={{ width: "300px", height: "48px", marginBottom: "48px" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <Skeleton style={{ aspectRatio: "2/3", borderRadius: "16px", marginBottom: "16px" }} />
            <Skeleton style={{ width: "60%", height: "20px", marginBottom: "8px" }} />
            <Skeleton style={{ width: "40%", height: "16px" }} />
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
