'use client';

import React, { useState, useEffect } from 'react';
import { Button, Badge } from '@/components/ui/button';
import {
  Sliders,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle2,
  Shield,
  Zap,
  HelpCircle,
  ToggleLeft,
  ToggleRight,
  Info,
} from 'lucide-react';
import { QualificationRule, QualificationStatus } from '@/types';

export default function AdminRulesPage() {
  const [rules, setRules] = useState<QualificationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRule, setEditingRule] = useState<QualificationRule | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchRules = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/qualification-rules');
      const data = await res.json();
      if (data.success) {
        setRules(data.rules);
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
        const res = await fetch('/api/qualification-rules');
        const data = await res.json();
        if (isMounted && data.success) {
          setRules(data.rules);
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

  const handleToggleRuleActive = async (rule: QualificationRule) => {
    const newActive = !rule.is_active;
    try {
      const res = await fetch(`/api/qualification-rules/${rule.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: newActive }),
      });
      const data = await res.json();
      if (data.success) {
        setRules((prev) =>
          prev.map((r) => (r.id === rule.id ? { ...r, is_active: newActive } : r))
        );
        setNotification(`Rule "${rule.name}" is now ${newActive ? 'active' : 'disabled'}`);
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRule) return;

    try {
      const res = await fetch('/api/qualification-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingRule),
      });
      const data = await res.json();
      if (data.success) {
        setNotification('Qualification rule saved');
        setEditingRule(null);
        setIsCreatingNew(false);
        fetchRules();
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteRule = async (id: string) => {
    if (!confirm('Are you sure you want to remove this scoring rule?')) return;
    try {
      const res = await fetch(`/api/qualification-rules/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setRules((prev) => prev.filter((r) => r.id !== id));
        setNotification('Rule removed from matrix');
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Care Qualification & Triage Rules Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure dynamic qualification weights, payment model scoring bonuses, service territory gating, and provider-switching urgency triggers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="accent"
            size="sm"
            onClick={() => {
              setEditingRule({
                id: `rule-${Date.now()}`,
                name: 'Switching Provider 48-Hr Protocol Weight',
                field: 'lead_intent',
                operator: 'equals',
                value: 'unhappy_with_current_provider',
                score: 25,
                result_status: 'QUALIFIED',
                is_active: true,
                description: 'Awards +25 points and prioritizes 48-Hour Zero-Gap transition onboarding for clients with caregiver burnout or turnover at other agencies.',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              });
              setIsCreatingNew(true);
            }}
            className="text-xs font-bold"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add Rule Weight
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

      {/* Rules Engine Explainer Banner */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-teal-950 text-teal-400 border border-teal-800 shrink-0">
            <Zap className="w-5 h-5 text-[#7CB342]" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-white">How Qualification Scoring Works</h4>
            <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
              When a family submits a care request, the engine aggregates points from active rules. Scores ≥ 70 are classified as <strong className="text-emerald-400">QUALIFIED</strong>, 40–69 as <strong className="text-amber-400">NEEDS REVIEW</strong>, and &lt; 40 as <strong className="text-slate-400">NOT QUALIFIED</strong>.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
            Active Rules: <strong className="text-teal-400">{rules.filter((r) => r.is_active).length}</strong> / {rules.length}
          </span>
        </div>
      </div>

      {/* Rule Edit / Create Drawer */}
      {editingRule && (
        <div className="bg-slate-950 p-6 rounded-2xl border border-teal-500/50 shadow-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-400" />
              <h3 className="font-bold text-white text-base">
                {isCreatingNew ? 'Create New Qualification Weight' : `Edit Rule: ${editingRule.name}`}
              </h3>
            </div>
            <button
              onClick={() => {
                setEditingRule(null);
                setIsCreatingNew(false);
              }}
              className="text-slate-400 hover:text-white text-xs"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSaveRule} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Rule Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingRule.name}
                  onChange={(e) => setEditingRule({ ...editingRule, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Target Field *
                </label>
                <select
                  value={editingRule.field}
                  onChange={(e) => setEditingRule({ ...editingRule, field: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                >
                  <option value="payment_method">Payment Method (private_pay, ltci, etc.)</option>
                  <option value="lead_intent">Lead Intent (unhappy_with_current_provider, first_time, etc.)</option>
                  <option value="service_area_status">Service Area Status (in_service_area, out_of_area)</option>
                  <option value="urgency">Urgency Timeline (immediately, within_1_2_weeks, etc.)</option>
                  <option value="services_requested">Services Inquired (length / count)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Condition Operator
                </label>
                <select
                  value={editingRule.operator}
                  onChange={(e) => setEditingRule({ ...editingRule, operator: e.target.value as any })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                >
                  <option value="equals">Equals Exact Value</option>
                  <option value="contains">Contains Value</option>
                  <option value="greater_than">Greater Than (Numeric)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Expected Match Value
                </label>
                <input
                  type="text"
                  value={String(editingRule.value)}
                  onChange={(e) => setEditingRule({ ...editingRule, value: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Score Contribution Points (-100 to +100) *
                </label>
                <input
                  type="number"
                  required
                  value={editingRule.score}
                  onChange={(e) => setEditingRule({ ...editingRule, score: parseInt(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Override Status (Optional)
                </label>
                <select
                  value={editingRule.result_status || ''}
                  onChange={(e) =>
                    setEditingRule({
                      ...editingRule,
                      result_status: (e.target.value as QualificationStatus) || undefined,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
                >
                  <option value="">No Override (Use Aggregate Score)</option>
                  <option value="QUALIFIED">Force QUALIFIED</option>
                  <option value="NEEDS_REVIEW">Force NEEDS REVIEW</option>
                  <option value="NOT_CURRENTLY_QUALIFIED">Force NOT QUALIFIED</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Rule Description & Triage Reasoning
              </label>
              <textarea
                rows={2}
                value={editingRule.description || ''}
                onChange={(e) => setEditingRule({ ...editingRule, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingRule(null);
                  setIsCreatingNew(false);
                }}
                className="text-xs border-slate-700 text-slate-300"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="text-xs font-bold">
                <Save className="w-3.5 h-3.5 mr-1" />
                Save Qualification Rule
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Rules Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800">
        {loading ? (
          <div className="p-8 text-center text-slate-500 text-xs">Loading triage rules...</div>
        ) : rules.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">No qualification rules configured.</div>
        ) : (
          rules.map((rule) => (
            <div
              key={rule.id}
              className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                rule.is_active ? 'hover:bg-slate-900/40' : 'bg-slate-950/40 opacity-60'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                      rule.score >= 0
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}
                  >
                    {rule.score > 0 ? `+${rule.score}` : rule.score} pts
                  </span>

                  <h3 className="font-bold text-white text-sm sm:text-base">{rule.name}</h3>

                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {rule.field} {rule.operator} &quot;{String(rule.value)}&quot;
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{rule.description}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleRuleActive(rule)}
                  className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                    rule.is_active
                      ? 'bg-teal-950/70 border-teal-700 text-teal-300'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                >
                  {rule.is_active ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7CB342]" />
                      Active
                    </>
                  ) : (
                    'Disabled'
                  )}
                </button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingRule(rule);
                    setIsCreatingNew(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs px-2.5 py-1.5 h-8 border-slate-700 bg-slate-900 text-slate-200"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Edit
                </Button>

                <button
                  onClick={() => handleDeleteRule(rule.id)}
                  className="p-2 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 transition-colors"
                  title="Delete rule"
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
