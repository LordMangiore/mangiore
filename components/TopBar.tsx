import { SITE } from '@/lib/site';

// Internal links are plain anchors (real document navigations) so the
// cross-document View Transitions API can morph between pages. The header
// carries a stable view-transition-name so it holds in place during the morph.
export default function TopBar() {
  return (
    <header className="topbar" style={{ viewTransitionName: 'site-header' }}>
      <div className="wrap">
        <a className="brand" href="/">
          {SITE.name}
          <span className="dot">.</span>
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="/#work">Work</a>
          <a href="/#approach">Approach</a>
          <a
            className="ext"
            href={SITE.flagship.url}
            target="_blank"
            rel="noopener"
          >
            {SITE.flagship.name}
          </a>
          <a className="cta-mini" href={`mailto:${SITE.email}`}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
