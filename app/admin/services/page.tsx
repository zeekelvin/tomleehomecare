'use client';

import React, { useState, useEffect } from 'react';
import { Button, Badge } from '@/components/ui/button';
import {
  Briefcase,
  Plus,
  Edit2,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Save,
  Trash2,
  Layers,
  DollarSign,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { Service, ServiceCategory, ServiceStatus } from '@/types';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchServices = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/services?includeInactive=true');
      const data = await res.json();
      if (data.success) {
        setServices(data.services);
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
        const res = await fetch('/api/services?includeInactive=true');
        const data = await res.json();
        if (isMounted && data.success) {
          setServices(data.services);
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

  const handleToggleStatus = async (service: Service) => {
    const newStatus: ServiceStatus = service.status === 'active' ? 'draft' : 'active';
    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) =>
          prev.map((s) => (s.id === service.id ? { ...s, status: newStatus } : s))
        );
        setNotification(`Service "${service.name}" status changed to ${newStatus}`);
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      const res = await fetch(`/api/services/${editingService.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      });
      const data = await res.json();
      if (data.success) {
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? editingService : s))
        );
        setEditingService(null);
        setIsCreatingNew(false);
        setNotification('Service changes saved successfully');
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Service Catalog & Scope Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure care scopes, core features, who it is for, clinical boundaries, and published offerings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="accent"
            size="sm"
            onClick={() => {
              const newId = `srv-${Date.now()}`;
              setEditingService({
                id: newId,
                name: 'New In-Home Care Service',
                slug: 'new-care-service',
                category: 'personal_care',
                short_description: 'Concise summary of this Georgia in-home care service.',
                description: 'Detailed overview explaining daily assistance routines and caregiver responsibilities.',
                features: ['Assistance with daily living activities', 'Meal preparation & hydration support'],
                who_is_this_for: ['Georgia seniors needing routine home assistance', 'Post-operative recovery'],
                benefits: ['Preserves dignity at home', 'Reduces family stress'],
                is_featured: false,
                is_private_pay: true,
                is_medicaid: false,
                is_waiver: false,
                seo_title: 'In-Home Care Service | TomLee Homecare',
                seo_description: 'Reliable private-pay in-home support for Georgia families.',
                image_url: '/images/services/personal-care.jpg',
                status: 'draft',
                sort_order: services.length + 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              });
              setIsCreatingNew(true);
            }}
            className="text-xs font-bold"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add New Service
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

      {/* Edit / Create Form */}
      {editingService && (
        <div className="bg-slate-950 p-6 rounded-2xl border border-teal-500/50 shadow-2xl space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-teal-400" />
              <h3 className="font-bold text-white text-base">
                {isCreatingNew ? 'Create New Service' : `Edit Service: ${editingService.name}`}
              </h3>
            </div>
            <button
              onClick={() => {
                setEditingService(null);
                setIsCreatingNew(false);
              }}
              className="text-slate-400 hover:text-white text-xs"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSaveService} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={editingService.slug}
                  onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={editingService.category}
                  onChange={(e) => setEditingService({ ...editingService, category: e.target.value as ServiceCategory })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                >
                  <option value="personal_care">Personal Care</option>
                  <option value="companion_care">Companion Care</option>
                  <option value="specialized_care">Specialized Care</option>
                  <option value="support_services">Support Services</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Publishing Status
                </label>
                <select
                  value={editingService.status}
                  onChange={(e) => setEditingService({ ...editingService, status: e.target.value as ServiceStatus })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                >
                  <option value="active">Active (Published)</option>
                  <option value="draft">Draft</option>
                  <option value="future">Future Offering</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Short Summary (Card Preview)
              </label>
              <textarea
                rows={2}
                value={editingService.short_description}
                onChange={(e) => setEditingService({ ...editingService, short_description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Detailed Overview & Clinical Care Boundaries
              </label>
              <textarea
                rows={4}
                value={editingService.description}
                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Features & Duties (Comma-separated)
                </label>
                <textarea
                  rows={3}
                  value={editingService.features?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Who Is This For? (Comma-separated)
                </label>
                <textarea
                  rows={3}
                  value={editingService.who_is_this_for?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      who_is_this_for: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingService(null);
                  setIsCreatingNew(false);
                }}
                className="text-xs border-slate-700 text-slate-300"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="text-xs font-bold">
                <Save className="w-3.5 h-3.5 mr-1" />
                Save Service Configuration
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-slate-500 text-sm">
            Loading service offerings...
          </div>
        ) : services.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500 text-sm">
            No services configured.
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className="bg-slate-950 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded-full border border-teal-800 capitalize">
                    {service.category.replace('_', ' ')}
                  </span>
                  <Badge variant={service.status === 'active' ? 'active' : 'draft'} className="text-[10px]">
                    {service.status.toUpperCase()}
                  </Badge>
                </div>

                <h3 className="font-bold text-white text-base mb-1.5">{service.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">{service.short_description}</p>

                <div className="space-y-1 text-xs text-slate-500 pt-2 border-t border-slate-900">
                  <div className="flex items-center justify-between">
                    <span>Payment Coverage:</span>
                    <strong className="text-teal-300">Private Pay (Coming Soon) & LTCI</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Key Features:</span>
                    <span className="text-slate-300">{service.features?.length || 0} items</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(service)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                    service.status === 'active'
                      ? 'text-amber-400 hover:bg-amber-950/40'
                      : 'text-emerald-400 hover:bg-emerald-950/40'
                  }`}
                >
                  {service.status === 'active' ? 'Set as Draft' : 'Publish Active'}
                </button>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingService(service);
                      setIsCreatingNew(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs px-2.5 py-1 h-7 border-slate-700 bg-slate-900 text-slate-200"
                  >
                    <Edit2 className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
