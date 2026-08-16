'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button, Badge, ClientApprovalTag } from '@/components/ui/button';
import {
  ShieldCheck,
  Heart,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  UserCheck,
  Calendar,
  Sparkles,
  Phone,
  RefreshCw,
  MessageSquare,
  Award,
  ChevronDown,
  Lock,
  ChevronRight,
  Star,
  MapPin,
  PhoneCall,
  ClipboardCheck,
  HeartHandshake,
  Utensils,
  Home,
  BellRing,
  ThumbsUp,
  Activity,
  Check,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { Service, Resource, FAQ } from '@/types';
import { FAQJsonLd } from '@/components/seo/json-ld';

interface HomepageProps {
  services: Service[];
  resources: Resource[];
  faqs: FAQ[];
}

export function HomepageView({ services, resources, faqs }: HomepageProps) {
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  // Helper to map services to appropriate icons
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
      <FAQJsonLd faqs={faqs.slice(0, 6)} />
      <Header />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {/* =========================================================================
            SECTION 1: HERO SECTION
        ========================================================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 via-white to-[#F8FAFB] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
          {/* Subtle decorative background glow */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-[#7CB342]/10 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Headline & Action */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                {/* Brand Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 text-[#127485] text-xs sm:text-sm font-semibold mb-6 border border-teal-200 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-[#7CB342]" />
                  <span>Georgia Licensed Non-Medical Home Care</span>
                  <span className="text-teal-400">•</span>
                  <span className="font-bold text-slate-800">Private Pay Coming Soon</span>
                </div>

                {/* Primary Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15] mb-6">
                  Reliable Home Care.{' '}
                  <span className="text-[#127485] underline decoration-[#7CB342] decoration-4 underline-offset-8">
                    Peace of Mind
                  </span>{' '}
                  for Your Family.
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl">
                  Compassionate, dependable in-home care designed around your loved one’s daily routine, personal preferences, and comfort. Tailored private-pay home care (coming soon) & insurance onboarding across Georgia.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
                  <Link href="/request-care" id="hero-get-assessment-btn">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center shadow-lg shadow-teal-900/10">
                      <Sparkles className="w-5 h-5 text-[#7CB342]" />
                      Get a Free Care Assessment
                    </Button>
                  </Link>

                  <Link href="/services" id="hero-explore-services-btn">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto justify-center">
                      Explore Our Services
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>

                {/* Rating & Social Proof Strip */}
                <div className="flex items-center gap-4 py-3 px-4 rounded-xl bg-white border border-slate-200/80 shadow-sm mb-8 w-full sm:w-auto">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="h-4 w-px bg-slate-200" />
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">
                    4.9/5 Rating <span className="font-normal text-slate-500">• 150+ Georgia Families Served</span>
                  </p>
                </div>

                {/* Trust Points */}
                <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7CB342] shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700">Dedicated Caregivers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#7CB342] shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700">Flexible Scheduling</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                    <CheckCircle2 className="w-4 h-4 text-[#7CB342] shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700">No Long-Term Contracts</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Card with Verified Badges */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Main Frame */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/3] sm:aspect-[4/3]">
                    <Image
                      src="/images/services/personal-care.jpg"
                      alt="Caregiver warmly assisting older adult at home with dignity"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 540px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm font-semibold tracking-wide flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-[#7CB342]" />
                        Dignified, Patient & Attentive In-Home Care
                      </p>
                      <p className="text-xs text-slate-200 mt-0.5">
                        Serving Greater Atlanta & Georgia Families
                      </p>
                    </div>
                  </div>

                  {/* Top-Right Badge: Caregiver Vetting */}
                  <div className="absolute -top-4 -right-4 sm:-right-6 bg-white py-2.5 px-3.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-[#127485] shrink-0">
                      <UserCheck className="w-4 h-4 text-[#127485]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">100% Background Checked</p>
                      <p className="text-[10px] text-slate-500">Georgia DHS screened</p>
                    </div>
                  </div>

                  {/* Bottom-Left Floating Trust Card */}
                  <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[280px]">
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[#127485] shrink-0">
                      <RefreshCw className="w-5 h-5 text-[#127485]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Unhappy with current care?</p>
                      <p className="text-[11px] text-slate-500">We make switching smooth with zero care gaps.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: PROMINENT SWITCHING SECTION (Competitive Positioning)
        ========================================================================== */}
        <section id="switching-section" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 border border-teal-500/30">
                <RefreshCw className="w-4 h-4 text-[#7CB342]" />
                Agency Transition Specialist
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                Not Happy With Your Current Home Care Provider?
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                <span className="text-[#7CB342] font-semibold">Switching Is Easier Than You Think.</span>{' '}
                Families frequently turn to TomLee after struggling with common home care frustrations. Here is how we do things differently:
              </p>
            </div>

            {/* Pain Points vs TomLee Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Card 1 */}
              <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 hover:border-teal-500/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Common Frustration
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Unannounced Caregiver No-Shows
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Being stranded at the last minute with no replacement when your primary caregiver calls out.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-700/80">
                  <div className="flex items-center gap-2 text-[#7CB342] text-xs font-bold uppercase tracking-wider mb-1">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    The TomLee Standard
                  </div>
                  <p className="text-slate-200 text-sm font-medium">
                    Oriented backup protocols ensure continuous care coverage with proactive family notification.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 hover:border-teal-500/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Common Frustration
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Constantly Rotating Strangers
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    A different caregiver every shift, causing severe anxiety and confusion for vulnerable seniors.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-700/80">
                  <div className="flex items-center gap-2 text-[#7CB342] text-xs font-bold uppercase tracking-wider mb-1">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    The TomLee Standard
                  </div>
                  <p className="text-slate-200 text-sm font-medium">
                    Consistent caregiver matching focused on building trust, routine stability, and genuine friendship.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 hover:border-teal-500/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Common Frustration
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Poor Office Communication
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Unanswered phone calls, unanswered questions, and zero updates on how visits actually went.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-700/80">
                  <div className="flex items-center gap-2 text-[#7CB342] text-xs font-bold uppercase tracking-wider mb-1">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    The TomLee Standard
                  </div>
                  <p className="text-slate-200 text-sm font-medium">
                    Daily visit documentation, direct care coordinator access, and consistent family check-ins.
                  </p>
                </div>
              </div>
            </div>

            {/* Transition Roadmap 3 Steps with Icons */}
            <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 mb-10">
              <h4 className="text-center text-sm font-bold uppercase tracking-wider text-teal-300 mb-6 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-[#7CB342]" />
                Our 48-Hour Zero-Gap Transition Protocol
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 font-bold flex items-center justify-center shrink-0 border border-teal-500/40 text-sm">
                    1
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-sm mb-1">Confidential Care Consultation</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">Tell us what is not working. We assess your loved one’s exact routine and schedule.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 font-bold flex items-center justify-center shrink-0 border border-teal-500/40 text-sm">
                    2
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-sm mb-1">Caregiver Matching & Intro</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">We match a dedicated primary caregiver tailored to your loved one’s personality.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7CB342]/20 text-[#7CB342] font-bold flex items-center justify-center shrink-0 border border-[#7CB342]/40 text-sm">
                    3
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-sm mb-1">Zero-Gap Care Handover</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">We align start dates perfectly so your loved one never misses a single day of care.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Switching Callout Banner */}
            <div className="bg-gradient-to-r from-teal-900 to-slate-800 rounded-2xl p-8 border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-bold text-white mb-1">
                  Ready to experience dependable, stress-free care?
                </h4>
                <p className="text-slate-300 text-sm">
                  We handle the care transition seamlessly so your loved one never misses a single day of support.
                </p>
              </div>
              <Link href="/request-care?intent=unhappy_with_current_provider" id="switching-talk-to-tomlee-btn">
                <Button variant="accent" size="lg" className="whitespace-nowrap font-bold">
                  Talk to TomLee About Switching
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: WHY CHOOSE TOMLEE (Key Differentiators & Verified Structure)
        ========================================================================== */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#127485] text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 block">
                The TomLee Difference
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Built Around Reliability, Dignity, and Trust
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                We believe families deserve more than generic caregiving hours. We provide consistency, safety, and deep respect for every individual.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Item 1 */}
              <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-100 text-[#127485] flex items-center justify-center mb-4">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Caregiver Compatibility Matching
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Caregivers matched by clinical skills, personality, hobbies, and personal communication style.
                  </p>
                </div>
                <ClientApprovalTag claimName="Caregiver Matching" />
              </div>

              {/* Item 2 */}
              <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-100 text-[#127485] flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-[#7CB342]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Backup Caregiver Guarantee
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Protected scheduling protocols prevent unexpected no-call no-shows when illness or emergencies occur.
                  </p>
                </div>
                <ClientApprovalTag claimName="Backup Guarantee" />
              </div>

              {/* Item 3 */}
              <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-100 text-[#127485] flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Family Updates After Visits
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Shift notes covering nutrition, hydration, mobility, and mood shared directly with designated family contacts.
                  </p>
                </div>
                <ClientApprovalTag claimName="Family Visit Updates" />
              </div>

              {/* Item 4 */}
              <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-slate-200/80 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-100 text-[#127485] flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Flexible Care & No Long-Term Contracts
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Adaptable care plans that adjust as family needs evolve without restrictive long-term commitments.
                  </p>
                </div>
                <ClientApprovalTag claimName="Flexible Contracts" />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: ACTIVE SERVICES SECTION (Database-Driven with Category Icons)
        ========================================================================== */}
        <section className="py-16 sm:py-24 bg-[#F8FAFB] border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[#127485] text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 block">
                  Private-Pay Home Care (Coming Soon)
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                  Comprehensive In-Home Care Services
                </h2>
                <p className="text-slate-600 text-base mt-2 max-w-2xl">
                  Every care plan is uniquely personalized to support independence, comfort, and physical safety at home.
                </p>
              </div>
              <Link href="/services" id="view-all-services-link">
                <Button variant="outline" size="md" className="shrink-0">
                  View All Services ({services.length})
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col group"
                >
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={service.image_url}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="active" className="bg-white/90 backdrop-blur-sm shadow-sm font-semibold">
                        Private Pay Coming Soon
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-sm">
                      {getServiceIcon(service.slug)}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#127485] transition-colors">
                          {service.name}
                        </h3>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
                        {service.short_description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/services/${service.slug}`}
                        className="text-sm font-bold text-[#127485] hover:text-[#0A4E5A] inline-flex items-center gap-1 group/link"
                      >
                        Learn More
                        <ChevronRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                      <Link href={`/request-care?service=${service.slug}`}>
                        <Button variant="secondary" size="sm" className="text-xs">
                          Inquire
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: HOW IT WORKS (Simple 4-Step Process with Icons)
        ========================================================================== */}
        <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#127485] text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 block">
                Simple & Stress-Free
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                How Getting Started with TomLee Works
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                From your first inquiry to your first care shift, we guide you through every step with transparency and care.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Step 1 */}
              <div className="relative flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-300 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#127485] flex items-center justify-center">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-extrabold text-teal-200 font-sans">01</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Tell Us What You Need</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Call us or fill out our simple online form to share your loved one’s care routine, schedule preferences, and goals.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-300 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#127485] flex items-center justify-center">
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-extrabold text-teal-200 font-sans">02</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Complete Care Assessment</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We conduct a comprehensive in-home consultation to evaluate mobility, home safety, routines, and specific support needs.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-300 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#127485] flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-extrabold text-teal-200 font-sans">03</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Caregiver Matching</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We hand-match compassionate caregivers tailored to your loved one’s personality, care requirements, and schedule.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative flex flex-col p-6 rounded-2xl bg-teal-50/70 border border-teal-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#7CB342]/20 text-[#127485] flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5 text-[#7CB342]" />
                  </div>
                  <span className="text-3xl font-extrabold text-[#127485] font-sans">04</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Care Begins with Peace of Mind</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Care starts smoothly with ongoing supervisor check-ins and consistent post-visit updates for your family.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/request-care" id="how-it-works-cta-btn">
                <Button variant="primary" size="lg" className="shadow-md">
                  Begin Your Care Assessment
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: VERIFIED FAMILY STORIES & TESTIMONIALS
        ========================================================================== */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#127485] text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 block flex items-center justify-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-[#7CB342]" />
                Real Georgia Family Experiences
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Trusted by Families Across Metro Atlanta
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                Hear directly from family members who transitioned their loved ones to TomLee Homecare for dependable, dignified support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                    &ldquo;Switching to TomLee was the best decision for my mother. Our previous agency had constant caregiver call-outs and zero communication. With TomLee, our caregiver Sarah is punctual, compassionate, and truly feels like part of the family.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-teal-200 bg-teal-50 shrink-0">
                    <Image
                      src="/images/testimonials/eleanor-vance.jpg"
                      alt="Eleanor Jenkins"
                      fill
                      sizes="44px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Eleanor Jenkins</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#127485]" />
                      Marietta, GA • Daughter of client
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                    &ldquo;My father has dementia and is very sensitive to new people. The care coordinator took the time to understand his background as a teacher. The matched caregiver knows exactly how to engage him with patience and respect.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-teal-200 bg-teal-50 shrink-0">
                    <Image
                      src="/images/testimonials/marcus-holloway.jpg"
                      alt="Robert Vance"
                      fill
                      sizes="44px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Robert Vance</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#127485]" />
                      Alpharetta, GA • Son of client
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                    &ldquo;As the primary caregiver for my husband after his surgery, I was exhausted. TomLee&apos;s respite care gave me back my sleep and strength. Their daily shift reports give me total reassurance.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-teal-200 bg-teal-50 shrink-0">
                    <Image
                      src="/images/testimonials/patricia-holloway.jpg"
                      alt="Patricia Holloway"
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Patricia Holloway</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#127485]" />
                      Sandy Springs, GA • Spouse of client
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: GEORGIA SERVICE AREA COVERAGE
        ========================================================================== */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-teal-50/80 via-white to-teal-50/40 rounded-3xl p-8 sm:p-12 border border-teal-100 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-[#127485] text-xs font-bold uppercase tracking-wider mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#7CB342]" />
                    Georgia Service Territory
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                    Serving Metro Atlanta & Surrounding Communities
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    Our local care coordination team provides prompt, reliable caregiver dispatch across key northern and central Georgia counties.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                    {[
                      'Fulton County',
                      'Cobb County',
                      'Gwinnett County',
                      'DeKalb County',
                      'Cherokee County',
                      'Forsyth County',
                    ].map((county, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800">
                        <Check className="w-3.5 h-3.5 text-[#7CB342] shrink-0" />
                        <span>{county}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-500">
                    Including Atlanta, Alpharetta, Roswell, Marietta, Sandy Springs, Johns Creek, Smyrna, Dunwoody, and Decatur.
                  </p>
                </div>

                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-teal-200 shadow-md">
                  <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#127485]" />
                    Check Service In Your ZIP Code
                  </h3>
                  <p className="text-xs text-slate-600 mb-4">
                    Confirm instant caregiver availability and rapid dispatch to your home address.
                  </p>
                  <Link href="/contact#service-area" className="w-full block">
                    <Button variant="primary" size="md" className="w-full justify-center text-xs font-bold">
                      <MapPin className="w-4 h-4 mr-1.5 text-[#7CB342]" />
                      Launch Georgia Service Area Checker
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: EDUCATIONAL RESOURCES & GUIDES
        ========================================================================== */}
        <section className="py-16 sm:py-24 bg-[#F8FAFB] border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[#127485] text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 block">
                  Family Resource Center
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                  Helpful Guides for Family Caregivers
                </h2>
                <p className="text-slate-600 text-base mt-2 max-w-2xl">
                  Actionable insights, checklists, and advice to help families navigate senior care decisions with confidence.
                </p>
              </div>
              <Link href="/resources" id="view-all-resources-link">
                <Button variant="outline" size="md">
                  Visit Resource Center
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.slice(0, 4).map((resource) => (
                <Link
                  key={resource.id}
                  href={`/resources/${resource.slug}`}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="relative h-40 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={resource.image_url}
                      alt={resource.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white/90 text-slate-800 backdrop-blur-sm">
                        {resource.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-[#127485] transition-colors line-clamp-2 mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                        {resource.excerpt}
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {resource.read_time}
                      </span>
                      <span className="text-[#127485] font-semibold flex items-center gap-0.5">
                        Read Guide <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: ACCORDION FAQ SECTION
        ========================================================================== */}
        <section id="faqs-section" className="py-16 sm:py-24 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#127485] text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 block">
                Common Questions
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 text-base">
                Clear answers regarding our upcoming private-pay services, insurance onboarding, agency transitions, and scheduling.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#127485]"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-base text-slate-900">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#127485]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-10 p-6 sm:p-7 rounded-2xl bg-teal-50/70 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-900 text-base">Have more specific questions?</h4>
                <p className="text-slate-600 text-xs sm:text-sm">Explore our complete searchable knowledge base or speak with our Georgia care coordinators.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Link href="/faq" id="homepage-view-all-faqs-btn" className="w-full sm:w-auto">
                  <Button variant="secondary" size="md" className="w-full justify-center text-xs font-bold">
                    View All FAQs
                  </Button>
                </Link>
                <Link href="/contact" id="faq-contact-link" className="w-full sm:w-auto">
                  <Button variant="primary" size="md" className="w-full justify-center text-xs font-bold">
                    Contact Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: FINAL HIGH-CONVERSION CTA SECTION
        ========================================================================== */}
        <section className="py-20 bg-gradient-to-br from-[#127485] via-[#0D515D] to-slate-900 text-white text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-200 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-4 h-4 text-[#7CB342]" />
              Reliable, Dignified Home Care
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Ready for a Better Home Care Experience?
            </h2>

            <p className="text-lg sm:text-xl text-teal-100 leading-relaxed mb-10 max-w-2xl mx-auto">
              Whether you’re arranging care for the first time or considering a change from an unreliable agency, we are here to support your family every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/request-care" id="final-cta-request-care-btn">
                <Button variant="accent" size="lg" className="w-full sm:w-auto font-bold shadow-xl">
                  Get Your Free Care Assessment
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>

              <a
                href="tel:4049997936"
                id="final-cta-phone-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-lg transition-all"
              >
                <Phone className="w-5 h-5 mr-2 text-[#7CB342]" />
                Call (404) 999-7936
              </a>
            </div>

            <p className="text-xs text-teal-200/80 mt-6">
              Private-Pay Home Care (Coming Soon) • Serving Lawrenceville, Atlanta & Surrounding Georgia Communities
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
