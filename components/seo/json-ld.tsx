import React from 'react';
import { Service, Resource, FAQ } from '@/types';

/**
 * Local Business / Home Healthcare Agency Structured Data Schema
 */
export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HomeHealthcare',
    '@id': 'https://tomleehomecare.com/#organization',
    name: 'TomLee Homecare LLC',
    legalName: 'TomLee Homecare LLC',
    url: 'https://tomleehomecare.com',
    logo: 'https://tomleehomecare.com/logo.svg',
    image: 'https://tomleehomecare.com/images/hero.jpg',
    description:
      'Georgia licensed in-home non-medical care agency providing reliable personal care, companion care, respite, and specialized Alzheimer’s & dementia support. Private Pay coming soon & insurance onboarding.',
    telephone: '(404) 999-7936',
    email: 'info@tomleehomecare.com',
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Private Pay (Coming Soon)', 'Long-Term Care Insurance'],
    currenciesAccepted: 'USD',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lawrenceville, GA 30044',
      addressLocality: 'Lawrenceville',
      addressRegion: 'GA',
      postalCode: '30044',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.9562,
      longitude: -83.9880,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Georgia' },
      { '@type': 'City', name: 'Atlanta' },
      { '@type': 'City', name: 'Alpharetta' },
      { '@type': 'City', name: 'Roswell' },
      { '@type': 'City', name: 'Marietta' },
      { '@type': 'City', name: 'Sandy Springs' },
      { '@type': 'City', name: 'Dunwoody' },
      { '@type': 'City', name: 'Johns Creek' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Georgia In-Home Care Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Personal Care Assistance',
            description: 'Assistance with bathing, dressing, grooming, and mobility support.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Companion & Homemaker Care',
            description: 'Meal preparation, medication reminders, light housekeeping, and companionship.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Specialized Dementia & Alzheimer’s Care',
            description: 'Calm, patient cognitive support and routine management in the comfort of home.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Respite Care for Family Caregivers',
            description: 'Temporary short-term relief to give family caregivers rest and peace of mind.',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQPage Structured Data Schema
 */
export function FAQJsonLd({ faqs }: { faqs: FAQ[] }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Service Detail Structured Data Schema
 */
export function ServiceJsonLd({ service }: { service: Service }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description || service.short_description,
    provider: {
      '@type': 'HomeHealthcare',
      name: 'TomLee Homecare LLC',
      telephone: '(404) 999-7936',
      url: 'https://tomleehomecare.com',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Georgia',
    },
    serviceType: service.category.replace('_', ' '),
    termsOfService: 'Private Pay (Coming Soon) & Insurance',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Article / Guide Structured Data Schema
 */
export function ArticleJsonLd({ resource }: { resource: Resource }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resource.title,
    description: resource.excerpt,
    image: resource.image_url?.startsWith('http')
      ? resource.image_url
      : `https://tomleehomecare.com${resource.image_url || '/images/hero.jpg'}`,
    datePublished: resource.published_at || resource.created_at,
    dateModified: resource.updated_at || resource.published_at || resource.created_at,
    author: {
      '@type': 'Organization',
      name: resource.author || 'TomLee Homecare Clinical Advisory',
      url: 'https://tomleehomecare.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TomLee Homecare LLC',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tomleehomecare.com/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://tomleehomecare.com/resources/${resource.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbList Structured Data Schema
 */
export function BreadcrumbsJsonLd({
  items,
}: {
  items: { name: string; item: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `https://tomleehomecare.com${crumb.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
