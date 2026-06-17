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
  const lanes = LANES.map((l) => ({
    url: `${SITE.baseUrl}/${l.slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
  return [home, ...lanes];
}
