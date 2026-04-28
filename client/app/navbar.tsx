"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { gsap } from "gsap";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Vouches", href: "#vouches" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
  const el = overlayRef.current;
  if (!el) return;

  if (isOpen) {
    // ✅ SAVE SCROLL POSITION
    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    // prevent touch scroll (mobile)
    document.body.style.touchAction = "none";

    gsap.killTweensOf(el);
    gsap.set(el, { pointerEvents: "auto" });

    const tl = gsap.timeline();

    tl.fromTo(
      el,
      { y: "-100%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.6, ease: "power4.out" }
    ).fromTo(
      ".mobile-link",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );
  } else {
    // ✅ RESTORE SCROLL
    const scrollY = document.body.style.top;

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.touchAction = "";

    window.scrollTo(0, parseInt(scrollY || "0") * -1);

    gsap.killTweensOf(el);

    gsap.to(el, {
      y: "-100%",
      opacity: 0,
      duration: 0.5,
      ease: "power4.in",
      onComplete: () => {
        gsap.set(el, { pointerEvents: "none" });
      },
    });
  }
}, [isOpen]);

if (isOpen) {
  document.documentElement.classList.add("menu-open");
} else {
  document.documentElement.classList.remove("menu-open");
}

  return (
    <nav className="fixed top-0 w-full z-[500] h-20 md:h-19 flex items-center justify-between px-6 md:px-12 bg-[#FDFCF8]/80 backdrop-blur-md border-b-1 border-[#DED8CF]/30">
      
      {/* LEFT: LOGO */}
      <div className="z-[510] flex-1 flex justify-start">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img src="/logo.png" alt="logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-['Fraunces'] text-xl font-black text-[#5D7052] tracking-tighter">
            SparkingStars.
          </span>
        </div>
      </div>

      {/* DESKTOP LINKS */}
      <div className="hidden md:flex flex-[2] justify-center gap-10 text-[10px] uppercase tracking-[0.3em] text-[#5D7052] font-bold">
        {navLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="hover:text-[#C18C5D] transition-colors relative group"
          >
            {item.name}
            <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#C18C5D] group-hover:w-full transition-all duration-500" />
          </a>
        ))}
      </div>

      {/* RIGHT */}
      <div className="z-[510] flex-1 flex justify-end items-center gap-4">
        <a
          href="https://wa.me/917506201929"
          className="hidden sm:flex items-center gap-3 bg-[#5D7052] text-[#FDFCF8] px-5 py-2.5 rounded-full hover:bg-[#C18C5D] transition-all"
        >
          <span className="hidden lg:inline text-[10px] uppercase tracking-widest font-black">
            Support
          </span>
          <MessageCircle size={18} />
        </a>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 bg-white rounded-full shadow-sm text-[#5D7052]"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ✅ FULLSCREEN MOBILE MENU */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-[100dvh] z-[999] bg-[#FDFCF8]/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden pointer-events-none opacity-0 overflow-hidden"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 z-[1000] w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-[#5D7052] active:scale-95"
        >
          <X size={26} />
        </button>

        {/* MENU LINKS */}
        <div className="flex flex-col items-center gap-10">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="mobile-link font-['Fraunces'] text-5xl font-bold text-[#5D7052] hover:text-[#C18C5D] transition-colors"
            >
              {item.name}
            </a>
          ))}

          <a
            href="https://wa.me/917506201929"
            className="mobile-link mt-6 flex items-center gap-3 bg-[#5D7052] text-[#FDFCF8] px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-black"
          >
            WhatsApp Support
            <MessageCircle size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;