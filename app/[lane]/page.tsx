import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import { SITE } from '@/lib/site';
import { LANES, getLane, otherLanes } from '@/lib/lanes';

export function generateStaticParams() {
  return LANES.map((l) => ({ lane: l.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lane: string }>;
}): Promise<Metadata> {
  const { lane: slug } = await params;
  const lane = getLane(slug);
  if (!lane) return {};
  return {
    // metaTitle already carries the brand, so bypass the layout template.
    title: { absolute: lane.metaTitle },
    description: lane.metaDescription,
    alternates: { canonical: `/${lane.slug}/` },
    openGraph: {
      type: 'article',
      title: lane.metaTitle,
      description: lane.metaDescription,
      url: `${SITE.baseUrl}/${lane.slug}/`,
    },
  };
}

export default async function LanePage({
  params,
}: {
  params: Promise<{ lane: string }>;
}) {
  const { lane: slug } = await params;
  const lane = getLane(slug);
  if (!lane) notFound();

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: lane.title,
    serviceType: lane.title,
    description: lane.metaDescription,
    url: `${SITE.baseUrl}/${lane.slug}/`,
    provider: {
      '@type': 'Organization',
      name: SITE.legalName,
      url: SITE.baseUrl,
    },
    areaServed: 'US',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <section className="lane-hero">
        <div className="wrap">
          <Reveal as="nav" className="crumbs" aria-label="Breadcrumb">
            <Link href="/">{SITE.name}</Link>
            <span className="sep">/</span>
            <Link href="/#work">Work</Link>
            <span className="sep">/</span>
            <span>{lane.code}</span>
          </Reveal>
          <Reveal as="p" className="eyebrow">
            {lane.code} / What we do
          </Reveal>
          <Reveal as="h1" className="lane-title">
            {lane.title}
          </Reveal>
          <Reveal as="p" className="lane-lead">
            {lane.lead}
          </Reveal>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="lane-body">
            <Reveal className="prose">
              {lane.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>
                What&apos;s included
              </p>
              <ul className="included">
                {lane.included.map((item) => (
                  <li key={item.label}>
                    <span className="k">{item.label}</span>
                    <span className="v">{item.detail}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="band">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">
            Start here
          </Reveal>
          <Reveal as="h2">
            If this is the work, the next step is a conversation.
          </Reveal>
          <Reveal>
            <a className="btn" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </Reveal>
        </div>
      </section>

      {/* RELATED LANES */}
      <section className="related">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Also</span>
            <h2>The other three lanes.</h2>
          </Reveal>
          <Reveal className="related-grid">
            {otherLanes(lane.slug).map((l) => (
              <Link key={l.slug} className="lane" href={`/${l.slug}/`}>
                <span className="idx">{l.code}</span>
                <h3>{l.title}</h3>
                <p>{l.summary}</p>
                <span className="go">Read more ↗</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
