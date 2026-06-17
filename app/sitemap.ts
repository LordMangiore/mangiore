import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { LANES } from '@/lib/lanes';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: `${SITE.baseUrl}/`,
    changeFrequency: 'monthly' as const,
    priority: 1,
  };
  const work = {
    url: `${SITE.baseUrl}/work/`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  };
  const approach = {
    url: `${SITE.baseUrl}/approach/`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  };
  const contact = {
    url: `${SITE.baseUrl}/contact/`,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  };
  const lanes = LANES.map((l) => ({
    url: `${SITE.baseUrl}/${l.slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  return [home, work, approach, contact, ...lanes];
}
