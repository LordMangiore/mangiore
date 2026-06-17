import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono, Newsreader } from 'next/font/google';
import { SITE } from '@/lib/site';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import './globals.css';

// Display in a technical grotesque, body in a serif (the inverse of the
// agency-default serif headline), data and labels in mono.
const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
});

const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: `${SITE.name} | ${SITE.tagline}`,
    description: 'We build great digital things. We ship our own to prove it.',
    url: SITE.baseUrl,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | ${SITE.tagline}`,
    description: 'We build great digital things. We ship our own to prove it.',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#15140f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        {/* Without JS there is no mechanism to trigger scroll reveals, so make
            sure the content is simply visible. */}
        <noscript>
          <style>{`.rv{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <TopBar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
