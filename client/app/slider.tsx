"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrollingText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1: Moves Right on Scroll Down
      gsap.to(row1Ref.current, {
        xPercent: 20, // Moves to the right
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // Smoothly follows the scroll
        },
      });

      // Row 2: Moves Left on Scroll Down
      gsap.to(row2Ref.current, {
        xPercent: -20, // Moves to the left
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const textRow1 = "SECURITY • HOUSEKEEPING • PAINTING • INTERIORS • ";
  const textRow2 = "EXCELLENCE IN EVERY DETAIL • SPARKING STARS • ";

  return (
    <section 
      ref={containerRef} 
      className="py-4 bg-[#FDFCF8] overflow-hidden border-t border-b border-[#DED8CF] relative z-10"
    >
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-[#C18C5D]/5 blur-3xl pointer-events-none" />

      <div className="flex flex-col gap-4 whitespace-nowrap">
        {/* Row 1: Moving Right */}
        <div 
          ref={row1Ref} 
          className="flex font-['Fraunces'] text-[3vw] font-black leading-none text-[#5D7052] opacity-20 select-none italic"
        >
          <span>{textRow1}</span>
          <span>{textRow1}</span>
          <span>{textRow1}</span>
        </div>

        {/* Row 2: Moving Left */}
        <div 
          ref={row2Ref} 
          className="flex font-['Fraunces'] text-[3vw] font-black leading-none text-[#C18C5D] opacity-20 select-none italic"
          style={{ marginLeft: "-10%" }}
        >
          <span>{textRow2}</span>
          <span>{textRow2}</span>
          <span>{textRow2}</span>
        </div>
      </div>
    </section>
  );
};

export default ScrollingText;