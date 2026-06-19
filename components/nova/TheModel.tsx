import ParliamentArbitration from './ParliamentArbitration';
import styles from './nova.module.css';

export default function TheModel() {
  return (
    <div>
      <header style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--steel)', marginBottom: '0.75rem' }}>
          N.O.V.A. / the model
        </p>
        <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.08 }}>
          A mind is a parliament
        </h1>
      </header>

      <div className={styles.prose}>
        <p className={styles.lead}>
          The functional, testable parts of consciousness are recursive arbitration between competing
          internal regions, each with its own mandate, resolved without a central referee.
        </p>

        <h3>The thesis</h3>
        <p>
          A mind is not one reasoner. It is a parliament of specialized processes, threat, reward,
          deliberation, identity, that bid on novel problems. What we experience as a decision is the
          arbitration event where those bids resolve. Routine problems need no parliament; novelty
          forces genuine contention, and that contention is the thing of interest.
        </p>

        <h3>How a region wins</h3>
        <p>
          There is no judge node. Resolution is race to threshold plus lateral inhibition: each region
          accumulates activation based on how strongly the moment matches its mandate; the first to
          cross threshold fires and suppresses the others. The suppression is the decision. This maps
          to established decision neuroscience, the drift-diffusion and accumulator models.
        </p>

        <h3>How bids are weighted</h3>
        <p>
          Regions bid on incommensurable axes, a threat bid and a reward bid are not in the same units.
          A context layer sets exchange rates that convert each region&rsquo;s native urgency into a
          common action priority. That exchange-rate setter is the experience-weight function, the same
          one in the building-blocks tab, reading how novel, acute, and high stakes the moment is for a
          specific individual. Under lethal threat, the safety axis converts at a higher rate; when
          safe, other axes dominate. One term in it, general adversity-handling capacity, is non
          monotonic: it rises with experience, then falls with decline and disuse, a U shape across a
          life. That non-obvious term is what bends the curve back down in old age.
        </p>
      </div>

      <div style={{ margin: '2rem 0' }}>
        <div className={styles.sectionKicker}>Play it / the parliament</div>
        <h2 className={styles.sectionTitle} style={{ marginBottom: '0.5rem' }}>The same event, two people, two decisions</h2>
        <p className={styles.sectionLede}>
          Pick an event, then a person. The person is just a trust vector, how much the mind has learned
          to rely on each region. Watch a loud but distrusted region get overridden by a quieter,
          trusted one. Try the tempting reward with the impulsive person, then with the one that has
          learned to distrust its own reward.
        </p>
        <ParliamentArbitration />
      </div>

      <div className={styles.prose}>
        <h3>The grounding problem, and its resolution</h3>
        <p>
          A region&rsquo;s bid only means something if it is grounded in a real state rather than freely
          asserted. The wrong frame was &ldquo;how do we stop a region from gaming the system.&rdquo;
          Regions do not game strategically; they misfire sincerely. A reward signal can fire high while
          the true need is absent, the reward decoupling seen in compulsive loops, and the system is
          structurally blind to its own miscalibration, because the signal and the state it represents
          are the same event from the inside. There is no internal oracle to check against.
        </p>
        <p>
          The only defense a mind has against its own corrupted signals is a higher layer that scores
          each region&rsquo;s reliability over time and learns to distrust it. Pleasure and reward work
          as the scorekeeper, a proxy stamp that writes trust onto regions based on outcomes, precisely
          because there is no direct access to ground truth. Higher consciousness then reads as layers
          of recursive trust accounting: lower layers score actions, higher layers score the reliability
          of the scoring beneath them. The capacity to suspect your own signal is the proposed gate to
          higher, self-modeling cognition.
        </p>

        <h3>The consciousness ladder</h3>
        <p>
          Six behavioral levels, reactive, signal arbitration, affective weighting, social modeling,
          identity persistence, recursive self-modeling, separated by gates and assessed behaviorally in
          a species&rsquo; natural context. Its sharpest claim: cleverness and consciousness are
          separable axes. Socially and identity complex animals can reach high levels with modest tool
          intelligence; clever solitary animals can stall low. Read through the arbitration thesis, the
          ladder&rsquo;s levels are the levels of recursive scorekeeping.
        </p>

        <h3>What has been built</h3>
        <p>
          Three mechanisms, each demonstrated in working toy code: arbitration without a referee
          (different winners from the same inputs as exchange rates shift); recursive-distrust
          scorekeeping (a meta layer drives a corrupted region&rsquo;s trust to zero and overrides its
          confident, false bid); and person-as-trust-vector (the same event through two trust vectors
          gives genuinely different decisions, so identity falls out of structure rather than being
          authored in).
        </p>

        <h3>The open question it all funnels into</h3>
        <p>
          Every hard part, the patent&rsquo;s empathy versus mimicry tension, the parliament&rsquo;s
          real versus theatrical conflict, the ladder&rsquo;s spoofable markers, is one question: how do
          you tell genuine recursive arbitration from its performance? The recursive-distrust result
          suggests the answer is not surveillance or grounding checks but outcome-scored trust
          accumulated over time. The next experiment replaces each region with a live model call and
          reads a grounding table first: a region must spike on its own domain and stay near zero on a
          nothing-event, or it fails. Only if grounding holds does arbitration mean anything.
        </p>
      </div>

      <div style={{ borderTop: '1px solid var(--rule)', marginTop: '2.5rem', paddingTop: '1.5rem' }}>
        <p style={{ color: 'var(--steel)', fontSize: '0.85rem' }}>
          Research direction. Patent pending. Proprietary. All rights reserved.
        </p>
      </div>
    </div>
  );
}
