'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    // Check initial position on mount
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ease-in-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={handleScrollToTop}
        id="scroll-to-top-button"
        aria-label="Scroll to top of page"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#127485] hover:bg-[#0e5c6a] text-white shadow-lg hover:shadow-2xl border border-teal-400/30 backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-400 focus-visible:ring-offset-white cursor-pointer"
      >
        <ChevronUp className="w-6 h-6 transition-transform duration-200 group-hover:-translate-y-0.5" />
        
        {/* Subtle tooltip on hover */}
        <span className="sr-only">Scroll back to top</span>
        <span
          aria-hidden="true"
          className="absolute -top-9 right-0 bg-slate-900 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md whitespace-nowrap pointer-events-none"
        >
          Back to top
        </span>
      </button>
    </div>
  );
}
