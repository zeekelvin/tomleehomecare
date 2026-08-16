import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { store } from '@/lib/store';
import { ArticleJsonLd, BreadcrumbsJsonLd } from '@/components/seo/json-ld';
import {
  Clock,
  User,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Share2,
  BookOpen,
  Phone,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = store.getResourceBySlug(slug);

  if (!resource) {
    return {
      title: 'Guide Not Found | TomLee Homecare',
    };
  }

  const title = `${resource.title} | TomLee Homecare Family Guide`;
  const description = resource.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `/resources/${resource.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://tomleehomecare.com/resources/${resource.slug}`,
      type: 'article',
      publishedTime: resource.published_at,
      authors: [resource.author || 'TomLee Homecare'],
      images: [
        {
          url: resource.image_url || '/images/services/personal-care.jpg',
          width: 1200,
          height: 630,
          alt: resource.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [resource.image_url || '/images/services/personal-care.jpg'],
    },
  };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = store.getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const allResources = store.getResources(false);
  const relatedResources = allResources
    .filter((r) => r.slug !== resource.slug)
    .slice(0, 3);

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Resources', item: '/resources' },
    { name: resource.title, item: `/resources/${resource.slug}` },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ArticleJsonLd resource={resource} />
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <Header />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto flex items-center justify-between text-xs sm:text-sm text-slate-500">
            <div className="flex items-center gap-2 truncate">
              <Link href="/" className="hover:text-[#127485] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600 rounded">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/resources" className="hover:text-[#127485] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600 rounded">
                Resources
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-slate-900 font-medium truncate" aria-current="page">{resource.title}</span>
            </div>
            <Link
              href="/resources"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#127485] hover:text-[#0A4E5A] shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600 rounded"
            >
              <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
              All Guides
            </Link>
          </div>
        </nav>

        {/* Article Content */}
        <article className="py-12 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-teal-50 text-[#127485] border border-teal-200">
                {resource.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              {resource.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 pb-8 mb-8 border-b border-slate-200">
              <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                <User className="w-4 h-4 text-[#127485]" />
                {resource.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                {resource.published_at}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                {resource.read_time}
              </span>
            </div>

            {/* Featured Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[16/9] mb-10 bg-slate-100 border border-slate-200">
              <Image
                src={resource.image_url}
                alt={resource.title}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
                priority
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Key Summary Excerpt Callout */}
            <div className="p-6 sm:p-7 rounded-2xl bg-teal-50/70 border border-teal-200/80 mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#127485] block mb-1">
                Executive Overview
              </span>
              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
                {resource.excerpt}
              </p>
            </div>

            {/* Body Content with formatted paragraphs */}
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-li:leading-relaxed">
              <div className="whitespace-pre-line text-slate-700 leading-relaxed text-base sm:text-lg space-y-4">
                {resource.content}
              </div>
            </div>

            {/* Author Credential Card */}
            <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#127485] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                TL
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">
                  Published by {resource.author}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  TomLee Homecare provides licensed non-medical companion and personal care across Greater Atlanta and surrounding Georgia communities.
                </p>
              </div>
            </div>

            {/* In-Article CTA Banner */}
            <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-teal-900 to-[#127485] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-200 block mb-1">
                  Georgia Home Care Guidance
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Have Specific Questions About Your Loved One?
                </h3>
                <p className="text-sm text-teal-100 max-w-md leading-relaxed">
                  Our care coordination team offers complimentary consultations to review custom schedules and care plans.
                </p>
              </div>
              <div className="flex flex-col gap-2.5 w-full sm:w-auto shrink-0">
                <Link href="/request-care">
                  <Button variant="accent" size="md" className="w-full justify-center font-bold">
                    Start Care Assessment
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
                <a
                  href="tel:4049997936"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-teal-100 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#7CB342]" />
                  Call (404) 999-7936
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles Section */}
        {relatedResources.length > 0 && (
          <section className="py-14 bg-slate-50 border-t border-slate-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Related Senior Care Guides</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Explore more advice and resources for your family.
                  </p>
                </div>
                <Link
                  href="/resources"
                  className="text-xs font-bold text-[#127485] hover:text-[#0A4E5A] inline-flex items-center gap-1"
                >
                  View all
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedResources.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/resources/${rel.slug}`}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-[#127485] uppercase tracking-wider block mb-2">
                        {rel.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#127485] transition-colors leading-snug mb-2 line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>{rel.read_time}</span>
                      <span className="text-[#127485] font-bold flex items-center gap-0.5">
                        Read
                        <ChevronRight className="w-3.5 h-3.5" />
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

