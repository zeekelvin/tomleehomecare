'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Search,
  X,
  HelpCircle,
  Phone,
  ArrowRight,
  Sparkles,
  Filter,
  CheckCircle2,
  ListCollapse,
  ListTree,
} from 'lucide-react';
import { FAQ } from '@/types';
import { Button } from '@/components/ui/button';

interface FAQEngineProps {
  initialFaqs: FAQ[];
}

export function FAQEngine({ initialFaqs }: FAQEngineProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-3': true,
  });

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialFaqs.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return ['All', ...Array.from(set)];
  }, [initialFaqs]);

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    return initialFaqs.filter((faq) => {
      // Category filter
      if (selectedCategory !== 'All' && faq.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchQ = faq.question.toLowerCase().includes(q);
        const matchA = faq.answer.toLowerCase().includes(q);
        const matchC = faq.category.toLowerCase().includes(q);
        return matchQ || matchA || matchC;
      }

      return true;
    });
  }, [initialFaqs, selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    const all: Record<string, boolean> = {};
    filteredFaqs.forEach((f) => {
      all[f.id] = true;
    });
    setExpandedIds(all);
  };

  const handleCollapseAll = () => {
    setExpandedIds({});
  };

  // Generate FAQ structured data (JSON-LD) for SEO & Google Rich Snippets
  const faqSchemaData = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: initialFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }, [initialFaqs]);

  return (
    <div className="w-full">
      {/* Inject FAQ Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />

      {/* Search & Category Filter Section */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Live Search Input */}
          <div className="relative w-full mb-6">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              id="faq-search-input"
              placeholder="Search frequently asked questions (e.g. costs, switching, caregivers, schedules)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#127485] shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills & Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Category:
              </span>
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      active
                        ? 'bg-[#127485] text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Expand / Collapse Toggle Buttons */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                onClick={handleExpandAll}
                className="text-xs font-semibold text-[#127485] hover:text-[#0A4E5A] px-2 py-1 rounded-lg hover:bg-teal-50 transition-colors inline-flex items-center gap-1"
              >
                <ListTree className="w-3.5 h-3.5" />
                Expand All
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={handleCollapseAll}
                className="text-xs font-semibold text-slate-500 hover:text-slate-700 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors inline-flex items-center gap-1"
              >
                <ListCollapse className="w-3.5 h-3.5" />
                Collapse All
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Accordions List Section */}
      <section className="py-12 sm:py-16 bg-white min-h-[450px]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {selectedCategory === 'All' ? 'Frequently Asked Questions' : `${selectedCategory} Questions`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Showing {filteredFaqs.length} of {initialFaqs.length} answered questions
              </p>
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-semibold text-[#127485] hover:underline"
              >
                Clear search
              </button>
            )}
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-300 max-w-md mx-auto">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">No matching questions</h3>
              <p className="text-xs text-slate-500 mb-6">
                We couldn&apos;t find an answer matching &quot;{searchQuery}&quot;. Our Georgia intake team is happy to answer directly by phone.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                >
                  Reset Search
                </Button>
                <a
                  href="tel:4049997936"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#127485] text-white hover:bg-[#0A4E5A]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call (404) 999-7936
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4" role="region" aria-label="Frequently Asked Questions List">
              {filteredFaqs.map((faq, index) => {
                const isExpanded = !!expandedIds[faq.id];
                const contentId = `faq-content-${faq.id}`;
                const buttonId = `faq-trigger-${faq.id}`;

                return (
                  <div
                    key={faq.id}
                    id={`faq-item-${faq.id}`}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isExpanded
                        ? 'bg-white border-teal-300 shadow-md ring-1 ring-teal-100'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        onClick={() => toggleAccordion(faq.id)}
                        aria-expanded={isExpanded}
                        aria-controls={contentId}
                        className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#127485]"
                      >
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#127485] block">
                            {faq.category}
                          </span>
                          <span className="text-base sm:text-lg font-bold text-slate-900 leading-snug block">
                            {faq.question}
                          </span>
                        </div>
                        <div
                          className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                            isExpanded
                              ? 'bg-teal-50 text-[#127485] rotate-180'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>
                    </h3>

                    {isExpanded && (
                      <div
                        id={contentId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 animate-in fade-in duration-150"
                      >
                        <div className="pt-3">{faq.answer}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA Card */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-900 text-teal-300 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#7CB342]" />
                Personalized Care Consultation
              </span>
              <h3 className="text-2xl font-bold text-white">
                Have a Question Not Listed Here?
              </h3>
              <p className="text-sm text-slate-300 max-w-md leading-relaxed">
                Every family’s care situation is unique. Speak directly with a TomLee care specialist for prompt, compassionate guidance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <Link href="/request-care" className="w-full sm:w-auto">
                <Button variant="accent" size="md" className="w-full justify-center font-bold">
                  Request Care Assessment
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
              <a
                href="tel:4049997936"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-colors border border-slate-700"
              >
                <Phone className="w-4 h-4 text-[#7CB342]" />
                (404) 999-7936
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
