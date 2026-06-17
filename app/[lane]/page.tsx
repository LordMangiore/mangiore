import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import MeasureLine from '@/components/MeasureLine';
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

      {/* Hero stays static so the cross-page title morph reads cleanly. */}
      <section className="lane-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/">{SITE.name}</a>
            <span className="sep">/</span>
            <a href="/work/">Work</a>
            <span className="sep">/</span>
            <span>{lane.code}</span>
          </nav>
          <p className="eyebrow">{lane.code} / What we do</p>
          <h1
            className="lane-title"
            style={{ viewTransitionName: `lane-title-${lane.slug}` }}
          >
            {lane.title}
          </h1>
          <p className="lane-lead">{lane.lead}</p>
          <MeasureLine label={`Lane ${lane.code} · column`} />
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
              <a key={l.slug} className="lane" href={`/${l.slug}/`}>
                <span className="idx">{l.code}</span>
                <h3 style={{ viewTransitionName: `lane-title-${l.slug}` }}>
                  {l.title}
                </h3>
                <p>{l.summary}</p>
                <span className="go">Read more ↗</span>
              </a>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
