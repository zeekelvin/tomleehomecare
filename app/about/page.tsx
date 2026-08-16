import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button, ClientApprovalTag, Badge } from '@/components/ui/button';
import {
  ShieldCheck,
  Heart,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Award,
  UserCheck,
  FileSearch,
  BookOpen,
  Headphones,
  MapPin,
  Stethoscope,
  HeartHandshake,
  Check,
} from 'lucide-react';

export const metadata = {
  title: 'About TomLee Homecare LLC | Our Mission, Values & Care Standards',
  description:
    'Learn about TomLee Homecare LLC, a trusted Georgia-based non-medical home care agency dedicated to reliable, compassionate, private-pay senior care (coming soon) & insurance onboarding.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {/* Page Hero */}
        <section className="bg-gradient-to-b from-teal-50/60 to-white py-14 lg:py-20 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 text-[#127485] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 border border-teal-200">
              <ShieldCheck className="w-4 h-4 text-[#7CB342]" />
              About TomLee Homecare LLC
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Empowering Georgia Seniors to Live with Dignity & Independence
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              We were founded on a simple conviction: families deserve a home care partner they can truly count on. Compassionate caregivers, honest communication, and unwavering reliability.
            </p>
          </div>
        </section>

        {/* Company Story & Philosophy */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-slate-100">
                  <Image
                    src="/images/services/companion-care.jpg"
                    alt="Caregiver offering heartfelt companionship to an older adult in a warm home"
                    fill
                    sizes="(max-width: 1024px) 100vw, 550px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-white py-3 px-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 hidden sm:flex">
                  <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[#127485] shrink-0">
                    <HeartHandshake className="w-5 h-5 text-[#7CB342]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">100% Dedicated Care</p>
                    <p className="text-[11px] text-slate-500">Personalized to daily routines</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-center">
                <span className="text-[#127485] text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 block">
                  Our Philosophy
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  More Than Just Care Hours — A True Partnership
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-4">
                  Home care isn’t just about completing a checklist of tasks. It is about honoring the life, independence, and comfort of the individuals we serve while providing stressed families with total peace of mind.
                </p>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  TomLee Homecare LLC is actively preparing our <strong className="text-slate-800">private-pay non-medical home care</strong> rollout and getting signed up with insurance providers across Georgia. This client-directed model enables complete flexibility over schedules, customized caregiver matching, and personal care plans without rigid outside restrictions.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#7CB342] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Reliability Above All</h4>
                      <p className="text-xs text-slate-600">No last-minute cancellations or unexpected gaps in your care plan.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#7CB342] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Transparent Family Updates</h4>
                      <p className="text-xs text-slate-600">You are always informed about your loved one’s daily wellness and routines.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#7CB342] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Dignity-First Personal Care</h4>
                      <p className="text-xs text-slate-600">Sensitive personal hygiene and mobility assistance delivered with patience.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5-STAGE CAREGIVER VETTING PROTOCOL */}
        <section className="py-16 sm:py-20 bg-[#F8FAFB] border-t border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#127485] text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 block">
                Quality & Safety Standards
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Our 5-Stage Caregiver Vetting Protocol
              </h2>
              <p className="text-slate-600 text-base">
                Only the top 5% of caregiver applicants join the TomLee team after completing rigorous clinical screening, background checks, and values evaluations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Stage 1 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#127485] flex items-center justify-center mb-3">
                    <FileSearch className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">Stage 01</span>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">DHS & Criminal Background</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Comprehensive multi-state criminal background screening, OIG exclusion review, and Georgia DHS credential checks.
                  </p>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#127485] flex items-center justify-center mb-3">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">Stage 02</span>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">Hands-On Skills Verification</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Practical assessments in safe transfer mechanics, personal hygiene assistance, and fall prevention protocols.
                  </p>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#127485] flex items-center justify-center mb-3">
                    <Heart className="w-5 h-5 text-[#7CB342]" />
                  </div>
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">Stage 03</span>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">Empathy & Character Interview</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Behavioral evaluation focusing on patience, compassionate demeanor, active listening, and elder dignity.
                  </p>
                </div>
              </div>

              {/* Stage 4 */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#127485] flex items-center justify-center mb-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">Stage 04</span>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">Specialized Dementia Training</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Client communication techniques, gentle redirection for memory loss, and nutritional meal prep instruction.
                  </p>
                </div>
              </div>

              {/* Stage 5 */}
              <div className="bg-white p-5 rounded-2xl border border-teal-200 bg-teal-50/40 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#127485] flex items-center justify-center mb-3">
                    <Award className="w-5 h-5 text-[#7CB342]" />
                  </div>
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">Stage 05</span>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">Supervisor Shadowing & Audits</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Initial shifts shadowed by a care manager with routine unannounced quality and punctuality audits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">Our Core Principles</h2>
              <p className="text-slate-600 text-base">The non-negotiable standards that guide every caregiver and care coordinator at TomLee.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#F8FAFB] p-8 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#127485] flex items-center justify-center mb-5">
                  <Heart className="w-6 h-6 text-[#7CB342]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Compassion & Empathy</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We treat every client as we would our own parents and grandparents — with deep warmth, active listening, and genuine patience.
                </p>
              </div>

              <div className="bg-[#F8FAFB] p-8 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#127485] flex items-center justify-center mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Unwavering Dependability</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Families rely on us during critical moments. Punctuality, caregiver backup systems, and accountability are non-negotiable.
                </p>
              </div>

              <div className="bg-[#F8FAFB] p-8 rounded-2xl border border-slate-200/80 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#127485] flex items-center justify-center mb-5">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Family Collaboration</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Caregiving is a team effort. We work hand-in-hand with family members, keeping lines of communication open and clear.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CARE LEADERSHIP TEAM SECTION */}
        <section className="py-16 sm:py-20 bg-[#F8FAFB] border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#127485] text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 block">
                Dedicated Support Team
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Meet the Care Leadership Behind TomLee
              </h2>
              <p className="text-slate-600 text-base">
                Experienced professionals who guide our caregivers, oversee customized care plans, and ensure every family receives responsive support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Leader 1 */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col">
                <div className="relative h-64 w-full bg-slate-100">
                  <Image
                    src="/images/team/linda-chen.jpg"
                    alt="Director of Care Management"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-slate-900 text-lg">Miriam Sterling, RN</h3>
                      <Badge variant="active" className="text-[10px]">Leadership</Badge>
                    </div>
                    <p className="text-[#127485] font-semibold text-xs mb-3">Director of Client Care</p>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      With over 14 years in geriatric home care management, Miriam oversees client assessments, personalized care plan development, and quality assurance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Leader 2 */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col">
                <div className="relative h-64 w-full bg-slate-100">
                  <Image
                    src="/images/team/michael-sterling.jpg"
                    alt="Lead Care Coordinator"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-slate-900 text-lg">Marcus Thornton</h3>
                      <Badge variant="active" className="text-[10px]">Coordination</Badge>
                    </div>
                    <p className="text-[#127485] font-semibold text-xs mb-3">Lead Caregiver Coordinator</p>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Marcus manages caregiver scheduling, client-caregiver compatibility matching, and our guaranteed backup caregiver response team.
                    </p>
                  </div>
                </div>
              </div>

              {/* Leader 3 */}
              <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col">
                <div className="relative h-64 w-full bg-slate-100">
                  <Image
                    src="/images/team/angela-rivera.jpg"
                    alt="Supervisor of Caregiver Training"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-slate-900 text-lg">Kendra Washington</h3>
                      <Badge variant="active" className="text-[10px]">Training</Badge>
                    </div>
                    <p className="text-[#127485] font-semibold text-xs mb-3">Caregiver Training Supervisor</p>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Kendra conducts comprehensive orientation, dementia care protocols, and ongoing hands-on skill verification for our caregiving staff.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verified Claims & Disclaimers Strip */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#127485]" />
                Standards & Compliance Governance
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                TomLee Homecare LLC operates as a non-medical private-duty home care agency. Services are designed to support activities of daily living (ADLs) and instrumental activities of daily living (IADLs). We do not administer prescription medications or conduct medical diagnostics.
              </p>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/80">
                <ClientApprovalTag claimName="Free Care Assessment" />
                <ClientApprovalTag claimName="Caregiver Matching" />
                <ClientApprovalTag claimName="Backup Guarantee" />
                <ClientApprovalTag claimName="Home Fall Safety Review" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#127485] text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Let Us Help You Design the Right Care Plan</h2>
            <p className="text-teal-100 text-base mb-8 max-w-xl mx-auto">
              Schedule a personalized conversation with our care coordinators to discuss your loved one’s unique routine.
            </p>
            <Link href="/request-care">
              <Button variant="accent" size="lg" className="font-bold">
                Get a Free Care Assessment
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
