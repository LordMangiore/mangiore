import { SITE } from '@/lib/site';
import { LANES } from '@/lib/lanes';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ viewTransitionName: 'site-footer' }}>
      <div className="wrap">
        <div className="foot-top">
          <div>
            <div className="foot-brand">
              {SITE.name}
              <span className="dot">.</span>
            </div>
            <p className="foot-note">
              Digital product &amp; systems studio. {SITE.location}.
            </p>
          </div>
          <nav className="foot-links" aria-label="Footer">
            {LANES.map((l) => (
              <a key={l.slug} href={`/${l.slug}/`}>
                {l.title}
              </a>
            ))}
            <a href={SITE.flagship.url} target="_blank" rel="noopener">
              {SITE.flagship.name}
            </a>
            <a href="/contact/">Contact</a>
          </nav>
        </div>
        {/* Title block, like the corner of a technical drawing. Every field
            is true; "drawn by" is where the principal is named. */}
        <dl className="titleblock" aria-label="Colophon">
          <div className="tb-cell">
            <dt className="tb-k">Project</dt>
            <dd className="tb-v">{SITE.domain}</dd>
          </div>
          <div className="tb-cell">
            <dt className="tb-k">Entity</dt>
            <dd className="tb-v">{SITE.legalName}</dd>
          </div>
          <div className="tb-cell">
            <dt className="tb-k">Scale</dt>
            <dd className="tb-v">1:1</dd>
          </div>
          <div className="tb-cell">
            <dt className="tb-k">Location</dt>
            <dd className="tb-v">{SITE.location}</dd>
          </div>
          <div className="tb-cell">
            <dt className="tb-k">Drawn by</dt>
            <dd className="tb-v">{SITE.principal}</dd>
          </div>
          <div className="tb-cell">
            <dt className="tb-k">Contact</dt>
            <dd className="tb-v">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </dd>
          </div>
        </dl>
        <div className="foot-meta">
          <span>
            © {year} {SITE.legalName}
          </span>
          <span className="foot-hint">
            Press <kbd>G</kbd> for grid
          </span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
