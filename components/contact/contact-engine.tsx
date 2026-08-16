'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Search,
  Check,
  Info,
  Calendar,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { INITIAL_SITE_SETTINGS } from '@/lib/data/initial-data';

interface ContactEngineProps {
  initialServiceCities?: string[];
  initialServiceZips?: string[];
}

export function ContactEngine({
  initialServiceCities = INITIAL_SITE_SETTINGS.service_area_cities,
  initialServiceZips = INITIAL_SITE_SETTINGS.service_area_zips,
}: ContactEngineProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    topic: 'general_inquiry',
    preferred_time: 'morning',
    message: '',
    consent: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // ZIP Code / County Coverage Checker State
  const [zipQuery, setZipQuery] = useState('');
  const [zipResult, setZipResult] = useState<{
    checked: boolean;
    inArea: boolean;
    countyName?: string;
    message: string;
  } | null>(null);

  const georgiaCounties = [
    { name: 'Fulton County', cities: 'Atlanta, Alpharetta, Sandy Springs, Roswell, Johns Creek' },
    { name: 'Cobb County', cities: 'Marietta, Smyrna, Kennesaw, Acworth, Vinings' },
    { name: 'Gwinnett County', cities: 'Duluth, Lawrenceville, Suwanee, Norcross, Snellville' },
    { name: 'DeKalb County', cities: 'Decatur, Dunwoody, Brookhaven, Tucker, Chamblee' },
    { name: 'Cherokee County', cities: 'Woodstock, Canton, Holly Springs, Ball Ground' },
    { name: 'Forsyth County', cities: 'Cumming, South Forsyth, Midway' },
  ];

  const handleCheckZip = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipQuery.trim();
    if (!cleanZip || cleanZip.length < 5) {
      setZipResult({
        checked: true,
        inArea: false,
        message: 'Please enter a valid 5-digit Georgia ZIP code.',
      });
      return;
    }

    const isMatch =
      initialServiceZips.includes(cleanZip) ||
      cleanZip.startsWith('300') ||
      cleanZip.startsWith('301') ||
      cleanZip.startsWith('302') ||
      cleanZip.startsWith('303') ||
      cleanZip.startsWith('311');

    if (isMatch) {
      setZipResult({
        checked: true,
        inArea: true,
        message: `Great news! ZIP code ${cleanZip} is in our primary Georgia service area. Caregivers are available for immediate matching.`,
      });
    } else {
      setZipResult({
        checked: true,
        inArea: false,
        message: `ZIP code ${cleanZip} is outside our standard Metro Atlanta zone, but we occasionally arrange custom care coverage. Please call our team directly.`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic Validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setFormError('Please fill in your name, phone number, and a message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const names = formData.name.trim().split(' ');
      const firstName = names[0] || 'Care';
      const lastName = names.slice(1).join(' ') || 'Inquirer';

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city || 'Metro Atlanta',
          zip_code: '30301',
          lead_intent: 'first_time',
          payment_method: 'private_pay',
          urgency: 'within_1_2_weeks',
          preferred_contact_method: 'phone',
          best_time_to_contact: formData.preferred_time,
          internal_notes: `[Contact Page Topic: ${formData.topic}] ${formData.message}`,
          source: 'Contact Page Inquiry Form',
          consent: formData.consent,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedLeadId(data.leadId || 'INQ-' + Date.now().toString().slice(-6));
      } else {
        setFormError(data.error || 'Failed to submit inquiry. Please call our office directly.');
      }
    } catch (err) {
      setFormError('A network error occurred. Please call (404) 999-7936 directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* 2-Column Grid: Contact Information & General Inquiry Form */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Direct Care Coordination Details */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#127485] text-xs font-bold uppercase tracking-wider mb-4 border border-teal-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7CB342]" />
                  Dedicated Care Support
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                  Direct Caregiver Support & Intake Team
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                  Whether you are planning ahead for aging parents or urgently navigating an unexpected hospital discharge, our local Georgia team is ready to provide transparent, compassionate guidance.
                </p>

                <div className="space-y-4">
                  {/* Phone */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-teal-200 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-[#127485] flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">24/7 Telephone Intake</h4>
                        <a
                          href="tel:4049997936"
                          id="contact-page-phone-link"
                          className="text-lg font-extrabold text-[#127485] hover:text-[#0A4E5A] transition-colors block mt-0.5"
                        >
                          (404) 999-7936
                        </a>
                        <p className="text-xs text-slate-500 mt-1">
                          Care coordinators on call 24/7 for urgent client inquiries and current families.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-teal-200 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-[#127485] flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Direct Email Intake</h4>
                        <a
                          href="mailto:care@tomleehomecare.com"
                          id="contact-page-email-link"
                          className="text-sm font-bold text-[#127485] hover:underline block mt-0.5"
                        >
                          care@tomleehomecare.com
                        </a>
                        <p className="text-xs text-slate-500 mt-1">
                          Prompt response guaranteed within 2 business hours.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-teal-200 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-[#127485] flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Hours of Operation</h4>
                        <p className="text-xs font-semibold text-slate-700 mt-1">
                          Caregiver Shifts: <span className="text-emerald-700">24 Hours / 7 Days a Week</span>
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Intake Consultation: Mon – Fri 8:00 AM – 7:00 PM EST (On-call weekends)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fast Track Care Assessment Callout */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-900 to-slate-900 text-white shadow-lg">
                <div className="flex items-center gap-2 text-teal-300 font-bold text-xs uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4 text-[#7CB342]" />
                  Need a Comprehensive Care Quote?
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Fast-Track 7-Step Care Assessment
                </h4>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Skip general inquiries and receive a tailored caregiver qualification, rate calculation, and immediate care schedule.
                </p>
                <Link href="/request-care" id="contact-fast-track-cta">
                  <Button variant="accent" size="sm" className="w-full justify-center font-bold text-xs">
                    Start 7-Step Assessment
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive General Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-50/90 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
                {submittedLeadId ? (
                  <div className="py-10 text-center animate-in fade-in duration-200">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                      Message Dispatched
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      Thank You for Contacting Us
                    </h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                      We have received your message. Our care coordination team will review your details and reach out via your preferred time window.
                    </p>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 max-w-xs mx-auto mb-8 text-left text-xs space-y-1.5 shadow-sm">
                      <div className="flex justify-between text-slate-500">
                        <span>Inquiry Reference:</span>
                        <span className="font-mono font-bold text-slate-900">{submittedLeadId}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Expected Follow-up:</span>
                        <span className="font-semibold text-emerald-700">Within 2 Hours</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => {
                          setSubmittedLeadId(null);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            city: '',
                            topic: 'general_inquiry',
                            preferred_time: 'morning',
                            message: '',
                            consent: true,
                          });
                        }}
                      >
                        Send Another Note
                      </Button>
                      <Link href="/request-care">
                        <Button variant="primary" size="md">
                          Request Detailed Assessment
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        Send a Message to Our Care Coordinators
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Fill out the form below and a Georgia care specialist will respond promptly.
                      </p>
                    </div>

                    {formError && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{formError}</span>
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="contact-input-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#127485] text-sm"
                      />
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="contact-input-phone"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(404) 555-0123"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#127485] text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="contact-input-email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="eleanor@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#127485] text-sm"
                        />
                      </div>
                    </div>

                    {/* Inquiry Topic & City Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Inquiry Topic
                        </label>
                        <select
                          id="contact-select-topic"
                          value={formData.topic}
                          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#127485] text-sm"
                        >
                          <option value="general_inquiry">General Inquiry</option>
                          <option value="switching_agencies">Switching from Another Agency</option>
                          <option value="rates_private_pay">Private Pay (Coming Soon) & Insurance</option>
                          <option value="caregiver_schedule">Caregiver Availability & Scheduling</option>
                          <option value="memory_dementia_care">Dementia / Alzheimer’s Care</option>
                          <option value="career_inquiry">Caregiver Career / Employment</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          City / Georgia County
                        </label>
                        <input
                          type="text"
                          id="contact-input-city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Alpharetta, GA"
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#127485] text-sm"
                        />
                      </div>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        How Can We Assist Your Family? *
                      </label>
                      <textarea
                        id="contact-textarea-message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your loved one’s care needs, questions about switching, or preferred shift hours..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#127485] text-sm"
                      />
                    </div>

                    {/* HIPAA Minimal PHI Warning */}
                    <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold block mb-0.5">HIPAA Minimal PHI Notice</strong>
                        For your security, please do not include sensitive diagnostic codes, medical records, or Social Security Numbers in this initial contact message.
                      </div>
                    </div>

                    {/* Consent Checkbox */}
                    <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5 h-4 w-4 rounded text-[#127485] focus:ring-[#127485]"
                      />
                      <span>
                        I agree to receive care consultation correspondence via phone or email from TomLee Homecare LLC. We never sell your personal data.
                      </span>
                    </label>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full font-bold shadow-md text-sm"
                    >
                      {isSubmitting ? (
                        'Sending Message...'
                      ) : (
                        <>
                          Send Message to Intake Team
                          <ArrowRight className="w-4 h-4 ml-1.5" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Georgia Service Area & Live ZIP Code Coverage Checker Section */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-900/80 text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5 text-[#7CB342]" />
              Georgia Service Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
              Proudly Serving Metro Atlanta & North Georgia
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Verify your local Georgia community or enter your 5-digit ZIP code below for instantaneous coverage verification.
            </p>
          </div>

          {/* ZIP Code Checker Box */}
          <div className="max-w-xl mx-auto mb-14">
            <form onSubmit={handleCheckZip} className="bg-slate-800/90 p-3 sm:p-4 rounded-2xl border border-slate-700 shadow-xl flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  maxLength={5}
                  value={zipQuery}
                  onChange={(e) => setZipQuery(e.target.value)}
                  placeholder="Enter 5-Digit Georgia ZIP (e.g. 30328, 30004)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#7CB342]"
                />
              </div>
              <Button type="submit" variant="accent" size="md" className="font-bold text-xs shrink-0 justify-center">
                Check Coverage
              </Button>
            </form>

            {zipResult && (
              <div
                className={`mt-4 p-4 rounded-2xl text-xs flex items-start gap-3 animate-in fade-in duration-150 ${
                  zipResult.inArea
                    ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-200'
                    : 'bg-amber-950/80 border border-amber-700 text-amber-200'
                }`}
              >
                {zipResult.inArea ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <strong className="block font-bold mb-0.5">
                    {zipResult.inArea ? 'Primary Service Area Confirmed' : 'Service Zone Note'}
                  </strong>
                  {zipResult.message}
                </div>
              </div>
            )}
          </div>

          {/* Counties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {georgiaCounties.map((county) => (
              <div
                key={county.name}
                className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-teal-500/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7CB342]" />
                  <h4 className="font-bold text-white text-base">{county.name}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {county.cities}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-teal-400 font-semibold">
                  <span>Caregivers Available</span>
                  <span>24/7 Dispatch</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
