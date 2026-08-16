'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  X,
  Printer,
  ShieldCheck,
  Download,
  CheckSquare,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChecklistItem {
  id: string;
  category: string;
  label: string;
  description: string;
}

const FALL_SAFETY_ITEMS: ChecklistItem[] = [
  {
    id: 'f1',
    category: 'Bathrooms',
    label: 'Shower & Tub Grab Bars Installed',
    description: 'Securely anchored grab bars inside shower stall and beside toilet.',
  },
  {
    id: 'f2',
    category: 'Bathrooms',
    label: 'Non-Slip Suction Mats',
    description: 'High-traction mats inside the tub/shower and outside on the floor.',
  },
  {
    id: 'f3',
    category: 'Hallways & Living Areas',
    label: 'Throw Rugs Removed or Taped Down',
    description: 'Loose floor rugs removed or secured with heavy-duty double-sided tape.',
  },
  {
    id: 'f4',
    category: 'Hallways & Living Areas',
    label: 'Pathway Nightlights Installed',
    description: 'Motion-activated nightlights from bedroom to bathroom and kitchen.',
  },
  {
    id: 'f5',
    category: 'Hallways & Living Areas',
    label: 'Clear 3-Foot Walkways',
    description: 'No cords, footstools, or low furniture obstructing primary walking paths.',
  },
  {
    id: 'f6',
    category: 'Staircases',
    label: 'Sturdy Handrails on Both Sides',
    description: 'Firmly fastened handrails running the full length of the stairs.',
  },
  {
    id: 'f7',
    category: 'Bedrooms',
    label: 'Bedside Light & Phone in Easy Reach',
    description: 'A lamp, eyeglasses, and telephone accessible without getting out of bed.',
  },
  {
    id: 'f8',
    category: 'Daily Habits & Health',
    label: 'Medication Side-Effect Review',
    description: 'Annual physician review of medications causing dizziness or low blood pressure.',
  },
  {
    id: 'f9',
    category: 'Daily Habits & Health',
    label: 'Non-Skid Indoor Footwear',
    description: 'Supportive, rubber-soled shoes worn indoors instead of slippery socks.',
  },
];

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChecklistModal({ isOpen, onClose }: ChecklistModalProps) {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({
    f1: false,
    f2: false,
    f3: false,
  });

  if (!isOpen) return null;

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const total = FALL_SAFETY_ITEMS.length;
  const completed = Object.values(checkedIds).filter(Boolean).length;
  const percentage = Math.round((completed / total) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-teal-900 to-[#127485] text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-teal-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7CB342]" />
              Interactive Senior Safety Tool
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              In-Home Fall Prevention Checklist
            </h2>
            <p className="text-teal-100 text-xs sm:text-sm">
              Review your loved one’s living space room-by-room to identify and fix fall risks.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-teal-100 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="px-6 py-4 bg-teal-50/70 border-b border-teal-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Safety Readiness Score
            </span>
            <div className="text-lg font-bold text-[#127485]">
              {completed} of {total} Safeguards Completed ({percentage}%)
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-[#127485]" />
              Print / Save PDF
            </button>
          </div>
        </div>

        {/* List of Items */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {FALL_SAFETY_ITEMS.map((item) => {
            const isChecked = !!checkedIds[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isChecked
                    ? 'bg-teal-50/50 border-teal-300 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-[#127485]" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3
                      className={`text-sm font-bold ${
                        isChecked ? 'text-[#127485] line-through' : 'text-slate-900'
                      }`}
                    >
                      {item.label}
                    </h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            TomLee caregivers conduct routine safety sweeps during every visit in Georgia.
          </p>
          <Button variant="primary" size="sm" onClick={onClose} className="w-full sm:w-auto font-bold">
            Done Reviewing
          </Button>
        </div>
      </div>
    </div>
  );
}
