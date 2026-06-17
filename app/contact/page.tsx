import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a project with Mangiore. Tell us where you are and what right looks like. Your note goes straight to the principal, not a queue.',
  alternates: { canonical: '/contact/' },
  openGraph: {
    type: 'website',
    title: 'Contact | Mangiore',
    description:
      'Tell us where you are and what right looks like. It goes straight to a person.',
    url: `${SITE.baseUrl}/contact/`,
    images: [SITE.ogImage],
  },
};

export default function ContactPage() {
  return (
    <section className="lane-hero" style={{ paddingBottom: 'clamp(3rem,7vw,6rem)' }}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href="/">{SITE.name}</a>
          <span className="sep">/</span>
          <span>Contact</span>
        </nav>
        <p className="eyebrow">Fig. 04 · Contact</p>
        <h1 className="lane-title">Let&apos;s draw it up.</h1>
        <p className="lane-lead">
          Every project starts as a spec. Tell us where you are and what right
          looks like. We read everything.
        </p>

        <div className="contact-grid">
          <ContactForm />
          <aside className="contact-aside">
            <div className="aside-block">
              <p className="flabel">What happens next</p>
              <p>
                Your note goes straight to {SITE.principal}, not a queue. We
                reply, usually within a day, and we will tell you plainly if it
                is not a fit.
              </p>
            </div>
            <div className="aside-block">
              <p className="flabel">Direct</p>
              <p>
                <a className="inline-link" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </p>
            </div>
            <div className="aside-block">
              <p className="flabel">Studio</p>
              <p>{SITE.location}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
