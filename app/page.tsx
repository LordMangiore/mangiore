import Reveal from '@/components/Reveal';
import HeroDimensions from '@/components/HeroDimensions';
import { SITE } from '@/lib/site';
import { LANES } from '@/lib/lanes';
import { PRINCIPLES } from '@/lib/principles';

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.baseUrl,
  email: SITE.email,
  description: SITE.description,
  slogan: 'We build great digital things. We ship our own to prove it.',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'MO',
    addressCountry: 'US',
  },
  makesOffer: LANES.map((l) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: l.title, url: `${SITE.baseUrl}/${l.slug}/` },
  })),
  owns: {
    '@type': 'SoftwareApplication',
    name: SITE.flagship.name,
    applicationCategory: 'EducationalApplication',
    url: SITE.flagship.url,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <HeroDimensions>
            <p className="eyebrow enter d1">
              {SITE.tagline} · {SITE.location}
            </p>
            <h1 className="enter d2">
              We build great digital things. We ship <em>our own</em> to prove
              it.
            </h1>
            <p className="sub enter d3">
              Mangiore designs, builds, and runs software to a product standard
              most shops only pitch. The same rigor is what makes an established
              business genuinely modern.
            </p>
            <div className="actions enter d4">
              <a className="btn btn-solid" href="/contact/">
                Start a project
              </a>
              <a
                className="btn btn-ghost"
                href={SITE.flagship.url}
                target="_blank"
                rel="noopener"
              >
                Visit {SITE.flagship.name} ↗
              </a>
            </div>
          </HeroDimensions>
        </div>
      </section>

      {/* WORK / LANES */}
      <section id="work">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Fig. 01 · What we do</span>
            <h2>Four ways we work, one standard across all of them.</h2>
          </Reveal>
          <Reveal className="lanes">
            {LANES.map((l) => (
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
          <div className="specrule rdraw" aria-hidden="true" />
          <Reveal className="specrow">
            <span>{SITE.legalName}</span>
            <span>Built to a standard</span>
          </Reveal>
        </div>
      </section>

      {/* FLAGSHIP */}
      <section className="flagship" id="flagship">
        <div className="wrap">
          <div className="flag-grid">
            <Reveal>
              <p className="eyebrow">Flagship · shipped, not theoretical</p>
              <div className="flag-name">
                {SITE.flagship.name}{' '}
                <span className="live">
                  <span className="pip"></span>Live
                </span>
              </div>
              <p>
                An AI-native study platform that turns your material into a
                deck, with a narrator that actually teaches it. We designed it,
                built it, and run it. Go see for yourself.
              </p>
              <div className="flag-cta">
                <a
                  className="btn btn-ghost"
                  href={SITE.flagship.url}
                  target="_blank"
                  rel="noopener"
                >
                  Visit {SITE.flagship.domain} ↗
                </a>
              </div>
            </Reveal>
            <Reveal as="ul" className="flag-spec">
              <li>
                <span>Category</span>
                <span>{SITE.flagship.category}</span>
              </li>
              <li>
                <span>Status</span>
                <span>{SITE.flagship.status}</span>
              </li>
              <li>
                <span>Platform</span>
                <span>{SITE.flagship.platform}</span>
              </li>
              <li>
                <span>Owner</span>
                <span>{SITE.legalName}</span>
              </li>
            </Reveal>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section id="approach">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="eyebrow">Fig. 02 · How we work</span>
            <h2>We hold the line on what right is.</h2>
            <a className="sec-more" href="/approach/">
              Read the full approach →
            </a>
          </Reveal>
          <div className="principles">
            {PRINCIPLES.map((p) => (
              <Reveal className="principle" key={p.code}>
                <span className="n">{p.code}</span>
                <h3>{p.title}</h3>
                <p>{p.short}</p>
              </Reveal>
            ))}
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
            Have something worth building? Or a business that should already
            feel modern?
          </Reveal>
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
