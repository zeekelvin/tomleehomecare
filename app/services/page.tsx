import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button, Badge } from '@/components/ui/button';
import { store } from '@/lib/store';
import { BreadcrumbsJsonLd } from '@/components/seo/json-ld';
import {
  ShieldCheck,
  Heart,
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  HeartHandshake,
  Utensils,
  Home,
  BellRing,
  Activity,
  Clock,
  UserCheck,
  MessageSquare,
  ClipboardCheck,
  PhoneCall,
  CalendarCheck,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'In-Home Care Services | TomLee Homecare LLC Georgia',
  description:
    'Explore our comprehensive home care services in Georgia: Personal Care, Companion Care, Meal Preparation, Housekeeping, Respite, and Memory Care. Private Pay coming soon & insurance onboarding.',
  alternates: {
    canonical: '/services',
  },
};

export default async function ServicesPage() {
  const services = store.getServices(false); // active only

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Services', item: '/services' },
  ];

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'personal-care':
        return <Heart className="w-5 h-5 text-[#127485]" />;
      case 'companion-care':
        return <HeartHandshake className="w-5 h-5 text-[#127485]" />;
      case 'meal-preparation':
        return <Utensils className="w-5 h-5 text-[#127485]" />;
      case 'light-housekeeping':
        return <Home className="w-5 h-5 text-[#127485]" />;
      case 'medication-reminders':
        return <BellRing className="w-5 h-5 text-[#127485]" />;
      case 'mobility-transfers':
        return <Activity className="w-5 h-5 text-[#127485]" />;
      case 'dementia-alzheimers-support':
        return <Sparkles className="w-5 h-5 text-[#127485]" />;
      case 'respite-care':
        return <Clock className="w-5 h-5 text-[#127485]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#127485]" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <Header />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {/* Hero */}
        <section className="bg-gradient-to-b from-teal-50/60 to-white py-14 lg:py-20 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 text-[#127485] text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 border border-teal-200">
              <ShieldCheck className="w-4 h-4 text-[#7CB342]" />
              In-Home Care Directory • Private Pay Coming Soon
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Tailored Home Care Services for Georgia Seniors
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Every individual requires a customized balance of personal support, safety monitoring, and companionship. Explore our active private-duty care options below.
            </p>
          </div>
        </section>

        {/* What's Included in Every Service Standard Strip */}
        <section className="py-10 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-teal-100 text-[#127485] flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5 text-[#127485]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Vetted & Matched Caregiver</h4>
                  <p className="text-[11px] text-slate-500">Matched to personality and care needs</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-teal-100 text-[#127485] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#7CB342]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Backup Care Coverage</h4>
                  <p className="text-[11px] text-slate-500">Zero-gap coverage if primary calls out</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-teal-100 text-[#127485] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-[#127485]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Post-Shift Family Reports</h4>
                  <p className="text-[11px] text-slate-500">Daily notes on nutrition, mood & wellness</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-teal-100 text-[#127485] flex items-center justify-center shrink-0">
                  <CalendarCheck className="w-5 h-5 text-[#7CB342]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">No Long-Term Contracts</h4>
                  <p className="text-[11px] text-slate-500">Adjust or pause hours as needs evolve</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Directory Grid */}
        <section className="py-16 sm:py-24 bg-[#F8FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col group"
                >
                  <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={service.image_url}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="active" className="bg-white/95 backdrop-blur-sm shadow-sm font-semibold">
                        Private Pay Coming Soon
                      </Badge>
                      {service.is_featured && (
                        <Badge variant="qualified" className="shadow-sm font-semibold">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-2 rounded-xl shadow-sm">
                      {getServiceIcon(service.slug)}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#127485] transition-colors">
                        {service.name}
                      </h2>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {service.short_description}
                      </p>

                      <div className="space-y-1.5 mb-6">
                        {service.features.slice(0, 3).map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#7CB342] shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-sm font-bold text-[#127485] hover:text-[#0A4E5A] inline-flex items-center gap-1 group/link"
                      >
                        Full Details
                        <ChevronRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                      <Link href={`/request-care?service=${service.slug}`}>
                        <Button variant="primary" size="sm" className="text-xs">
                          Request Care
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Future Medicaid / Waiver Note */}
        <section className="py-12 bg-white border-t border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-[#127485] text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4 text-[#7CB342]" />
              Payment Transparency
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Private-Pay Care Coming Soon • Insurance Onboarding in Progress
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto">
              TomLee Homecare is actively working on getting signed up and credentialed with insurance providers while preparing our private-pay care rollout. This ensures direct accountability, flexible scheduling, and dedicated care for your loved one.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
