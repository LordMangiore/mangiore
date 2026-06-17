'use client';

import { useState } from 'react';
import { LANES } from '@/lib/lanes';
import { SITE } from '@/lib/site';

// Contact intake, submitted to Netlify Forms (no backend). The form is a real,
// native form so it works without JS and so Netlify can detect it at deploy;
// JS enhances it with an inline, on-brand "received" state. A honeypot field
// catches bots without a captcha.
type State = 'idle' | 'sending' | 'done' | 'error';

function reference() {
  const d = new Date();
  const stamp =
    `${d.getFullYear()}` +
    `${`${d.getMonth() + 1}`.padStart(2, '0')}` +
    `${`${d.getDate()}`.padStart(2, '0')}`;
  const tail = Math.floor(1000 + Math.random() * 9000);
  return `MGR-${stamp}-${tail}`;
}

export default function ContactForm() {
  const [state, setState] = useState<State>('idle');
  const [ref, setRef] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState('sending');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setRef(reference());
      setState('done');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="form-success">
        <p className="eyebrow" style={{ color: 'var(--pine-bright)' }}>
          Received
        </p>
        <h3 className="success-h">Logged as a new project inquiry.</h3>
        <p className="success-p">
          We read every one. Nicho will reply, usually within a day. If it is
          urgent, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>{' '}
          directly.
        </p>
        <p className="success-ref">
          Ref · <b>{ref}</b>
        </p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      action="/contact/"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="contact-form"
    >
      {/* Netlify form plumbing */}
      <input type="hidden" name="form-name" value="contact" />
      <p className="hp">
        <label>
          Do not fill this out: <input name="bot-field" tabIndex={-1} />
        </label>
      </p>

      <div className="form-row">
        <div className="field">
          <label className="flabel" htmlFor="name">
            Your name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label className="flabel" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="field">
        <label className="flabel" htmlFor="where">
          Where you are
        </label>
        <select id="where" name="where" defaultValue="">
          <option value="" disabled>
            Pick the closest fit
          </option>
          {LANES.map((l) => (
            <option key={l.slug} value={l.title}>
              {l.code} · {l.title}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>

      <div className="field">
        <label className="flabel" htmlFor="message">
          What right looks like
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="The outcome you want. Be as plain or as detailed as you like."
        />
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-solid"
          disabled={state === 'sending'}
        >
          {state === 'sending' ? 'Sending…' : 'Start the conversation →'}
        </button>
        <span className="form-alt">
          Prefer email? <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </span>
      </div>

      {state === 'error' && (
        <p className="form-error" role="alert">
          Something went wrong sending that. Please email{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will pick it
          up right away.
        </p>
      )}
    </form>
  );
}
