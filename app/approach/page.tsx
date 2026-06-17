import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import MeasureLine from '@/components/MeasureLine';
import { SITE } from '@/lib/site';
import { PRINCIPLES } from '@/lib/principles';

export const metadata: Metadata = {
  title: 'Approach',
  description:
    'How Mangiore works: we run our own product, we hold a written standard, we refuse to trade taste for uptime, and we say no to the easy version.',
  alternates: { canonical: '/approach/' },
  openGraph: {
    type: 'article',
    title: 'Approach | Mangiore',
    description:
      'The standard we hold, said plainly. Four principles we do not renegotiate under pressure.',
    url: `${SITE.baseUrl}/approach/`,
    images: [SITE.ogImage],
  },
};

export default function ApproachPage() {
  return (
    <>
      <section className="lane-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/">{SITE.name}</a>
            <span className="sep">/</span>
            <span>Approach</span>
          </nav>
          <p className="eyebrow">Fig. 02 · How we work</p>
          <h1 className="lane-title">We hold the line on what right is.</h1>
          <p className="lane-lead">
            A lot of what goes wrong in software is decided long before the
            code, in the quiet willingness to accept less than right. We are not
            willing. Here is what that looks like in practice.
          </p>
          <MeasureLine label="Approach · column" />
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="approach-list">
            {PRINCIPLES.map((p) => (
              <Reveal className="approach-item" key={p.code}>
                <div className="approach-mark">
                  <span className="n">{p.code}</span>
                </div>
                <div className="approach-body">
                  <h2>{p.title}</h2>
                  {p.long.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="band">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">
            The next move
          </Reveal>
          <Reveal as="h2">
            If that is the standard you want held, let&apos;s talk.
          </Reveal>
          <Reveal>
            <a className="btn" href="/contact/">
              Start the conversation →
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
