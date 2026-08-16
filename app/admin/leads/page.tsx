'use client';

import React, { useState, useEffect } from 'react';
import { Button, Badge } from '@/components/ui/button';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Eye,
  Settings,
  Shield,
  Trash2,
  MessageSquare,
  Sparkles,
  Check,
} from 'lucide-react';
import { Lead, QualificationStatus } from '@/types';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSwitching, setFilterSwitching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchLeads = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
        setSelectedLead((prev) => {
          if (prev) {
            const found = data.leads.find((l: Lead) => l.id === prev.id);
            return found || data.leads[0] || null;
          }
          return data.leads[0] || null;
        });
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
        const res = await fetch('/api/leads');
        const data = await res.json();
        if (isMounted && data.success) {
          setLeads(data.leads);
          setSelectedLead((prev) => {
            if (prev) {
              const found = data.leads.find((l: Lead) => l.id === prev.id);
              return found || data.leads[0] || null;
            }
            return data.leads[0] || null;
          });
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

  const handleUpdateLeadStatus = async (leadId: string, newStatus: QualificationStatus) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qualification_status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, qualification_status: newStatus } : l))
        );
        if (selectedLead?.id === leadId) {
          setSelectedLead({ ...selectedLead, qualification_status: newStatus });
        }
        setActionSuccess(`Status updated to ${newStatus}`);
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this intake lead record?')) return;
    try {
      const res = await fetch(`/api/leads/${leadId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
        if (selectedLead?.id === leadId) {
          setSelectedLead(null);
        }
        setActionSuccess('Lead deleted successfully');
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    if (filterStatus !== 'all' && lead.qualification_status !== filterStatus) {
      return false;
    }
    if (filterSwitching && !lead.is_switching_provider && lead.lead_intent !== 'unhappy_with_current_provider') {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = `${lead.first_name} ${lead.last_name}`.toLowerCase().includes(q);
      const matchCity = (lead.city || '').toLowerCase().includes(q);
      const matchPhone = (lead.phone || '').toLowerCase().includes(q);
      const matchId = (lead.id || '').toLowerCase().includes(q);
      if (!matchName && !matchCity && !matchPhone && !matchId) return false;
    }
    return true;
  });

  const getStatusBadge = (status: QualificationStatus) => {
    switch (status) {
      case 'QUALIFIED':
        return <Badge variant="qualified">QUALIFIED</Badge>;
      case 'NEEDS_REVIEW':
        return <Badge variant="review">NEEDS REVIEW</Badge>;
      case 'NOT_CURRENTLY_QUALIFIED':
        return <Badge variant="not_qualified">NOT QUALIFIED</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Intake Leads & Qualification Triage
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time Georgia client intake dashboard, qualification scoring engine, and 48-Hour provider transition queue.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchLeads}
            className="text-xs border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Refresh Leads
          </Button>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700 text-xs text-emerald-200 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess(null)} className="text-emerald-400 hover:text-emerald-200 text-xs">
            Dismiss
          </button>
        </div>
      )}

      {/* Main Dual-Pane View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden min-h-[680px]">
        {/* Left Side: Lead Feed & Filters (5 Cols) */}
        <div className="lg:col-span-5 border-r border-slate-800 flex flex-col bg-slate-900/60">
          {/* Search and Filters */}
          <div className="p-4 border-b border-slate-800 space-y-3 bg-slate-950/70">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search leads by name, city, phone, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none text-xs"
              >
                <option value="all">All Qualification Statuses</option>
                <option value="QUALIFIED">Qualified</option>
                <option value="NEEDS_REVIEW">Needs Review</option>
                <option value="NOT_CURRENTLY_QUALIFIED">Not Qualified</option>
              </select>

              <button
                type="button"
                onClick={() => setFilterSwitching(!filterSwitching)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  filterSwitching
                    ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Switching Only
              </button>
            </div>
          </div>

          {/* Lead List Scroll Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 max-h-[640px]">
            {loading ? (
              <div className="p-8 text-center text-slate-500 text-sm">Loading inquiries...</div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">No care inquiries found matching filters.</div>
            ) : (
              filteredLeads.map((lead) => {
                const isSelected = selectedLead?.id === lead.id;
                const isSwitching = lead.is_switching_provider || lead.lead_intent === 'unhappy_with_current_provider';
                return (
                  <button
                    key={lead.id}
                    type="button"
                    onClick={() => setSelectedLead(lead)}
                    className={`w-full text-left p-4 transition-all flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-teal-950/60 border-l-4 border-l-teal-500'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">
                            {lead.first_name} {lead.last_name}
                          </span>
                          {isSwitching && (
                            <Badge variant="switching" className="text-[9px] px-1.5 py-0">
                              SWITCHING
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                          {lead.city}, {lead.state} {lead.zip_code}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        {getStatusBadge(lead.qualification_status)}
                        <span className="text-[10px] font-mono text-slate-400">
                          Score: <strong className="text-teal-300">{lead.qualification_score}</strong>/100
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/50">
                      <span className="capitalize">{lead.payment_method?.replace(/_/g, ' ')}</span>
                      <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Detailed Profile & Scoring Breakdown (7 Cols) */}
        <div className="lg:col-span-7 p-6 overflow-y-auto max-h-[740px]">
          {selectedLead ? (
            <div className="space-y-6">
              {/* Header Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {selectedLead.first_name} {selectedLead.last_name}
                    </h2>
                    {getStatusBadge(selectedLead.qualification_status)}
                    {(selectedLead.is_switching_provider || selectedLead.lead_intent === 'unhappy_with_current_provider') && (
                      <Badge variant="switching" className="text-xs">
                        Switching Provider Priority
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    ID: {selectedLead.id} • Received: {new Date(selectedLead.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteLead(selectedLead.id)}
                    className="p-2 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 hover:bg-rose-900 transition-colors text-xs"
                    title="Delete lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Status Update Quick Buttons */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-400 font-semibold">Triage Action:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateLeadStatus(selectedLead.id, 'QUALIFIED')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedLead.qualification_status === 'QUALIFIED'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-emerald-950/70 border border-emerald-800 text-emerald-300 hover:bg-emerald-900'
                    }`}
                  >
                    Set Qualified
                  </button>
                  <button
                    onClick={() => handleUpdateLeadStatus(selectedLead.id, 'NEEDS_REVIEW')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedLead.qualification_status === 'NEEDS_REVIEW'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-amber-950/70 border border-amber-800 text-amber-300 hover:bg-amber-900'
                    }`}
                  >
                    Needs Review
                  </button>
                  <button
                    onClick={() => handleUpdateLeadStatus(selectedLead.id, 'NOT_CURRENTLY_QUALIFIED')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedLead.qualification_status === 'NOT_CURRENTLY_QUALIFIED'
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-rose-950/70 border border-rose-800 text-rose-300 hover:bg-rose-900'
                    }`}
                  >
                    Not Qualified
                  </button>
                </div>
              </div>

              {/* Qualification Scoring Matrix Card */}
              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4 text-teal-400" />
                    Automated Qualification Matrix & Reasoning
                  </h3>
                  <div className="text-right">
                    <span className="text-xl font-bold text-teal-400 font-mono">
                      {selectedLead.qualification_score}
                    </span>
                    <span className="text-xs text-slate-500 font-mono"> / 100</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {selectedLead.qualification_reasons && selectedLead.qualification_reasons.length > 0 ? (
                    selectedLead.qualification_reasons.map((reason, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400">
                      Standard qualification evaluation based on private-pay funding preference and Georgia service territory.
                    </div>
                  )}
                </div>
              </div>

              {/* 2-Column Info: Contact & Care Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contact Card */}
                <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                    Contact & Communication
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                      <a href={`tel:${selectedLead.phone}`} className="text-white font-semibold hover:underline">
                        {selectedLead.phone}
                      </a>
                    </div>

                    {selectedLead.email && (
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                        <a href={`mailto:${selectedLead.email}`} className="text-white hover:underline truncate">
                          {selectedLead.email}
                        </a>
                      </div>
                    )}

                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-medium">
                          {selectedLead.city}, {selectedLead.state} {selectedLead.zip_code}
                        </p>
                        <p className="text-[11px] text-slate-500">Georgia Service Territory</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-0.5">
                      <p>
                        Preferred Channel: <strong className="text-white capitalize">{selectedLead.preferred_contact_method}</strong>
                      </p>
                      {selectedLead.best_time_to_contact && (
                        <p>
                          Best Call Window: <strong className="text-white">{selectedLead.best_time_to_contact}</strong>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Care Plan Specs */}
                <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                    Care Scope & Funding
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Care Recipient</span>
                      <span className="font-bold text-white capitalize">
                        {selectedLead.care_recipient_relationship?.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 block">Funding Model</span>
                      <span className="font-bold text-teal-300 capitalize">
                        {selectedLead.payment_method?.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 block">Start Timeline / Urgency</span>
                      <span className="font-bold text-amber-300 capitalize">
                        {selectedLead.urgency?.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 block mb-1">Services Requested:</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedLead.services_requested?.map((srv) => (
                          <span
                            key={srv}
                            className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] border border-slate-700"
                          >
                            {srv}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              {selectedLead.internal_notes && (
                <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">
                    Inquiry Notes & Assessment Details
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    {selectedLead.internal_notes}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs py-20">
              Select an inquiry from the left to view comprehensive qualification details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
