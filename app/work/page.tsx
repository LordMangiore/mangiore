import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import MeasureLine from '@/components/MeasureLine';
import { SITE } from '@/lib/site';
import { LANES } from '@/lib/lanes';

export const metadata: Metadata = {
  title: 'The Work',
  description:
    'Mangiore keeps one product on display, BetterCram, which we own and run. The rest is about your project: where you are, and where it can go.',
  alternates: { canonical: '/work/' },
  openGraph: {
    type: 'website',
    title: 'The Work | Mangiore',
    description:
      'No gallery. The proof is the site you are on and the product we run. The rest is about you.',
    url: `${SITE.baseUrl}/work/`,
  },
};

export default function WorkPage() {
  return (
    <>
      {/* THE REVEAL */}
      <section className="lane-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/">{SITE.name}</a>
            <span className="sep">/</span>
            <span>Work</span>
          </nav>
          <p className="eyebrow">Fig. 03 · The work</p>
          <h1 className="lane-title">You came looking for our work.</h1>
          <p className="lane-lead">
            Here it is. The site you are standing in, and the one product we own
            and run. Everything else on this page is about you, because that is
            the only work that pays you back.
          </p>
          <MeasureLine label="This page · column" />
        </div>
      </section>

      {/* THE EVIDENCE */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">The evidence</span>
            <h2>We keep it short on purpose.</h2>
          </Reveal>
          <div className="principles">
            <Reveal className="principle">
              <span className="n">Exhibit A</span>
              <h3>This site.</h3>
              <p>
                You are inside it. It loads fast, reads clean on a phone, and
                holds to the same standard we would hold your work to. The
                demonstration is not a picture of the work. It is the work. Want
                to check? Press <kbd className="kbd-inline">G</kbd> for the grid
                it is built on, or read the source.
              </p>
            </Reveal>
            <Reveal className="principle">
              <span className="n">Exhibit B</span>
              <h3>BetterCram.</h3>
              <p>
                A product we designed, built, and run ourselves. Not a case
                study we are paraphrasing, a live thing we own and operate. That
                is a harder claim than a wall of logos, because it means we can
                ship and then carry what we shipped.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <a
                  className="inline-link"
                  href={SITE.flagship.url}
                  target="_blank"
                  rel="noopener"
                >
                  Visit {SITE.flagship.domain} ↗
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NOW — ABOUT YOU */}
      <section>
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Now · about you</span>
            <h2>The only project that matters is the one you walked in with.</h2>
          </Reveal>
          <Reveal as="div">
            <div className="mirror-head" aria-hidden="true">
              <span></span>
              <span>Where you are</span>
              <span>Where it goes</span>
            </div>
            <div className="mirror">
              {LANES.map((l) => (
                <div className="mirror-row" key={l.slug}>
                  <span className="mirror-code">{l.code}</span>
                  <p className="mirror-you">{l.situation}</p>
                  <a className="mirror-go" href={`/${l.slug}/`}>
                    {l.title} <span aria-hidden="true">→</span>
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="band">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">
            The next move
          </Reveal>
          <Reveal as="h2">When you are ready, it starts with one email.</Reveal>
          <Reveal>
            <a className="btn" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
