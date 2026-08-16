'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TomLeeLogo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@tomleehomecare.com');
  const [password, setPassword] = useState('TomLeeAdmin2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Authentication failed. Please check your credentials.');
        setIsLoading(false);
        return;
      }

      // Success -> Redirect to dashboard
      router.push('/admin/leads');
      router.refresh();
    } catch (err) {
      setErrorMessage('Network error during authentication. Please try again.');
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@tomleehomecare.com');
    setPassword('TomLeeAdmin2026!');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-slate-100 selection:bg-teal-500/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex justify-center mb-6">
          <TomLeeLogo theme="dark" size="lg" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Admin Portal Authentication
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Secure private-pay care coordination & triage management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-slate-900/90 py-8 px-6 shadow-2xl rounded-2xl border border-slate-800 backdrop-blur-xl sm:px-10">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Sign in error</p>
                <p className="mt-0.5 text-rose-300/90 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
              >
                Admin Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#127485] focus:border-transparent transition-all"
                  placeholder="admin@tomleehomecare.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
              >
                Security Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#127485] focus:border-transparent transition-all"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full justify-center text-sm font-bold shadow-lg shadow-teal-950/50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4" />
                    Sign In to Admin Dashboard
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                )}
              </Button>
            </div>
          </form>

          {/* Preset Credentials Box for Easy Evaluation */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7CB342]" />
                  Administrator Credentials
                </span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-[11px] font-semibold text-[#7CB342] hover:text-[#9CCC65] underline"
                >
                  Autofill
                </button>
              </div>
              <div className="space-y-1 text-slate-400 font-mono text-[11px]">
                <p>
                  <strong className="text-slate-300">Email:</strong> admin@tomleehomecare.com
                </p>
                <p>
                  <strong className="text-slate-300">Pass:</strong> TomLeeAdmin2026!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#127485]" />
          <span>PBKDF2 & HMAC encrypted session protected by Row-Level Security</span>
        </div>
      </div>
    </div>
  );
}
