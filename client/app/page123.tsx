"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { TextPlugin } from "gsap/dist/TextPlugin";
import Lenis from "lenis";
import InfiniteSlider from "./slider";
import { MessageCircle } from "lucide-react";
import Navbar from "./navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);
}

// --- SHADER MATERIAL FOR LIQUID BACKGROUND ---
const LiquidBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    // 🔥 UPDATED: Organic Palette Background Colors
    uColorBg: { value: new THREE.Color("#FDFCF8") },     // Rice Paper
    uColorMoss: { value: new THREE.Color("#5D7052") },   // Moss Green
    uColorClay: { value: new THREE.Color("#C18C5D") },   // Terracotta
    uScroll: { value: 0 },
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.getElapsedTime() * 1.1;
      const targetScroll = typeof window !== "undefined" ? window.scrollY / 2000 : 0;
      uniforms.uScroll.value = THREE.MathUtils.lerp(uniforms.uScroll.value, targetScroll, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform float uScroll;
          uniform vec3 uColorBg;
          uniform vec3 uColorMoss;
          uniform vec3 uColorClay;
          varying vec2 vUv;

          float noise(vec2 p) {
            return sin(p.x * 10.0 + uTime) * sin(p.y * 20.0 + uTime);
          }

          void main() {
            vec2 p = vUv;
            float movement = sin(uTime * 0.2 + uScroll);
            float n = noise(p + movement);
            n += noise(p * 2.0 - uTime * 0.1);
            // 🔥 UPDATED: Mixing Moss and Clay tones
            vec3 color = mix(uColorBg, uColorMoss, n * 0.3);
            color = mix(color, uColorClay, sin(uScroll * 3.0) * 0.1);
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
};

// Interfaces
interface Testimonial { id: string; tag: string; text: string; }
interface Service { area: string; title: string; desc: string; items: string[]; badge?: string; }
interface Stat { value: string; label: string; }
interface Principle { num: string; title: string; body: string; }
interface MousePosition { x: number; y: number; }

const TESTIMONIALS: Testimonial[] = [
  { id: "anon_xxxxA", tag: "asset claim, digital trace", text: "Vouch for the 20K easy claim. 100% supportive throughout the whole deal, deadass professional. Digital Threat Trace was spot on too." },
  { id: "client_xxxxM", tag: "username claim, footprint cleanup", text: "Successfully claimed my desired handle — one everyone else failed on — in record time. Efficiency and professionalism was goated. Highly recommend for fast, secure acquisition." },
  { id: "anon_xxxx4", tag: "username claim, profile management", text: "Completed a lot of successful deals lately! Claimed a username and handled my profile management in 12 hours flat. No cap, the fastest in the game." },
  { id: "user_xxxx7", tag: "reputation fix, risk advisory", text: "10/10, goated max. Best for community reputation fixes and social media risk advisory. Claimed a username under an hour. Will definitely come back for more deals!" },
  { id: "crypto_xxxxZ", tag: "blockchain trace, threat elimination", text: "Paid the full advance for a Block Chain Trace and threat elimination. Impressed with constant coordination and results in under 24hrs. An absolute legend." },
  { id: "founder_xxxxK", tag: "dmca takedown, search suppression", text: "Sincere thanks for the DMCA takedowns and search result suppression. A beast in this business — anyone can work with them without any problems." },
  { id: "agency_xxxxP", tag: "premium asset claim", text: "Just closed a $15k IG generic claim that others failed to deliver for months. Top-tier provider, the absolute pinnacle of this industry." },
  { id: "pr_xxxxWQ", tag: "post removal, reputation fix", text: "Handled negative post removals and community reputation fixes in record time. Professionalism was 10/10, definitely the best in the game." },
];

const SERVICES: Service[] = [
  { area: "Core Services", title: "Property Maintenance Solutions", desc: "Comprehensive property management backed by years of ethical, meticulous facility consulting.", items: ["Professional Housekeeping & deep cleaning", "Building Painting & aesthetic restoration", "Interior Designing & functional space planning", "Property safety"], badge: "● Premium Quality Control" },
  { area: "Living Solutions", title: "Curated Housing", desc: "Paying Guest (PG) accommodations and Old Age Housing designed for comfort, safety, and community", items: ["Instagram, X, TikTok, YouTube, Reddit, WhatsApp", "Risk profiling and threat identification", "Real-time monitoring and response"] },
  { area: "Specialized Care", title: "Compassionate Living", desc: "Providing serene and professionally managed old age housing solutions in Mumbai.", items: ["Copyright infringement removals", "Defamation and harassment content", "Impersonation account elimination"] },
  { area: "Search & Visibility", title: "Search Result Suppression", desc: "Strategically suppress harmful or damaging results and reclaim your narrative online.", items: ["Google & Bing result management", "Reputation SEO and counter-content", "Entity knowledge panel corrections"] },
];

const STATS: Stat[] = [
  { value: "$200+", label: "Units managed" },
  { value: "6+", label: "Years Active" },
  { value: "All", label: "Mumbai Sectors" },
  { value: "100%", label: "Reliable Practice" },
];

const PRINCIPLES: Principle[] = [
  { num: "01", title: "Ethics.", body: "Clear, honest, and client-first hospitality in every service engagement." },
  { num: "02", title: "Quality.", body: "Meticulous standards in housekeeping, painting, and interior design to ensure your space is perfect." },
  { num: "03", title: "Precision.", body: "Fast actions, measurable outcomes, zero ambiguity." },
];

export default function DominateSite(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLElement>(null);
  const [showWaitlist, setShowWaitlist] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [loaderComplete, setLoaderComplete] = useState<boolean>(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      lerp: 0.08,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value as number, { immediate: true })
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.addEventListener("refresh", () =>
      lenis.raf(performance.now())
    );
    ScrollTrigger.refresh();

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const moveCursor = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      requestAnimationFrame(moveCursor);
    };
    moveCursor();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - 16;
      mouseY = e.clientY + window.scrollY - 16;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const targets = document.querySelectorAll(".hover-target");
    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    targets.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setLoaderComplete(true),
      });

      const counterObj = { value: 0 };

      tl.to(counterObj, {
        value: 100,
        duration: 1,
        ease: "power2.out",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.floor(
              counterObj.value
            ).toString();
          }
        },
      });

      tl.to(loaderRef.current, { opacity: 0, duration: 0.5 }, "-=0.3");

      tl.fromTo(
        mainContentRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.3"
      );

      tl.to(".line-3", {
        text: "Detail.",
        duration: 1,
        ease: "none",
      });

      const sections = gsap.utils.toArray<HTMLElement>(".story-section");

      sections.forEach((section, i) => {
        if (i === 0) return;

        const elements = section.querySelectorAll(
          "h2, h3, h4, p, .reveal, .reveal-card"
        );

        gsap.set(elements, { opacity: 0, y: 60 });

        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        });
      });
    }, containerRef);

    const track = document.querySelector(".testimonial-vertical-track") as HTMLElement;

let loopTween: gsap.core.Tween | null = null;

if (track) {
  loopTween = gsap.to(track, {
    yPercent: -50, // 🔥 instead of y: -height
    duration: 25,  // smoother + slower
    ease: "none",
    repeat: -1,
  });

  const handlePause = () => loopTween?.pause();
  const handleResume = () => loopTween?.resume();

  track.addEventListener("mouseenter", handlePause);
  track.addEventListener("mouseleave", handleResume);

  (track as any)._cleanup = () => {
    track.removeEventListener("mouseenter", handlePause);
    track.removeEventListener("mouseleave", handleResume);
  };
}

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });

      if (track && (track as any)._cleanup) {
        (track as any)._cleanup();
      }

      loopTween?.kill();
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    // 🔥 UPDATED: Main background to Rice Paper
    <div ref={containerRef} className="bg-[#FDFCF8] transition-colors duration-700 overflow-x-hidden font-sans selection:bg-[#C18C5D]/30 selection:text-[#2C2C24]">

      {!loaderComplete && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-[300] bg-[#FDFCF8] flex items-end justify-end p-12 md:p-20"
        >
          <div
            ref={counterRef}
            className="font-serif text-[20vw] md:text-[15vw] font-bold text-[#5D7052]"
          >
            0
          </div>
        </div>
      )}


      <main
        ref={mainContentRef}
        className="relative"
      >
        <div className="fixed inset-0 z-0 ">
          <Canvas
            camera={{ position: [0, 0, 1] }}
            gl={{ antialias: false, powerPreference: "high-performance" }}
            dpr={[1, 2]}
          >
            <LiquidBackground />
          </Canvas>
          {/* 🔥 UPDATED: Grid and Radial overlay colors for Organic feel */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(93,112,82,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(93,112,82,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#FDFCF8_95%)]" />
        </div>

        <div className="fixed inset-0 pointer-events-none opacity-[0.06] z-[100] mix-blend-multiply bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'5\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E')]" />

        <div
          ref={cursorRef}
          className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
          style={{
            width: isHovering ? "50px" : "20px",
            height: isHovering ? "50px" : "20px",
            backgroundColor: isHovering ? "transparent" : "#2C2C24",
            border: isHovering ? "2px solid #5D7052" : "none",
            borderRadius: "50%",
            transform: "translate3d(0,0,0) translate(-50%, -50%)",
            transition: "all 0.25s ease",
            mixBlendMode: "multiply",
          }}
        />
        <Navbar />
        <div className="relative z-10 text-[#2C2C24]">
          {/* SECTION 1: HERO - 🔥 UPDATED Text Colors */}
          <section className="story-section min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20">
            <div className="max-w-7xl ">
              <h1 ref={heroTitleRef} className="font-serif text-[10vw] md:text-[11vw] font-bold leading-[0.8] tracking-tighter text-[#5D7052] uppercase">
                <div className="line-1 hero-line block overflow-hidden py-2 ">Excellence</div>
                <div className="line-2 hero-line block overflow-hidden py-2 italic text-[#5D7052] ">in <span className="text-[#C18C5D]">Every</span></div>
                <div className="line-3 hero-line block overflow-hidden py-2 min-h-[1em] hover-target"></div>
              </h1>
              <div className="mt-12 pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <p className="font-serif italic text-md md:text-2xl text-[#2C2C24]/60 max-w-xl">
                  Elite facility management and living solutions for high-profile residential and commercial entities. We handle the details so you can focus on what matters.
                </p>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 border border-[#5D7052]/30 rounded-full flex items-center justify-center animate-spin-slow">
                    <svg className="w-6 h-6 text-[#5D7052]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-[10px] uppercase font-bold tracking-widest leading-tight">Protocol Active <br /> Est. 2020</p>
                </div>
              </div>
            </div>
          </section>

          <InfiniteSlider />

          {/* SECTION 2: PRINCIPLES - 🔥 UPDATED Theme Colors */}
          <section id="about" className="story-section min-h-screen bg-gradient-to-b from-[#FDFCF8] via-[#F3F4F1] to-[#FDFCF8] text-[#5D7052] border-t border-b border-[#DED8CF] py-20 px-6 md:px-12 flex items-center">
            <div className="max-w-6xl mx-auto w-full ">
              <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-8 ">
                <div className="reveal">
                  <p className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 opacity-60 flex items-center gap-4">
                    <span className="w-8 h-px bg-[#5D7052]/40"></span> The Standard
                  </p>
                  <h2 className="font-serif text-6xl md:text-6xl lg:text-8xl font-medium leading-none text-[#2C2C24]">
                    Built on <em className="italic opacity-70 font-serif">care.</em>
                  </h2>
                </div>
                <div className="reveal md:max-w-xs pt-8">
                  <p className="text-sm md:text-lg leading-relaxed opacity-60 text-right md:text-left">
                    We operate with meticulous attention to detail, delivering premium maintenance and living environments with absolute reliability and unyielding quality.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-2 ">
                {PRINCIPLES.map((p) => (
                  <div
                    key={p.num}
                    className="principle-card hover-target reveal p-8 md:p-12 bg-white/50 border border-[#DED8CF] rounded-sm hover:bg-[#5D7052]/5 transition-all duration-500 group relative overflow-hidden cursor-pointer hover:scale-[1.02]"
                  >
                    <div className="absolute -bottom-4 -right-4 text-9xl font-serif opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity">{p.num}</div>
                    <div className="flex items-center gap-4 mb-12">
                      <span className="font-serif text-sm opacity-50 text-[#C18C5D]">[{p.num}]</span>
                      <div className="h-px w-12 bg-[#5D7052]/20 group-hover:w-20 transition-all duration-700"></div>
                    </div>
                    <h3 className="font-serif text-3xl md:text-4xl mb-6">{p.title}</h3>
                    <p className="text-sm md:text-base leading-relaxed opacity-60 group-hover:opacity-90 transition-opacity">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3: STATS - 🔥 UPDATED Theme Colors */}
          <section className="story-section py-22 px-6 md:px-12 bg-[#FDFCF8]">
            <div className="lg:mx-50 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-4 border border-[#DED8CF] items-start">
              <div className="reveal space-y-16 p-4">
                <div className="relative text-[#2C2C24]/80 leading-relaxed text-lg font-serif italic max-w-xl">
                  <span className="float-left text-7xl font-serif font-bold text-[#5D7052] leading-[0.8] mr-4 mt-4">S</span>
                  ince 2020 our inception, Sparking Stars has empowered residents, homeowners, and businesses in Mumbai to elevate their living and working environments through premium facility solutions.
                  <br /><br />
                  With a focus on Kandivali and the surrounding regions, we have become a trusted partner for those seeking excellence in property care.
                </div>
                <div className="grid grid-cols-2 border border-[#DED8CF] rounded-sm overflow-hidden">
                  {STATS.map((s, i) => (
                    <div
                      key={s.label}
                      className={`p-10 border-[#DED8CF] ${i === 0 ? "border-r border-b" : ""} ${i === 1 ? "border-b" : ""} ${i === 2 ? "border-r" : ""} hover:bg-[#5D7052]/5 transition-all duration-300 cursor-pointer hover:scale-[1.03]`}
                    >
                      <div className="font-serif text-4xl text-[#5D7052] font-bold mb-2">{s.value}</div>
                      <div className="text-[9px] uppercase tracking-widest text-[#2C2C24]/40 font-bold">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="reveal relative p-4 border-l border-[#DED8CF]">
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold mb-8 text-[#5D7052]/60 flex items-center gap-4">
                  <span className="w-8 h-px bg-[#5D7052]/40"></span> Since 2019 · Dominate
                </p>
                <h2 className="font-serif text-6xl md:text-8xl font-medium leading-[1.1] text-[#2C2C24]">
                  We <br /> <em className="italic opacity-80 font-serif">Dominate</em> <br /> the Digital Arena.
                </h2>
              </div>
            </div>
          </section>

          {/* SECTION 4: SERVICES - 🔥 UPDATED Theme Colors */}
          <section
            id="services"
            className="story-section bg-[#0B2A1E] text-[#E7E5DF] py-28 px-6 md:px-12"
          >
            <div className="max-w-7xl mx-auto">

              {/* MAIN HEADING */}
              <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] mb-20 text-[#E7E5DF]">
                Facility <br />
                <em className="italic opacity-60">Management.</em>
              </h2>

              {/* TOP GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#E7E5DF]/20 overflow-hidden">

                {/* LEFT BIG CARD */}
                <div className="lg:col-span-5 p-10 bg-[#0F3326] border-r border-[#E7E5DF]/20 relative">
                  <div className="absolute top-0 left-0 w-1 h-20 bg-[#C18C5D]" />

                  <p className="text-[10px] uppercase tracking-[0.4em] text-[#E7E5DF]/40 mb-8">
                    {SERVICES[0].area}
                  </p>

                  <h3 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
                    Digital Risk <br /> & Reputation <br /> Solutions
                  </h3>

                  <p className="text-sm md:text-base text-[#E7E5DF]/70 leading-relaxed mb-10">
                    {SERVICES[0].desc}
                  </p>

                  <ul className="space-y-3">
                    {SERVICES[0].items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-[#E7E5DF]/80">
                        <span className="text-[#C18C5D]">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    <div className="inline-flex items-center gap-2 bg-[#E7E5DF] text-[#0B2A1E] px-4 py-2 text-[9px] uppercase tracking-widest font-bold">
                      <span className="w-1.5 h-1.5 bg-[#C18C5D] rounded-full animate-pulse" />
                      {SERVICES[0].badge}
                    </div>
                  </div>
                </div>

                {/* RIGHT LIST */}
                <div className="lg:col-span-7 flex flex-col divide-y divide-[#E7E5DF]/20">
                  {SERVICES.slice(1).map((s) => (
                    <div
                      key={s.title}
                      className="p-8 hover:bg-[#E7E5DF]/5 transition-all duration-300 group"
                    >
                      <p className="text-[9px] uppercase tracking-[0.4em] text-[#E7E5DF]/40 mb-3">
                        {s.area}
                      </p>

                      <h4 className="font-serif text-2xl md:text-3xl mb-3 group-hover:translate-x-2 transition-transform">
                        {s.title}
                      </h4>

                      <p className="text-sm text-[#E7E5DF]/60 max-w-lg">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ===================== */}
            {/* SOCIAL MEDIA SERVICES */}
            {/* ===================== */}

            <div className="max-w-7xl mx-auto mt-32">

              {/* Heading */}
              <div className="flex items-center gap-6 mb-16">
                <h2 className="font-sans text-4xl md:text-6xl font-semibold">
                  Social Media Services
                </h2>
                <div className="flex-1 h-px bg-[#E7E5DF]/20"></div>
              </div>

              {/* GRID */}
              <div className="border border-[#E7E5DF]/20 grid md:grid-cols-2">

                {/* BOX */}
                {[
                  {
                    title: "Desired Usernames and Handle Acquisition",
                    tag: "Digital Branding",
                    items: ["Instagram", "X (Twitter)", "Telegram"],
                  },
                  {
                    title: "Platform Intelligence Insights",
                    tag: "Trace",
                    items: ["Instagram", "Gmail", "TikTok", "X (Twitter)", "iCloud", "PayPal"],
                  },
                  {
                    title: "Content and Account Removals",
                    tag: "Digital Threat Elimination",
                    items: ["Instagram", "WhatsApp", "X (Twitter)", "TikTok", "YouTube", "Reddit"],
                  },
                  {
                    title: "Social Assets & Growth / Boost",
                    tag: "Recovery & Scale",
                    items: ["Instagram", "WhatsApp", "Telegram", "Verification", "Shadow Ban Removal"],
                  },
                ].map((box, i) => (
                  <div
                    key={i}
                    className={`p-10 border-[#E7E5DF]/20 ${i === 0 ? "border-b md:border-r" :
                        i === 1 ? "border-b" :
                          i === 2 ? "md:border-r" : ""
                      }`}
                  >
                    <p className="text-[10px] tracking-[0.4em] uppercase text-[#E7E5DF]/40 mb-6">
                      {box.tag}
                    </p>

                    <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                      {box.title}
                      <span className="text-sm text-[#E7E5DF]/40 ml-2">
                        (on all major platforms)
                      </span>
                    </h3>

                    <div className="flex flex-wrap gap-3 mt-6">
                      {box.items.map((item) => (
                        <span
                          key={item}
                          className="px-4 py-2 border border-[#E7E5DF]/20 text-sm text-[#E7E5DF]/70"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5: VOUCHES - 🔥 UPDATED Theme Colors */}
          <section id="vouches" className="story-section py-24 px-6 md:px-12 bg-[#FDFCF8]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-5 h-fit lg:sticky lg:top-32">
                <div className="reveal">
                  <p className="text-[10px] uppercase tracking-[0.4em] font-bold mb-6 text-[#5D7052]/60 flex items-center gap-4">
                    <span className="w-8 h-px bg-[#5D7052]/40"></span> Testimonials
                  </p>
                  <h2 className="font-serif text-7xl md:text-[8rem] font-medium leading-none text-[#5D7052] mb-8">
                    Vouches.
                  </h2>
                  <p className="text-[11px] md:text-[13px] uppercase tracking-[0.2em] leading-relaxed text-[#2C2C24]/50 max-w-sm font-bold">
                    Authentic feedback from our distinguished residents and corporate partners across Mumbai.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 overflow-hidden h-[500px] relative">
                <div className="testimonial-vertical-track space-y-6">
                  {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                    <div
                      key={i}
                      className="reveal-card group bg-white border border-[#DED8CF] rounded-2xl p-8 md:p-10 
hover:bg-[#F3F4F1] transition-colors duration-300 
relative overflow-hidden cursor-pointer"
                    >
                      <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-24 h-24 md:w-32 md:h-40 bg-[#5D7052]/5 rounded-xl flex-shrink-0 border border-[#DED8CF] overflow-hidden grayscale contrast-125 opacity-70 group-hover:opacity-100 transition-opacity">
                          <div className="w-full h-full bg-gradient-to-b from-[#DED8CF] to-[#F3F4F1] flex items-center justify-center text-[10px] text-[#5D7052]/20 italic">
                            Asset_P{i}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h4 className="font-serif text-2xl text-[#2C2C24] mb-1">{t.id}</h4>
                              <p className="text-[9px] uppercase tracking-widest text-[#5D7052]/40 font-bold">{t.tag}</p>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 border border-[#5D7052]/20 bg-[#5D7052]/5 rounded-full">
                              <span className="w-1 h-1 bg-[#5D7052] rounded-full animate-pulse"></span>
                              <span className="text-[8px] uppercase font-bold text-[#5D7052] tracking-tighter">Verified</span>
                            </div>
                          </div>

                          <p className="font-serif italic text-lg md:text-xl text-[#2C2C24]/80 leading-relaxed mb-8">
                            &ldquo;{t.text}&rdquo;
                          </p>

                          <div className="flex justify-between items-center border-t border-[#DED8CF] pt-6">
                            <span className="text-[9px] uppercase tracking-[0.3em] text-[#5D7052]/20 font-bold">Recent</span>
                            <div className="w-5 h-5 opacity-20 contrast-0 grayscale">
                              <div className="border border-[#5D7052] rounded-full w-full h-full text-[8px] flex items-center justify-center text-[#5D7052]">D</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: CONTACT - 🔥 UPDATED Theme Colors */}
          <section id="contact" className="story-section min-h-screen bg-[#FDFCF8] flex items-center justify-center px-6 py-20 relative border-t border-[#DED8CF]">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-end border border-[#DED8CF] rounded-sm p-8 md:p-12 bg-white/50 ">
              <div className="text-left">
                <p className="reveal text-[10px] uppercase tracking-[0.5em] font-bold text-[#5D7052]/40 mb-8 flex items-center gap-4">
                  <span className="w-8 h-px bg-[#5D7052]/40"></span> [ Initiate Contact ]
                </p>
                <h2 className="reveal font-serif text-5xl md:text-7xl lg:text-9xl text-[#5D7052] font-bold leading-[0.9] mb-8">Need <br /> professional <br /> support?</h2>
                <p className="reveal text-lg md:text-xl text-[#2C2C24]/60 font-serif italic max-w-md">We assess your facility needs, align our team, and move fast</p>
              </div>
              <div className="reveal flex flex-col md:flex-row gap-4 lg:justify-end">
                <button onClick={() => setShowWaitlist(true)} className="group bg-[#5D7052] text-[#FDFCF8] px-10 py-5 rounded-sm font-bold uppercase tracking-widest text-[11px] hover:shadow-[0_0_30px_rgba(93,112,82,0.3)] transition-all flex items-center justify-center gap-3 hover:scale-[1.02]">
                  Schedule Call <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button className="border border-[#DED8CF] text-[#5D7052] px-10 py-5 rounded-sm font-bold uppercase tracking-widest text-[11px] hover:bg-[#5D7052]/5 transition-all hover:scale-[1.02]">View Services</button>
              </div>
            </div>
            <footer className="absolute bottom-10 left-0 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.4em] text-[#5D7052]/20">
              <p>&copy; 2026 Sparking Stars Enterprises. &bull; Premium  Consulting</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-[#5D7052]/50 transition-colors pointer-events-auto">Privacy Policy</a>
                <a href="#" className="hover:text-[#5D7052]/50 transition-colors pointer-events-auto">Terms of Service</a>
              </div>
            </footer>
          </section>
        </div>
      </main>

      {/* WAITLIST MODAL - 🔥 UPDATED Colors */}
      {showWaitlist && (
        <div className="fixed inset-0 bg-[#2C2C24]/90 backdrop-blur-md z-[200] flex items-center justify-center p-6" onClick={() => setShowWaitlist(false)}>
          <div className="relative bg-[#FDFCF8] border-4 border-[#DED8CF] rounded-lg p-10 md:p-14 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-6 right-6 text-[#5D7052]/40 hover:text-[#5D7052]" onClick={() => setShowWaitlist(false)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#5D7052] mb-2">Join the Waitlist</h3>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#5D7052]/40 mb-10 italic">Secure your spot early.</p>
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setShowWaitlist(false); }}>
              <div className="group">
                <label className="block text-[9px] uppercase font-bold text-[#5D7052]/30 mb-3 tracking-widest">Name / Company</label>
                <input type="text" placeholder="Acme Corp" className="w-full bg-[#F3F4F1] border-2 border-[#DED8CF] rounded-sm p-4 text-[#2C2C24] focus:border-[#5D7052]/40 outline-none" required />
              </div>
              <div className="group">
                <label className="block text-[9px] uppercase font-bold text-[#5D7052]/30 mb-3 tracking-widest">Gmail / Email</label>
                <input type="email" placeholder="your@gmail.com" className="w-full bg-[#F3F4F1] border-2 border-[#DED8CF] rounded-sm p-4 text-[#2C2C24] focus:border-[#5D7052]/40 outline-none" required />
              </div>
              <button type="submit" className="w-full bg-[#5D7052] text-[#FDFCF8] py-5 rounded-sm font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#C18C5D] transition-all">Join Now</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}