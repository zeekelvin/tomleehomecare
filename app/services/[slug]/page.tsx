import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button, Badge } from '@/components/ui/button';
import { store } from '@/lib/store';
import { ServiceJsonLd, BreadcrumbsJsonLd } from '@/components/seo/json-ld';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  HeartHandshake,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  Phone,
  Check,
  Clock,
  UserCheck,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = store.getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found | TomLee Homecare',
    };
  }

  const title = service.seo_title || `${service.name} | Georgia In-Home Care | TomLee Homecare`;
  const description = service.seo_description || service.short_description;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://tomleehomecare.com/services/${service.slug}`,
      type: 'article',
      images: [
        {
          url: service.image_url || '/images/services/personal-care.jpg',
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [service.image_url || '/images/services/personal-care.jpg'],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = store.getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = store
    .getServices(false)
    .filter((s) => s.id !== service.id)
    .slice(0, 3);

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Services', item: '/services' },
    { name: service.name, item: `/services/${service.slug}` },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <ServiceJsonLd service={service} />
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <Header />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {/* Breadcrumb Header */}
        <nav aria-label="Breadcrumb" className="bg-slate-100/70 border-b border-slate-200/80 py-3.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <Link href="/" className="hover:text-[#127485] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600 rounded">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/services" className="hover:text-[#127485] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600 rounded">
              Services
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900 font-medium" aria-current="page">{service.name}</span>
          </div>
        </nav>

        {/* Service Hero */}
        <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="active" className="font-semibold">
                    Private Pay Coming Soon
                  </Badge>
                  <span className="text-xs text-slate-500 font-medium">Georgia Service Area</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                  {service.name}
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link href={`/request-care?service=${service.slug}`} className="w-full sm:w-auto">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto font-bold shadow-md">
                      <Sparkles className="w-4 h-4 text-[#7CB342]" />
                      Request {service.name}
                    </Button>
                  </Link>

                  <a
                    href="tel:4049997936"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-base transition-colors"
                  >
                    <Phone className="w-4 h-4 mr-2 text-[#127485]" />
                    (404) 999-7936
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-slate-100">
                  <Image
                    src={service.image_url}
                    alt={service.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                    priority
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Scope Breakdown */}
        <section className="py-16 bg-[#F8FAFB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Features Card */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#127485] flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#7CB342]" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">What This Care Includes</h2>
                  <ul className="space-y-3 text-sm text-slate-600">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#127485] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Who It's For Card */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#127485] flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-[#127485]" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Who Is This For?</h2>
                  <ul className="space-y-3 text-sm text-slate-600">
                    {service.who_is_this_for.map((w, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#7CB342] shrink-0 mt-0.5" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Key Benefits Card */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#127485] flex items-center justify-center mb-4">
                    <HeartHandshake className="w-6 h-6 text-[#7CB342]" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Key Family Benefits</h2>
                  <ul className="space-y-3 text-sm text-slate-600">
                    {service.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#127485] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: In-Depth Overview & Who Is This For */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                    About {service.name}
                  </h2>
                  <div className="prose prose-slate max-w-none text-slate-600 text-base leading-relaxed space-y-4">
                    <p>{service.description}</p>
                  </div>
                </div>

                {/* Key Features & Duties Covered */}
                {service.features && service.features.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#7CB342]" />
                      Care Scope & What We Provide
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {service.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80"
                        >
                          <Check className="w-4 h-4 text-[#127485] shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm font-medium text-slate-800">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Who is this for */}
                {service.who_is_this_for && service.who_is_this_for.length > 0 && (
                  <div className="p-6 rounded-2xl bg-teal-50/50 border border-teal-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-[#127485]" />
                      Who Is This Care Best Suited For?
                    </h3>
                    <ul className="space-y-2">
                      {service.who_is_this_for.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#127485] shrink-0 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Sidebar: Quick Assessment & Zero-Gap Callout */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-500/30">
                    <ShieldCheck className="w-4 h-4 text-[#7CB342]" />
                    Private Pay Coming Soon
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Request a Customized Care Schedule
                  </h3>
                  <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                    Same-day consultation available. We match thoroughly vetted, RN-supervised caregivers tailored to your loved one&apos;s daily routine.
                  </p>
                  <Link href={`/request-care?service=${service.slug}`}>
                    <Button variant="accent" size="lg" className="w-full justify-center font-bold">
                      Book Free Assessment
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </Link>
                </div>

                <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-slate-200">
                  <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#127485]" />
                    Need Immediate Care?
                  </h4>
                  <p className="text-xs text-slate-600 mb-4">
                    Our care coordination line is open 24/7 for urgent hospital discharges and caregiver transitions.
                  </p>
                  <a
                    href="tel:4049997936"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#127485] hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    (404) 999-7936
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Related Care Options */}
        {relatedServices.length > 0 && (
          <section className="py-14 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Related In-Home Care Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedServices.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/services/${rel.slug}`}
                    className="rounded-2xl border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all group bg-[#F8FAFB] overflow-hidden flex flex-col"
                  >
                    <div className="relative h-36 w-full bg-slate-100">
                      <Image
                        src={rel.image_url}
                        alt={rel.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-base text-slate-900 group-hover:text-[#127485] transition-colors mb-2">
                          {rel.name}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                          {rel.short_description}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#127485] inline-flex items-center gap-1 pt-2 border-t border-slate-200/60">
                        Learn More <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
