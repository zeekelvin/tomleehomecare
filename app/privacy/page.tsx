import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { BreadcrumbsJsonLd } from '@/components/seo/json-ld';

export const metadata = {
  title: 'Privacy Policy & HIPAA Notice | TomLee Homecare LLC',
  description:
    'Our privacy practices, data handling standards, and HIPAA-aware safeguards at TomLee Homecare LLC in Georgia.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Privacy Policy', item: '/privacy' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <Header />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        <section className="bg-gradient-to-b from-teal-50/60 to-white py-14 border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-[#127485] text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7CB342]" aria-hidden="true" />
              Patient & Family Data Protection
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Privacy Policy & HIPAA Notice
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              Effective Date: January 1, 2026 • TomLee Homecare LLC (Georgia Licensed Non-Medical Home Care)
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#127485]" aria-hidden="true" />
                1. Our Commitment to Your Privacy
              </h2>
              <p>
                TomLee Homecare LLC (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects the sensitive nature of elder care arrangements. We are committed to safeguarding the personal and contact details provided by care recipients, family sponsors, and authorized representatives in Georgia.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#7CB342]" aria-hidden="true" />
                2. HIPAA-Aware Minimal Data Collection
              </h2>
              <p className="mb-3">
                Our public website and initial care inquiry forms are engineered to collect only the minimum necessary contact and location information required to evaluate service availability.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>We do <strong>NOT</strong> request or store Social Security Numbers, detailed clinical diagnostic charts, or financial account credentials through web forms.</li>
                <li>Comprehensive care assessments and care plans are handled through secure, confidential offline clinical consultations.</li>
                <li>All inquiries submitted via our platform are encrypted in transit via standard SSL/TLS protocols.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#127485]" aria-hidden="true" />
                3. Information We Collect
              </h2>
              <p className="mb-3">When you submit a care assessment request, we collect:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Contact Information (Name, phone number, email address).</li>
                <li>Location Details (City, Georgia ZIP code to verify caregiver dispatch range).</li>
                <li>Care Context (Requested non-medical services, schedule preferences, urgency).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. How We Use Your Information</h2>
              <p>We use the information you provide solely to:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600 mt-2">
                <li>Coordinate personalized in-home non-medical care assessments.</li>
                <li>Match qualified, screened caregivers according to your family&apos;s daily routine.</li>
                <li>Communicate updates, follow-ups, and service area confirmations.</li>
                <li>We never sell, rent, or trade your contact information to third-party marketing entities.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Contact Our Privacy Officer</h2>
              <p>
                If you have questions about our data protection standards or wish to request the modification or deletion of your inquiry record, please contact:
              </p>
              <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="font-semibold text-slate-900">TomLee Homecare LLC — Privacy & Operations Office</p>
                <p className="text-slate-600">Lawrenceville, GA 30044</p>
                <p className="text-slate-600">Email: <a href="mailto:info@tomleehomecare.com" className="text-[#127485] underline">info@tomleehomecare.com</a></p>
                <p className="text-slate-600">Phone: <a href="tel:4049997936" className="text-[#127485] underline">(404) 999-7936</a></p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
