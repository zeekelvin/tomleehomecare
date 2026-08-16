import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';
import { BreadcrumbsJsonLd } from '@/components/seo/json-ld';

export const metadata = {
  title: 'Terms of Use | TomLee Homecare LLC Georgia',
  description:
    'Terms and conditions governing the use of TomLee Homecare website and non-medical home care services in Georgia.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Terms of Use', item: '/terms' },
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
              Georgia Care Standards
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Terms of Use
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              Effective Date: January 1, 2026 • TomLee Homecare LLC
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                1. Scope of Non-Medical Services
              </h2>
              <p>
                TomLee Homecare LLC is licensed by the State of Georgia to provide non-medical in-home care services, including personal care assistance, companion care, homemaker services, and respite care. The content provided on this website is for informational purposes only and does not constitute medical diagnosis, clinical treatment, or skilled nursing advice.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                2. Private-Pay (Coming Soon) & Insurance Onboarding
              </h2>
              <p>
                Our upcoming services are arranged on a private-pay basis alongside ongoing insurance provider onboarding. We assist families in submitting necessary documentation for reimbursement under qualifying Long-Term Care Insurance policies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                3. Care Assessments & Service Agreements
              </h2>
              <p>
                Submission of an inquiry or completion of the online care assessment does not constitute a binding agreement for care delivery until an in-person or formal clinical assessment is completed, a tailored Care Plan is agreed upon, and a formal Service Agreement is executed by both parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                4. Caregiver Qualifications & Standards
              </h2>
              <p>
                All TomLee caregivers undergo comprehensive criminal background checks, Georgia registry screenings, professional references verification, CPR/First Aid certification, and orientation in accordance with Georgia state licensing rules.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                5. Governing Law
              </h2>
              <p>
                These terms and any disputes arising out of the use of this website or service inquiries are governed by the laws of the State of Georgia.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
