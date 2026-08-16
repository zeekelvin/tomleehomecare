'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RefreshCw, Home, Phone, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error securely
    console.error('Unhandled runtime error in TomLee application:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-800">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="w-14 h-14 mx-auto rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-5">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Something went wrong
        </h1>

        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          We encountered an unexpected error while loading this page. Our team has been notified, and your family&apos;s data remains completely safe.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>

          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go to Home
            </Link>
          </Button>
        </div>

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
          Need immediate assistance? Call our care team directly at{' '}
          <a href="tel:4049997936" className="font-bold text-[#127485] hover:underline">
            (404) 999-7936
          </a>
        </div>
      </div>
    </div>
  );
}
