'use client';
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PerfectDentroFullPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);

  // Core DOM element tracking references for GSAP Pinning
  const scrollPinSectionRef = useRef<HTMLDivElement>(null);
  const horizontalPanelsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Safe context lifecycle allocator wrapper to stop layout memory glitches on backward navigation
    let ctx = gsap.context(() => {
      
      const setupScrollTrigger = () => {
        if (scrollPinSectionRef.current && horizontalPanelsWrapperRef.current) {
          const panels = horizontalPanelsWrapperRef.current;
          const totalPanels = panels.children.length;
          
          // Calculate the total horizontal scroll distance matching panel width metrics
          const scrollDistance = panels.scrollWidth - window.innerWidth;

          // Create the horizontal scroll animation sequence
          const horizontalScroll = gsap.to(panels, {
            x: -scrollDistance,
            ease: 'none',
          });

          // Create ScrollTrigger
          ScrollTrigger.create({
            trigger: scrollPinSectionRef.current,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            animation: horizontalScroll,
            invalidateOnRefresh: true,
            pinSpacing: true,
            refreshPriority: 1,
          });
        }
      };

      // Ensure the DOM is fully structured before calculating lengths
      requestAnimationFrame(() => {
        setupScrollTrigger();
      });

    }, scrollPinSectionRef); // Boundaries locked strictly inside section context container bounds

    // Handle responsive frame resizes
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // 2. Clear out timeline configurations and cached background threads memory safely
      ctx.revert(); 
    };
  }, []);

  const servicesList = [
    {
      id: 'design-project',
      num: '01',
      title: 'DESIGN PROJECT DEVELOPMENT',
      desc: 'We create a complete design concept, carefully balancing style and functionality to reflect your vision in every detail.',
    },
    {
      id: 'interior-decoration',
      num: '02',
      title: 'INTERIOR DECORATION',
      desc: 'Sourcing and styling bespoke design pieces, tailored artworks, and fine textile curation to elevate your personal spaces.',
    },
    {
      id: 'project-visualization',
      num: '03',
      title: 'PROJECT VISUALIZATION',
      desc: 'Hyper-realistic three-dimensional renderings that bring conceptual architectural volumes and custom furniture to life.',
    },
    {
      id: 'selection-purchase',
      num: '04',
      title: 'SELECTION AND PURCHASE OF MATERIALS AND FURNITURE',
      desc: 'Full procurement management from global premium suppliers, balancing budget realities with exceptional structural quality.',
    },
    {
      id: 'project-management',
      num: '05',
      title: 'PROJECT MANAGEMENT',
      desc: 'Rigorous architectural supervision from initial groundwork site-mapping to final client walkthrough handshakes.',
    },
    {
      id: 'repair-reconstruction',
      num: '06',
      title: 'REPAIR AND RECONSTRUCTION',
      desc: 'Complete structural renovations and heritage restoration works managed by premier certified craft engineers.',
    }
  ];

  return (
    /* [COLOR THEME ADDITION] Canvas base setup using customized cream backdrop layers */
    <div className="bg-gradient-to-b from-[#FBF5DD] via-[#ede6cb] to-[#dfd7b9] text-[#16251b] font-editorial-sub antialiased min-h-screen selection:bg-[#2b5c32] selection:text-white relative overflow-x-hidden">
      
      {/* =========================================================
          SLIDE-OUT MENU OVERLAY
         ========================================================= */}
      <div 
        className={`fixed inset-0 z-50 bg-[#FBF5DD] transition-all duration-500 ease-in-out flex flex-col justify-between border-x border-[#2b5c32]/10 max-w-[1440px] mx-auto ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <nav className="w-full border-b border-[#2b5c32]/10 px-12 py-7 flex justify-between items-center text-[10px] tracking-[0.3em] text-[#2b5c32]/70 uppercase font-medium">
          <div 
            className="cursor-pointer hover:text-black transition-colors text-[#2b5c32]"
            onClick={() => setIsMenuOpen(false)}
          >
            CLOSE
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#2b5c32] rounded-tr-full"></div>
            <span className="font-editorial-heading tracking-[0.1em] text-sm text-[#16251b] font-bold">
              SparkingStarz
            </span>
          </div>
          <div className="opacity-0 pointer-events-none">CONTACT</div>
        </nav>

        <div className="flex flex-col items-center justify-center space-y-8 flex-grow">
          <a href="#" onClick={() => setIsMenuOpen(false)} className="font-editorial-heading text-4xl md:text-6xl text-zinc-500 hover:text-[#2b5c32] transition-colors uppercase tracking-widest">Home</a>
          <a href="#" onClick={() => setIsMenuOpen(false)} className="font-editorial-heading text-4xl md:text-6xl text-zinc-500 hover:text-[#2b5c32] transition-colors uppercase tracking-widest">About</a>
          <a href="#" onClick={() => setIsMenuOpen(false)} className="font-editorial-heading text-4xl md:text-6xl text-zinc-500 hover:text-[#2b5c32] transition-colors uppercase tracking-widest">Services</a>
          <a href="#" onClick={() => setIsMenuOpen(false)} className="font-editorial-heading text-4xl md:text-6xl text-zinc-500 hover:text-[#2b5c32] transition-colors uppercase tracking-widest">Our Projects</a>
          <a href="#" onClick={() => setIsMenuOpen(false)} className="font-editorial-heading text-4xl md:text-6xl text-zinc-500 hover:text-[#2b5c32] transition-colors uppercase tracking-widest">Contact</a>
        </div>

        <div className="w-full flex justify-center gap-2.5 py-8 bg-[#ede6cb] text-center border-t border-[#2b5c32]/10">
          <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
          <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
          <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
        </div>
      </div>

      {/* MASTER CONTAINER FRAME */}
      <div className="w-full max-w-[1440px] mx-auto border-x border-[#2b5c32]/10 flex flex-col bg-gradient-to-b from-[#FBF5DD] via-[#ede6cb] to-[#dfd7b9]">
        
        {/* NAVIGATION HEADER */}
        <nav className="w-full border-b border-[#2b5c32]/10 px-12 py-7 flex justify-between items-center text-[10px] tracking-[0.3em] text-[#2b5c32]/80 uppercase font-medium relative z-30 bg-[#FBF5DD]">
          <div 
            className="cursor-pointer hover:text-black transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            MENU
          </div>
          
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-2.5 h-2.5 bg-[#2b5c32] rounded-tr-full"></div>
            <span className="font-editorial-heading tracking-[0.1em] text-sm text-[#16251b] font-bold">
              SparkingStarz
            </span>
          </div>
          
          <div className="cursor-pointer hover:text-black transition-colors">
            CONTACT
          </div>
        </nav>

        {/* TOP HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b h-screen border-[#2b5c32]/10 w-full relative z-10 overflow-hidden bg-[#FBF5DD]">
          <div className="lg:col-span-9 p-8 md:p-12 lg:p-16 pb-0 flex flex-col justify-between">
            <h1 className="font-editorial-heading text-[12.5vw] lg:text-[10.5vw] font-bold leading-[0.82] tracking-tighter text-[#16251b] uppercase mt-2">
              BEAUTY IN<br />
              <span className="text-[#2b5c32]">SIMPLICITY</span>
            </h1>
          </div>

          <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-[#2b5c32]/10 p-8 md:p-12 flex flex-col justify-end items-start space-y-8 bg-[#ede6cb]/40 min-h-[280px] z-10">
            <div className="flex -space-x-2.5">
              <div className="w-11 h-11 rounded-full bg-[#dfd7b9] border-2 border-[#FBF5DD] shadow-sm flex items-center justify-center text-[10px] text-[#16251b]">👤</div>
              <div className="w-11 h-11 rounded-full bg-[#ede6cb] border-2 border-[#FBF5DD] shadow-sm flex items-center justify-center text-[10px] text-[#16251b]">👤</div>
              <div className="w-11 h-11 rounded-full bg-[#2b5c32] border-2 border-[#FBF5DD] shadow-sm flex items-center justify-center text-[10px] text-white">👤</div>
            </div>
            <div className="space-y-0.5">
              <div className="font-editorial-heading text-5xl md:text-[3.75rem] font-normal leading-none text-[#123617] tracking-normal">
                900.000+
              </div>
              <div className="text-[9px] tracking-[0.22em] text-[#2b5c32]/70 font-medium uppercase">
                HAPPY CUSTOMER
              </div>
            </div>
            <div className="flex gap-2.5">
              <span className="text-[#2b5c32] text-[9px] transform rotate-45 select-none">✦</span>
              <span className="text-[#2b5c32] text-[9px] transform rotate-45 select-none">✦</span>
              <span className="text-[#2b5c32] text-[9px] transform rotate-45 select-none">✦</span>
            </div>
          </div>
        </div>

        {/* 1. ABOUT BRAND INTRODUCTION SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full border-b border-[#2b5c32]/10 bg-[#ede6cb] relative z-10 overflow-hidden">
          <div className="lg:col-span-4 p-8 md:p-12 lg:p-14 space-y-6 border-b lg:border-b-0 lg:border-r border-[#2b5c32]/10 z-10 bg-[#ede6cb]/10 backdrop-blur-sm">
            <h2 className="font-editorial-heading text-3xl md:text-4xl font-normal tracking-wide text-[#16251b] uppercase">
              INTERIOR DESIGN COMPANY EST. 1999
            </h2>
            <p className="text-[#2b5c32]/80 text-xs tracking-[0.08em] uppercase leading-relaxed">
              WE LOVED TO CREATE INNOVATIVE INTERIOR DESIGN SOLUTIONS FOR FOREVER, TRANSFORMING SPACES, TRANSFORMING LIVES AND LET'S MAKE YOUR HOME MORE EXQUISITE.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button className="bg-[#2b5c32] text-white text-[10px] font-bold tracking-[0.25em] uppercase px-8 py-3 rounded-full hover:bg-[#123617] transition-colors">
                CONSULT ONLINE NOW
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 flex-grow relative">
            <div className="hidden md:flex md:col-span-2 items-center justify-center border-r border-[#2b5c32]/10 py-6">
              <div className="font-editorial-heading text-[#2b5c32]/60 uppercase tracking-[0.45em] text-[10px] font-bold [writing-mode:vertical-lr] rotate-180 select-none">
                ABOUT DENTRO
              </div>
            </div>

            <div className="md:col-span-10 p-8 md:p-12 flex flex-col justify-between space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-[#2b5c32]/80 text-[10px] tracking-widest uppercase leading-[1.8]">
                <p>
                  CONSTRUCTED IN 1999 IN FRANCE, DENTRO IS AN INTERNATIONAL INTERIOR DESIGN COMPANY COMBINE FUNCTIONALITY AND CREATIVITY WITH AN AUTHENTIC PRODUCTION TO SHAPE HIGH-END INTERIORS.
                </p>
                <p>
                  WORKING ACROSS BOTH PRIME RESIDENTIAL AND COMMERCIAL PROPERTY SECTORS, OUR UNIQUE SKILL SET ALLOWS US TO FULFILL OUR CLIENTS' AMBITIONS FROM CONCEPTION TO COMPLETION.
                </p>
              </div>

              <div className="w-full aspect-[2.3/1] bg-[#dfd7b9]/60 border border-[#2b5c32]/10 rounded-[50px] md:rounded-[90px] overflow-hidden relative group cursor-pointer mt-4 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-t from-[#FBF5DD]/20 to-transparent" />
                <div className="w-full h-full bg-[#ede6cb] opacity-40 transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
            </div>
          </div>
        </div>

        {/* Tiny Diamond Row Separator */}
        <div className="w-full flex justify-end gap-2 px-12 py-3 bg-[#ede6cb] border-b border-[#2b5c32]/10 relative z-10">
          <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
          <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
          <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
        </div>

        {/* =========================================================
            2. SERVICES SECTION
           ========================================================= */}
        <div className="w-full bg-[#FBF5DD] border-b border-[#2b5c32]/10 p-8 md:p-12 lg:p-16 flex flex-col space-y-12 relative z-10">
          <div className="w-full py-4">
            <h2 className="font-editorial-heading text-5xl md:text-7xl lg:text-8xl font-normal tracking-[0.05em] text-[#16251b] uppercase relative inline-block select-none">
              SERVIC
              <span className="font-serif italic text-[#c5a880]/60 lowercase text-6xl md:text-8xl lg:text-9xl mx-[-0.05em] inline-block transform translate-y-[-0.05em]">
                e
              </span>
              S
            </h2>
          </div>

          <div className="w-full flex flex-col border-t border-[#2b5c32]/20">
            {servicesList.map((service, index) => {
              const isOpen = activeService === index;
              return (
                <div 
                  key={index} 
                  className="w-full border-b border-[#2b5c32]/20 py-6 md:py-8 flex flex-col transition-all duration-300"
                  onMouseEnter={() => setActiveService(index)}
                >
                  <Link 
                    href={`/services/${service.id}`}
                    className="w-full flex justify-between items-start cursor-pointer group text-[#16251b]"
                  >
                    <div className="flex items-start space-x-12 md:space-x-24">
                      <span className="font-sans text-[11px] tracking-widest text-[#2b5c32]/50 pt-1 font-medium">
                        {service.num}
                      </span>
                      <h3 className="font-editorial-heading text-lg md:text-2xl font-normal tracking-wide uppercase transition-colors group-hover:text-[#2b5c32]">
                        {service.title}
                      </h3>
                    </div>

                    <div className="text-xl font-light font-sans text-[#2b5c32]/60 w-6 h-6 flex items-center justify-center select-none">
                      {isOpen ? '—' : '+'}
                    </div>
                  </Link>

                  <div className={`grid transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden pl-16 md:pl-32 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-8 space-y-4">
                        <p className="text-[#2b5c32]/80 text-xs md:text-sm tracking-wide leading-relaxed font-sans max-w-xl">
                          {service.desc}
                        </p>
                        <Link 
                          href={`/services/${service.id}`}
                          className="text-[10px] font-bold tracking-[0.2em] text-[#2b5c32] uppercase underline cursor-pointer hover:text-[#16251b] inline-block transition-colors"
                        >
                          Read Details →
                        </Link>
                      </div>
                      <div className="md:col-span-4 flex justify-end">
                        <div className="w-full max-w-[200px] aspect-[3/4] bg-[#dfd7b9] border border-[#2b5c32]/10 shadow-inner relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#2b5c32]/5 to-transparent opacity-60" />
                          <div className="w-full h-full bg-[#ede6cb]/40 transition-transform duration-500 group-hover:scale-102" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            3 & 4. HORIZONTAL SCROLL SECTION
           ========================================================= */}
        <div ref={scrollPinSectionRef} className="w-full h-screen relative bg-[#ede6cb] overflow-hidden z-20">
          <div 
            ref={horizontalPanelsWrapperRef} 
            className="flex h-full will-change-transform"
          >
            {/* PANEL 1: MEET OUR VISION */}
            <div className="w-screen h-full flex-shrink-0 border-r border-[#2b5c32]/10 bg-[#ede6cb] p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between w-full gap-4 max-w-[1300px] mx-auto">
                <h2 className="font-editorial-heading text-4xl md:text-5xl font-normal tracking-widest text-[#16251b] uppercase">
                  MEET OUR VISION
                </h2>
                <p className="text-[#2b5c32]/80 text-[10px] tracking-widest uppercase max-w-xl leading-relaxed pt-2">
                  WE EXIST TO MODERNISE THE CONSTRUCTION INDUSTRY FROM THE INSIDE OUT. WORKING ACROSS BOTH PRIME RESIDENTIAL AND COMMERCIAL PROPERTY SECTORS.
                </p>
              </div>

              <div className="w-full max-w-[1300px] mx-auto aspect-[2.1/1] bg-[#dfd7b9]/40 border border-[#2b5c32]/10 rounded-lg relative flex items-center justify-center group overflow-hidden">
                <button className="w-20 h-20 rounded-full border border-[#2b5c32]/20 bg-white/90 backdrop-blur-md flex items-center justify-center text-zinc-700 group-hover:scale-105 group-hover:border-[#2b5c32] group-hover:text-[#2b5c32] transition-all duration-500 z-10 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7 ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <div className="absolute top-8 right-12 text-right flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#2b5c32] rounded-tr-full"></div>
                  <span className="font-editorial-heading tracking-[0.15em] text-lg text-[#16251b] font-bold">DENTRO</span>
                </div>
              </div>
            </div>

            {/* PANEL 2: OUR PROJECT MESH GRID */}
            <div className="w-screen h-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-12 bg-[#ede6cb]">
              <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-between space-y-12 bg-[#ede6cb]">
                <div className="space-y-6">
                  <div className="flex gap-2">
                    <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
                    <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
                    <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
                  </div>
                  <h2 className="font-editorial-heading text-4xl md:text-5xl font-normal tracking-widest text-[#16251b] uppercase">
                    OUR PROJECT
                  </h2>
                  <p className="text-[#2b5c32]/80 text-[10px] tracking-[0.14em] uppercase leading-[1.8] max-w-sm">
                    OUR INSPIRED SOLUTIONS HAVE HELPED SHAPE MODERN ACOUSTIC DESIGN. ALLURING SPACES, INTERNATIONALLY RECOGNISED FOR THEIR ARCHITECTURAL ELEGANCE AND EXCEPTIONAL SOUND MANAGEMENT LIVE HERE.
                  </p>
                </div>
                <div>
                  <button className="border border-[#2b5c32]/30 text-[#2b5c32] text-[10px] font-bold tracking-[0.25em] uppercase px-8 py-3.5 rounded-full hover:border-[#2b5c32] hover:text-black transition-colors duration-300">
                    SEE ALL PROJECTS
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-4 divide-x divide-[#2b5c32]/10 border-t lg:border-t-0 lg:border-l border-[#2b5c32]/10 overflow-hidden relative h-full">
                <div className="h-full w-full bg-[#dfd7b9]/40 hover:bg-[#dfd7b9]/60 transition-colors relative group cursor-pointer" />
                <div className="h-full w-full bg-[#ede6cb]/40 hover:bg-[#ede6cb]/60 transition-colors relative group cursor-pointer" />
                <div className="h-full w-full bg-[#FBF5DD] flex flex-col justify-between p-4 py-8 group cursor-pointer border-x border-[#2b5c32]/10 relative z-10 shadow-sm">
                  <div className="font-editorial-heading text-[#16251b] uppercase tracking-[0.25em] text-lg sm:text-xl font-normal [writing-mode:vertical-lr] rotate-180 mx-auto my-auto leading-none">
                    CIRCLE SQUARE
                  </div>
                  <span className="text-[10px] text-[#2b5c32]/60 tracking-widest text-center block font-mono">2021</span>
                </div>
                <div className="h-full w-full bg-[#dfd7b9]/30 hover:bg-[#dfd7b9]/50 transition-colors relative group cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* 5. OUR BIG CLIENT'S */}
        <div className="w-full bg-[#ede6cb] border-b border-[#2b5c32]/10 relative z-30">
          <div className="p-8 md:p-12 border-b border-[#2b5c32]/10 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <h2 className="font-editorial-heading text-4xl font-normal tracking-widest text-[#16251b] uppercase leading-none">
              OUR BIG CLIENT'S
            </h2>
            <p className="text-[#2b5c32]/70 text-[10px] tracking-widest uppercase max-w-xl leading-relaxed">
              THERE IS A BALANCE THAT MUST BE ACHIEVED IN CREATING SPACES THAT LOOK GOOD BUT ALSO FEEL GOOD TO BE IN AND BOTH ARE EQUALLY AS IMPORTANT.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-[#2b5c32]/10 bg-zinc-100/10 text-center border-b border-[#2b5c32]/10">
            <div className="p-8 h-36 flex items-center justify-center text-xs tracking-widest text-[#2b5c32]/70 uppercase font-mono hover:bg-[#ede6cb]/40 transition-colors select-none">[ AC MARRIOTT ]</div>
            <div className="p-8 h-36 flex items-center justify-center text-xs tracking-widest text-[#2b5c32]/70 uppercase font-mono hover:bg-[#ede6cb]/40 transition-colors select-none">[ WALDORF ASTORIA ]</div>
            <div className="p-8 h-36 flex items-center justify-center text-xs tracking-widest text-[#2b5c32]/70 uppercase font-mono hover:bg-[#ede6cb]/40 transition-colors select-none">[ MANDARIN ORIENTAL ]</div>
            <div className="p-8 h-36 flex items-center justify-center text-xs tracking-widest text-[#2b5c32]/70 uppercase font-mono hover:bg-[#ede6cb]/40 transition-colors select-none">[ HYATT PLACE ]</div>
            <div className="p-8 h-36 flex items-center justify-center text-xs tracking-widest text-[#2b5c32]/70 uppercase font-mono hover:bg-[#ede6cb]/40 transition-colors select-none border-t border-[#2b5c32]/10">[ HARRAH'S ENT. ]</div>
            <div className="p-8 h-36 flex items-center justify-center text-xs tracking-widest text-[#2b5c32]/70 uppercase font-mono hover:bg-[#ede6cb]/40 transition-colors select-none border-t border-[#2b5c32]/10">[ WESTIN HOTELS ]</div>
            <div className="p-8 h-36 flex items-center justify-center text-xs tracking-widest text-[#2b5c32]/70 uppercase font-mono hover:bg-[#ede6cb]/40 transition-colors select-none border-t border-[#2b5c32]/10">[ HARRAH'S ]</div>
            <div className="p-8 h-36 flex items-center justify-center text-xs tracking-widest text-[#2b5c32]/70 uppercase font-mono hover:bg-[#ede6cb]/40 transition-colors select-none border-t border-[#2b5c32]/10">[ HILTON ]</div>
          </div>
        </div>

        {/* 6. GIANT OVAL CAPSULE CTA */}
        <div className="w-full bg-[#ede6cb] p-8 md:p-14 lg:p-16 text-center border-b border-[#2b5c32]/10 flex flex-col items-center relative z-30">
          <div className="flex gap-2.5 pb-8">
            <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
            <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
            <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
          </div>
          <button className="w-full max-w-4xl bg-[#2b5c32] text-white text-center py-6 md:py-8 lg:py-9 rounded-full font-editorial-heading font-normal text-2xl md:text-4xl lg:text-5xl tracking-widest hover:bg-[#123617] transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-emerald-900/10">
            START YOUR PROJECT NOW
          </button>
        </div>

        {/* BOTTOM GLOBAL FOOTER EDGE */}
        <div className="w-full flex justify-center gap-2.5 py-6 bg-[#ede6cb] text-center relative z-30">
          <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
          <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
          <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
        </div>

        {/* 7. FINAL FOOTER SECTION */}
        <footer className="grid grid-cols-1 md:grid-cols-12 w-full bg-[#ede6cb] relative z-30">
          <div className="md:col-span-6 p-8 md:p-12 lg:p-16 flex flex-col justify-between space-y-16 relative">
            <div className="space-y-12">
              <h3 className="font-editorial-heading text-4xl lg:text-5xl font-normal tracking-widest text-[#16251b] uppercase leading-none">
                KEEP IN TOUCH
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#2b5c32] rounded-tr-full"></div>
                  <span className="font-editorial-heading tracking-[0.1em] text-sm text-[#16251b] font-bold">
                    DENTRO
                  </span>
                </div>
                <p className="text-[#2b5c32] text-[10px] tracking-widest uppercase leading-[1.8] max-w-sm font-sans font-medium">
                  PULAU PARI, KEC. KEPULAUAN SERIBU SEL.,<br />
                  KAB. ADMINISTRASI KEPULAUAN SERIBU,<br />
                  DAERAH KHUSUS IBUKOTA JAKARTA 14520
                </p>
              </div>
            </div>
            <div className="pt-8 border-t border-[#2b5c32]/10 w-full flex gap-12 text-[10px] tracking-[0.25em] text-[#2b5c32]/80 font-bold uppercase">
              <span className="cursor-pointer hover:text-black transition-colors">FAQ</span>
              <span className="cursor-pointer hover:text-black transition-colors">TERMS & AGREEMENTS</span>
            </div>
          </div>

          <div className="md:col-span-6 border-t md:border-t-0 md:border-l border-[#2b5c32]/10 flex flex-col justify-between text-[10px] tracking-[0.25em] font-medium uppercase text-[#2b5c32] bg-[#dfd7b9]/10">
            <div className="divide-y divide-[#2b5c32]/10 w-full">
              <div className="p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#ede6cb]/30 transition-colors">
                <span>EMAIL</span>
                <a href="mailto:HI@DENTRO.COM" className="text-[#16251b] font-mono tracking-normal text-xs font-normal lowercase group-hover:text-[#2b5c32] transition-colors">
                  HI@DENTRO.COM
                </a>
              </div>
              <div className="p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#ede6cb]/30 transition-colors">
                <span>INSTAGRAM</span>
                <span className="text-[#16251b] group-hover:text-[#2b5c32] transition-colors">@DENTRO</span>
              </div>
              <div className="p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#ede6cb]/30 transition-colors">
                <span>TWITTER</span>
                <span className="text-[#16251b] group-hover:text-[#2b5c32] transition-colors">@DENTRO</span>
              </div>
              <div className="p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#ede6cb]/30 transition-colors">
                <span>MEDIUM</span>
                <span className="text-[#16251b] group-hover:text-[#2b5c32] transition-colors">@DENTRO</span>
              </div>
              <div className="p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#ede6cb]/30 transition-colors">
                <span>TELEGRAM</span>
                <span className="text-[#16251b] group-hover:text-[#2b5c32] transition-colors">@DENTRO</span>
              </div>
            </div>
          </div>
        </footer>

        <div className="w-full border-t border-[#2b5c32]/10 bg-[#dfd7b9] h-4 relative z-30"></div>
      </div>
    </div>
  );
}