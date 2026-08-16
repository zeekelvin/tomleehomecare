'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoLink } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import {
  Phone,
  Menu,
  X,
  Shield,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Switching Agencies', href: '/#switching-section' },
    { name: 'Resources', href: '/resources' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200">
      {/* Skip to Main Content Link for Keyboard & Screen Reader Users (WCAG 2.2 AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[#127485] focus:text-white focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white font-bold text-sm"
      >
        Skip to main content
      </a>

      {/* Top Value Banner */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-teal-400 font-medium">
              <Shield className="w-3.5 h-3.5 text-[#7CB342]" aria-hidden="true" />
              Georgia Licensed Non-Medical Home Care Provider
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <HeartHandshake className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
              Private Pay Coming Soon • Insurance Onboarding
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href="tel:4049997936"
              id="topbar-phone-link"
              aria-label="Call TomLee Homecare 24/7 at (404) 999-7936"
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-400 rounded"
            >
              <Phone className="w-3.5 h-3.5 text-[#7CB342]" aria-hidden="true" />
              <span>(404) 999-7936</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
            : 'bg-white border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <LogoLink size="md" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  aria-current={active ? 'page' : undefined}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#127485] ${
                    active
                      ? 'text-[#127485] bg-teal-50 font-semibold'
                      : 'text-slate-700 hover:text-[#127485] hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/request-care" id="header-request-care-btn">
              <Button
                variant="primary"
                size="md"
                className="shadow-sm hover:shadow-md transition-all font-semibold focus-visible:ring-2 focus-visible:ring-[#127485]"
              >
                <Calendar className="w-4 h-4 text-[#7CB342]" aria-hidden="true" />
                Request Care
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link href="/request-care" id="mobile-quick-request-care-btn">
              <Button variant="primary" size="sm" className="text-xs px-3">
                Request Care
              </Button>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="mobile-nav-toggle-btn"
              type="button"
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#127485]"
              aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="region"
          aria-label="Mobile Navigation"
          className="lg:hidden fixed inset-x-0 top-[105px] bg-white border-b border-slate-200 shadow-xl p-6 transition-all duration-200 z-50 animate-in slide-in-from-top-2"
        >
          <nav className="flex flex-col gap-2" aria-label="Mobile Navigation Links">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#127485] ${
                  isActive(link.href)
                    ? 'bg-teal-50 text-[#127485] font-semibold'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Link
                href="/request-care"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full"
              >
                <Button variant="primary" size="lg" className="w-full justify-center">
                  <Sparkles className="w-4 h-4 text-[#7CB342]" aria-hidden="true" />
                  Get Free Care Assessment
                </Button>
              </Link>

              <a
                href="tel:4049997936"
                aria-label="Call TomLee Homecare at (404) 999-7936"
                className="flex items-center justify-center gap-2 p-3 text-slate-700 bg-slate-100 rounded-xl font-medium text-sm hover:bg-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#127485]"
              >
                <Phone className="w-4 h-4 text-[#127485]" aria-hidden="true" />
                Call (404) 999-7936
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
