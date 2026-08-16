import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Home, Phone, Search, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Page Not Found | TomLee Homecare LLC',
  description: 'The page you requested could not be found. Let us help you find the right in-home care services.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-xl w-full text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#127485] text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-4 h-4 text-[#7CB342]" />
            TomLee Care Navigation
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            404 - Page Not Found
          </h1>
          
          <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. 
            We are here to ensure you find the support and information your family needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Button asChild size="lg" className="w-full sm:w-auto shadow-md">
              <Link href="/" className="inline-flex items-center gap-2">
                <Home className="w-4 h-4" />
                Return to Homepage
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/services" className="inline-flex items-center gap-2">
                <Search className="w-4 h-4" />
                Explore Care Services
              </Link>
            </Button>
          </div>

          <div className="bg-teal-50/60 rounded-2xl p-6 border border-teal-100 text-left">
            <h2 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#127485]" />
              Need Immediate Care Assistance?
            </h2>
            <p className="text-xs text-slate-600 mb-3">
              Our Georgia care coordinators are available 24/7 to answer your questions and coordinate same-day care assessments.
            </p>
            <div className="flex items-center justify-between">
              <a
                href="tel:4049997936"
                className="font-bold text-[#127485] hover:text-[#0a4e5a] text-sm tracking-wide transition-colors"
              >
                (404) 999-7936
              </a>
              <Link
                href="/request-care"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#127485] hover:underline"
              >
                Request Free Consultation <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
