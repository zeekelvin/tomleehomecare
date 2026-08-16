import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ResourceCenter } from '@/components/resources/resource-center';
import { store } from '@/lib/store';
import { BreadcrumbsJsonLd } from '@/components/seo/json-ld';
import { BookOpen, Sparkles, HelpCircle, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Senior Care Resources & Guides | TomLee Homecare Georgia',
  description:
    'Free senior care guides, family caregiving advice, safety checklists, and insights into upcoming private-pay home care and insurance onboarding across Georgia.',
  alternates: {
    canonical: '/resources',
  },
};

export default async function ResourcesPage() {
  const resources = store.getResources(false); // published only

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Resources', item: '/resources' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <Header />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-teal-50/70 via-white to-white py-14 lg:py-20 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 text-[#127485] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#7CB342]" />
              TomLee Knowledge & Family Care Guides
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Senior Home Care Resource Center
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Navigating aging, caregiver transitions, upcoming private-pay care, and insurance options shouldn&apos;t be stressful. Browse our free family guides, safety checklists, and senior health articles.
            </p>
          </div>
        </section>

        {/* Interactive Resource Center (Search, Filters, Interactive Checklist & Articles) */}
        <ResourceCenter initialResources={resources} />

        {/* Bottom Assistance Banner */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <HelpCircle className="w-10 h-10 text-[#127485] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Need Help Finding the Right Care Solution?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-xl mx-auto">
                Our care coordinators in Georgia provide one-on-one phone consultations to review your loved one&apos;s routine and answer questions with no obligation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/request-care">
                  <Button variant="primary" size="md" className="font-bold">
                    Start Free Care Assessment
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
                <Link href="/faq">
                  <Button variant="outline" size="md" className="font-semibold">
                    View Frequently Asked Questions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

