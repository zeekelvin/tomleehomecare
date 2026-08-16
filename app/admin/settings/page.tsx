'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Settings,
  Phone,
  Mail,
  MapPin,
  Shield,
  Save,
  CheckCircle2,
  Sliders,
  Check,
} from 'lucide-react';
import { SiteSettings } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const resSettings = await fetch('/api/settings');
        const dataSettings = await resSettings.json();
        if (dataSettings.success) setSettings(dataSettings.settings);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (settings) {
        await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(settings),
        });
      }
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error('Error saving settings', e);
    }
  };

  if (loading || !settings) {
    return <div className="py-16 text-center text-slate-500 text-sm">Loading agency configuration...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Agency Profile & Operating System Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Global agency contact endpoints, 24/7 intake hotline numbers, Georgia licensing metadata, and service zip codes.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700 text-xs text-emerald-200 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Site configuration settings updated successfully.</span>
          </div>
          <button onClick={() => setSavedSuccess(false)} className="text-emerald-400 hover:text-emerald-200 text-xs">
            Dismiss
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Agency Info */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2 border-b border-slate-800 pb-3">
            <Phone className="w-4 h-4 text-teal-400" />
            Agency Identifiers & Contact Lines
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Agency Business Name
              </label>
              <input
                type="text"
                value={settings.business_name}
                onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Primary Phone / 24/7 Intake Line
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Care Coordination Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Office Hours
              </label>
              <input
                type="text"
                value={settings.business_hours}
                onChange={(e) => setSettings({ ...settings, business_hours: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Headquarters Address
              </label>
              <input
                type="text"
                value={settings.address_line || 'Lawrenceville, GA 30044'}
                onChange={(e) => setSettings({ ...settings, address_line: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Territory & Zip Code Coverage */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2 border-b border-slate-800 pb-3">
            <MapPin className="w-4 h-4 text-teal-400" />
            Georgia Service Territory & ZIP Code Coverage
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Active In-Service ZIP Codes (Comma-separated)
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Inquiries with matching ZIP codes automatically receive in-service qualification bonuses.
            </p>
            <textarea
              rows={3}
              value={settings.service_area_zips?.join(', ') || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  service_area_zips: e.target.value.split(',').map((z) => z.trim()).filter(Boolean),
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:ring-1 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="lg" className="text-xs font-bold px-6">
            <Save className="w-4 h-4 mr-1.5" />
            Save System Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
