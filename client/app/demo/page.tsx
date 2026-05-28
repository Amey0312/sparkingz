'use client';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

export default function PerfectDentroFullPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  // Section refs for navigation
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);


  // ─── Add this state near your other useState hooks ───
  const [formOpen, setFormOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', phone: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setFormOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = formOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [formOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const emailjs = (await import('@emailjs/browser')).default;
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formState.name,
          from_email: formState.email,
          phone: formState.phone,
          reply_to: formState.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      setTimeout(() => {
        setFormOpen(false);
        setSent(false);
        setFormState({ name: '', email: '', phone: '' });
      }, 2800);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  // Core DOM element tracking references for GSAP Pinning
  const scrollPinSectionRef = useRef<HTMLDivElement>(null);
  const horizontalPanelsWrapperRef = useRef<HTMLDivElement>(null);
  const heroSliderRef = useRef<HTMLDivElement>(null);

  // Animation context ref
  const ctxRef = useRef<gsap.Context | null>(null);

  // Smooth scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: ref.current, offsetY: 0 },
        ease: 'power3.inOut',
      });
    }
  };

  // Handle menu navigation
  const handleNavClick = (section: string) => {
    setIsMenuOpen(false);
    switch (section) {
      case 'home':
        scrollToSection(heroRef);
        break;
      case 'about':
        scrollToSection(aboutRef);
        break;
      case 'services':
        scrollToSection(servicesRef);
        break;
      case 'projects':
        scrollToSection(projectsRef);
        break;
      case 'contact':
        scrollToSection(contactRef);
        break;
    }
  };

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Track active section while scrolling
  useLayoutEffect(() => {
    const sections = [
      { ref: heroRef, name: 'home' },
      { ref: aboutRef, name: 'about' },
      { ref: servicesRef, name: 'services' },
      { ref: projectsRef, name: 'projects' },
      { ref: contactRef, name: 'contact' },
    ];

    const observers = sections.map(({ ref, name }) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(name);
            }
          });
        },
        { threshold: 0.3 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Main GSAP animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      if (heroRef.current) {
        gsap.from('.hero-title', {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
        });

        gsap.from('.hero-subtext', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.5,
        });

        gsap.from('.hero-buttons', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.7,
          stagger: 0.1,
        });
      }

      // Hero Slider Animation - FIXED
      if (heroSliderRef.current) {
        const slider = heroSliderRef.current;
        const sliderWrapper = slider.querySelector('.slider-wrapper');
        if (sliderWrapper) {
          const totalWidth = sliderWrapper.scrollWidth;
          const duration = totalWidth / 100; // Adjust speed: higher = slower

          gsap.to(sliderWrapper, {
            x: -totalWidth / 2,
            duration: duration,
            ease: "none",
            repeat: -1,
            modifiers: {
              x: gsap.utils.unitize(x => parseFloat(x) % (totalWidth / 2))
            }
          });
        }
      }

      // About section animations
      if (aboutRef.current) {
        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        });

        aboutTl
          .from('.about-left', {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          })
          .from(
            '.about-left > *',
            {
              y: 30,
              opacity: 0,
              stagger: 0.15,
              duration: 0.7,
              ease: 'power3.out',
            },
            '-=0.5'
          )
          .from(
            '.about-right',
            {
              x: 50,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out',
            },
            '-=0.8'
          )
          .from(
            '.about-text',
            {
              y: 20,
              opacity: 0,
              stagger: 0.1,
              duration: 0.6,
              ease: 'power3.out',
            },
            '-=0.6'
          )
          .from(
            '.about-image',
            {
              scale: 0.95,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out',
            },
            '-=0.5'
          );
      }

      // Services section animations
      if (servicesRef.current) {
        const servicesTitle = servicesRef.current.querySelector('.services-title');
        if (servicesTitle) {
          gsap.from(servicesTitle, {
            scrollTrigger: {
              trigger: servicesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          });
        }

        const serviceItems = servicesRef.current.querySelectorAll('.service-item');
        if (serviceItems.length > 0) {
          gsap.set(serviceItems, { opacity: 1, y: 0 });

          gsap.from(serviceItems, {
            scrollTrigger: {
              trigger: servicesRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
              once: false,
            },
            y: 40,
            opacity: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: 'power3.out',
          });
        }
      }

      // Horizontal scroll section
      const setupScrollTrigger = () => {
        if (scrollPinSectionRef.current && horizontalPanelsWrapperRef.current) {
          const panels = horizontalPanelsWrapperRef.current;
          const scrollDistance = panels.scrollWidth - window.innerWidth;

          const horizontalScroll = gsap.to(panels, {
            x: -scrollDistance,
            ease: 'none',
          });

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

          gsap.utils.toArray('.horizontal-panel').forEach((panel: any, index) => {
            gsap.from(panel.querySelector('.panel-content'), {
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalScroll,
                start: 'left 80%',
                end: 'left 20%',
                toggleActions: 'play none none reverse',
              },
              y: 50,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out',
            });

            gsap.from(panel.querySelectorAll('.panel-item'), {
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalScroll,
                start: 'left 70%',
                end: 'left 20%',
                toggleActions: 'play none none reverse',
              },
              y: 30,
              opacity: 0,
              stagger: 0.1,
              duration: 0.7,
              ease: 'power3.out',
            });
          });
        }
      };

      requestAnimationFrame(() => {
        setupScrollTrigger();
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      });

      // Clients section animation
      gsap.from('.client-header', {
        scrollTrigger: {
          trigger: '.client-header',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.client-item', {
        scrollTrigger: {
          trigger: '.client-item',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.95,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
      });

      // CTA section animation
      gsap.from('.cta-section', {
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Footer animations
      gsap.from('.footer-content', {
        scrollTrigger: {
          trigger: '.footer-content',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.footer-link', {
        scrollTrigger: {
          trigger: '.footer-link',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        x: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
      });
    });

    ctxRef.current = ctx;

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      ctx.revert();
    };
  }, []);

  const servicesList = [
    {
      id: 'building-painting-service',
      num: '02',
      title: 'BUILDING PAINTING',
      img: 'images/building-painting-service.png',
      desc: 'Sourcing and styling bespoke design pieces, tailored artworks, and fine textile curation to elevate your personal spaces.',
      tags: ['Exterior Painting', 'Interior Painting', 'Waterproofing', 'Texture Finish'],
    },
    {
      id: 'interior-designing',
      num: '04',
      title: 'INTERIOR DESIGNING',
      img: 'images/interior-design-service.webp',
      desc: 'Full procurement management from global premium suppliers, balancing budget realities with exceptional structural quality.',
      tags: ['Space Planning', 'Furniture Curation', 'Lighting Design', 'Material Sourcing'],
    },
    {
      id: 'housekeeping-services',
      num: '03',
      title: 'HOUSEKEEPING SERVICES',
      img: 'images/house-cleaning-service.webp',
      desc: 'Comprehensive cleaning and maintenance solutions to keep your space pristine and welcoming.',
      tags: ['Deep Cleaning', 'Daily Upkeep', 'Laundry', 'Sanitisation'],
    },
    {
      id: 'old-age-housing',
      num: '05',
      title: 'OLD AGE HOUSING',
      img: 'images/oldage-housing-service.webp',
      desc: 'Rigorous architectural supervision from initial groundwork site-mapping to final client walkthrough handshakes.',
      tags: ['Assisted Living', 'Safety Modifications', 'Community Spaces', 'Care Support'],
    },
    {
      id: 'security-services',
      num: '01',
      title: 'SECURITY SERVICES',
      img: 'images/security-service.png',
      desc: 'We create a complete security concept, carefully balancing vigilance and discretion to reflect your safety needs in every detail.',
      tags: ['CCTV Setup', 'Guard Services', 'Access Control', 'Emergency Response'],
    },
    {
      id: 'paying-guest-accommodation',
      num: '06',
      title: 'PAYING GUEST ACCOMMODATION',
      img: 'images/pg-acc-service.jfif',
      desc: 'Complete structural renovations and heritage restoration works managed by premier certified craft engineers.',
      tags: ['Furnished Rooms', 'Meals Included', 'Wi-Fi & Utilities', 'Monthly Plans'],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#FBF5DD] via-[#ede6cb] to-[#dfd7b9] text-[#16251b] font-editorial-sub antialiased min-h-screen selection:bg-[#2b5c32] selection:text-white relative overflow-x-hidden">
      {/* ==================== MENU SYSTEM ==================== */}
      <div
        className={`fixed inset-0 z-50 bg-[#FBF5DD] flex flex-col justify-between border-x border-[#2b5c32]/10 transition-all duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        style={{ willChange: 'transform, opacity' }}
      >
        <nav className="w-full border-b border-[#ffffff]/80 px-12 py-7 flex justify-between items-center text-[10px] tracking-[0.3em] text-[#2b5c32]/70 uppercase font-medium">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="cursor-pointer hover:text-black transition-colors text-[#2b5c32]"
            aria-label="Close menu"
          >
            CLOSE
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-[#2b5c32] rounded-tr-full"></div>
            <span className="font-editorial-heading tracking-[0.1em] text-sm text-[#16251b] font-bold">
              SparkingStarz
            </span>
          </div>
          <div className="opacity-0 pointer-events-none">CONTACT</div>
        </nav>

        <div className="flex flex-col items-center justify-center space-y-8 flex-grow">
          <button
            onClick={() => handleNavClick('home')}
            className={`menu-item font-editorial-heading text-4xl md:text-6xl transition-all duration-300 uppercase tracking-widest ${activeSection === 'home' ? 'text-[#2b5c32]' : 'text-zinc-500 hover:text-[#2b5c32]'
              }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`menu-item font-editorial-heading text-4xl md:text-6xl transition-all duration-300 uppercase tracking-widest ${activeSection === 'about' ? 'text-[#2b5c32]' : 'text-zinc-500 hover:text-[#2b5c32]'
              }`}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className={`menu-item font-editorial-heading text-4xl md:text-6xl transition-all duration-300 uppercase tracking-widest ${activeSection === 'services' ? 'text-[#2b5c32]' : 'text-zinc-500 hover:text-[#2b5c32]'
              }`}
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick('projects')}
            className={`menu-item font-editorial-heading text-4xl md:text-6xl transition-all duration-300 uppercase tracking-widest ${activeSection === 'projects' ? 'text-[#2b5c32]' : 'text-zinc-500 hover:text-[#2b5c32]'
              }`}
          >
            Our Projects
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`menu-item font-editorial-heading text-4xl md:text-6xl transition-all duration-300 uppercase tracking-widest ${activeSection === 'contact' ? 'text-[#2b5c32]' : 'text-zinc-500 hover:text-[#2b5c32]'
              }`}
          >
            Contact
          </button>
        </div>

        <div className="w-full flex justify-center gap-2.5 py-8 bg-[#ede6cb] text-center border-t border-[#2b5c32]/10">
          <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
          <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
          <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
        </div>
      </div>

      {/* MASTER CONTAINER FRAME */}
      <div className="w-full mx-auto border-x border-[#2b5c32]/10 flex flex-col bg-gradient-to-b from-[#FBF5DD] via-[#ede6cb] to-[#dfd7b9]">
        {/* NAVIGATION HEADER */}

        <div className='w-full bg-cover bg-center bg-no-repeat ' style={{
          backgroundImage: "url('images/her-section.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          <nav className="w-full border-b border-[#ffffff]/10 px-12 py-7 flex justify-between items-center text-[10px] tracking-[0.3em] text-[#2b5c32]/80 uppercase font-medium relative z-30 text-[#ffffff]/80">
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="font-editorial-heading tracking-[0.1em] text-lg text-[#16251b] font-bold">
                Sparking Stars
              </span>
            </div>

            {/* MOBILE ONLY: Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden cursor-pointer hover:text-black transition-colors"
            >
              MENU
            </button>

            {/* LAPTOP ONLY: Navigation Links */}
            <div className="hidden md:flex gap-8">
              <div className="flex gap-6">
                <button onClick={() => handleNavClick('about')} className="hover:text-black hover:cursor-pointer">About us</button>
                <button onClick={() => handleNavClick('services')} className="hover:text-black hover:cursor-pointer">Services</button>
                <button onClick={() => handleNavClick('contact')} className="hover:text-black hover:cursor-pointer">Contacts</button>
                <button onClick={() => handleNavClick('projects')} className="hover:text-black hover:cursor-pointer">Project</button>
              </div>
            </div>

            {/* Visible on both (or wrap in hidden md:block if you want it desktop only) */}
            <button className="hidden md:block cursor-pointer hover:text-black transition-colors">
              (+91) 8369928617
            </button>
          </nav>

          <div ref={heroRef} className="w-full px-12 pt-16 pb-12 relative z-10">
            <h1 className="hero-title font-editorial-heading text-[8vw] font-medium leading-[0.9] tracking-tight text-[#ffffff] uppercase">
              FACILITY &<br />
              LIFESTYLE SERVICES
            </h1>

            <div className="flex flex-col md:flex-row justify-between items-end mt-8 gap-8 border-b border-[#ffffff]/60 pb-9">
              <p className="max-w-md text-[#ffffff]/80 text-sm leading-relaxed">
                we create bespoke interiors that perfectly suit your lifestyle and needs. like experienced tailors.
              </p>
              <div className="hero-buttons flex gap-4">
                <button className="border border-[#ffffff]/40 text-[#ffffff] px-8 py-3 rounded-full text-[10px] uppercase font-bold hover:bg-[#2b5c32] hover:text-white transition-all">
                  Get in touch
                </button>
                <button className="bg-[#a67c52] text-white px-8 py-3 rounded-full text-[10px] uppercase font-bold hover:bg-[#8b6540] transition-all">
                  Services
                </button>
              </div>
            </div>

            {/* Full-Width Slider Section */}
            <div className="w-full relative py-12 ">
              {/* The Blurry Background Layer */}
              <div className="absolute inset-0 bg-white/2 backdrop-blur-lg z-0 "></div>
              {/* Services Slider - FIXED ANIMATION */}
              <div ref={heroSliderRef} className="w-full  overflow-hidden mt-12 py-2">
                <div className="slider-wrapper flex gap-6 w-max">
                  {/* Duplicate items for seamless loop */}
                  {[...servicesList, ...servicesList].map((service, idx) => (
                    <div
                      key={idx}
                      className="w-[350px] h-[300px] bg-[#d1c9a9] rounded-2xl p-4 flex flex-col justify-start border border-[#2b5c32]/10 shrink-0"
                      style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${service.img}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}

                    >
                      <h3 className="text-[#ffffff] font-medium text-2xl mb-4">{service.title}</h3>
                      <div className="mb-4 border border-[#2b5c32]/20 bg-white rounded-full px-4 py-1 text-[10px] uppercase text-[#2b5c32] inline-block w-fit">
                        {service.title.split(' ')[0]}
                      </div>
                      <Link
                        href={`/services/${service.id}`}
                        className="text-[#ffffff]/80 text-sm flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        ↗ More Details
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer details */}
            <div className="mt-8 flex justify-between items-center text-sm uppercase tracking-widest text-[#ffffff]">
              <span>[ OUR OBJECTIVE ]</span>
              <div className="flex flex-col items-end gap-1">
                <span>[01/06] mark</span>
                <span>DELIVERING TRUST, QUALITY & RELIABILITY</span>
              </div>
            </div>
          </div>

        </div>


        <div className='w-full max-w-[1440px] mx-auto border-x border-[#2b5c32]/10 flex flex-col bg-[#ede6cb]'>
          {/* ABOUT BRAND INTRODUCTION SECTION */}
          <div
            ref={aboutRef}
            className="grid grid-cols-1 lg:grid-cols-12 w-full border-b border-[#2b5c32]/10 bg-[#FBF5DD] relative z-10 overflow-hidden"
          >
            <div className="about-left lg:col-span-4 p-8 md:p-12 lg:p-14 space-y-6 border-b lg:border-b-0 lg:border-r border-[#2b5c32]/10 z-10 bg-[#ede6cb]/10 backdrop-blur-sm">
              <h2 className="font-editorial-heading text-3xl md:text-4xl font-normal tracking-wide text-[#16251b] uppercase">
                Facility & LIfestyle Services COMPANY EST. 2020
              </h2>
              <p className="text-[#2b5c32]/80 text-xs tracking-[0.08em] uppercase leading-relaxed">
                Sparking Stars is all-in-one service company with 5+ years of experience, offering
                security, housekeeping, building painting, interior design, PG accommodation, and old
                age housing solutions. Backed by a team , we are committed to delivering reliable,
                high-quality services with a focus on customer satisfaction.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button className="bg-[#2b5c32] text-white text-[10px] font-bold tracking-[0.25em] uppercase px-8 py-3 rounded-full hover:bg-[#123617] transition-all duration-300 transform hover:scale-105">
                  CONSULT ONLINE NOW
                </button>
              </div>
            </div>

            <div className="about-right lg:col-span-8 grid grid-cols-1 md:grid-cols-12 flex-grow relative">
              <div className="hidden md:flex md:col-span-2 items-center justify-center border-r border-[#2b5c32]/10 py-6">
                <div className="font-editorial-heading text-[#2b5c32]/60 uppercase tracking-[0.45em] text-[10px] font-bold [writing-mode:vertical-lr] rotate-180 select-none">
                  ABOUT Sparking Stars
                </div>
              </div>

              <div className="md:col-span-10 p-8 md:p-12 flex flex-col justify-between space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-[#2b5c32]/80 text-[10px] tracking-widest uppercase leading-[1.8]">
                  <p className="about-text">
                    CONSTRUCTED IN 2020 IN INDIA, Sparking Stars IS AN ALL-IN-ONE SERVICE COMPANY COMBINE
                    FUNCTIONALITY AND CREATIVITY WITH AN AUTHENTIC PRODUCTION TO SHAPE HIGH-END SERVICES.
                  </p>
                  <p className="about-text">
                    Sparking Stars is a comprehensive service provider offering a wide range of
                    facility management and lifestyle solutions. We deliver seamless services across
                    residential, commercial, and institutional sectors.
                  </p>
                </div>

                <div className="about-image w-full aspect-[2.3/1] bg-[#dfd7b9]/60 border border-[#2b5c32]/10 rounded-[50px] md:rounded-[90px] overflow-hidden relative group cursor-pointer mt-4 shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FBF5DD]/20 to-transparent" />
                  <div className="w-full h-full bg-[#ede6cb] opacity-40 transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>
              </div>
            </div>
          </div>


          <div className="w-full flex justify-end gap-2 px-12 py-3 bg-[#ede6cb] border-b border-[#2b5c32]/10 relative z-10">
            <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
            <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
            <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
          </div>

          {/* SERVICES SECTION */}
          <div
            ref={servicesRef}
            className="w-full bg-[#FDF5F5] border-b border-[#2b5c32]/10 p-8 md:p-12 lg:p-16 flex flex-col relative z-10"
          >
            {/* Section Header */}
            <div className="w-full mb-16">
              <h2 className="text-[10vw] font-medium leading-[0.9] tracking-tighter text-[#1a1a1a] uppercase">
                Find the service <br /> you need
              </h2>
              <p className="mt-6 text-sm text-[#666] max-w-[200px]">
                ↳ It doesn't matter whether you know where to start or not, we will always point you in the right direction.
              </p>
            </div>

            {/* Services Stacking List */}
            <div className="w-full flex flex-col">
              {servicesList.map((service, index) => (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  style={{
                    zIndex: index + 1,
                    background: `hsl(0, 55%, ${91 - index * 2}%)`,
                  }}
                  className="group relative w-full sticky top-0 border-t border-black/[0.07] overflow-hidden transition-colors duration-300"
                >
                  {/* Main row — always visible */}
                  <div className="flex items-center justify-between px-8 md:px-12 py-10 md:py-12">
                    <h3 className="font-editorial-heading text-4xl md:text-6xl lg:text-[5vw] font-black
                         text-black/[0.13] uppercase tracking-tight leading-none
                         transition-colors duration-300 group-hover:text-black/80">
                      {service.title}
                    </h3>

                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <span className="text-[10px] font-mono text-black/35">{service.num}.</span>
                      {/* Arrow — rotates in on hover */}
                      <div className="w-9 h-9 rounded-full border border-black/20 flex items-center
                            justify-center opacity-0 -rotate-45
                            transition-all duration-300
                            group-hover:opacity-100 group-hover:rotate-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Drawer — slides open on hover */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr]
                        transition-all duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                    <div className="overflow-hidden">
                      <div className="px-8 md:px-12 pb-8 flex flex-col md:flex-row gap-6 md:gap-10 items-start">

                        {/* Thumbnail */}
                        <div className="w-full md:w-40 h-24 md:h-28 rounded-lg overflow-hidden shrink-0 bg-black/10">
                          <img
                            src={service.img}
                            alt={service.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100
                             scale-105 group-hover:scale-100 transition-all duration-500"
                          />
                        </div>

                        {/* Text content */}
                        <div className="flex flex-col">
                          <p className="text-sm text-black/55 leading-relaxed max-w-sm">
                            {service.desc}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono text-black/45 border border-black/18
                                 px-3 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-[11px] font-semibold uppercase tracking-widest
                              text-black/60 mt-4 flex items-center gap-2">
                            Explore service
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* HORIZONTAL SCROLL SECTION */}
          <div
            ref={scrollPinSectionRef}
            className="w-full h-screen relative bg-[#ede6cb] overflow-hidden z-20"
          >
            <div
              ref={horizontalPanelsWrapperRef}
              className="flex h-full"
              style={{ willChange: 'transform' }}
            >
              {/* PANEL 1: MEET OUR VISION */}
              <div className="horizontal-panel w-screen h-full flex-shrink-0 border-r border-[#2b5c32]/10 bg-[#ede6cb] p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-8 overflow-hidden">

                {/* Header row */}
                <div className="panel-content flex flex-col md:flex-row md:items-start justify-between w-full gap-4 max-w-[1300px] mx-auto">
                  <div className="space-y-3">
                    {/* Eyebrow */}
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-px bg-[#2b5c32]/40" />
                      <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#2b5c32]/50">Est. 2018</span>
                    </div>
                    <h2 className="panel-item font-editorial-heading text-5xl md:text-6xl font-normal tracking-widest text-[#16251b] uppercase leading-[1.0]">
                      MEET OUR<br />VISION
                    </h2>
                  </div>

                  <div className="flex flex-col gap-4 pt-2 max-w-md">
                    <p className="panel-item text-[#2b5c32]/70 text-[10px] tracking-[0.16em] uppercase leading-[2]">
                      To become a trusted one-stop solution for integrated services across industries. Deliver high-quality, reliable, and customer-centric services through innovation, skilled manpower, and operational excellence.
                    </p>
                    {/* Inline stat pills */}
                    <div className="flex gap-3 flex-wrap">
                      {[['500+', 'Happy Clients'], ['6', 'Core Services'], ['Pan-India', 'Coverage']].map(([val, label]) => (
                        <div key={label} className="border border-[#2b5c32]/20 rounded-full px-4 py-1.5 flex items-center gap-2">
                          <span className="font-editorial-heading text-[#16251b] text-sm">{val}</span>
                          <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-[#2b5c32]/50">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Video frame */}
                <div className="panel-item w-full max-w-[1300px] mx-auto aspect-[2.1/1] border border-[#2b5c32]/15 rounded-xl relative flex items-center justify-center group overflow-hidden bg-[#d4cca8]">

                  {/* Animated ambient background */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: 'radial-gradient(ellipse 60% 50% at 20% 60%, #2b5c32 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 75% 30%, #16251b 0%, transparent 65%)',
                      animation: 'visionPulse 6s ease-in-out infinite alternate',
                    }}
                  />

                  {/* Grain texture overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      backgroundSize: '180px',
                    }}
                  />

                  {/* Animated scanning line */}
                  <div
                    className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  >
                    <div
                      className="absolute left-0 right-0 h-px bg-[#2b5c32]/20"
                      style={{ animation: 'scanLine 3s linear infinite' }}
                    />
                  </div>

                  {/* Corner marks */}
                  {[
                    'top-4 left-4 border-t border-l',
                    'top-4 right-4 border-t border-r',
                    'bottom-4 left-4 border-b border-l',
                    'bottom-4 right-4 border-b border-r',
                  ].map((cls, i) => (
                    <div
                      key={i}
                      className={`absolute w-5 h-5 border-[#2b5c32]/30 ${cls} opacity-0 group-hover:opacity-100 transition-all duration-500`}
                      style={{ transitionDelay: `${i * 60}ms` }}
                    />
                  ))}

                  {/* Grid lines */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                    style={{
                      backgroundImage: 'linear-gradient(#2b5c32 1px, transparent 1px), linear-gradient(90deg, #2b5c32 1px, transparent 1px)',
                      backgroundSize: '60px 60px',
                    }}
                  />

                  {/*  brand mark */}
                  <div className="absolute top-6 right-8 flex items-center gap-2 z-10">
                    <div className="w-2 h-2 bg-[#2b5c32] rounded-tr-full" />
                    <span className="font-editorial-heading tracking-[0.2em] text-base text-[#16251b] font-bold">Sparking Star</span>
                  </div>

                  {/* Bottom-left metadata */}
                  <div className="absolute bottom-6 left-8 flex items-end gap-6 z-10">
                    <div>
                      <p className="text-[8px] font-mono tracking-[0.25em] uppercase text-[#2b5c32]/40 mb-0.5">Format</p>
                      <p className="text-[10px] font-mono tracking-wider text-[#16251b]/60">4K · 16:9</p>
                    </div>
                    <div className="w-px h-6 bg-[#2b5c32]/20" />
                    <div>
                      <p className="text-[8px] font-mono tracking-[0.25em] uppercase text-[#2b5c32]/40 mb-0.5">Duration</p>
                      <p className="text-[10px] font-mono tracking-wider text-[#16251b]/60">03:24</p>
                    </div>
                    <div className="w-px h-6 bg-[#2b5c32]/20" />
                    <div>
                      <p className="text-[8px] font-mono tracking-[0.25em] uppercase text-[#2b5c32]/40 mb-0.5">Year</p>
                      <p className="text-[10px] font-mono tracking-wider text-[#16251b]/60">2024</p>
                    </div>
                  </div>

                  {/* Bottom-right: Live indicator */}
                  <div className="absolute bottom-6 right-8 flex items-center gap-2 z-10">
                    <span
                      className="block w-1.5 h-1.5 rounded-full bg-[#2b5c32]"
                      style={{ animation: 'liveDot 1.8s ease-in-out infinite' }}
                    />
                    <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-[#2b5c32]/60">Brand Film</span>
                  </div>

                  {/* Play button — pulsing rings */}
                  <div className="relative z-10 flex items-center justify-center">
                    {/* Outer pulse rings */}
                    <div
                      className="absolute w-32 h-32 rounded-full border border-[#2b5c32]/15"
                      style={{ animation: 'ringPulse 2.5s ease-out infinite' }}
                    />
                    <div
                      className="absolute w-24 h-24 rounded-full border border-[#2b5c32]/20"
                      style={{ animation: 'ringPulse 2.5s ease-out infinite 0.6s' }}
                    />

                    <button className="relative w-20 h-20 rounded-full border border-[#2b5c32]/25 bg-[#ede6cb]/90 backdrop-blur-md flex items-center justify-center text-[#2b5c32] group-hover:bg-[#2b5c32] group-hover:border-[#2b5c32] group-hover:text-[#ede6cb] transition-all duration-500 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6 ml-0.5 transition-transform duration-300 group-hover:scale-110"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>

                  {/* Hover: center label */}
                  <div className="absolute inset-x-0 top-6 flex justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[8px] font-mono tracking-[0.4em] uppercase text-[#2b5c32]/40">
                      Click to play brand film
                    </span>
                  </div>

                </div>

                {/* Keyframes */}
                <style>{`
    @keyframes visionPulse {
      0%   { opacity: 0.20; transform: scale(1); }
      100% { opacity: 0.40; transform: scale(1.06); }
    }
    @keyframes ringPulse {
      0%   { transform: scale(0.85); opacity: 0.6; }
      100% { transform: scale(1.5);  opacity: 0; }
    }
    @keyframes liveDot {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.2; }
    }
    @keyframes scanLine {
      0%   { top: -2px; }
      100% { top: 100%; }
    }
  `}</style>
              </div>

              {/* PANEL 2: OUR PROJECT */}
              <div
                ref={projectsRef}
                className="horizontal-panel w-screen h-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-12 bg-[#ede6cb] overflow-hidden"
              >
                {/* LEFT: Info column */}
                <div className="lg:col-span-4 p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-[#ede6cb] relative z-10">
                  <div className="space-y-8">
                    {/* Decorative dots */}
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="block w-1 h-1 rounded-full bg-[#2b5c32] opacity-60"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>

                    {/* Heading with line reveal */}
                    <div className="overflow-hidden">
                      <h2 className="panel-item font-editorial-heading text-5xl md:text-6xl font-normal tracking-widest text-[#16251b] uppercase leading-[1.05] translate-y-0">
                        OUR<br />PROJECT
                      </h2>
                    </div>

                    {/* Thin rule */}
                    <div className="w-8 h-px bg-[#2b5c32]/40" />

                    <p className="panel-item text-[#2b5c32]/70 text-[10px] tracking-[0.16em] uppercase leading-[2] max-w-[260px]">
                      Our inspired solutions have helped shape modern acoustic design. Alluring spaces, internationally recognised for their architectural elegance live here.
                    </p>

                    {/* Counter */}
                    <div className="flex gap-8 pt-4">
                      <div>
                        <p className="font-editorial-heading text-3xl text-[#16251b] tracking-tight">24+</p>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#2b5c32]/60 mt-1">Projects</p>
                      </div>
                      <div className="w-px bg-[#2b5c32]/20" />
                      <div>
                        <p className="font-editorial-heading text-3xl text-[#16251b] tracking-tight">12</p>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#2b5c32]/60 mt-1">Countries</p>
                      </div>
                      <div className="w-px bg-[#2b5c32]/20" />
                      <div>
                        <p className="font-editorial-heading text-3xl text-[#16251b] tracking-tight">8yr</p>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#2b5c32]/60 mt-1">Experience</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="panel-item pt-8">
                    <button className="group flex items-center gap-3 border border-[#2b5c32]/30 text-[#2b5c32] text-[9px] font-bold tracking-[0.3em] uppercase px-7 py-3.5 rounded-full hover:bg-[#2b5c32] hover:text-[#ede6cb] hover:border-[#2b5c32] transition-all duration-500">
                      SEE ALL PROJECTS
                      <svg
                        className="w-3 h-3 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* RIGHT: Project cards grid */}
                <div className="lg:col-span-8 grid grid-cols-3 divide-x divide-[#2b5c32]/10 border-l border-[#2b5c32]/10 h-full overflow-hidden">

                  {/* Card 1 */}
                  <div className="group relative h-full overflow-hidden cursor-pointer bg-[#d8d0b2]">
                    <div
                      className="absolute inset-0 bg-cover bg-center scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: "url('images/building-painting-service.png')" }}
                    />
                    <div className="absolute inset-0 bg-[#16251b]/30 group-hover:bg-[#16251b]/10 transition-colors duration-500" />
                    {/* Hover reveal label */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                      <p className="text-[9px] font-mono tracking-[0.25em] text-[#ede6cb]/70 uppercase mb-1">2022</p>
                      <p className="font-editorial-heading text-[#ede6cb] text-lg uppercase tracking-widest leading-tight">
                        Building<br />Painting
                      </p>
                    </div>
                    {/* Index */}
                    <span className="absolute top-5 left-5 text-[9px] font-mono text-[#ede6cb]/50 tracking-widest">01</span>
                  </div>
                  {/* Card 2 */}
                  <div className="group relative h-full overflow-hidden cursor-pointer bg-[#d8d0b2]">
                    <div
                      className="absolute inset-0 bg-cover bg-center scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: "url('images/building-painting-service.png')" }}
                    />
                    <div className="absolute inset-0 bg-[#16251b]/30 group-hover:bg-[#16251b]/10 transition-colors duration-500" />
                    {/* Hover reveal label */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                      <p className="text-[9px] font-mono tracking-[0.25em] text-[#ede6cb]/70 uppercase mb-1">2022</p>
                      <p className="font-editorial-heading text-[#ede6cb] text-lg uppercase tracking-widest leading-tight">
                        Building<br />Painting
                      </p>
                    </div>
                    {/* Index */}
                    <span className="absolute top-5 left-5 text-[9px] font-mono text-[#ede6cb]/50 tracking-widest">01</span>
                  </div>
                  {/* Card 3 */}
                  <div className="group relative h-full overflow-hidden cursor-pointer bg-[#cfc7a8]">
                    <div
                      className="absolute inset-0 bg-cover bg-center scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: "url('images/security-service.png')" }}
                    />
                    <div className="absolute inset-0 bg-[#16251b]/40 group-hover:bg-[#16251b]/15 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                      <p className="text-[9px] font-mono tracking-[0.25em] text-[#ede6cb]/70 uppercase mb-1">2023</p>
                      <p className="font-editorial-heading text-[#ede6cb] text-lg uppercase tracking-widest leading-tight">
                        Security<br />Services
                      </p>
                    </div>
                    <span className="absolute top-5 left-5 text-[9px] font-mono text-[#ede6cb]/50 tracking-widest">03</span>
                  </div>
                </div>

                {/* Bottom ticker strip — spans full width */}
                <div className="lg:col-span-12 border-t border-[#2b5c32]/10 overflow-hidden bg-[#ede6cb] py-3">
                  <div className="flex animate-marquee whitespace-nowrap gap-0">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span key={i} className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#2b5c32]/40 px-8">
                        Architecture ✦ Interior Design ✦ Acoustic Solutions ✦ Spatial Planning ✦ Heritage Restoration
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* OUR BIG CLIENT'S */}
          <div className="w-full bg-[#ede6cb] border-b border-[#2b5c32]/10 relative z-30">
            <div className="client-header p-8 md:p-12 border-b border-[#2b5c32]/10 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <h2 className="font-editorial-heading text-4xl font-normal tracking-widest text-[#16251b] uppercase leading-none">
                OUR BIG CLIENT'S
              </h2>
              <p className="text-[#2b5c32]/70 text-[10px] tracking-widest uppercase max-w-xl leading-relaxed">
                THERE IS A BALANCE THAT MUST BE ACHIEVED IN CREATING SPACES THAT LOOK GOOD BUT ALSO FEEL GOOD TO
                BE IN AND BOTH ARE EQUALLY AS IMPORTANT.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-[#2b5c32]/10 bg-zinc-100/10 text-center border-b border-[#2b5c32]/10">
              <div className="client-item p-8 h-36 flex items-center justify-center text-xs tracking-widest text-[#2b5c32]/70 uppercase font-mono hover:bg-[#ede6cb]/40 transition-colors select-none">
                [ AC MARRIOTT ]
              </div>
              <div className="client-item p-8 h-36 flex items-center justify-center text-xs tracking-widest text-[#2b5c32]/70 uppercase font-mono hover:bg-[#ede6cb]/40 transition-colors select-none">
                [ WALDORF ASTORIA ]
              </div>
              <div className="client-item p-8 h-36 flex items-center justify-center text-xs tracking-widest text-[#2b5c32]/70 uppercase font-mono hover:bg-[#ede6cb]/40 transition-colors select-none">
                [ MANDARIN ORIENTAL ]
              </div>
              <div className="client-item p-8 h-36 flex items-center justify-center text-xs tracking-widest text-[#2b5c32]/70 uppercase font-mono hover:bg-[#ede6cb]/40 transition-colors select-none">
                [ HYATT PLACE ]
              </div>
              <div className="client-item p-8 h-36 flex items-center justify-center text-xs tracking-widest text-[#2b5c32]/70 uppercase font-mono hover:bg-[#ede6cb]/40 transition-colors select-none border-t border-[#2b5c32]/10">
                [ HARRAH'S ENT. ]
              </div>
              <div className="client-item p-8 h-36 flex items-center justify-center text-xs tracking-widest text-[#2b5c32]/70 uppercase font-mono hover:bg-[#ede6cb]/40 transition-colors select-none border-t border-[#2b5c32]/10">
                [ WESTIN HOTELS ]
              </div>
              <div className="client-item p-8 h-36 flex items-center justify-center text-xs tracking-widest text-[#2b5c32]/70 uppercase font-mono hover:bg-[#ede6cb]/40 transition-colors select-none border-t border-[#2b5c32]/10">
                [ HARRAH'S ]
              </div>
              <div className="client-item p-8 h-36 flex items-center justify-center text-xs tracking-widest text-[#2b5c32]/70 uppercase font-mono hover:bg-[#ede6cb]/40 transition-colors select-none border-t border-[#2b5c32]/10">
                [ HILTON ]
              </div>
            </div>
          </div>

          {/* GIANT OVAL CAPSULE CTA */}
          {/* ─── CTA SECTION ─── */}
          <div className="cta-section w-full bg-[#ede6cb] p-8 md:p-14 lg:p-16 text-center border-b border-[#2b5c32]/10 flex flex-col items-center relative z-30">
            <button
              onClick={() => setFormOpen(true)}
              className="w-full max-w-4xl bg-[#2b5c32] text-white text-center py-6 md:py-8 lg:py-9 rounded-full font-editorial-heading font-normal text-2xl md:text-4xl lg:text-5xl tracking-widest hover:bg-[#123617] transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02] shadow-md shadow-emerald-900/10"
            >
              START YOUR PROJECT NOW
            </button>
          </div>

          {/* ─── MODAL OVERLAY ─── */}
          {formOpen && (
            <div
              ref={overlayRef}
              onClick={(e) => { if (e.target === overlayRef.current) setFormOpen(false); }}
              className="fixed inset-0 z-[999] flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(22, 37, 27, 0.65)', backdropFilter: 'blur(8px)' }}
            >
              <div
                className="relative w-full max-w-lg bg-[#ede6cb] rounded-2xl overflow-hidden shadow-2xl"
                style={{ animation: 'modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both' }}
              >
                {/* Top accent bar */}
                <div className="h-1 w-full bg-[#2b5c32]" />

                {/* Header */}
                <div className="px-8 pt-8 pb-6 flex items-start justify-between border-b border-[#2b5c32]/10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2b5c32]" />
                      <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#2b5c32]/50">New Enquiry</span>
                    </div>
                    <h3 className="font-editorial-heading text-2xl md:text-3xl text-[#16251b] tracking-widest uppercase leading-tight">
                      Let's Start<br />Your Project
                    </h3>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-[#2b5c32]/50 mt-2 leading-relaxed">
                      Fill in your details and we'll reach<br />out within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setFormOpen(false)}
                    className="w-8 h-8 rounded-full border border-[#2b5c32]/20 flex items-center justify-center text-[#2b5c32]/50 hover:bg-[#2b5c32] hover:text-[#ede6cb] hover:border-[#2b5c32] transition-all duration-300 shrink-0 mt-1"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Form body */}
                <div className="px-8 py-7">
                  {sent ? (
                    // ─── Success state ───
                    <div className="flex flex-col items-center justify-center py-10 gap-4">
                      <div
                        className="w-14 h-14 rounded-full bg-[#2b5c32] flex items-center justify-center"
                        style={{ animation: 'modalIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ede6cb" strokeWidth="2.5">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="font-editorial-heading text-xl text-[#16251b] tracking-widest uppercase">Message Sent!</p>
                      <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#2b5c32]/50 text-center">
                        We'll be in touch within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#2b5c32]/50">
                          Full Name <span className="text-[#2b5c32]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState(p => ({ ...p, name: e.target.value }))}
                          placeholder="Rahul Sharma"
                          className="w-full bg-transparent border border-[#2b5c32]/20 rounded-lg px-4 py-3 text-sm text-[#16251b] placeholder-[#2b5c32]/25 tracking-wide outline-none focus:border-[#2b5c32]/60 focus:bg-[#dfd7b9]/20 transition-all duration-200"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#2b5c32]/50">
                          Email Address <span className="text-[#2b5c32]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState(p => ({ ...p, email: e.target.value }))}
                          placeholder="rahul@example.com"
                          className="w-full bg-transparent border border-[#2b5c32]/20 rounded-lg px-4 py-3 text-sm text-[#16251b] placeholder-[#2b5c32]/25 tracking-wide outline-none focus:border-[#2b5c32]/60 focus:bg-[#dfd7b9]/20 transition-all duration-200"
                        />
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#2b5c32]/50">
                          Contact Number <span className="text-[#2b5c32]">*</span>
                        </label>
                        <div className="flex gap-2">
                          <div className="border border-[#2b5c32]/20 rounded-lg px-3 flex items-center gap-1.5 text-[11px] text-[#2b5c32]/60 font-mono shrink-0">
                            🇮🇳 +91
                          </div>
                          <input
                            type="tel"
                            required
                            value={formState.phone}
                            onChange={(e) => setFormState(p => ({ ...p, phone: e.target.value }))}
                            placeholder="98765 43210"
                            pattern="[0-9]{10}"
                            title="Enter 10-digit mobile number"
                            className="flex-1 bg-transparent border border-[#2b5c32]/20 rounded-lg px-4 py-3 text-sm text-[#16251b] placeholder-[#2b5c32]/25 tracking-wide outline-none focus:border-[#2b5c32]/60 focus:bg-[#dfd7b9]/20 transition-all duration-200"
                          />
                        </div>
                      </div>

                      {error && (
                        <p className="text-[10px] font-mono tracking-wider text-red-600/70 text-center">{error}</p>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full mt-1 bg-[#2b5c32] text-[#ede6cb] rounded-full py-4 text-[10px] font-mono font-bold tracking-[0.35em] uppercase flex items-center justify-center gap-3 hover:bg-[#123617] disabled:opacity-60 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        {sending ? (
                          <>
                            <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Enquiry
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </>
                        )}
                      </button>

                      <p className="text-[8px] font-mono tracking-[0.2em] uppercase text-[#2b5c32]/30 text-center">
                        Your details are safe with us. No spam, ever.
                      </p>
                    </form>
                  )}
                </div>
              </div>

              {/* Modal animation keyframe */}
              <style>{`
      @keyframes modalIn {
        from { opacity: 0; transform: scale(0.88) translateY(24px); }
        to   { opacity: 1; transform: scale(1)    translateY(0);    }
      }
    `}</style>
            </div>
          )}

          {/* BOTTOM GLOBAL FOOTER EDGE */}
          <div className="w-full flex justify-center gap-2.5 py-6 bg-[#ede6cb] text-center relative z-30">
            <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
            <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
            <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
          </div>

          {/* FINAL FOOTER SECTION */}
          <footer ref={contactRef} className="grid grid-cols-1 md:grid-cols-12 w-full bg-[#ede6cb] relative z-30">
            <div className="md:col-span-6 p-8 md:p-12 lg:p-16 flex flex-col justify-between space-y-16 relative">
              <div className="footer-content space-y-12">
                <h3 className="font-editorial-heading text-4xl lg:text-5xl font-normal tracking-widest text-[#16251b] uppercase leading-none">
                  KEEP IN TOUCH
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-[#2b5c32] rounded-tr-full"></div>
                    <span className="font-editorial-heading tracking-[0.1em] text-sm text-[#16251b] font-bold">
                      Sparking Star
                    </span>
                  </div>
                  <p className="text-[#2b5c32] text-[10px] tracking-widest uppercase leading-[1.8] max-w-sm font-sans font-medium">
                    A-1, Charkop Shree Ganesh CHSL,
                    <br />
                    Plot No. 937, Near Platinum tower, Sector-9,
                    <br />
                    Charkop, Kandivali (W) , Mumbai - 400067
                  </p>
                </div>
              </div>
              <div className="footer-content pt-8 border-t border-[#2b5c32]/10 w-full flex gap-12 text-[10px] tracking-[0.25em] text-[#2b5c32]/80 font-bold uppercase">
                <span className="cursor-pointer hover:text-black transition-colors">FAQ</span>
                <span className="cursor-pointer hover:text-black transition-colors">TERMS & AGREEMENTS</span>
              </div>
            </div>

            <div className="md:col-span-6 border-t md:border-t-0 md:border-l border-[#2b5c32]/10 flex flex-col justify-between text-[10px] tracking-[0.25em] font-medium uppercase text-[#2b5c32] bg-[#dfd7b9]/10">
              <div className="divide-y divide-[#2b5c32]/10 w-full">
                <div className="footer-link p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#ede6cb]/30 transition-colors">
                  <span>EMAIL</span>
                  <a
                    href="mailto:sparkingstarsenterprises@gmail.com "
                    className="text-[#16251b] font-mono tracking-normal text-xs font-normal lowercase group-hover:text-[#2b5c32] transition-colors"
                  >
                    sparkingstarsenterprises@gmail.com
                  </a>
                </div>
                <div className="footer-link p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#ede6cb]/30 transition-colors">
                  <span>INSTAGRAM</span>
                  <span className="text-[#16251b] group-hover:text-[#2b5c32] transition-colors">@SPARKINGSTARS</span>
                </div>
                <div className="footer-link p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#ede6cb]/30 transition-colors">
                  <span>TWITTER</span>
                  <span className="text-[#16251b] group-hover:text-[#2b5c32] transition-colors">@SPARKINGSTARS</span>
                </div>
                <div className="footer-link p-6 md:p-8 flex justify-between items-center group cursor-pointer hover:bg-[#ede6cb]/30 transition-colors">
                  <span>TELEGRAM</span>
                  <span className="text-[#16251b] group-hover:text-[#2b5c32] transition-colors">@SPARKINGSTARS</span>
                </div>
              </div>
            </div>
          </footer>


          <div className="w-full border-t border-[#2b5c32]/10 bg-[#dfd7b9] h-4 relative z-30"></div>
        </div>
      </div>
    </div>
  );
}