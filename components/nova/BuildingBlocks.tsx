import Section from './Section';
import ExperienceWeight from './ExperienceWeight';
import TrustDomains from './TrustDomains';
import Governors from './Governors';
import PrivacyBoundary from './PrivacyBoundary';
import ToneCascade from './ToneCascade';
import Anchors from './Anchors';
import SleepLifecycle from './SleepLifecycle';

export default function BuildingBlocks() {
  return (
    <>
      <header style={{ marginBottom: '1rem' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--steel)', marginBottom: '0.75rem' }}>
          N.O.V.A. / the building blocks
        </p>
        <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.08 }}>
          A system you can feel work
        </h1>
        <p style={{ color: 'var(--ink-soft)', marginTop: '1rem', maxWidth: '60ch' }}>
          N.O.V.A. reads behavior, not sentiment. It earns the right to be direct, one area of life at a
          time, and it would rather say nothing than say the wrong thing. Every part of it is a small,
          deterministic machine. Here are a few of them, running live. Move things. Break them.
        </p>
      </header>

      <Section kicker="Block 1 / empathy" title="The empathy equation" lede="Empathy is not a reaction to an event. It is a ratio: the weight on a person divided by what they can carry, with age counted in days because that is how we live time. The same loss sends a 19 year old to protect and a veteran founder to push. Not kindness, not harshness, just fit.">
        <ExperienceWeight />
      </Section>

      <Section kicker="Block 2 / earned directness" title="Trust is local" lede="Trust is tracked per area of life. So N.O.V.A. can challenge you hard about your training while it stays gentle about a grief you are still carrying. Keep or miss commitments and watch each domain move on its own.">
        <TrustDomains />
      </Section>

      <Section kicker="Block 3 / the governors" title="It protects you from itself" lede="Earned trust is a ceiling, not a command. Push emotional load up, or let the foundation fall, and challenge gets switched off, no matter how much trust there is.">
        <Governors />
      </Section>

      <Section kicker="Block 4 / the boundary" title="It never sees what you said" lede="Raw voice, text, and sensor data are abstracted into one small tag at the edge, and the raw is thrown away. The reasoning side only ever sees the tag. There is nothing stored to leak, sell, or rebuild you from.">
        <PrivacyBoundary />
      </Section>

      <Section kicker="Block 5 / the integrator" title="One tone, and the reason it fired" lede="Everything converges here. Trust, conflict, and the protective governors resolve in a fixed order into exactly one tone. Move the inputs and watch which tone wins, and why.">
        <ToneCascade />
      </Section>

      <Section kicker="Block 6 / integrity" title="Honesty is cheaper than excuse" lede="A commitment carries an integrity score. Keep it and it climbs; miss it and it dips, but how you miss matters. Owning a miss barely costs anything; dressing it up in an excuse costs four times as much.">
        <Anchors />
      </Section>

      <Section kicker="The showpiece / it all runs together" title="One goal, end to end" lede="Set a sleep goal and walk it through the whole system, night by night: Atlas tagging, the scores moving, the tone responding, and the moment it earns N.O.V.A. the right to speak first on your morning drive.">
        <SleepLifecycle />
      </Section>

      <div style={{ borderTop: '1px solid var(--rule)', marginTop: '3.5rem', paddingTop: '1.5rem' }}>
        <p style={{ color: 'var(--ink-soft)', maxWidth: '60ch' }}>
          Behavior over sentiment. Presence over performance. Privacy by abstraction. Every block here
          computes from the same deterministic engine the real system runs on. The Experience Weight
          parameters are an illustrative draft.
        </p>
        <p style={{ color: 'var(--steel)', fontSize: '0.85rem', marginTop: '1rem' }}>
          Patent pending. Proprietary. All rights reserved.
        </p>
      </div>
    </>
  );
}
