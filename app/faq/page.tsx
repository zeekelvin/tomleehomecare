import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FAQEngine } from '@/components/faq/faq-engine';
import { store } from '@/lib/store';
import { FAQJsonLd, BreadcrumbsJsonLd } from '@/components/seo/json-ld';
import { HelpCircle, Sparkles, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Frequently Asked Questions | TomLee Homecare Georgia',
  description:
    'Answers to common questions about private-pay home care, switching care agencies, caregiver vetting, and care schedules in Georgia.',
  alternates: {
    canonical: '/faq',
  },
};

export default async function FAQPage() {
  const faqs = store.getFaqs(false); // published only

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'FAQs', item: '/faq' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <Header />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-teal-50/70 via-white to-white py-14 lg:py-20 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 text-[#127485] text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7CB342]" aria-hidden="true" />
              Clear Answers for Georgia Families
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Find transparent answers regarding our non-medical care services, caregiver qualifications, private-pay options, Long-Term Care Insurance, and our seamless agency-switching protocol.
            </p>
          </div>
        </section>

        {/* Interactive FAQ Engine (Live Search, Category Filters, Expand All, Schema JSON-LD) */}
        <FAQEngine initialFaqs={faqs} />
      </main>

      <Footer />
    </div>
  );
}
