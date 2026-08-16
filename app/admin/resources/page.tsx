'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Badge } from '@/components/ui/button';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle2,
  Eye,
  FileText,
  Clock,
  Tag,
  Search,
  ExternalLink,
} from 'lucide-react';
import { Resource, ResourceCategory, ResourceStatus } from '@/types';

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const fetchResources = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/resources?all=true');
      const data = await res.json();
      if (data.success) {
        setResources(data.resources);
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
        const res = await fetch('/api/resources?all=true');
        const data = await res.json();
        if (isMounted && data.success) {
          setResources(data.resources);
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

  const handleSaveResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResource) return;

    try {
      const res = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingResource),
      });
      const data = await res.json();
      if (data.success) {
        setNotification('Article saved successfully');
        setEditingResource(null);
        setIsCreatingNew(false);
        fetchResources();
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteResource = async (id: string) => {
    if (!confirm('Are you sure you want to delete this educational article?')) return;
    try {
      const res = await fetch(`/api/resources/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setResources((prev) => prev.filter((r) => r.id !== id));
        setNotification('Article deleted');
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const categories: ResourceCategory[] = [
    'Family Resources',
    'Caregiving Guides',
    'Switching Agencies',
    'Private Pay & Costs',
    'Dementia Care',
    'Senior Safety',
    'Care Planning',
  ];

  const filteredResources = resources.filter((res) => {
    if (searchQuery.trim() === '') return true;
    const q = searchQuery.toLowerCase();
    return (
      res.title.toLowerCase().includes(q) ||
      res.category.toLowerCase().includes(q) ||
      res.excerpt.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Family Guides & Educational CMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Author articles on switching agencies, navigating Long-Term Care Insurance, dementia care, and Georgia family support.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="accent"
            size="sm"
            onClick={() => {
              setEditingResource({
                id: `res-${Date.now()}`,
                slug: 'how-to-switch-home-care-agencies-georgia',
                title: 'Guide to Seamlessly Switching In-Home Care Agencies in Georgia',
                category: 'Switching Agencies',
                excerpt: 'A step-by-step roadmap for families who are dissatisfied with caregiver no-shows or turnover.',
                content: '## Overview\n\nTransitioning away from an unreliable home care provider does not need to interrupt your loved one’s daily routine.\n\n### Key Considerations\n- Review current contract cancellation notice periods (typically 24-48 hours)\n- Secure private-pay or LTCI documentation\n- Conduct intake interview with replacement agency',
                image_url: '/images/services/personal-care.jpg',
                read_time: '6 min read',
                status: 'published',
                author: 'TomLee Care Coordination Team',
                published_at: new Date().toISOString().split('T')[0],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              });
              setIsCreatingNew(true);
            }}
            className="text-xs font-bold"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Write New Article
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
      {editingResource && (
        <div className="bg-slate-950 p-6 rounded-2xl border border-teal-500/50 shadow-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-400" />
              <h3 className="font-bold text-white text-base">
                {isCreatingNew ? 'Create New Family Resource' : `Edit: ${editingResource.title}`}
              </h3>
            </div>
            <button
              onClick={() => {
                setEditingResource(null);
                setIsCreatingNew(false);
              }}
              className="text-slate-400 hover:text-white text-xs"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSaveResource} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingResource.title}
                  onChange={(e) => setEditingResource({ ...editingResource, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={editingResource.slug}
                  onChange={(e) => setEditingResource({ ...editingResource, slug: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={editingResource.category}
                  onChange={(e) => setEditingResource({ ...editingResource, category: e.target.value as ResourceCategory })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Read Time
                </label>
                <input
                  type="text"
                  value={editingResource.read_time}
                  onChange={(e) => setEditingResource({ ...editingResource, read_time: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Publishing Status
                </label>
                <select
                  value={editingResource.status}
                  onChange={(e) => setEditingResource({ ...editingResource, status: e.target.value as ResourceStatus })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Short Excerpt (Summary for Cards)
              </label>
              <textarea
                rows={2}
                value={editingResource.excerpt}
                onChange={(e) => setEditingResource({ ...editingResource, excerpt: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Full Article Content (Markdown format supported)
              </label>
              <textarea
                rows={8}
                value={editingResource.content}
                onChange={(e) => setEditingResource({ ...editingResource, content: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingResource(null);
                  setIsCreatingNew(false);
                }}
                className="text-xs border-slate-700 text-slate-300"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="text-xs font-bold">
                <Save className="w-3.5 h-3.5 mr-1" />
                Save & Update Article
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Filter resources by title, topic, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>

      {/* Resources Table / List */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="divide-y divide-slate-800">
          {loading ? (
            <div className="p-8 text-center text-slate-500 text-xs">Loading educational resources...</div>
          ) : filteredResources.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">No resources found.</div>
          ) : (
            filteredResources.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/40 transition-colors"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded-full border border-teal-800">
                      {item.category}
                    </span>
                    <Badge variant={item.status === 'published' ? 'active' : 'draft'} className="text-[10px]">
                      {item.status.toUpperCase()}
                    </Badge>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.read_time}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm sm:text-base">{item.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-1">{item.excerpt}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/resources/${item.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors text-xs"
                    title="View on site"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingResource(item);
                      setIsCreatingNew(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs px-2.5 py-1.5 h-8 border-slate-700 bg-slate-900 text-slate-200"
                  >
                    <Edit2 className="w-3 h-3 mr-1" />
                    Edit
                  </Button>

                  <button
                    onClick={() => handleDeleteResource(item.id)}
                    className="p-2 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 transition-colors"
                    title="Delete article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
