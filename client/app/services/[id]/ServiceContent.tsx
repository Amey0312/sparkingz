'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Mock data configuration keys
const servicesData: Record<string, { title: string; num: string; tagline: string; fullDesc: string; scope: string[] }> = {
  'design-project': {
    num: '01',
    title: 'DESIGN PROJECT DEVELOPMENT',
    tagline: 'Balancing style, architectural precision, and function.',
    fullDesc: 'Our design project development stage covers the meticulous curation of spatial floorplans, volumetric blueprints, and thematic conceptualization. We manage spatial problems dynamically, engineering an internal layout that is tailored uniquely to luxury residential specifications.',
    scope: ['Concept Space Planning', '3D Volumetric Sketching', 'Material Continuity Moodboards', 'Architectural Drafting']
  },
  'interior-decoration': {
    num: '02',
    title: 'INTERIOR DECORATION',
    tagline: 'Sourcing bespoke design pieces and custom textiles.',
    fullDesc: 'We specialize in finishing spaces with curation choices that articulate character. This covers premium fixture sourcing, vintage or boutique furniture acquisition, custom window fabric dressing, and intentional art positioning.',
    scope: ['Furniture Selection & Curation', 'Textile Coordination', 'Art Advisory & Sourcing', 'Color Consultation']
  },
  'project-visualization': {
    num: '03',
    title: 'PROJECT VISUALIZATION',
    tagline: 'Hyper-realistic digital representations of your custom layouts.',
    fullDesc: 'Experience your spaces before construction breaking. Utilizing top-tier digital rendering pipelines, we simulate realistic light paths, textile reflections, and spatial flows so choices are locked in with absolute certainty.',
    scope: ['Photorealistic 3D Renderings', 'Lighting Simulations', 'VR Spatial Walkthroughs', 'Animation Reels']
  },
  'selection-purchase': {
    num: '04',
    title: 'SELECTION AND PURCHASE OF MATERIALS',
    tagline: 'Full procurement management from global premium channels.',
    fullDesc: 'Navigating manufacturing pipelines safely. We handle logistics, factory vetting, global acquisition, trade-discount negotiation, and raw batch auditing for natural stones, luxury hardwoods, and pristine metal finishes.',
    scope: ['Global Vendor Sourcing', 'Order Management & Tracking', 'Quality Control Audits', 'Logistics Planning']
  },
  'project-management': {
    num: '05',
    title: 'PROJECT MANAGEMENT',
    tagline: 'Rigorous supervision from project groundbreaking to keys hand-off.',
    fullDesc: 'Bridging design intention with field execution. We manage site timelines, direct subcontract trades, run safety benchmark checkpoints, and maintain architectural precision until final hand-off verification.',
    scope: ['Timeline Execution Supervision', 'Subcontract Trade Alignment', 'Budget Control Monitoring', 'Final Compliance Audits']
  },
  'repair-reconstruction': {
    num: '06',
    title: 'REPAIR AND RECONSTRUCTION',
    tagline: 'Complete custom spatial restoration and engineering work.',
    fullDesc: 'Preserving integrity while updating modern performance profiles. Our engineering execution covers sub-surface corrections, structural column alterations, structural masonry re-alignment, and integration of smart climate mechanics.',
    scope: ['Structural Engineering Re-alignment', 'Heritage Restoration Work', 'HVAC Smart Integrations', 'Masonry Correction']
  }
};

export default function ServiceContent() {
  const params = useParams();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const serviceId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const currentService = servicesData[serviceId || ''];

  if (!currentService) {
    return (
      <div className="min-h-screen bg-[#FBF5DD] flex flex-col justify-center items-center font-editorial-sub text-[#16251b]">
        <h1 className="text-2xl tracking-widest uppercase mb-4">Service Profile Not Found</h1>
        <button onClick={() => router.push('/demo')} className="text-xs uppercase tracking-[0.2em] underline opacity-75">
          Return to Presentation
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#FBF5DD] via-[#ede6cb] to-[#dfd7b9] text-[#16251b] font-editorial-sub antialiased min-h-screen relative overflow-x-hidden">
      
      {/* MENU OVERLAY FRAME */}
      <div className={`fixed inset-0 z-50 bg-[#FBF5DD] transition-all duration-500 ease-in-out flex flex-col justify-between border-x border-[#2b5c32]/10 max-w-[1440px] mx-auto ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <nav className="w-full border-b border-[#2b5c32]/10 px-12 py-7 flex justify-between items-center text-[10px] tracking-[0.3em] text-[#2b5c32]/70 uppercase font-medium">
          <div className="cursor-pointer hover:text-black transition-colors text-[#2b5c32]" onClick={() => setIsMenuOpen(false)}>CLOSE</div>
          <div className="flex items-center gap-2" onClick={() => { setIsMenuOpen(false); router.push('/demo'); }}>
            <div className="w-2.5 h-2.5 bg-[#2b5c32] rounded-tr-full"></div>
            <span className="font-editorial-heading tracking-[0.1em] text-sm text-[#16251b] font-bold cursor-pointer">SparkingStarz</span>
          </div>
          <div className="opacity-0 pointer-events-none">CONTACT</div>
        </nav>
        <div className="flex flex-col items-center justify-center space-y-8 flex-grow">
          <span onClick={() => { setIsMenuOpen(false); router.push('/demo'); }} className="cursor-pointer font-editorial-heading text-4xl text-zinc-500 hover:text-[#2b5c32] transition-colors uppercase tracking-widest">Presentation Demo</span>
        </div>
        <div className="w-full flex justify-center gap-2.5 py-8 bg-[#ede6cb] text-center border-t border-[#2b5c32]/10">
          <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
          <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
        </div>
      </div>

      {/* MASTER LAYER CONTAINER */}
      <div className="w-full max-w-[1440px] mx-auto border-x border-[#2b5c32]/10 flex flex-col">
        
        {/* NAVIGATION HEADER */}
        <nav className="w-full border-b border-[#2b5c32]/10 px-12 py-7 flex justify-between items-center text-[10px] tracking-[0.3em] text-[#2b5c32]/80 uppercase font-medium relative z-30 bg-[#FBF5DD]">
          <div className="cursor-pointer hover:text-black transition-colors" onClick={() => setIsMenuOpen(true)}>MENU</div>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/demo')}>
            <div className="w-2.5 h-2.5 bg-[#2b5c32] rounded-tr-full"></div>
            <span className="font-editorial-heading tracking-[0.1em] text-sm text-[#16251b] font-bold">SparkingStarz</span>
          </div>
          <div className="cursor-pointer hover:text-black transition-colors">CONTACT</div>
        </nav>

        {/* BODY CONTENT SECTION */}
        <main className="w-full p-8 md:p-12 lg:p-16 flex flex-col space-y-12 bg-[#FBF5DD]/30 min-h-[70vh]">
          <div className="flex items-center justify-between border-b border-[#2b5c32]/10 pb-6 text-[10px] tracking-[0.2em] uppercase text-[#2b5c32]/70">
            <span className="cursor-pointer hover:text-black underline" onClick={() => router.push('/demo')}>← Back to Demo</span>
            <span>Service Matrix Profile</span>
            <span>{currentService.num} / 06</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            <div className="lg:col-span-8 space-y-4">
              <span className="font-sans text-xs tracking-widest uppercase font-mono text-[#2b5c32]/60 block">
                [ SERVICE MODULE PROFILE ]
              </span>
              <h1 className="font-editorial-heading text-4xl md:text-6xl font-bold tracking-wide text-[#16251b] uppercase leading-tight">
                {currentService.title}
              </h1>
              <p className="font-serif italic text-lg md:text-xl text-[#2b5c32] max-w-2xl">
                {currentService.tagline}
              </p>
            </div>
            
            <div className="lg:col-span-4 flex justify-start lg:justify-end items-start">
              <div className="w-full max-w-[260px] aspect-[3/4] bg-[#dfd7b9] border border-[#2b5c32]/10 rounded-t-[100px] rounded-b-[40px] relative overflow-hidden shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2b5c32]/5 to-transparent opacity-60" />
                <div className="absolute inset-0 bg-[#ede6cb]/20" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-[#2b5c32]/10 pt-10">
            <div className="md:col-span-7">
              <h4 className="font-sans text-[10px] tracking-[0.25em] font-bold text-[#2b5c32]/60 uppercase mb-4">[ DESCRIPTION ]</h4>
              <p className="font-sans text-sm md:text-base text-[#16251b]/90 tracking-wide leading-relaxed max-w-xl">
                {currentService.fullDesc}
              </p>
            </div>
            
            <div className="md:col-span-5 space-y-4">
              <h4 className="font-sans text-[10px] tracking-[0.25em] font-bold text-[#2b5c32]/60 uppercase border-b border-[#2b5c32]/10 pb-2">[ SERVICE CAPABILITIES ]</h4>
              <ul className="space-y-2.5 font-sans text-xs tracking-wider uppercase font-medium text-[#16251b]/80">
                {currentService.scope.map((item, key) => (
                  <li key={key} className="flex items-center gap-3">
                    <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>

        {/* FOOTER SECTION */}
        <div className="w-full flex justify-center gap-2.5 py-6 bg-[#ede6cb] text-center border-t border-[#2b5c32]/10 relative z-30">
          <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
          <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
        </div>

        <footer className="grid grid-cols-1 md:grid-cols-12 w-full bg-[#ede6cb]/40 relative z-30 border-t border-[#2b5c32]/10">
          <div className="md:col-span-6 p-8 md:p-12 lg:p-16 flex flex-col justify-between space-y-16 relative">
            <div className="space-y-12">
              <h3 className="font-editorial-heading text-4xl lg:text-5xl font-normal tracking-widest text-[#16251b] uppercase leading-none">KEEP IN TOUCH</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#2b5c32] rounded-tr-full"></div>
                  <span className="font-editorial-heading tracking-[0.1em] text-sm text-[#16251b] font-bold">DENTRO</span>
                </div>
                <p className="text-[#2b5c32] text-[10px] tracking-widest uppercase leading-[1.8] max-w-sm font-sans font-medium">
                  PULAU PARI, KEC. KEPULAUAN SERIBU SEL.,<br />KAB. ADMINISTRASI KEPULAUAN SERIBU,<br />DAERAH KHUSUS IBUKOTA JAKARTA 14520
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
                <a href="mailto:HI@DENTRO.COM" className="text-[#16251b] font-mono tracking-normal text-xs font-normal lowercase group-hover:text-[#2b5c32] transition-colors">HI@DENTRO.COM</a>
              </div>
              <div className="p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#ede6cb]/30 transition-colors">
                <span>INSTAGRAM</span>
                <span className="text-[#16251b] group-hover:text-[#2b5c32] transition-colors">@DENTRO</span>
              </div>
              <div className="p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#ede6cb]/30 transition-colors">
                <span>TWITTER</span>
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