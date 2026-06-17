import Link from 'next/link';
import { SITE } from '@/lib/site';
import { LANES } from '@/lib/lanes';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
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
              <Link key={l.slug} href={`/${l.slug}/`}>
                {l.title}
              </Link>
            ))}
            <a href={SITE.flagship.url} target="_blank" rel="noopener">
              {SITE.flagship.name}
            </a>
            <a href={`mailto:${SITE.email}`}>Contact</a>
          </nav>
        </div>
        <div className="foot-meta">
          <span>
            © {year} {SITE.legalName}
          </span>
          <span>{SITE.email}</span>
        </div>
      </div>
    </footer>
  );
}
