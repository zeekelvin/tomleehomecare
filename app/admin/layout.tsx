'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { TomLeeLogo } from '@/components/ui/logo';
import {
  Users,
  Briefcase,
  BookOpen,
  HelpCircle,
  Sliders,
  Settings,
  ExternalLink,
  ShieldCheck,
  LogOut,
  UserCheck,
} from 'lucide-react';
import { AdminUser } from '@/types';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === '/admin/login';

  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(!isLoginPage);

  useEffect(() => {
    if (isLoginPage) {
      setIsCheckingAuth(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/me');
        if (!res.ok) {
          router.push('/admin/login');
          return;
        }
        const data = await res.json();
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
          setIsCheckingAuth(false);
        } else {
          router.push('/admin/login');
        }
      } catch {
        router.push('/admin/login');
      }
    }

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  // If on login page, render children directly without dashboard shell
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state while verifying credentials
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-400 rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
            Verifying Admin Session...
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      name: 'Leads & Triage',
      href: '/admin/leads',
      icon: Users,
      badge: 'Live',
    },
    {
      name: 'Services & Scope',
      href: '/admin/services',
      icon: Briefcase,
    },
    {
      name: 'Resources & CMS',
      href: '/admin/resources',
      icon: BookOpen,
    },
    {
      name: 'FAQ Knowledge Base',
      href: '/admin/faqs',
      icon: HelpCircle,
    },
    {
      name: 'Qualification Rules',
      href: '/admin/rules',
      icon: Sliders,
    },
    {
      name: 'Site Settings',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Admin Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4 sm:gap-6">
          <TomLeeLogo theme="dark" size="sm" />
          <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-900/60 text-teal-400 text-[11px] font-mono font-semibold border border-teal-700/50">
            <ShieldCheck className="w-3 h-3 text-[#7CB342]" />
            Administrative Operations Suite
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* User Profile Badge */}
          {currentUser && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-[#7CB342]" />
              <span className="text-slate-300 font-medium">{currentUser.email}</span>
              <span className="px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 font-mono text-[10px] font-bold border border-teal-800">
                {currentUser.role}
              </span>
            </div>
          )}

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors border border-slate-700"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold transition-colors border border-rose-900/60 focus:outline-none focus:ring-2 focus:ring-rose-500"
            title="Sign out of Admin Portal"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Sub-Nav & Layout Body */}
      <div className="flex-1 flex flex-col">
        {/* Navigation Tabs Bar */}
        <div className="bg-slate-950/80 border-b border-slate-800 px-4 sm:px-6 overflow-x-auto">
          <nav className="flex items-center gap-1 sm:gap-2 max-w-7xl mx-auto py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== '/admin/leads' && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-teal-600/20 text-teal-300 border border-teal-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#7CB342]' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-mono">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Page Content Viewport */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
