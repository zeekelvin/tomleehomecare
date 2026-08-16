'use client';

import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button, Badge } from '@/components/ui/button';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Heart,
  Clock,
  Sparkles,
  Phone,
  Lock,
  UserCheck,
  MapPin,
  CreditCard,
  Calendar,
  RefreshCw,
  Printer,
  Check,
  Info,
  Activity,
  Award,
  Zap,
} from 'lucide-react';
import {
  LeadIntent,
  CareRecipientRelationship,
  PaymentMethod,
  Urgency,
  PreferredContactMethod,
} from '@/types';
import { calculateQualificationScore } from '@/lib/qualification';

const WIZARD_STEPS = [
  { step: 1, title: 'Situation', subtitle: 'Care Context' },
  { step: 2, title: 'Recipient', subtitle: 'Loved One' },
  { step: 3, title: 'Services', subtitle: 'Care Scope' },
  { step: 4, title: 'Location', subtitle: 'GA Coverage' },
  { step: 5, title: 'Funding', subtitle: 'Private Pay (Coming Soon) & Insurance' },
  { step: 6, title: 'Timeline', subtitle: 'Start Date' },
  { step: 7, title: 'Contact', subtitle: 'HIPAA & Submit' },
];

function RequestCareWizardContent() {
  const searchParams = useSearchParams();
  const initialIntent = (searchParams.get('intent') as LeadIntent) || 'first_time';
  const initialService = searchParams.get('service') || '';

  // Wizard Step (1 through 7)
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepErrors, setStepErrors] = useState<string | null>(null);

  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    leadId?: string;
    qualificationStatus?: string;
    qualificationScore?: number;
    serviceAreaStatus?: string;
    isSwitchingProvider?: boolean;
    message?: string;
  } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    lead_intent: initialIntent,
    care_recipient_relationship: 'parent' as CareRecipientRelationship,
    mobility_level: 'standby_assist',
    care_frequency: '8_hours_daily',
    services_requested: initialService ? [initialService] : ['personal-care', 'meal-preparation'],
    city: 'Atlanta',
    state: 'GA',
    zip_code: '30328',
    payment_method: 'private_pay' as PaymentMethod,
    urgency: 'immediately' as Urgency,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    preferred_contact_method: 'phone' as PreferredContactMethod,
    best_time_to_contact: 'Morning (9am - 12pm)',
    internal_notes: '',
    consent: true,
  });

  // Calculate live score for user feedback during the questionnaire
  const liveQualification = useMemo(() => {
    return calculateQualificationScore({
      lead_intent: formData.lead_intent,
      care_recipient_relationship: formData.care_recipient_relationship,
      services_requested: formData.services_requested,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zip_code,
      payment_method: formData.payment_method,
      urgency: formData.urgency,
      phone: formData.phone,
      first_name: formData.first_name,
    });
  }, [formData]);

  const toggleService = (slug: string) => {
    setFormData((prev) => {
      const exists = prev.services_requested.includes(slug);
      if (exists) {
        return {
          ...prev,
          services_requested: prev.services_requested.filter((s) => s !== slug),
        };
      } else {
        return {
          ...prev,
          services_requested: [...prev.services_requested, slug],
        };
      }
    });
  };

  const validateCurrentStep = (): boolean => {
    setStepErrors(null);

    if (currentStep === 3) {
      if (formData.services_requested.length === 0) {
        setStepErrors('Please select at least one care service.');
        return false;
      }
    }

    if (currentStep === 4) {
      if (!formData.city.trim()) {
        setStepErrors('Please enter the Georgia city where care will be provided.');
        return false;
      }
      if (!formData.zip_code.trim() || formData.zip_code.trim().length < 5) {
        setStepErrors('Please enter a valid 5-digit Georgia ZIP code.');
        return false;
      }
    }

    if (currentStep === 7) {
      if (!formData.first_name.trim() || !formData.last_name.trim()) {
        setStepErrors('Please provide your first and last name.');
        return false;
      }
      if (!formData.phone.trim() || formData.phone.trim().length < 7) {
        setStepErrors('Please provide a valid contact phone number.');
        return false;
      }
      if (!formData.consent) {
        setStepErrors('Please accept the care consultation consent checkbox.');
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) return;

    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStepErrors(null);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const jumpToStep = (targetStep: number) => {
    if (targetStep < currentStep) {
      setStepErrors(null);
      setCurrentStep(targetStep);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    setStepErrors(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          internal_notes: `[Mobility: ${formData.mobility_level}] [Frequency: ${formData.care_frequency}] ${formData.internal_notes}`,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setSubmissionResult({
          success: true,
          leadId: data.leadId,
          qualificationStatus: data.qualificationStatus,
          qualificationScore: data.qualificationScore,
          serviceAreaStatus: data.serviceAreaStatus,
          isSwitchingProvider: data.isSwitchingProvider,
          message: data.message,
        });
        window.scrollTo({ top: 80, behavior: 'smooth' });
      } else {
        setStepErrors(data.error || 'There was an error submitting your care request.');
      }
    } catch (err) {
      setStepErrors('Unable to process your request right now. Please call us at (404) 999-7936.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableServices = [
    {
      category: 'Daily Personal Living',
      items: [
        { slug: 'personal-care', name: 'Personal Care & Hygiene', desc: 'Bathing, dressing, grooming, skin & oral care' },
        { slug: 'mobility-transfers', name: 'Mobility & Transfer Assistance', desc: 'Bed-to-chair transfers, walking safety, fall avoidance' },
        { slug: 'toileting-incontinence-care', name: 'Toileting & Incontinence Care', desc: 'Dignified hygiene routines, schedule management' },
      ],
    },
    {
      category: 'Nutrition & Home Safety',
      items: [
        { slug: 'meal-preparation', name: 'Nutritious Meal Preparation', desc: 'Dietary-compliant cooking, hydration tracking' },
        { slug: 'light-housekeeping', name: 'Light Housekeeping & Cleanliness', desc: 'Bed linens, laundry, kitchen tidying, clear pathways' },
        { slug: 'medication-reminders', name: 'Medication Routine Reminders', desc: 'Timely reminders from pre-packaged pill organizers' },
      ],
    },
    {
      category: 'Specialized & Continuous Care',
      items: [
        { slug: 'companion-care', name: 'Companion Care & Mental Engagement', desc: 'Conversation, games, cognitive stimulation, walks' },
        { slug: 'dementia-alzheimers-support', name: 'Dementia & Alzheimer’s Support', desc: 'Gentle redirection, wandering prevention, memory cues' },
        { slug: 'respite-care', name: 'Respite Care for Family Caregivers', desc: 'Short-term relief to prevent family caregiver burnout' },
        { slug: 'overnight-weekend-care', name: 'Overnight & 24-Hour Coverage', desc: 'Active night monitoring, bathroom assistance' },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <Header />

      <main id="main-content" className="flex-1 py-10 sm:py-16 focus:outline-none" tabIndex={-1}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-[#127485] text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4 text-[#7CB342]" />
              7-Step Georgia Care Assessment
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
              Personalized In-Home Care Assessment
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Complete this guided questionnaire to evaluate your family&apos;s routine, verify Georgia coverage, calculate estimated rates, and match the ideal qualified caregiver.
            </p>
          </div>

          {/* Stepper Navigation Bar */}
          {!submissionResult && (
            <div className="mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {WIZARD_STEPS.map((step) => {
                  const isCompleted = step.step < currentStep;
                  const isCurrent = step.step === currentStep;

                  return (
                    <button
                      key={step.step}
                      type="button"
                      onClick={() => jumpToStep(step.step)}
                      disabled={step.step > currentStep}
                      className={`flex flex-col items-center text-center p-1.5 sm:p-2 rounded-xl transition-all ${
                        isCurrent
                          ? 'bg-teal-50 text-[#127485] font-bold ring-2 ring-[#127485]'
                          : isCompleted
                          ? 'text-slate-700 hover:bg-slate-50 cursor-pointer'
                          : 'text-slate-400 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[11px] font-bold mb-1 transition-colors ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-[#127485] text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.step}
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold truncate hidden sm:block">
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Progress Line */}
              <div className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#127485] via-teal-500 to-[#7CB342] transition-all duration-300 rounded-full"
                  style={{ width: `${(currentStep / 7) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Wizard Card Body */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
            {/* Live Real-time Scoring Bar */}
            {!submissionResult && (
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#7CB342]" />
                  <span className="font-semibold text-slate-300">Care Assessment Score:</span>
                  <span className="font-extrabold text-white bg-slate-700 px-2 py-0.5 rounded-md font-mono">
                    {liveQualification.score} / 100
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-[11px] text-teal-300 font-semibold">
                    <Zap className="w-3 h-3 text-[#7CB342]" />
                    {formData.lead_intent === 'unhappy_with_current_provider'
                      ? 'Priority Transition Active'
                      : liveQualification.score >= 80
                      ? 'Fast-Track Matching'
                      : 'Consultation In Progress'}
                  </span>
                  <span className="hidden sm:inline text-slate-400">|</span>
                  <span className="hidden sm:inline text-[11px] text-slate-300">
                    GA Service: <strong className="text-white uppercase">{formData.city}, {formData.state}</strong>
                  </span>
                </div>
              </div>
            )}

            <div className="p-6 sm:p-10">
              {submissionResult ? (
                /* SUCCESS RECEIPT VIEW */
                <div className="text-center py-6 animate-in fade-in duration-300" id="assessment-success-receipt">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                    Care Assessment Confirmed
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                    Assessment Received for {formData.first_name} {formData.last_name}
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
                    Thank you. Our Georgia care coordination team has logged your care preferences and is matching available qualified caregivers in <strong className="text-slate-900">{formData.city}, GA ({formData.zip_code})</strong>.
                  </p>

                  {/* Summary Card */}
                  <div className="max-w-lg mx-auto p-6 rounded-2xl bg-teal-50/70 border border-teal-200 text-left mb-8 space-y-3.5 text-xs shadow-sm">
                    <div className="flex items-center justify-between pb-2 border-b border-teal-200/80">
                      <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Reference Number:</span>
                      <span className="font-mono font-bold text-slate-900 text-sm">{submissionResult.leadId}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Qualification Score:</span>
                      <span className="font-bold text-slate-900">{submissionResult.qualificationScore} / 100 (Qualified)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Funding Model:</span>
                      <span className="font-bold text-slate-900 capitalize">
                        {formData.payment_method === 'private_pay' ? 'Private Pay (Coming Soon) / LTCI' : formData.payment_method}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Selected Services:</span>
                      <span className="font-bold text-slate-900">{formData.services_requested.length} Services Selected</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Preferred Contact:</span>
                      <span className="font-bold text-slate-900 capitalize">{formData.preferred_contact_method} ({formData.best_time_to_contact})</span>
                    </div>

                    {submissionResult.isSwitchingProvider && (
                      <div className="pt-2 border-t border-teal-200 flex items-center gap-2 text-indigo-900 font-bold">
                        <RefreshCw className="w-4 h-4 text-indigo-600 shrink-0" />
                        Flagged for 48-Hour Zero-Gap Agency Transition
                      </div>
                    )}
                  </div>

                  {/* What Happens Next 3-Step Timeline */}
                  <div className="max-w-xl mx-auto text-left mb-8">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#127485]" />
                      What Happens Next in Georgia
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-teal-100 text-[#127485] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          1
                        </div>
                        <div>
                          <strong className="text-slate-900 text-xs block">Care Coordinator Phone Consultation</strong>
                          <p className="text-[11px] text-slate-600">
                            Our intake specialist will call at your preferred time to review routines, care needs, and answer questions regarding our upcoming private-pay services and insurance onboarding.
                          </p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-teal-100 text-[#127485] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          2
                        </div>
                        <div>
                          <strong className="text-slate-900 text-xs block">Complimentary In-Home Care Plan Assessment</strong>
                          <p className="text-[11px] text-slate-600">
                            We visit the home in {formData.city} to conduct a personalized safety and routine assessment and formulate your custom Care Plan.
                          </p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-teal-100 text-[#127485] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          3
                        </div>
                        <div>
                          <strong className="text-slate-900 text-xs block">Vetted Caregiver Introduction & Start of Care</strong>
                          <p className="text-[11px] text-slate-600">
                            We introduce your background-checked, credentialed caregiver to ensure personality fit and dependable daily support.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100">
                    <a
                      href="tel:4049997936"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#127485] hover:bg-[#0A4E5A] text-white text-xs font-bold shadow-md transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#7CB342]" />
                      Call Intake Line: (404) 999-7936
                    </a>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                    >
                      <Printer className="w-4 h-4 text-slate-600" />
                      Print Receipt
                    </button>
                    <Link href="/" className="w-full sm:w-auto">
                      <Button variant="ghost" size="md" className="w-full justify-center text-xs">
                        Return Home
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                /* 7 STEP-BY-STEP FORM */
                <form onSubmit={handleSubmit}>
                  {stepErrors && (
                    <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in duration-150">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{stepErrors}</span>
                    </div>
                  )}

                  {/* STEP 1: SITUATION & INTENT */}
                  {currentStep === 1 && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div>
                        <span className="text-xs font-bold text-[#127485] uppercase tracking-wider block mb-1">
                          Step 1 of 7: Care Situation
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                          What best describes your care circumstances today?
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                          Selecting your circumstance allows us to customize the transition and intake protocols.
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        {[
                          {
                            value: 'first_time',
                            label: 'Arranging in-home care for the first time',
                            desc: 'We need expert guidance on daily personal routines, scheduling, and safe home care.',
                          },
                          {
                            value: 'unhappy_with_current_provider',
                            label: 'Unhappy with our current home care agency and looking to switch',
                            desc: 'Experiencing caregiver no-shows, high turnover, poor communication, or lack of reliability.',
                            highlight: true,
                          },
                          {
                            value: 'additional_care',
                            label: 'Seeking additional care hours, night shifts, or weekend coverage',
                            desc: 'Supplemental support to assist family or provide relief on specific days.',
                          },
                          {
                            value: 'temporary_respite',
                            label: 'Temporary respite care for family relief',
                            desc: 'Short-term scheduled relief so primary family caregivers can rest, travel, or recover.',
                          },
                          {
                            value: 'comparing_providers',
                            label: 'Researching and comparing providers for upcoming planning',
                            desc: 'Preparing ahead for anticipated post-surgery recovery or progressive care needs.',
                          },
                        ].map((item) => (
                          <label
                            key={item.value}
                            className={`flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                              formData.lead_intent === item.value
                                ? 'border-[#127485] bg-teal-50/70 shadow-sm ring-2 ring-[#127485]'
                                : item.highlight
                                ? 'border-indigo-200 bg-indigo-50/30 hover:border-indigo-300'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="lead_intent"
                              value={item.value}
                              checked={formData.lead_intent === item.value}
                              onChange={() =>
                                setFormData({
                                  ...formData,
                                  lead_intent: item.value as LeadIntent,
                                })
                              }
                              className="mt-1 h-4 w-4 text-[#127485] focus:ring-[#127485]"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 text-sm sm:text-base">
                                  {item.label}
                                </span>
                                {item.highlight && (
                                  <Badge variant="switching" className="text-[10px]">
                                    Switching Provider
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>

                      {formData.lead_intent === 'unhappy_with_current_provider' && (
                        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 flex items-start gap-3 animate-in fade-in duration-200">
                          <RefreshCw className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="block font-bold mb-0.5">TomLee 48-Hour Zero-Gap Switching Protocol</strong>
                            We manage the entire transition smoothly: coordinating schedules, obtaining existing care instructions, and introducing a vetted caregiver with zero interruption to your loved one&apos;s daily routine.
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 2: RECIPIENT & CARE LEVEL */}
                  {currentStep === 2 && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div>
                        <span className="text-xs font-bold text-[#127485] uppercase tracking-wider block mb-1">
                          Step 2 of 7: Care Recipient & Mobility
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                          Who will be receiving care and what is their mobility level?
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                          This helps us match caregivers with appropriate physical capabilities and experience.
                        </p>
                      </div>

                      {/* Relationship */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Relationship to Care Recipient *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { value: 'parent', label: 'My Mother or Father' },
                            { value: 'spouse_partner', label: 'My Spouse or Partner' },
                            { value: 'myself', label: 'Myself (Direct Inquirer)' },
                            { value: 'grandparent', label: 'My Grandparent' },
                            { value: 'other_family_member', label: 'Another Family Relative' },
                            { value: 'client_friend', label: 'A Client, Friend, or Ward' },
                          ].map((item) => (
                            <label
                              key={item.value}
                              className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                                formData.care_recipient_relationship === item.value
                                  ? 'border-[#127485] bg-teal-50 font-bold text-slate-900 shadow-sm ring-1 ring-[#127485]'
                                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                              }`}
                            >
                              <input
                                type="radio"
                                name="relationship"
                                value={item.value}
                                checked={formData.care_recipient_relationship === item.value}
                                onChange={() =>
                                  setFormData({
                                    ...formData,
                                    care_recipient_relationship: item.value as CareRecipientRelationship,
                                  })
                                }
                                className="h-4 w-4 text-[#127485] focus:ring-[#127485]"
                              />
                              <span className="text-xs sm:text-sm">{item.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Mobility & Physical Level */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Current Physical Mobility & Independence Level
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { value: 'independent', label: 'Independent with Standby Supervision', desc: 'Walks independently; requires safety oversight.' },
                            { value: 'standby_assist', label: 'Requires 1-Person Transfer Assistance', desc: 'Needs hands-on help rising from chair, bed, or toilet.' },
                            { value: 'wheelchair_bound', label: 'Wheelchair / Walker Dependent', desc: 'Requires active assistance navigating doorways & transfers.' },
                            { value: 'bedbound_total_assist', label: 'Bedbound / Total Personal Care', desc: 'Requires full repositioning, bed baths, and total assist.' },
                          ].map((mob) => (
                            <label
                              key={mob.value}
                              className={`flex flex-col p-3.5 rounded-xl border cursor-pointer transition-all ${
                                formData.mobility_level === mob.value
                                  ? 'border-[#127485] bg-teal-50/70 shadow-sm ring-1 ring-[#127485]'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <input
                                  type="radio"
                                  name="mobility"
                                  value={mob.value}
                                  checked={formData.mobility_level === mob.value}
                                  onChange={() =>
                                    setFormData({ ...formData, mobility_level: mob.value })
                                  }
                                  className="h-4 w-4 text-[#127485] focus:ring-[#127485]"
                                />
                                <span className="font-bold text-xs sm:text-sm text-slate-900">{mob.label}</span>
                              </div>
                              <p className="text-[11px] text-slate-500 pl-6">{mob.desc}</p>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: SERVICES REQUESTED */}
                  {currentStep === 3 && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-xs font-bold text-[#127485] uppercase tracking-wider block mb-1">
                            Step 3 of 7: Required Services
                          </span>
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                            Which services will be included in the Care Plan?
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-600 mt-1">
                            Select all areas where your loved one will benefit from daily support.
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#127485] bg-teal-50 px-3 py-1 rounded-full border border-teal-200 self-start sm:self-auto">
                          {formData.services_requested.length} Selected
                        </span>
                      </div>

                      <div className="space-y-6 pt-1">
                        {availableServices.map((cat) => (
                          <div key={cat.category}>
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#127485]" />
                              {cat.category}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {cat.items.map((srv) => {
                                const isSelected = formData.services_requested.includes(srv.slug);
                                return (
                                  <label
                                    key={srv.slug}
                                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                                      isSelected
                                        ? 'border-[#127485] bg-teal-50/70 shadow-sm ring-1 ring-[#127485]'
                                        : 'border-slate-200 hover:border-slate-300 bg-white'
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={isSelected}
                                      onChange={() => toggleService(srv.slug)}
                                      className="mt-1 h-4 w-4 rounded text-[#127485] focus:ring-[#127485]"
                                    />
                                    <div>
                                      <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                                        {srv.name}
                                      </span>
                                      <p className="text-[11px] text-slate-500 mt-0.5">{srv.desc}</p>
                                    </div>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: GEORGIA LOCATION & SERVICE AREA */}
                  {currentStep === 4 && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div>
                        <span className="text-xs font-bold text-[#127485] uppercase tracking-wider block mb-1">
                          Step 4 of 7: Georgia Location
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                          Where in Georgia will care be provided?
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                          We verify live coverage across Fulton, Cobb, Gwinnett, DeKalb, Cherokee, and Forsyth counties.
                        </p>
                      </div>

                      <div className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              City / Community *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                              placeholder="e.g. Alpharetta, Atlanta, Marietta, Sandy Springs"
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#127485] text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              5-Digit ZIP Code *
                            </label>
                            <input
                              type="text"
                              required
                              maxLength={5}
                              value={formData.zip_code}
                              onChange={(e) =>
                                setFormData({ ...formData, zip_code: e.target.value })
                              }
                              placeholder="e.g. 30328"
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#127485] text-sm"
                            />
                          </div>
                        </div>

                        {/* Real-time Georgia Coverage Status Indicator */}
                        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-950 flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-[#127485] shrink-0 mt-0.5" />
                          <div>
                            <strong className="block font-bold text-slate-900 mb-0.5">
                              Active Georgia Dispatch Zone Confirmed
                            </strong>
                            <span>
                              TomLee Homecare caregivers are actively stationed across Metro Atlanta. Guaranteed caregiver matching and in-home assessments available in {formData.city || 'your area'}.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 5: FUNDING & FINANCIAL TRANSPARENCY */}
                  {currentStep === 5 && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div>
                        <span className="text-xs font-bold text-[#127485] uppercase tracking-wider block mb-1">
                          Step 5 of 7: Payment & Funding
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                          How will home care services be funded?
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                          TomLee Homecare is actively working on insurance onboarding while preparing our <strong>Private-Pay (Coming Soon)</strong> model with full support for Long-Term Care Insurance reimbursement.
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        {[
                          {
                            value: 'private_pay',
                            label: 'Private Pay Coming Soon (Out-of-Pocket or Long-Term Care Insurance)',
                            desc: 'Hourly rates typically range from $28–$36/hr based on care level. We are completing insurance onboarding and preparing private-pay care rollout with documentation for LTCI reimbursement claims.',
                            badge: 'Coming Soon',
                          },
                          {
                            value: 'not_sure',
                            label: 'Not sure / Need consultation on payment and scheduling options',
                            desc: 'We will review rate structures, shift minimums, and LTCI claim filing assistance during your initial intake call.',
                          },
                          {
                            value: 'medicaid',
                            label: 'Georgia Medicaid / Waiver Programs (CCSP / SOURCE)',
                            desc: 'Note: Medicaid waiver programs are currently scheduled for future phase rollout. We can advise on transitional private-pay options today.',
                          },
                        ].map((item) => (
                          <label
                            key={item.value}
                            className={`flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                              formData.payment_method === item.value
                                ? 'border-[#127485] bg-teal-50/70 shadow-sm ring-2 ring-[#127485]'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="payment_method"
                              value={item.value}
                              checked={formData.payment_method === item.value}
                              onChange={() =>
                                setFormData({
                                  ...formData,
                                  payment_method: item.value as PaymentMethod,
                                })
                              }
                              className="mt-1 h-4 w-4 text-[#127485] focus:ring-[#127485]"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 text-sm sm:text-base">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <Badge variant="active" className="text-[10px]">
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>

                      {/* Transparent Rate Box */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-[#127485]" />
                          Transparent Financial Standards
                        </div>
                        <p>
                          No hidden administrative fees, no long-term contracts. Shift minimums apply with flexible cancellation terms.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STEP 6: TIMELINE & URGENCY */}
                  {currentStep === 6 && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div>
                        <span className="text-xs font-bold text-[#127485] uppercase tracking-wider block mb-1">
                          Step 6 of 7: Start Date & Schedule
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                          How soon would you like care to begin?
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                          We accommodate urgent hospital discharges as well as advance planning.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {[
                          {
                            value: 'immediately',
                            label: 'Immediately (Next 24–48 Hours)',
                            desc: 'Priority expedited caregiver assignment for urgent post-discharge needs.',
                            urgent: true,
                          },
                          {
                            value: 'within_a_few_days',
                            label: 'Within a few days',
                            desc: 'Standard intake and complimentary in-home assessment this week.',
                          },
                          {
                            value: 'within_1_2_weeks',
                            label: 'Within 1 to 2 weeks',
                            desc: 'Comfortable timeline for scheduling and family meetings.',
                          },
                          {
                            value: 'within_a_month',
                            label: 'Within a month',
                            desc: 'Planning ahead for planned medical procedures or seasonal support.',
                          },
                          {
                            value: 'planning_ahead',
                            label: 'Planning ahead / Comparing options',
                            desc: 'Gathering information and preparing for future family care needs.',
                          },
                        ].map((item) => (
                          <label
                            key={item.value}
                            className={`flex flex-col p-4 rounded-2xl border cursor-pointer transition-all ${
                              formData.urgency === item.value
                                ? 'border-[#127485] bg-teal-50/70 shadow-sm ring-2 ring-[#127485]'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name="urgency"
                                  value={item.value}
                                  checked={formData.urgency === item.value}
                                  onChange={() =>
                                    setFormData({
                                      ...formData,
                                      urgency: item.value as Urgency,
                                    })
                                  }
                                  className="h-4 w-4 text-[#127485] focus:ring-[#127485]"
                                />
                                <span className="font-bold text-xs sm:text-sm text-slate-900">
                                  {item.label}
                                </span>
                              </div>
                              {item.urgent && (
                                <Badge variant="urgent" className="text-[10px]">
                                  Expedited
                                </Badge>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">{item.desc}</p>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 7: CONTACT DETAILS, HIPAA SAFEGUARDS & SUBMISSION */}
                  {currentStep === 7 && (
                    <div className="space-y-5 animate-in fade-in duration-200">
                      <div>
                        <span className="text-xs font-bold text-[#127485] uppercase tracking-wider block mb-1">
                          Step 7 of 7: Contact & Final Authorization
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                          Where should we send your Care Assessment results?
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                          A dedicated Georgia care coordinator will reach out directly to finalize details.
                        </p>
                      </div>

                      <div className="space-y-4 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              First Name *
                            </label>
                            <input
                              type="text"
                              id="wizard-first-name"
                              required
                              value={formData.first_name}
                              onChange={(e) =>
                                setFormData({ ...formData, first_name: e.target.value })
                              }
                              placeholder="e.g. John"
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#127485] text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Last Name *
                            </label>
                            <input
                              type="text"
                              id="wizard-last-name"
                              required
                              value={formData.last_name}
                              onChange={(e) =>
                                setFormData({ ...formData, last_name: e.target.value })
                              }
                              placeholder="e.g. Smith"
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#127485] text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Contact Phone Number *
                            </label>
                            <input
                              type="tel"
                              id="wizard-phone"
                              required
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                              placeholder="(404) 555-0123"
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#127485] text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="wizard-email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              placeholder="john.smith@example.com"
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#127485] text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Preferred Contact Method
                            </label>
                            <select
                              id="wizard-contact-method"
                              value={formData.preferred_contact_method}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  preferred_contact_method: e.target.value as PreferredContactMethod,
                                })
                              }
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#127485] text-sm"
                            >
                              <option value="phone">Phone Call</option>
                              <option value="email">Email</option>
                              <option value="text">Text Message (SMS)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                              Best Time to Call
                            </label>
                            <select
                              id="wizard-best-time"
                              value={formData.best_time_to_contact}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  best_time_to_contact: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#127485] text-sm"
                            >
                              <option value="Morning (9am - 12pm)">Morning (9am – 12pm)</option>
                              <option value="Afternoon (1pm - 5pm)">Afternoon (1pm – 5pm)</option>
                              <option value="Evening (5pm - 7pm)">Evening (5pm – 7pm)</option>
                              <option value="Anytime">Anytime / ASAP</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Additional Routine Notes or Caregiver Preferences (Optional)
                          </label>
                          <textarea
                            id="wizard-notes"
                            rows={3}
                            value={formData.internal_notes}
                            onChange={(e) =>
                              setFormData({ ...formData, internal_notes: e.target.value })
                            }
                            placeholder="Share any details on preferred hours, days of the week, pet allergies, or special routine habits..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#127485] text-sm"
                          />
                        </div>

                        {/* Explicit HIPAA Minimal PHI Warning */}
                        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="block font-bold mb-0.5">HIPAA Minimal Data Intake Notice</strong>
                            To protect your privacy and ensure compliance with healthcare standards, please do NOT submit Social Security Numbers, insurance policy codes, or sensitive medical diagnostic records in this initial questionnaire. Comprehensive clinical health records will be reviewed in person during your confidential RN assessment.
                          </div>
                        </div>

                        {/* Consent Checkbox */}
                        <label className="flex items-start gap-3 text-xs text-slate-700 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            required
                            checked={formData.consent}
                            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                            className="mt-0.5 h-4 w-4 rounded text-[#127485] focus:ring-[#127485]"
                          />
                          <span>
                            I authorize TomLee Homecare LLC to contact me regarding in-home care services in Georgia. We respect your confidentiality and never share your data.
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Wizard Footer Step Controls */}
                  <div className="pt-8 mt-8 border-t border-slate-200 flex items-center justify-between gap-4">
                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="md"
                        onClick={prevStep}
                        className="text-slate-600 hover:text-slate-900 text-xs font-bold"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1.5" />
                        Previous Step
                      </Button>
                    ) : (
                      <div />
                    )}

                    {currentStep < 7 ? (
                      <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        onClick={nextStep}
                        className="font-bold shadow-md text-xs sm:text-sm"
                      >
                        Continue to Step {currentStep + 1}
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="accent"
                        size="lg"
                        disabled={isSubmitting}
                        className="font-bold shadow-xl text-xs sm:text-sm"
                      >
                        {isSubmitting ? (
                          'Submitting Assessment...'
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-1.5" />
                            Submit Care Assessment
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function RequestCarePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center p-8">
          <div className="text-slate-600 font-medium">Loading care assessment...</div>
        </div>
      }
    >
      <RequestCareWizardContent />
    </Suspense>
  );
}
