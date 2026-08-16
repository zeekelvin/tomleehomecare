import { MetadataRoute } from 'next';
import { store } from '@/lib/store';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tomleehomecare.com';
  const currentDate = new Date().toISOString();

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/request-care`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Dynamic Service Detail Pages
  const services = store.getServices(false);
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: service.updated_at || currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic Educational & Family Resource Pages
  const resources = store.getResources(false);
  const resourcePages: MetadataRoute.Sitemap = resources.map((resource) => ({
    url: `${baseUrl}/resources/${resource.slug}`,
    lastModified: resource.updated_at || currentDate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticPages, ...servicePages, ...resourcePages];
}
