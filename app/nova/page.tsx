import type { Metadata } from 'next';
import Gate from '@/components/nova/Gate';
import ExperienceWeight from '@/components/nova/ExperienceWeight';
import TrustDomains from '@/components/nova/TrustDomains';
import Governors from '@/components/nova/Governors';
import PrivacyBoundary from '@/components/nova/PrivacyBoundary';
import styles from '@/components/nova/nova.module.css';

export const metadata: Metadata = {
  title: 'N.O.V.A. — the building blocks',
  robots: { index: false, follow: false },
};

function Section({ kicker, title, lede, children }: { kicker: string; title: string; lede: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionKicker}>{kicker}</div>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.sectionLede}>{lede}</p>
      {children}
    </section>
  );
}

export default function NovaDemoPage() {
  return (
    <Gate>
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: 'var(--gutter)' }}>
        <header style={{ marginBottom: '1rem' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--steel)', marginBottom: '0.75rem' }}>
            N.O.V.A. / the building blocks
          </p>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.08 }}>
            A system you can feel work
          </h1>
          <p style={{ color: 'var(--ink-soft)', marginTop: '1rem', maxWidth: '60ch' }}>
            N.O.V.A. reads behavior, not sentiment. It earns the right to be direct, one area of life
            at a time, and it would rather say nothing than say the wrong thing. Every part of it is a
            small, deterministic machine. Here are a few of them, running live. Move things. Break
            them. Watch the same machine make the obviously-right call for different people.
          </p>
        </header>

        <Section
          kicker="Block 1 / empathy"
          title="The empathy equation"
          lede="Empathy is not a reaction to an event. It is a ratio: the weight on a person divided by what they can carry, with age counted in days because that is how we live time. The same loss sends a 19 year old to protect and a veteran founder to push. Not kindness, not harshness, just fit."
        >
          <ExperienceWeight />
        </Section>

        <Section
          kicker="Block 2 / earned directness"
          title="Trust is local"
          lede="Trust is tracked per area of life. So N.O.V.A. can challenge you hard about your training while it stays gentle about a grief you are still carrying. Keep or miss commitments and watch each domain's tier, and the tones it unlocks, move on its own."
        >
          <TrustDomains />
        </Section>

        <Section
          kicker="Block 3 / the governors"
          title="It protects you from itself"
          lede="Earned trust is a ceiling, not a command. Push emotional load up, or let the foundation fall, and challenge gets switched off, no matter how much trust there is. The right to push is real, and it yields to the state of the person."
        >
          <Governors />
        </Section>

        <Section
          kicker="Block 4 / the boundary"
          title="It never sees what you said"
          lede="Raw voice, text, and sensor data are abstracted into one small tag at the edge, and the raw is thrown away. The reasoning side only ever sees the tag. There is nothing stored to leak, sell, or rebuild you from."
        >
          <PrivacyBoundary />
        </Section>

        <footer style={{ borderTop: '1px solid var(--rule)', marginTop: '3.5rem', paddingTop: '1.5rem' }}>
          <p style={{ color: 'var(--ink-soft)', maxWidth: '60ch' }}>
            Behavior over sentiment. Presence over performance. Privacy by abstraction. Every block
            here computes from the same deterministic engine the real system runs on. The Experience
            Weight parameters are an illustrative draft.
          </p>
          <p style={{ color: 'var(--steel)', fontSize: '0.85rem', marginTop: '1rem' }}>
            Patent pending. Proprietary. All rights reserved.
          </p>
        </footer>
      </main>
    </Gate>
  );
}
