'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const servicesData: Record<string, {
  title: string;
  num: string;
  tagline: string;
  fullDesc: string;
  scope: string[];
  img: string;
  year: string;
  highlight: string;
}> = {
  'security-services': {
    num: '01',
    title: 'SECURITY SERVICES',
    tagline: 'YOUR SAFETY, OUR PRIORITY',
    img: 'images/security-service.png',
    year: '2018',
    highlight: '500+ Sites Secured',
    fullDesc: 'With over 5 years of field-tested experience, our security services are built on a foundation of reliability, discipline, and trust. Our trained personnel are deployed across residential societies, corporate campuses, industrial facilities, and private events — providing round-the-clock protection tailored to your specific environment. We conduct thorough risk assessments before every deployment, ensuring the right personnel, protocols, and technology are in place. From access control management to emergency response coordination, every aspect of your security is handled with precision and discretion.',
    scope: ['Residential Societies & Apartments', 'Commercial Offices & IT Parks', 'Industrial Sites & Warehouses', 'Retail Stores & Malls', 'Events & Private Functions'],
  },
  'building-painting-service': {
    num: '02',
    title: 'BUILDING PAINTING SERVICES',
    tagline: 'ADDING COLOR TO YOUR WORLD',
    img: 'images/building-painting-service.png',
    year: '2019',
    highlight: '200+ Projects Delivered',
    fullDesc: 'We provide expert painting solutions that go beyond surface-level finishes. With 5 years of industry experience, our team delivers durable, aesthetically refined results for interiors and exteriors alike. We work with premium-grade paints and coatings — ensuring weather resistance, longevity, and visual impact. Every project begins with surface preparation, material consultation, and a detailed execution plan, so timelines are met without compromising quality. From residential apartments to large commercial complexes, we treat every wall as a canvas.',
    scope: ['Residential Buildings', 'Corporate Offices', 'Hospitals & Clinics', 'Schools & Colleges', 'Hotels & Restaurants'],
  },
  'housekeeping-services': {
    num: '03',
    title: 'HOUSEKEEPING SERVICES',
    tagline: 'CLEAN SPACES, HAPPY LIVES',
    img: 'images/house-cleaning-service.webp',
    year: '2018',
    highlight: '10,000+ Hours Logged',
    fullDesc: 'Our housekeeping solutions are engineered to uphold the highest standards of cleanliness and hygiene across every type of space. Backed by 5 years of experience, we deploy trained staff equipped with modern cleaning technology and eco-conscious products. Whether it\'s daily maintenance, post-construction cleanup, or deep sanitisation, our teams operate with minimal disruption and maximum efficiency. We follow documented checklists and quality audits for every engagement, giving you consistent results you can rely on — day after day.',
    scope: ['Residential Buildings', 'Corporate Offices', 'Hospitals & Clinics', 'Schools & Colleges', 'Hotels & Restaurants'],
  },
  'interior-designing': {
    num: '04',
    title: 'INTERIOR DESIGNING SERVICES',
    tagline: 'DESIGNING SPACES THAT INSPIRE',
    img: 'images/interior-design-service.webp',
    year: '2019',
    highlight: '80+ Spaces Transformed',
    fullDesc: 'Our interior designing practice is rooted in the belief that spaces shape experiences. With 5 years of expertise, we blend creative vision with functional planning to transform homes, offices, retail environments, and hospitality venues into spaces that feel intentional and alive. From concept development and mood boarding to material selection, furniture procurement, and final installation — we manage every detail. Our designs are crafted to reflect your personality, serve your lifestyle, and stand the test of time.',
    scope: ['Residential Houses', 'Office Spaces', 'Retail & Showrooms', 'Hotels & Hospitality', 'Clinics & Healthcare'],
  },
  'old-age-housing': {
    num: '05',
    title: 'OLD AGE HOUSING SERVICES',
    tagline: 'CARE, COMFORT & DIGNITY.',
    img: 'images/oldage-housing-service.webp',
    year: '2020',
    highlight: 'Trusted by 100+ Families',
    fullDesc: 'We provide a safe, peaceful, and nurturing environment for senior citizens — where comfort, respect, and emotional well-being are at the heart of everything we do. With 5+ years of dedicated service, our old age housing facilities are thoughtfully designed with accessibility, safety, and companionship in mind. Our staff are trained in elder care, providing personalized attention, balanced nutrition, recreational engagement, and 24/7 health monitoring. We believe every senior deserves to live with dignity, purpose, and joy — and we build our facilities around that belief.',
    scope: ['Personalized Elder Care', 'Safety-Adapted Spaces', 'Recreational & Social Programs', 'Health Monitoring', '24/7 Staff Assistance'],
  },
  'paying-guest-accommodation': {
    num: '06',
    title: 'PAYING GUEST ACCOMMODATION',
    tagline: 'COMFORT LIVING, SIMPLIFIED',
    img: 'images/pg-acc-service.jfif',
    year: '2018',
    highlight: '300+ Residents Housed',
    fullDesc: 'We offer thoughtfully managed paying guest accommodations that feel like home — complete with modern amenities, consistent housekeeping, nutritious meals, and a secure environment. With 5 years of experience managing multi-occupant residential spaces, we understand what it means to live away from home. Our PG facilities are designed to serve working professionals, students, and corporate employees who need a comfortable, hassle-free base. From reliable Wi-Fi and furnished rooms to flexible monthly plans — everything is handled so you can focus on what matters.',
    scope: ['Working Professionals', 'Students', 'Corporate Employees', 'Temporary Relocation Stays', 'Short-Term Accommodation'],
  },
};

export default function ServiceContent() {
  const params = useParams();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const serviceId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const currentService = servicesData[serviceId || ''];

  // Adjacent services for prev/next nav
  const allIds = Object.keys(servicesData);
  const currentIndex = allIds.indexOf(serviceId || '');
  const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : null;
  const nextId = currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : null;

  if (!currentService) {
    return (
      <div className="min-h-screen bg-[#FBF5DD] flex flex-col justify-center items-center font-editorial-sub text-[#16251b]">
        <h1 className="text-2xl tracking-widest uppercase mb-4">Service Not Found</h1>
        <button onClick={() => router.push('/demo')} className="text-xs uppercase tracking-[0.2em] underline opacity-75">
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF5DD] text-[#16251b] font-editorial-sub antialiased min-h-screen relative overflow-x-hidden">

      {/* ── MENU OVERLAY ── */}
      <div className={`fixed inset-0 z-50 bg-[#FBF5DD] transition-all duration-500 ease-in-out flex flex-col justify-between border-x border-[#2b5c32]/10 max-w-[1440px] mx-auto ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <nav className="w-full border-b border-[#2b5c32]/10 px-12 py-7 flex justify-between items-center text-[10px] tracking-[0.3em] text-[#2b5c32]/70 uppercase font-medium">
          <button onClick={() => setIsMenuOpen(false)} className="hover:text-black transition-colors">CLOSE</button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setIsMenuOpen(false); router.push('/demo'); }}>
            <div className="w-2.5 h-2.5 bg-[#2b5c32] rounded-tr-full" />
            <span className="font-editorial-heading tracking-[0.1em] text-sm text-[#16251b] font-bold">SparkingStarz</span>
          </div>
          <div className="opacity-0 pointer-events-none">CONTACT</div>
        </nav>
        <div className="flex flex-col items-center justify-center gap-8 flex-grow">
          {allIds.map((id) => (
            <span
              key={id}
              onClick={() => { setIsMenuOpen(false); router.push(`/services/${id}`); }}
              className={`cursor-pointer font-editorial-heading text-2xl uppercase tracking-widest transition-colors ${id === serviceId ? 'text-[#2b5c32]' : 'text-zinc-400 hover:text-[#2b5c32]'}`}
            >
              {servicesData[id].num}. {servicesData[id].title}
            </span>
          ))}
        </div>
        <div className="w-full flex justify-center gap-2.5 py-8 bg-[#ede6cb] border-t border-[#2b5c32]/10">
          <span className="text-[#2b5c32] text-[8px] rotate-45 select-none">✦</span>
          <span className="text-[#2b5c32] text-[8px] rotate-45 select-none">✦</span>
        </div>
      </div>

      {/* ── MAIN CONTAINER ── */}
      <div className="w-full  mx-auto border-x border-[#2b5c32]/10 flex flex-col">

        {/* ── STICKY NAV ── */}
        <nav className="absolute text-[#ede6cb] top-0 left-0 right-0 z-40 w-full border-b border-[#ede6cb]/10 px-8 md:px-12 py-5 flex justify-between items-center bg-transparent">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-[9px] font-mono tracking-[0.3em] uppercase text-[#2b5c32]/60 hover:text-[#2b5c32] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#2b5c32] rounded-tr-full" />
            <span className="font-editorial-heading tracking-[0.12em] text-sm text-[#16251b] font-bold">SparkingStarz</span>
          </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#2b5c32]/60 hover:text-[#2b5c32] transition-colors"
          >
            ALL SERVICES
          </button>
        </nav>

        {/* ── HERO ── */}
        <section className="relative w-full min-h-[85vh] overflow-hidden flex flex-col justify-end">

          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/${currentService.img}')`,
              filter: 'brightness(0.45)',
            }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a10]/95 via-[#0d1a10]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1a10]/50 via-transparent to-transparent" />

          {/* Grain */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '160px',
            }}
          />

          {/* Top metadata */}
          <div className="absolute top-8 left-8 md:left-12 right-8 md:right-12 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-[#ede6cb]/40">
                Service {currentService.num} / 06
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="block w-1.5 h-1.5 rounded-full bg-[#ede6cb]/50"
                style={{ animation: 'liveDot 2s ease-in-out infinite' }}
              />
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#ede6cb]/40">Est. {currentService.year}</span>
            </div>
          </div>

         

          {/* Hero text */}
          <div className="relative z-10 px-8 md:px-12 lg:px-16 pb-12 md:pb-16 space-y-4">
            <p className="text-[9px] font-mono tracking-[0.4em] uppercase text-[#ede6cb]/40">
              [ SERVICE MODULE PROFILE ]
            </p>
            <h1 className="font-editorial-heading text-[clamp(2.5rem,6vw,6rem)] font-normal text-[#ede6cb] uppercase leading-[0.95] tracking-wider max-w-4xl">
              {currentService.title}
            </h1>
            <p className="font-serif italic text-lg md:text-xl text-[#ede6cb]/60 pt-2">
              — {currentService.tagline}
            </p>

            {/* Highlight pill */}
            <div className="flex items-center gap-3 pt-4">
              <div className="border border-[#ede6cb]/20 rounded-full px-5 py-2 flex items-center gap-2.5">
                <span
                  className="block w-1.5 h-1.5 rounded-full bg-[#4ade80]"
                  style={{ animation: 'liveDot 1.8s ease-in-out infinite' }}
                />
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#ede6cb]/60">{currentService.highlight}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── DESCRIPTION + SCOPE ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-[#2b5c32]/10">

          {/* Left: full description */}
          <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 space-y-8 border-b lg:border-b-0 lg:border-r border-[#2b5c32]/10">
            <div className="flex items-center gap-3">
              <div className="w-5 h-px bg-[#2b5c32]/40" />
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#2b5c32]/50">Overview</span>
            </div>
            <p className="text-sm md:text-base text-[#16251b]/80 tracking-wide leading-[2] max-w-2xl">
              {currentService.fullDesc}
            </p>

            {/* Quote pull */}
            <div className="border-l-2 border-[#2b5c32]/30 pl-6 py-2 mt-4">
              <p className="font-serif italic text-base md:text-lg text-[#2b5c32]/70 leading-relaxed">
                "{currentService.tagline.charAt(0) + currentService.tagline.slice(1).toLowerCase()}"
              </p>
            </div>
          </div>

          {/* Right: scope list */}
          <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 space-y-8 bg-[#ede6cb]/30">
            <div className="flex items-center gap-3">
              <div className="w-5 h-px bg-[#2b5c32]/40" />
              <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#2b5c32]/50">Service Capabilities</span>
            </div>
            <ul className="space-y-0 divide-y divide-[#2b5c32]/10">
              {currentService.scope.map((item, i) => (
                <li key={i} className="flex items-center justify-between py-4 group">
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-mono text-[#2b5c32]/30 tracking-widest">0{i + 1}</span>
                    <span className="text-[11px] tracking-[0.18em] uppercase font-medium text-[#16251b]/75 group-hover:text-[#2b5c32] transition-colors">
                      {item}
                    </span>
                  </div>
                  <span className="text-[#2b5c32]/20 text-[8px] rotate-45 group-hover:text-[#2b5c32]/60 transition-colors">✦</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── PREV / NEXT NAVIGATION ── */}
        <section className="grid grid-cols-2 divide-x divide-[#2b5c32]/10 border-b border-[#2b5c32]/10">
          {prevId ? (
            <button
              onClick={() => router.push(`/services/${prevId}`)}
              className="group p-8 md:p-10 flex flex-col gap-2 hover:bg-[#ede6cb]/40 transition-colors text-left"
            >
              <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-[#2b5c32]/40 flex items-center gap-2">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                Previous
              </span>
              <span className="font-editorial-heading text-lg md:text-2xl uppercase tracking-wider text-[#16251b]/70 group-hover:text-[#2b5c32] transition-colors leading-tight">
                {servicesData[prevId].title}
              </span>
            </button>
          ) : <div />}

          {nextId ? (
            <button
              onClick={() => router.push(`/services/${nextId}`)}
              className="group p-8 md:p-10 flex flex-col gap-2 items-end hover:bg-[#ede6cb]/40 transition-colors text-right"
            >
              <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-[#2b5c32]/40 flex items-center gap-2">
                Next
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </span>
              <span className="font-editorial-heading text-lg md:text-2xl uppercase tracking-wider text-[#16251b]/70 group-hover:text-[#2b5c32] transition-colors leading-tight">
                {servicesData[nextId].title}
              </span>
            </button>
          ) : <div />}
        </section>

        {/* ── FOOTER ── */}
        <footer className="grid grid-cols-1 md:grid-cols-12 bg-[#ede6cb]/40 border-t border-[#2b5c32]/10">
          <div className="md:col-span-6 p-8 md:p-12 lg:p-16 flex flex-col justify-between space-y-12">
            <div className="space-y-8">
              <h3 className="font-editorial-heading text-4xl lg:text-5xl font-normal tracking-widest text-[#16251b] uppercase leading-none">
                KEEP IN<br />TOUCH
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-[#2b5c32] rounded-tr-full" />
                  <span className="font-editorial-heading tracking-[0.1em] text-sm text-[#16251b] font-bold">SparkingStarz</span>
                </div>
                <p className="text-[#2b5c32] text-[10px] tracking-widest uppercase leading-[1.8] max-w-sm font-mono">
                  Mumbai, Maharashtra, India
                </p>
              </div>
            </div>
            <div className="pt-8 border-t border-[#2b5c32]/10 flex gap-10 text-[10px] tracking-[0.25em] text-[#2b5c32]/70 font-bold uppercase">
              <span className="cursor-pointer hover:text-black transition-colors">FAQ</span>
              <span className="cursor-pointer hover:text-black transition-colors">TERMS</span>
              <span className="cursor-pointer hover:text-black transition-colors">PRIVACY</span>
            </div>
          </div>

          <div className="md:col-span-6 border-t md:border-t-0 md:border-l border-[#2b5c32]/10 flex flex-col justify-between text-[10px] tracking-[0.25em] font-medium uppercase text-[#2b5c32]">
            <div className="divide-y divide-[#2b5c32]/10 w-full">
              {[
                { label: 'EMAIL', value: 'hello@sparkingstarz.com', href: 'mailto:hello@sparkingstarz.com' },
                { label: 'INSTAGRAM', value: '@sparkingstarz' },
                { label: 'WHATSAPP', value: '+91 98765 43210' },
              ].map(({ label, value, href }) => (
                <div key={label} className="p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#ede6cb]/30 transition-colors">
                  <span>{label}</span>
                  {href
                    ? <a href={href} className="text-[#16251b] font-mono tracking-normal text-xs font-normal lowercase group-hover:text-[#2b5c32] transition-colors">{value}</a>
                    : <span className="text-[#16251b] group-hover:text-[#2b5c32] transition-colors font-mono normal-case text-xs font-normal">{value}</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </footer>

        <div className="w-full border-t border-[#2b5c32]/10 bg-[#dfd7b9] h-4" />
      </div>

      <style>{`
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes liveDot { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
      `}</style>
    </div>
  );
}