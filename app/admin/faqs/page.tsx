'use client';

import React, { useState, useEffect } from 'react';
import { Button, Badge } from '@/components/ui/button';
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle2,
  Search,
  ArrowUpDown,
  Tag,
  Check,
} from 'lucide-react';
import { FAQ, FAQCategory, FAQStatus } from '@/types';

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [notification, setNotification] = useState<string | null>(null);

  const fetchFaqs = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/faqs?all=true');
      const data = await res.json();
      if (data.success) {
        setFaqs(data.faqs);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await fetch('/api/faqs?all=true');
        const data = await res.json();
        if (isMounted && data.success) {
          setFaqs(data.faqs);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    try {
      const res = await fetch('/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingFaq),
      });
      const data = await res.json();
      if (data.success) {
        setNotification('FAQ saved successfully');
        setEditingFaq(null);
        setIsCreatingNew(false);
        fetchFaqs();
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm('Are you sure you want to remove this FAQ item?')) return;
    try {
      const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
        setNotification('FAQ deleted');
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const categories: FAQCategory[] = [
    'General',
    'Services',
    'Private Pay & Costs',
    'Caregivers',
    'Caregivers & Vetting',
    'Switching Agencies',
    'Getting Started',
    'Family Communication',
  ];

  const filteredFaqs = faqs.filter((faq) => {
    if (categoryFilter !== 'all' && faq.category !== categoryFilter) return false;
    if (searchQuery.trim() === '') return true;
    const q = searchQuery.toLowerCase();
    return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            FAQ Knowledge Base Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage client questions regarding Georgia licensure, private-pay rates, switching protocol, and non-medical boundaries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="accent"
            size="sm"
            onClick={() => {
              setEditingFaq({
                id: `faq-${Date.now()}`,
                question: 'How quickly can TomLee begin care in an urgent transition?',
                answer: 'Under our 48-Hour Zero-Gap Transition Protocol, we can conduct an in-person home safety assessment and place qualified caregivers within 24 to 48 hours for Georgia families.',
                category: 'Switching Agencies',
                status: 'published',
                sort_order: faqs.length + 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              });
              setIsCreatingNew(true);
            }}
            className="text-xs font-bold"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add FAQ Item
          </Button>
        </div>
      </div>

      {notification && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700 text-xs text-emerald-200 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-emerald-400 hover:text-emerald-200 text-xs">
            Dismiss
          </button>
        </div>
      )}

      {/* Editor Panel */}
      {editingFaq && (
        <div className="bg-slate-950 p-6 rounded-2xl border border-teal-500/50 shadow-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-teal-400" />
              <h3 className="font-bold text-white text-base">
                {isCreatingNew ? 'Create New FAQ' : 'Edit FAQ Item'}
              </h3>
            </div>
            <button
              onClick={() => {
                setEditingFaq(null);
                setIsCreatingNew(false);
              }}
              className="text-slate-400 hover:text-white text-xs"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSaveFaq} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Question *
              </label>
              <input
                type="text"
                required
                value={editingFaq.question}
                onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Detailed Answer *
              </label>
              <textarea
                rows={4}
                required
                value={editingFaq.answer}
                onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={editingFaq.category}
                  onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value as FAQCategory })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={editingFaq.sort_order}
                  onChange={(e) => setEditingFaq({ ...editingFaq, sort_order: parseInt(e.target.value) || 1 })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Status
                </label>
                <select
                  value={editingFaq.status}
                  onChange={(e) => setEditingFaq({ ...editingFaq, status: e.target.value as FAQStatus })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingFaq(null);
                  setIsCreatingNew(false);
                }}
                className="text-xs border-slate-700 text-slate-300"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="text-xs font-bold">
                <Save className="w-3.5 h-3.5 mr-1" />
                Save FAQ Item
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search FAQs by question or answer keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* FAQ Table / Accordion Preview */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800">
        {loading ? (
          <div className="p-8 text-center text-slate-500 text-xs">Loading FAQ knowledge items...</div>
        ) : filteredFaqs.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">No FAQs matching search criteria.</div>
        ) : (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-slate-900/40 transition-colors"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded-full border border-teal-800">
                    {faq.category}
                  </span>
                  <Badge variant={faq.status === 'published' ? 'active' : 'draft'} className="text-[10px]">
                    {faq.status.toUpperCase()}
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-500">Order: #{faq.sort_order}</span>
                </div>

                <h3 className="font-bold text-white text-sm sm:text-base">{faq.question}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{faq.answer}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingFaq(faq);
                    setIsCreatingNew(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs px-2.5 py-1.5 h-8 border-slate-700 bg-slate-900 text-slate-200"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Edit
                </Button>

                <button
                  onClick={() => handleDeleteFaq(faq.id)}
                  className="p-2 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 transition-colors"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
