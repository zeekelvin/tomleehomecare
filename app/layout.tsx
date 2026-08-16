import type { Metadata } from 'next';
import './globals.css';
import { LocalBusinessJsonLd } from '@/components/seo/json-ld';
import { ScrollToTop } from '@/components/ui/scroll-to-top';

export const metadata: Metadata = {
  metadataBase: new URL('https://tomleehomecare.com'),
  title: {
    default: 'TomLee Homecare LLC | Reliable Home Care in Georgia • Private Pay Coming Soon',
    template: '%s | TomLee Homecare LLC',
  },
  description:
    'Compassionate, dependable in-home personal care, companion care, respite, and memory care for seniors across Georgia. Private-pay home care (coming soon) and active insurance onboarding with a 48-Hour Zero-Gap Transition Protocol.',
  keywords: [
    'Georgia home care',
    'private-pay home care Atlanta',
    'senior companion care Georgia',
    'personal care assistance Atlanta GA',
    'respite care for families',
    'Alzheimers memory care Georgia',
    'switch home care agency Georgia',
    'non-medical in home care',
    'long term care insurance home care',
  ],
  authors: [{ name: 'TomLee Homecare LLC', url: 'https://tomleehomecare.com' }],
  creator: 'TomLee Homecare LLC',
  publisher: 'TomLee Homecare LLC',
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.jpeg', type: 'image/jpeg' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.jpeg',
    apple: '/favicon.jpeg',
  },
  openGraph: {
    title: 'TomLee Homecare LLC | Reliable Caregivers. Peace of Mind for Families.',
    description:
      'Dependable in-home care tailored around your loved one’s daily routine. Specializing in private-pay personal care, companion care, and respite across Georgia.',
    url: 'https://tomleehomecare.com',
    siteName: 'TomLee Homecare LLC',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/services/personal-care.jpg',
        width: 1200,
        height: 630,
        alt: 'TomLee Homecare LLC Georgia Senior Care Provider',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TomLee Homecare LLC | Georgia Senior Home Care',
    description:
      'Reliable caregivers and peace of mind for families across Georgia.',
    images: ['/images/services/personal-care.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <LocalBusinessJsonLd />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F8FAFB] text-slate-800 antialiased font-sans flex flex-col selection:bg-teal-100 selection:text-teal-900"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#127485] focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400"
        >
          Skip to main content
        </a>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}

