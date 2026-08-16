'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  BookOpen,
  Clock,
  ChevronRight,
  Sparkles,
  CheckSquare,
  Filter,
  User,
  Calendar,
  X,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { Resource } from '@/types';
import { Button } from '@/components/ui/button';
import { ChecklistModal } from '@/components/resources/checklist-modal';

interface ResourceCenterProps {
  initialResources: Resource[];
}

export function ResourceCenter({ initialResources }: ResourceCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialResources.forEach((r) => {
      if (r.category) set.add(r.category);
    });
    return ['All', ...Array.from(set)];
  }, [initialResources]);

  // Filtered resources
  const filteredResources = useMemo(() => {
    return initialResources.filter((res) => {
      // Category filter
      if (selectedCategory !== 'All' && res.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = res.title.toLowerCase().includes(q);
        const matchExcerpt = res.excerpt.toLowerCase().includes(q);
        const matchCategory = res.category.toLowerCase().includes(q);
        const matchAuthor = res.author.toLowerCase().includes(q);
        const matchContent = res.content.toLowerCase().includes(q);
        return matchTitle || matchExcerpt || matchCategory || matchAuthor || matchContent;
      }

      return true;
    });
  }, [initialResources, selectedCategory, searchQuery]);

  const featuredResource = useMemo(() => {
    return initialResources.find((r) => r.slug === 'switching-home-care-agencies-guide') || initialResources[0];
  }, [initialResources]);

  return (
    <div className="w-full">
      {/* Search & Tool Action Bar */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                id="resource-search-input"
                placeholder="Search articles, care tips, LTCI, safety..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#127485] focus:border-transparent shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Interactive Safety Checklist CTA */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setIsChecklistOpen(true)}
                id="open-fall-safety-checklist-btn"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white border-2 border-teal-600/30 hover:border-[#127485] text-[#127485] text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <CheckSquare className="w-4 h-4 text-[#7CB342]" />
                Interactive Fall Safety Checklist
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Topics:
            </span>
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
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
        </div>
      </section>

      {/* Featured Resource Spotlight (only shown on 'All' tab when not actively searching) */}
      {selectedCategory === 'All' && !searchQuery && featuredResource && (
        <section className="py-10 bg-gradient-to-b from-teal-50/50 to-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-200/80 shadow-md flex flex-col lg:flex-row items-center gap-8 group">
              <div className="relative w-full lg:w-1/2 aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src={featuredResource.image_url}
                  alt={featuredResource.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-md text-xs font-bold bg-[#127485] text-white shadow-md">
                    Featured Family Guide
                  </span>
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-[#127485] uppercase tracking-wider">
                      {featuredResource.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {featuredResource.read_time}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 group-hover:text-[#127485] transition-colors leading-tight">
                    {featuredResource.title}
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {featuredResource.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    By {featuredResource.author}
                  </span>
                  <Link
                    href={`/resources/${featuredResource.slug}`}
                    id={`featured-read-link-${featuredResource.slug}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#127485] text-white text-xs font-bold hover:bg-[#0A4E5A] transition-all shadow-sm group/btn"
                  >
                    Read Complete Guide
                    <ArrowRight className="w-4 h-4 group-btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Grid Section */}
      <section className="py-12 sm:py-16 bg-white min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header row with count */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {selectedCategory === 'All' ? 'All Senior Care Articles' : `${selectedCategory} Guides`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Showing {filteredResources.length} of {initialResources.length} guides
              </p>
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-semibold text-[#127485] hover:underline"
              >
                Clear search filter
              </button>
            )}
          </div>

          {filteredResources.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-300 max-w-lg mx-auto">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">No articles found</h3>
              <p className="text-xs text-slate-500 mb-6">
                We couldn&apos;t find any care guides matching &quot;{searchQuery}&quot;. Try another search term or browse all topics.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((res) => (
                <article
                  key={res.id}
                  id={`resource-card-${res.slug}`}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-300/80 transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={res.image_url}
                      alt={res.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/95 text-slate-800 backdrop-blur-sm shadow-sm border border-slate-100">
                        {res.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mb-2.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {res.published_at}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {res.read_time}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#127485] transition-colors leading-snug line-clamp-2">
                        {res.title}
                      </h3>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                        {res.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium truncate max-w-[150px]">
                        {res.author}
                      </span>
                      <Link
                        href={`/resources/${res.slug}`}
                        id={`read-article-link-${res.slug}`}
                        className="text-xs font-bold text-[#127485] hover:text-[#0A4E5A] inline-flex items-center gap-1 group/link"
                      >
                        Read Guide
                        <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interactive Safety Checklist Modal */}
      <ChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
    </div>
  );
}
