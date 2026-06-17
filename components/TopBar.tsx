import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function TopBar() {
  return (
    <header className="topbar">
      <div className="wrap">
        <Link className="brand" href="/">
          {SITE.name}
          <span className="dot">.</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link href="/#work">Work</Link>
          <Link href="/#approach">Approach</Link>
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
