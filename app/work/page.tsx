import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import MeasureLine from '@/components/MeasureLine';
import { SITE } from '@/lib/site';
import { LANES } from '@/lib/lanes';

export const metadata: Metadata = {
  title: 'The Work',
  description:
    'You came here with a problem, not to look at other people’s. This page is about your situation and where it can go, not a gallery of someone else’s.',
  alternates: { canonical: '/work/' },
  openGraph: {
    type: 'website',
    title: 'The Work | Mangiore',
    description:
      'No gallery of other people’s work. You are here with a problem. That is the subject.',
    url: `${SITE.baseUrl}/work/`,
    images: [SITE.ogImage],
  },
};

export default function WorkPage() {
  return (
    <>
      {/* THESIS */}
      <section className="lane-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href="/">{SITE.name}</a>
            <span className="sep">/</span>
            <span>Work</span>
          </nav>
          <p className="eyebrow">Fig. 03 · The work</p>
          <h1 className="lane-title">You&apos;re here with a problem.</h1>
          <p className="lane-lead">
            This is the page where a studio shows you everyone else&apos;s. We
            left it blank, on purpose. Other people&apos;s problems are not the
            conversation. Yours is.
          </p>
          <MeasureLine label="This page · column" />
        </div>
      </section>

      {/* THE BLANK GALLERY (wireframe) */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="wf-block">
            <p className="wf-anno">Reserved · other people&apos;s work</p>
            <div className="wf-frame wf-wide" aria-hidden="true">
              <span className="wf-label">Intentionally blank</span>
            </div>
            <div className="wf-grid" aria-hidden="true">
              <div className="wf-frame">
                <span className="wf-label">Case study</span>
              </div>
              <div className="wf-frame">
                <span className="wf-label">Client logo</span>
              </div>
              <div className="wf-frame">
                <span className="wf-label">Testimonial</span>
              </div>
            </div>
            <p className="wf-note">
              ↳ A portfolio fills this space with case studies and logos. We
              don&apos;t keep one. The only project worth talking about is the
              one you walked in with.
            </p>
          </Reveal>
        </div>
      </section>

      {/* YOUR PROBLEM (the one filled block) */}
      <section style={{ paddingTop: 'clamp(2rem,4vw,3rem)' }}>
        <div className="wrap">
          <Reveal className="wf-reserved">
            <p className="wf-anno wf-anno-active">Active · your project</p>
            <h2 className="wf-h">Your problem is the brief.</h2>
            <p className="wf-lead">
              Find yourself below. The left is where you are. The right is where
              it goes.
            </p>
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
          <Reveal as="h2">
            Bring the problem. We&apos;ll tell you what right looks like.
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
