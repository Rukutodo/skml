"use client";

import Image from "next/image";
import { useRef } from "react";

interface ScrollingColumnProps {
  images: string[];
  direction: "up" | "down";
  speed?: number;
  columnIndex: number;
}

export default function ScrollingColumn({
  images,
  direction,
  speed = 40,
  columnIndex,
}: ScrollingColumnProps) {
  const columnRef = useRef<HTMLDivElement>(null);

  // Triple the images for seamless loop
  const tripled = [...images, ...images, ...images];

  return (
    <div
      ref={columnRef}
      className="scrolling-column relative h-full overflow-hidden"
    >
      <div
        className={
          direction === "up" ? "animate-scroll-up" : "animate-scroll-down"
        }
        style={
          {
            "--scroll-duration": `${speed}s`,
          } as React.CSSProperties
        }
      >
        {tripled.map((src, i) => (
          <div
            key={`${columnIndex}-${i}`}
            className="relative mb-1.5 overflow-hidden rounded-xl"
            style={{ aspectRatio: "2/3" }}
          >
            <Image
              src={src}
              alt={`Film poster ${(i % images.length) + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="hero-poster object-cover"
              loading="lazy"
              quality={75}
            />
            {/* Individual poster gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
          </div>
        ))}
      </div>
    </div>
  );
}
