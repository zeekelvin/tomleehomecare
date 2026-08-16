import React from 'react';
import Link from 'next/link';
import { TomLeeLogo } from '@/components/ui/logo';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Heart,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Personal Care Assistance', href: '/services/personal-care' },
    { name: 'Companion Care & Engagement', href: '/services/companion-care' },
    { name: 'Nutritious Meal Preparation', href: '/services/meal-preparation' },
    { name: 'Light Housekeeping & Safety', href: '/services/light-housekeeping' },
    { name: 'Medication Reminders', href: '/services/medication-reminders' },
    { name: 'Dementia & Alzheimer’s Care', href: '/services/dementia-alzheimers-support' },
    { name: 'Respite Care for Families', href: '/services/respite-care' },
    { name: 'Overnight & Weekend Care', href: '/services/overnight-weekend-care' },
  ];

  const quickLinks = [
    { name: 'About TomLee Homecare', href: '/about' },
    { name: 'All Care Services', href: '/services' },
    { name: 'Switching Care Agencies', href: '/#switching-section' },
    { name: 'Care Resource Center', href: '/resources' },
    { name: 'Frequently Asked Questions', href: '/faq' },
    { name: 'Contact & Service Area', href: '/contact' },
    { name: 'Request Care Assessment', href: '/request-care' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Highlight Banner */}
        <div className="bg-gradient-to-r from-[#127485] to-[#0A4E5A] rounded-2xl p-8 sm:p-10 mb-16 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#7CB342]" />
              Reliable Care Starts Here
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Ready for a Better Home Care Experience?
            </h3>
            <p className="text-teal-100 text-base sm:text-lg">
              Whether you’re arranging care for the first time or considering a change from an unreliable provider, we’re here to help.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/request-care"
              id="footer-banner-request-care-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white text-[#127485] font-bold text-base hover:bg-slate-50 transition-all shadow-md active:scale-95"
            >
              Get Free Care Assessment
              <ArrowRight className="w-4 h-4 ml-2 text-[#7CB342]" />
            </Link>
            <a
              href="tel:4049997936"
              id="footer-banner-call-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-teal-900/60 border border-teal-400/30 text-white font-medium text-base hover:bg-teal-900 transition-all"
            >
              <Phone className="w-4 h-4 mr-2 text-[#7CB342]" />
              (404) 999-7936
            </a>
          </div>
        </div>

        {/* 4-Column Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Philosophy */}
          <div className="flex flex-col gap-4">
            <TomLeeLogo theme="dark" size="lg" />
            <p className="text-slate-400 text-sm leading-relaxed mt-2">
              TomLee Homecare LLC provides dedicated non-medical home care services throughout Georgia. We are onboarding with insurance providers while preparing our private-pay care rollout to empower older adults to live safely with dignity, comfort, and peace of mind for families.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-[#7CB342]" />
                Georgia Licensed Agency • Private Pay Coming Soon
              </span>
            </div>
          </div>

          {/* Col 2: In-Home Services */}
          <div>
            <h4 className="text-white font-semibold text-base tracking-tight mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#7CB342]" />
              Care Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-slate-400 hover:text-teal-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="text-teal-600 group-hover:text-teal-400 transition-colors">›</span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-white font-semibold text-base tracking-tight mb-4">
              Explore & Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-teal-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="text-teal-600 group-hover:text-teal-400 transition-colors">›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Service Area & Contact */}
          <div>
            <h4 className="text-white font-semibold text-base tracking-tight mb-4">
              Georgia Service Area
            </h4>
            <div className="space-y-3.5 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#7CB342] shrink-0 mt-1" />
                <span>
                  Lawrenceville, GA 30044 • Metro Atlanta & Surrounding Communities (Gwinnett, Fulton, Cobb, DeKalb, Cherokee, Forsyth)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#7CB342] shrink-0" />
                <a href="tel:4049997936" className="hover:text-white transition-colors">
                  (404) 999-7936
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#7CB342] shrink-0" />
                <a href="mailto:care@tomleehomecare.com" className="hover:text-white transition-colors">
                  care@tomleehomecare.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#7CB342] shrink-0 mt-1" />
                <span>
                  24/7 Care Coordination & Intake Support
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center md:text-left">
            <p>
              © {currentYear} TomLee Homecare LLC. All rights reserved. Non-Medical Home Care Services.
            </p>
            <p className="mt-1 text-[11px] text-slate-600">
              Privacy Disclaimer: TomLee Homecare operates under a HIPAA-aware minimal data collection architecture.<br />
              Please do not submit medical charts, SSNs, or sensitive diagnostic records via web forms.
            </p>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <Link href="/privacy" className="hover:text-teal-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-teal-300 transition-colors">
              Terms of Use
            </Link>
            <Link href="/admin/login" className="hover:text-teal-300 transition-colors text-slate-600">
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
