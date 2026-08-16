import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ContactEngine } from '@/components/contact/contact-engine';
import { BreadcrumbsJsonLd } from '@/components/seo/json-ld';
import { ShieldCheck, Phone, MapPin, Mail, Clock } from 'lucide-react';
import { INITIAL_SITE_SETTINGS } from '@/lib/data/initial-data';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Contact TomLee Homecare LLC | Georgia Care Coordination',
  description:
    'Contact TomLee Homecare in Georgia. 24/7 client intake line (404) 999-7936, service area coverage checker across Metro Atlanta, and direct inquiries.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Contact', item: '/contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <Header />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {/* Page Hero */}
        <section className="bg-gradient-to-b from-teal-50/70 via-white to-white py-14 lg:py-20 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 text-[#127485] text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7CB342]" />
              Compassionate Georgia Care Support
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Contact TomLee Homecare LLC
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Have questions about private-pay care schedules, rates, caregiver qualifications, or seamlessly transitioning away from an unreliable agency? We are here for your family 24 hours a day.
            </p>
          </div>
        </section>

        {/* Interactive Contact Engine & Coverage Checker */}
        <ContactEngine
          initialServiceCities={INITIAL_SITE_SETTINGS.service_area_cities}
          initialServiceZips={INITIAL_SITE_SETTINGS.service_area_zips}
        />
      </main>

      <Footer />
    </div>
  );
}
