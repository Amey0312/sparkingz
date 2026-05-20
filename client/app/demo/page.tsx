'use client';
import React from 'react';

export default function PerfectDentroFullPage() {
  return (
    <div className="bg-[#0c0c0c] text-[#f5f5f5] font-editorial-sub antialiased min-h-screen selection:bg-[#c5a880] selection:text-black">
      
      {/* MASTER CONTAINER FRAME */}
      <div className="w-full max-w-[1440px] mx-auto border-x border-zinc-900 flex flex-col">
        
        {/* =========================================================
            NAVIGATION HEADER
           ========================================================= */}
        <nav className="w-full border-b border-zinc-900 px-12 py-7 flex justify-between items-center text-[10px] tracking-[0.3em] text-zinc-400 uppercase font-medium">
          <div className="cursor-pointer hover:text-white transition-colors">
            MENU
          </div>
          
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-2.5 h-2.5 bg-[#c5a880] rounded-tr-full"></div>
            <span className="font-editorial-heading tracking-[0.1em] text-sm text-zinc-100 font-bold">
              DENTRO
            </span>
          </div>
          
          <div className="cursor-pointer hover:text-white transition-colors">
            CONTACT
          </div>
        </nav>

        {/* =========================================================
            TOP HERO SECTION: HEADING + STAT PANEL
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-900 w-full">
          {/* Hero Left: Heading Title */}
          <div className="lg:col-span-9 p-8 md:p-12 lg:p-16 pb-0 flex flex-col justify-between">
            <h1 className="font-editorial-heading text-[12.5vw] lg:text-[10.5vw] font-bold leading-[0.82] tracking-tighter text-white uppercase mt-2">
              BEAUTY IN<br />
              <span className="text-zinc-100">SIMPLICITY</span>
            </h1>
          </div>

          {/* Hero Right: 3-column Stat Counter Box */}
          <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-zinc-900 p-8 md:p-12 flex flex-col justify-end items-start space-y-8 bg-[#0d0d0d]/40 min-h-[280px]">
            <div className="flex -space-x-2.5">
              <div className="w-11 h-11 rounded-full bg-zinc-800 border-2 border-[#0c0c0c] shadow-md flex items-center justify-center text-[10px]">👤</div>
              <div className="w-11 h-11 rounded-full bg-zinc-700 border-2 border-[#0c0c0c] shadow-md flex items-center justify-center text-[10px]">👤</div>
              <div className="w-11 h-11 rounded-full bg-zinc-600 border-2 border-[#0c0c0c] shadow-md flex items-center justify-center text-[10px]">👤</div>
            </div>
            <div className="space-y-0.5">
              <div className="font-editorial-heading text-5xl md:text-[3.75rem] font-normal leading-none text-[#c5a880] tracking-normal">
                900.000+
              </div>
              <div className="text-[9px] tracking-[0.22em] text-zinc-500 font-medium uppercase">
                HAPPY CUSTOMER
              </div>
            </div>
            <div className="flex gap-2.5">
              <span className="text-[#c5a880] text-[9px] transform rotate-45 select-none">✦</span>
              <span className="text-[#c5a880] text-[9px] transform rotate-45 select-none">✦</span>
              <span className="text-[#c5a880] text-[9px] transform rotate-45 select-none">✦</span>
            </div>
          </div>
        </div>

        {/* =========================================================
            MIDDLE MAIN CONTENT SECTION: THE LARGE CONTINUOUS OVAL
           ========================================================= */}
        <div className="w-full border-b border-zinc-900 px-8 md:px-12 lg:px-16 py-12 flex justify-center bg-gradient-to-b from-[#0c0c0c] to-[#0a0a0a]">
          <div className="w-full max-w-[1200px] aspect-[16/9] bg-[#121212] border border-zinc-800 rounded-[160px] md:rounded-[260px] overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 bg-black/20" />
            <div className="w-full h-full bg-gradient-to-tr from-zinc-900 to-zinc-800 opacity-60" />
          </div>
        </div>

        {/* =========================================================
            LOWER SERVICES & ABOUT SECTION (Matches image_e47391.png Exactly)
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full border-b border-zinc-900">
          
          {/* 3-COLUMN SIDEBAR: STACKED CIRCLES & LABEL */}
          <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-zinc-900 flex flex-col items-center justify-start p-8 space-y-12 bg-[#090909]/20">
            {/* Circle 1 */}
            <div className="w-44 h-44 rounded-full border border-zinc-800 p-1.5 flex items-center justify-center group cursor-pointer transition-colors hover:border-zinc-500">
              <div className="w-full h-full rounded-full bg-[#111] overflow-hidden relative" />
            </div>

            {/* Circle 2 */}
            <div className="w-44 h-44 rounded-full border border-zinc-800 p-1.5 flex items-center justify-center group cursor-pointer transition-colors hover:border-zinc-500">
              <div className="w-full h-full rounded-full bg-[#111] overflow-hidden relative" />
            </div>

            {/* Circle 3 (With text overlay) */}
            <div className="w-44 h-44 rounded-full border border-zinc-800/80 p-1.5 flex items-center justify-center group cursor-pointer transition-colors hover:border-zinc-600">
              <div className="w-full h-full rounded-full bg-black flex flex-col items-center justify-center text-center p-4">
                <span className="font-editorial-heading text-base font-bold tracking-normal text-zinc-100 leading-none">
                  TURNKEY<br />FURNISHING
                </span>
              </div>
            </div>

            {/* Bottom Section Label */}
            <div className="pt-6 text-center">
              <h3 className="font-editorial-heading text-2xl font-normal tracking-[0.1em] text-zinc-400 uppercase">
                OUR SERVICES
              </h3>
            </div>
          </div>

          {/* 9-COLUMN RIGHT CONTENT MESH GRID */}
          <div className="lg:col-span-9 flex flex-col justify-between">
            
            {/* Top Row: Introduction Box */}
            <div className="p-8 md:p-12 lg:p-14 space-y-6 border-b border-zinc-900">
              <h2 className="font-editorial-heading text-3xl md:text-4xl font-normal tracking-wide text-zinc-100 uppercase">
                INTERIOR DESIGN COMPANY EST. 1999
              </h2>
              <p className="text-zinc-400 text-xs tracking-[0.08em] uppercase max-w-2xl leading-relaxed">
                WE LOVED TO CREATE INNOVATIVE INTERIOR DESIGN SOLUTIONS FOR FOREVER, TRANSFORMING SPACES, TRANSFORMING LIVES AND LET'S MAKE YOUR HOME MORE EXQUISITE.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button className="bg-[#c5a880] text-black text-[10px] font-bold tracking-[0.25em] uppercase px-8 py-3 rounded-full hover:bg-amber-400 transition-colors">
                  CONSULT ONLINE NOW
                </button>
                <button className="border border-zinc-800 text-zinc-400 text-[10px] font-bold tracking-[0.25em] uppercase px-8 py-3 rounded-full hover:border-zinc-500 transition-colors">
                  SEE ALL PROJECTS
                </button>
              </div>
            </div>

            {/* Tiny Diamond Row Separator */}
            <div className="w-full flex justify-end gap-2 px-12 py-3 bg-[#0c0c0c]">
              <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
              <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
              <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
            </div>

            {/* Bottom Row: Sideways Meta Layout Block */}
            <div className="grid grid-cols-1 md:grid-cols-12 border-t border-zinc-900 flex-grow bg-[#0b0b0b]/40">
              {/* Sideways Text Strip Element */}
              <div className="hidden md:flex md:col-span-2 items-center justify-center border-r border-zinc-900/60 py-6">
                <div className="font-editorial-heading text-zinc-500 uppercase tracking-[0.45em] text-[10px] font-bold [writing-mode:vertical-lr] rotate-180 select-none">
                  ABOUT DENTRO
                </div>
              </div>

              {/* Text Matrix Paragraphs & Capsule Shape Area */}
              <div className="md:col-span-10 p-8 md:p-12 flex flex-col justify-between space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-zinc-500 text-[10px] tracking-widest uppercase leading-[1.8]">
                  <p>
                    CONSTRUCTED IN 1999 IN FRANCE, DENTRO IS AN INTERNATIONAL INTERIOR DESIGN COMPANY COMBINE FUNCTIONALITY AND CREATIVITY WITH AN AUTHENTIC PRODUCTION TO SHAPE HIGH-END INTERIORS.
                  </p>
                  <p>
                    WORKING ACROSS BOTH PRIME RESIDENTIAL AND COMMERCIAL PROPERTY SECTORS, OUR UNIQUE SKILL SET ALLOWS US TO FULFILL OUR CLIENTS' AMBITIONS FROM CONCEPTION TO COMPLETION.
                  </p>
                </div>

                {/* Horizontal Capsule Image Container */}
                <div className="w-full aspect-[2.3/1] bg-zinc-900 border border-zinc-800 rounded-[50px] md:rounded-[90px] overflow-hidden relative group cursor-pointer mt-4 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="w-full h-full bg-zinc-800 opacity-20 transition-transform duration-500 group-hover:scale-102" />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================
            BOTTOM GLOBAL DECORATIVE FOOTER LINE
           ========================================================= */}
        <div className="w-full flex justify-center gap-2.5 py-6 bg-black text-center">
          <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
          <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
          <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
        </div>

        {/* =========================================================
            4. NEW SECTION: MEET OUR VISION (Matches image_e4d837.png Top)
           ========================================================= */}
        <div className="w-full border-t border-b border-zinc-900 bg-[#0c0c0c] p-8 md:p-12 lg:p-14 flex flex-col space-y-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between w-full gap-4">
            <h2 className="font-editorial-heading text-4xl md:text-5xl font-normal tracking-widest text-zinc-100 uppercase">
              MEET OUR VISION
            </h2>
            <p className="text-zinc-500 text-[10px] tracking-widest uppercase max-w-xl leading-relaxed pt-2">
              WE EXIST TO MODERNISE THE CONSTRUCTION INDUSTRY FROM THE INSIDE OUT. WORKING ACROSS BOTH PRIME RESIDENTIAL AND COMMERCIAL PROPERTY SECTORS.
            </p>
          </div>

          {/* Large Video Display Core Component */}
          <div className="w-full aspect-[2.1/1] bg-[#111] border border-zinc-800 rounded-lg relative flex items-center justify-center group overflow-hidden">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            
            {/* Elegant Large Play Action Disc */}
            <button className="w-20 h-20 rounded-full border border-zinc-600 bg-black/40 backdrop-blur-md flex items-center justify-center text-zinc-300 group-hover:scale-105 group-hover:border-[#c5a880] group-hover:text-[#c5a880] transition-all duration-500 z-10 shadow-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7 ml-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>

            {/* Logo Accent inside the video frame layout */}
            <div className="absolute top-8 right-12 text-right flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-[#c5a880] rounded-tr-full"></div>
              <span className="font-editorial-heading tracking-[0.15em] text-lg text-white font-bold">
                DENTRO
              </span>
            </div>
          </div>
        </div>


        {/* =========================================================
            5. NEW SECTION: OUR PROJECT MESH GRID (Matches image_e4d837.png Bottom)
           ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full border-b border-zinc-900 bg-[#0c0c0c]">
          
          {/* LEFT SUB-CELL: Text details and Project CTA (Spans 5 Columns) */}
          <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-between space-y-12 bg-[#090909]/10">
            <div className="space-y-6">
              {/* Triple Diamond Subsection Header */}
              <div className="flex gap-2">
                <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
                <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
                <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
              </div>

              <h2 className="font-editorial-heading text-4xl md:text-5xl font-normal tracking-widest text-zinc-100 uppercase">
                OUR PROJECT
              </h2>
              
              <p className="text-zinc-500 text-[10px] tracking-[0.14em] uppercase leading-[1.8] max-w-sm">
                OUR INSPIRED SOLUTIONS HAVE HELPED SHAPE MODERN ACOUSTIC DESIGN. ALLURING SPACES, INTERNATIONALLY RECOGNISED FOR THEIR ARCHITECTURAL ELEGANCE AND EXCEPTIONAL SOUND MANAGEMENT LIVE HERE.
              </p>
            </div>

            <div>
              <button className="border border-zinc-800 text-zinc-400 text-[10px] font-bold tracking-[0.25em] uppercase px-8 py-3.5 rounded-full hover:border-zinc-500 hover:text-white transition-colors duration-300">
                SEE ALL PROJECTS
              </button>
            </div>
          </div>

          {/* RIGHT SUB-CELL: Asymmetric Vertical Frame Slits Matrix (Spans 7 Columns) */}
          <div className="lg:col-span-7 grid grid-cols-4 divide-x divide-zinc-900 border-t lg:border-t-0 lg:border-l border-zinc-900 overflow-hidden relative min-h-[500px]">
            
            {/* Slit Strip Pane 1 */}
            <div className="h-full w-full bg-[#141414] opacity-80 hover:opacity-100 transition-opacity relative group cursor-pointer" />
            
            {/* Slit Strip Pane 2 */}
            <div className="h-full w-full bg-[#181818] opacity-90 hover:opacity-100 transition-opacity relative group cursor-pointer" />
            
            {/* Slit Strip Pane 3: Highlighted Text Overlay Panel */}
            <div className="h-full w-full bg-zinc-900/60 flex flex-col justify-between p-4 py-8 group cursor-pointer border-x border-zinc-800 relative z-10">
              <div className="font-editorial-heading text-zinc-100 uppercase tracking-[0.25em] text-lg sm:text-xl font-normal [writing-mode:vertical-lr] rotate-180 mx-auto my-auto leading-none">
                CIRCLE SQUARE
              </div>
              <span className="text-[10px] text-zinc-500 tracking-widest text-center block font-mono">2021</span>
            </div>

            {/* Slit Strip Pane 4 */}
            <div className="h-full w-full bg-[#101010] opacity-80 hover:opacity-100 transition-opacity relative group cursor-pointer" />

          </div>

        </div>


        {/* =========================================================
            BOTTOM GLOBAL FOOTER EDGE
           ========================================================= */}
        <div className="w-full flex justify-center gap-2.5 py-6 bg-black text-center">
          <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
          <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
          <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
        </div>

        {/* =========================================================
            6. NEW SECTION: OUR BIG CLIENT'S (Matches image_e4e42f.png Top)
           ========================================================= */}
        <div className="w-full bg-[#0c0c0c] border-b border-zinc-900">
          {/* Header row split panel layout */}
          <div className="p-8 md:p-12 border-b border-zinc-900 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <h2 className="font-editorial-heading text-4xl font-normal tracking-widest text-zinc-100 uppercase leading-none">
              OUR BIG CLIENT'S
            </h2>
            <p className="text-zinc-500 text-[10px] tracking-widest uppercase max-w-xl leading-relaxed">
              THERE IS A BALANCE THAT MUST BE ACHIEVED IN CREATING SPACES THAT LOOK GOOD BUT ALSO FEEL GOOD TO BE IN AND BOTH ARE EQUALLY AS IMPORTANT.
            </p>
          </div>

          {/* 4x2 Clean Hairline Grid for Logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-zinc-900 bg-[#090909]/30 text-center border-b border-zinc-900">
            {/* Row 1 */}
            <div className="p-8 h-36 flex items-center justify-center text-xs tracking-widest text-zinc-600 uppercase font-mono hover:bg-[#111]/40 transition-colors select-none">
              [ AC MARRIOTT ]
            </div>
            <div className="p-8 h-36 flex items-center justify-center text-xs tracking-widest text-zinc-600 uppercase font-mono hover:bg-[#111]/40 transition-colors select-none">
              [ WALDORF ASTORIA ]
            </div>
            <div className="p-8 h-36 flex items-center justify-center text-xs tracking-widest text-zinc-600 uppercase font-mono hover:bg-[#111]/40 transition-colors select-none">
              [ MANDARIN ORIENTAL ]
            </div>
            <div className="p-8 h-36 flex items-center justify-center text-xs tracking-widest text-zinc-600 uppercase font-mono hover:bg-[#111]/40 transition-colors select-none">
              [ HYATT PLACE ]
            </div>
            {/* Row 2 */}
            <div className="p-8 h-36 flex items-center justify-center text-xs tracking-widest text-zinc-600 uppercase font-mono hover:bg-[#111]/40 transition-colors select-none border-t border-zinc-900">
              [ HARRAH'S ENT. ]
            </div>
            <div className="p-8 h-36 flex items-center justify-center text-xs tracking-widest text-zinc-600 uppercase font-mono hover:bg-[#111]/40 transition-colors select-none border-t border-zinc-900">
              [ WESTIN HOTELS ]
            </div>
            <div className="p-8 h-36 flex items-center justify-center text-xs tracking-widest text-zinc-600 uppercase font-mono hover:bg-[#111]/40 transition-colors select-none border-t border-zinc-900">
              [ HARRAH'S ]
            </div>
            <div className="p-8 h-36 flex items-center justify-center text-xs tracking-widest text-zinc-600 uppercase font-mono hover:bg-[#111]/40 transition-colors select-none border-t border-zinc-900">
              [ HILTON ]
            </div>
          </div>
        </div>


        {/* =========================================================
            7. NEW SECTION: GIANT OVAL CAPSULE CTA (Matches image_e4e42f.png Bottom)
           ========================================================= */}
        <div className="w-full bg-black p-8 md:p-14 lg:p-16 text-center border-b border-zinc-900 flex flex-col items-center">
          
          {/* Symmetrical Accent Diamonds Above the Pill Button */}
          <div className="flex gap-2.5 pb-8">
            <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
            <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
            <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
          </div>

          {/* Large Pill CTA Component */}
          <button className="w-full max-w-4xl bg-[#c5a880] text-black text-center py-6 md:py-8 lg:py-9 rounded-full font-editorial-heading font-normal text-2xl md:text-4xl lg:text-5xl tracking-widest hover:bg-amber-400 transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl shadow-amber-500/5">
            START YOUR PROJECT NOW
          </button>
        </div>


        {/* =========================================================
            BOTTOM GLOBAL FOOTER EDGE
           ========================================================= */}
        <div className="w-full flex justify-center gap-2.5 py-6 bg-black text-center">
          <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
          <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
          <span className="text-[#c5a880] text-[8px] transform rotate-45 select-none">✦</span>
        </div>

        {/* =========================================================
            8. FINAL FOOTER SECTION: KEEP IN TOUCH (Matches image_e55057.png Perfectly)
           ========================================================= */}
        <footer className="grid grid-cols-1 md:grid-cols-12 w-full bg-[#0c0c0c]">
          
          {/* FOOTER LEFT CELL: Brand Profile & Address (Spans 6 of 12 Columns) */}
          <div className="md:col-span-6 p-8 md:p-12 lg:p-16 flex flex-col justify-between space-y-16 relative">
            <div className="space-y-12">
              <h3 className="font-editorial-heading text-4xl lg:text-5xl font-normal tracking-widest text-zinc-200 uppercase leading-none">
                KEEP IN TOUCH
              </h3>
              
              {/* Secondary Identity Tag */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#c5a880] rounded-tr-full"></div>
                  <span className="font-editorial-heading tracking-[0.1em] text-sm text-zinc-100 font-bold">
                    DENTRO
                  </span>
                </div>
                {/* Clean un-spaced typography coordinates tracking the reference blueprint */}
                <p className="text-zinc-500 text-[10px] tracking-widest uppercase leading-[1.8] max-w-sm font-sans font-medium">
                  PULAU PARI, KEC. KEPULAUAN SERIBU SEL.,<br />
                  KAB. ADMINISTRASI KEPULAUAN SERIBU,<br />
                  DAERAH KHUSUS IBUKOTA JAKARTA 14520
                </p>
              </div>
            </div>

            {/* Bottom Secondary Actions Grid Strip */}
            <div className="pt-8 border-t border-zinc-900/60 w-full flex gap-12 text-[10px] tracking-[0.25em] text-zinc-500 font-bold uppercase">
              <span className="cursor-pointer hover:text-white transition-colors">FAQ</span>
              <span className="cursor-pointer hover:text-white transition-colors">TERMS & AGREEMENTS</span>
            </div>
          </div>

          {/* FOOTER RIGHT CELL: Digital Link Matrix (Spans 6 of 12 Columns) */}
          <div className="md:col-span-6 border-t md:border-t-0 md:border-l border-zinc-900 flex flex-col justify-between text-[10px] tracking-[0.25em] font-medium uppercase text-zinc-500 bg-[#0a0a0a]/20">
            <div className="divide-y divide-zinc-900 w-full">
              
              {/* Row Item */}
              <div className="p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#111]/20 transition-colors">
                <span>EMAIL</span>
                <a href="mailto:HI@DENTRO.COM" className="text-zinc-300 font-mono tracking-normal text-xs font-normal lowercase group-hover:text-[#c5a880] transition-colors">
                  HI@DENTRO.COM
                </a>
              </div>

              {/* Row Item */}
              <div className="p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#111]/20 transition-colors">
                <span>INSTAGRAM</span>
                <span className="text-zinc-300 group-hover:text-[#c5a880] transition-colors">@DENTRO</span>
              </div>

              {/* Row Item */}
              <div className="p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#111]/20 transition-colors">
                <span>TWITTER</span>
                <span className="text-zinc-300 group-hover:text-[#c5a880] transition-colors">@DENTRO</span>
              </div>

              {/* Row Item */}
              <div className="p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#111]/20 transition-colors">
                <span>MEDIUM</span>
                <span className="text-zinc-300 group-hover:text-[#c5a880] transition-colors">@DENTRO</span>
              </div>

              {/* Row Item */}
              <div className="p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#111]/20 transition-colors">
                <span>TELEGRAM</span>
                <span className="text-zinc-300 group-hover:text-[#c5a880] transition-colors">@DENTRO</span>
              </div>

            </div>
          </div>

        </footer>

        {/* =========================================================
            BOTTOM BRACKET EDGE
           ========================================================= */}
        <div className="w-full border-t border-zinc-900 bg-black h-4"></div>

      </div>
    </div>
  );
}