'use client';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

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
      id: 'security-services',
      num: '01',
      title: 'SECURITY SERVICES',
      desc: 'We create a complete design concept, carefully balancing style and functionality to reflect your vision in every detail.',
    },
    {
      id: 'building-painting-service',
      num: '02',
      title: 'BUILDING PAINTING',
      desc: 'Sourcing and styling bespoke design pieces, tailored artworks, and fine textile curation to elevate your personal spaces.',
    },
    {
      id: 'housekeeping-services',
      num: '03',
      title: 'HOUSEKEEPING SERVICES',
      desc: 'Comprehensive cleaning and maintenance solutions to keep your space pristine and welcoming.',
    },
    {
      id: 'interior-designing',
      num: '04',
      title: 'INTERIOR DESIGNING',
      desc: 'Full procurement management from global premium suppliers, balancing budget realities with exceptional structural quality.',
    },
    {
      id: 'old-age-housing',
      num: '05',
      title: 'OLD AGE HOUSING',
      desc: 'Rigorous architectural supervision from initial groundwork site-mapping to final client walkthrough handshakes.',
    },
    {
      id: 'paying-guest-accommodation',
      num: '06',
      title: 'PAYING GUEST ACCOMMODATION',
      desc: 'Complete structural renovations and heritage restoration works managed by premier certified craft engineers.',
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
        <nav className="w-full border-b border-[#2b5c32]/10 px-12 py-7 flex justify-between items-center text-[10px] tracking-[0.3em] text-[#2b5c32]/70 uppercase font-medium">
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
          <nav className="w-full border-b border-[#2b5c32]/10 px-12 py-7 flex justify-between items-center text-[10px] tracking-[0.3em] text-[#2b5c32]/80 uppercase font-medium relative z-30 text-[#ffffff]/80">
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="font-editorial-heading tracking-[0.1em] text-lg text-[#16251b] font-bold">
                Sparking Stars
              </span>
            </div>

            <div className="flex gap-8 ">
              <button onClick={toggleMenu} className="cursor-pointer hover:text-black transition-colors">MENU</button>
              <div className="hidden md:flex gap-6">
                {/* <Link href="/catalog" className="hover:text-black">Catalog</Link> */}
                <button onClick={() => handleNavClick('about')} className="hover:text-black hover:cursor-pointer">About us</button>
                <button onClick={() => handleNavClick('services')} className="hover:text-black  hover:cursor-pointer">Services</button>
                <button onClick={() => handleNavClick('contact')} className="hover:text-black  hover:cursor-pointer">Contacts</button>
                <button onClick={() => handleNavClick('projects')} className="hover:text-black  hover:cursor-pointer">Project</button>
              </div>
            </div>

            <button className="cursor-pointer hover:text-black transition-colors">
              (+91) 8369928617
            </button>
          </nav>

          <div ref={heroRef} className="w-full px-12 pt-16 pb-12 relative z-10"

          >
            <h1 className="hero-title font-editorial-heading text-[8vw] font-medium leading-[0.9] tracking-tight text-[#ffffff] uppercase">
              FACILITY &<br />
              LIFESTYLE SERVICES
            </h1>

            <div className="flex flex-col md:flex-row justify-between items-end mt-8 gap-8">
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

            {/* Services Slider - FIXED ANIMATION */}
            <div ref={heroSliderRef} className="w-full overflow-hidden mt-12 py-10">
              <div className="slider-wrapper flex gap-6 w-max">
                {/* Duplicate items for seamless loop */}
                {[...servicesList, ...servicesList].map((service, idx) => (
                  <div
                    key={idx}
                    className="w-[350px] h-[450px] bg-[#d1c9a9] rounded-2xl p-4 flex flex-col justify-start border border-[#2b5c32]/10 shrink-0"
                  >
                    <h3 className="text-[#16251b] font-medium text-2xl mb-4">{service.title}</h3>
                    <div className="mb-4 border border-[#2b5c32]/20 rounded-full px-4 py-1 text-[10px] uppercase text-[#2b5c32] inline-block w-fit">
                      {service.title.split(' ')[0]}
                    </div>
                    <div className="text-[#2b5c32] text-sm flex items-center gap-1 cursor-pointer hover:underline">
                      ↗ More Details
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer details */}
            <div className="mt-8 flex justify-between items-center text-[10px] uppercase tracking-widest text-[#2b5c32]">
              <span>[ OUR OBJECTS ]</span>
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
            className="grid grid-cols-1 lg:grid-cols-12 w-full border-b border-[#2b5c32]/10 bg-[#ede6cb] relative z-10 overflow-hidden"
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
                    facility management and lifestyle solutions. With a strong foundation built
                    on professionalism and trust, we deliver seamless services across
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

          {/* Tiny Diamond Row Separator */}
          <div className="w-full flex justify-end gap-2 px-12 py-3 bg-[#ede6cb] border-b border-[#2b5c32]/10 relative z-10">
            <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
            <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
            <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
          </div>

          {/* SERVICES SECTION */}
          <div
            ref={servicesRef}
            className="w-full bg-[#FBF5DD] border-b border-[#2b5c32]/10 p-8 md:p-12 lg:p-16 flex flex-col space-y-12 relative z-10"
          >
            <div className="w-full py-4">
              <h2 className="services-title font-editorial-heading text-5xl md:text-7xl lg:text-8xl font-normal tracking-[0.05em] text-[#16251b] uppercase relative inline-block select-none">
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
                    className="service-item w-full border-b border-[#2b5c32]/20 py-6 md:py-8 flex flex-col transition-all duration-300"
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

                    <div
                      className={`grid transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'
                        }`}
                    >
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
              <div className="horizontal-panel w-screen h-full flex-shrink-0 border-r border-[#2b5c32]/10 bg-[#ede6cb] p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-8">
                <div className="panel-content flex flex-col md:flex-row md:items-start justify-between w-full gap-4 max-w-[1300px] mx-auto">
                  <h2 className="panel-item font-editorial-heading text-4xl md:text-5xl font-normal tracking-widest text-[#16251b] uppercase">
                    MEET OUR VISION
                  </h2>
                  <p className="panel-item text-[#2b5c32]/80 text-[10px] tracking-widest uppercase max-w-xl leading-relaxed pt-2">
                    To become a trusted one-stop solution for integrated
                    services across industries. Deliver high-quality, reliable, and customer-centric
                    services through innovation, skilled manpower, and
                    operational excellence.

                  </p>
                </div>

                <div className="panel-item w-full max-w-[1300px] mx-auto aspect-[2.1/1] bg-[#dfd7b9]/40 border border-[#2b5c32]/10 rounded-lg relative flex items-center justify-center group overflow-hidden">
                  <button className="w-20 h-20 rounded-full border border-[#2b5c32]/20 bg-white/90 backdrop-blur-md flex items-center justify-center text-zinc-700 group-hover:scale-105 group-hover:border-[#2b5c32] group-hover:text-[#2b5c32] transition-all duration-500 z-10 shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-7 h-7 ml-0.5"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <div className="absolute top-8 right-12 text-right flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-[#2b5c32] rounded-tr-full"></div>
                    <span className="font-editorial-heading tracking-[0.15em] text-lg text-[#16251b] font-bold">
                      DENTRO
                    </span>
                  </div>
                </div>
              </div>

              {/* PANEL 2: OUR PROJECT MESH GRID */}
              <div
                ref={projectsRef}
                className="horizontal-panel w-screen h-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-12 bg-[#ede6cb]"
              >
                <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-between space-y-12 bg-[#ede6cb]">
                  <div className="panel-content space-y-6">
                    <div className="panel-item flex gap-2">
                      <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
                      <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
                      <span className="text-[#2b5c32] text-[8px] transform rotate-45 select-none">✦</span>
                    </div>
                    <h2 className="panel-item font-editorial-heading text-4xl md:text-5xl font-normal tracking-widest text-[#16251b] uppercase">
                      OUR PROJECT
                    </h2>
                    <p className="panel-item text-[#2b5c32]/80 text-[10px] tracking-[0.14em] uppercase leading-[1.8] max-w-sm">
                      OUR INSPIRED SOLUTIONS HAVE HELPED SHAPE MODERN ACOUSTIC DESIGN. ALLURING SPACES,
                      INTERNATIONALLY RECOGNISED FOR THEIR ARCHITECTURAL ELEGANCE AND EXCEPTIONAL SOUND MANAGEMENT
                      LIVE HERE.
                    </p>
                  </div>
                  <div className="panel-item">
                    <button className="border border-[#2b5c32]/30 text-[#2b5c32] text-[10px] font-bold tracking-[0.25em] uppercase px-8 py-3.5 rounded-full hover:border-[#2b5c32] hover:text-black transition-all duration-300 transform hover:scale-105">
                      SEE ALL PROJECTS
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-4 divide-x divide-[#2b5c32]/10 border-t lg:border-t-0 lg:border-l border-[#2b5c32]/10 overflow-hidden relative h-full">
                  <div className="panel-item h-full w-full bg-[#dfd7b9]/40 hover:bg-[#dfd7b9]/60 transition-colors relative group cursor-pointer" />
                  <div className="panel-item h-full w-full bg-[#ede6cb]/40 hover:bg-[#ede6cb]/60 transition-colors relative group cursor-pointer" />
                  <div className="panel-item h-full w-full bg-[#FBF5DD] flex flex-col justify-between p-4 py-8 group cursor-pointer border-x border-[#2b5c32]/10 relative z-10 shadow-sm">
                    <div className="font-editorial-heading text-[#16251b] uppercase tracking-[0.25em] text-lg sm:text-xl font-normal [writing-mode:vertical-lr] rotate-180 mx-auto my-auto leading-none">
                      CIRCLE SQUARE
                    </div>
                    <span className="text-[10px] text-[#2b5c32]/60 tracking-widest text-center block font-mono">
                      2021
                    </span>
                  </div>
                  <div className="panel-item h-full w-full bg-[#dfd7b9]/30 hover:bg-[#dfd7b9]/50 transition-colors relative group cursor-pointer" />
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
          <div className="cta-section w-full bg-[#ede6cb] p-8 md:p-14 lg:p-16 text-center border-b border-[#2b5c32]/10 flex flex-col items-center relative z-30">
            <button className="w-full max-w-4xl bg-[#2b5c32] text-white text-center py-6 md:py-8 lg:py-9 rounded-full font-editorial-heading font-normal text-2xl md:text-4xl lg:text-5xl tracking-widest hover:bg-[#123617] transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02] shadow-md shadow-emerald-900/10">
              START YOUR PROJECT NOW
            </button>
          </div>

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