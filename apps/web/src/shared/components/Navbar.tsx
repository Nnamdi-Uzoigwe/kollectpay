"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#7C3AED] to-[#9D5CF6] flex items-center justify-center shadow-lg shadow-purple-300/40">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="#84CC16"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="font-extrabold text-xl tracking-tight text-[#7C3AED]"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Kollect<span className="text-[#84CC16]">Pay</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-600 hover:text-[#7C3AED] hover:bg-purple-50 font-medium text-[15px] px-4 py-2 rounded-lg transition-all duration-200 no-underline"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-[#7C3AED] border border-purple-200 hover:border-[#7C3AED] hover:bg-purple-50 font-medium text-[15px] px-5 py-2 rounded-lg transition-all duration-200 no-underline"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-1.5 text-white font-bold text-[15px] px-5 py-2.5 rounded-lg bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] shadow-lg shadow-purple-300/40 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-300/50 transition-all duration-200 no-underline"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Get Started Free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="#84CC16"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.25 p-2 rounded-lg bg-transparent border-none cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5.5 h-0.5 bg-[#7C3AED] rounded-sm transition-all duration-300 origin-center ${
              isMobileMenuOpen ? "rotate-45 translate-y-1.75" : ""
            }`}
          />
          <span
            className={`block w-5.5 h-0.5 bg-[#7C3AED] rounded-sm transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-5.5 h-0.5 bg-[#7C3AED] rounded-sm transition-all duration-300 origin-center ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-1.75" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white backdrop-blur-md ${
          isMobileMenuOpen ? "max-h-100 border-t border-purple-100" : "max-h-0"
        }`}
      >
        <div className="px-6 pt-4 pb-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-600 hover:text-[#7C3AED] hover:bg-purple-50 font-medium text-base px-4 py-3 rounded-lg transition-all duration-200 no-underline"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {link.label}
            </Link>
          ))}

          <div className="h-px bg-purple-100 my-2" />

          <Link
            href="/login"
            className="text-[#7C3AED] border border-purple-200 font-medium text-base px-4 py-3 rounded-lg text-center no-underline"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="text-white font-bold text-base px-4 py-3 rounded-lg text-center bg-linear-to-r from-[#7C3AED] to-[#9D5CF6] mt-1 no-underline"
            style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </nav>
  );
}