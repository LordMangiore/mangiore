import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="hero">
      <div className="wrap">
        <p className="eyebrow">Error 404</p>
        <h1
          className="lane-title"
          style={{ maxWidth: '18ch', marginTop: '1rem' }}
        >
          That page isn&apos;t here.
        </h1>
        <p className="lane-lead">
          The link is wrong or the page has moved. Everything that exists is one
          click away.
        </p>
        <div className="actions">
          <Link className="btn btn-solid" href="/">
            Back to {SITE.name}
          </Link>
        </div>
      </div>
    </section>
  );
}
