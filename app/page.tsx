import { store } from '@/lib/store';
import { HomepageView } from '@/components/public/homepage-view';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const services = store.getServices(false); // active only
  const resources = store.getResources(false); // published only
  const faqs = store.getFAQs(false); // published only

  return <HomepageView services={services} resources={resources} faqs={faqs} />;
}
