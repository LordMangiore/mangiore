import type { Metadata } from 'next';
import Script from 'next/script';
import { Space_Grotesk, Space_Mono, Newsreader } from 'next/font/google';
import { SITE } from '@/lib/site';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import GridOverlay from '@/components/GridOverlay';
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
    images: [SITE.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | ${SITE.tagline}`,
    description: 'We build great digital things. We ship our own to prove it.',
    images: [SITE.ogImage.url],
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
      <head>
        {/* Privacy-friendly analytics by Plausible */}
        <Script
          defer
          src="https://plausible.io/js/pa-lL_IjYDcR9Zmsz7g_Va5A.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
        </Script>
      </head>
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
        <GridOverlay />
      </body>
    </html>
  );
}
