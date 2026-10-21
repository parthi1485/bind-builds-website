'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { attributedPageUrl, leadAttributionFields, leadAttributionSummary, trackEvent } from '@/lib/analytics';

const DISMISS_KEY = 'bindbuilds_lead_popup_dismissed_v1';
const SUBMITTED_KEY = 'bindbuilds_lead_popup_submitted_v1';
const SHOWN_KEY = 'bindbuilds_lead_popup_shown_session_v1';
const DAY = 24 * 60 * 60 * 1000;

type PopupForm = {
  name: string;
  phone: string;
  location: string;
  projectType: string;
  website: string;
};

const initialForm: PopupForm = {
  name: '',
  phone: '',
  location: '',
  projectType: 'New home',
  website: '',
};

const blockedPaths = ['/start-a-project', '/contact', '/cost-calculator', '/privacy', '/building-plan-approval-chennai'];

function recent(storageKey: string, maxAge: number) {
  try {
    const value = Number(window.localStorage.getItem(storageKey) || 0);
    return value > 0 && Date.now() - value < maxAge;
  } catch {
    return false;
  }
}

export default function LeadIntentPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<PopupForm>(initialForm);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const eligiblePath = !blockedPaths.some(path => pathname === path || pathname.startsWith(path + '/'));

  useEffect(() => {
    setOpen(false);
    setStatus('');
    setSubmitted(false);
    if (!eligiblePath) return;

    try {
      if (window.sessionStorage.getItem(SHOWN_KEY)) return;
    } catch {}
    if (recent(SUBMITTED_KEY, 90 * DAY) || recent(DISMISS_KEY, 7 * DAY)) return;

    let engaged = false;
    let elapsed = false;
    let opened = false;

    const show = (trigger: 'engaged' | 'time' | 'exit') => {
      if (opened) return;
      // Keep the visitor's current task in control of attention and keyboard focus.
      if (document.querySelector('[aria-modal="true"]') || document.activeElement?.closest('input, select, textarea, [contenteditable="true"]')) return;
      opened = true;
      try { window.sessionStorage.setItem(SHOWN_KEY, '1'); } catch {}
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setOpen(true);
      trackEvent('lead_popup_view', { page_path: pathname, trigger });
    };

    const maybeShow = () => {
      if (engaged && elapsed) show('engaged');
    };

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= 0.32) {
        engaged = true;
        maybeShow();
      }
    };

    const engagementTimer = window.setTimeout(() => {
      elapsed = true;
      maybeShow();
    }, 14000);

    const fallbackTimer = window.setTimeout(() => show('time'), 36000);

    const onExit = (event: MouseEvent) => {
      if (event.clientY > 8 || window.matchMedia('(max-width: 760px)').matches) return;
      if (!elapsed) return;
      show('exit');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseout', onExit);
    onScroll();

    return () => {
      window.clearTimeout(engagementTimer);
      window.clearTimeout(fallbackTimer);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseout', onExit);
    };
  }, [pathname, eligiblePath]);

  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const first = dialog.current?.querySelector<HTMLElement>('input,select,button,a[href]');
    window.setTimeout(() => first?.focus(), 30);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close('escape');
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [...(dialog.current?.querySelectorAll<HTMLElement>('button,input,select,a[href]') || [])]
        .filter(element => !element.hasAttribute('disabled'));
      if (!focusable.length) return;
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const update = (key: keyof PopupForm, value: string) => setForm(current => ({ ...current, [key]: value }));

  const close = (reason: 'button' | 'escape' | 'backdrop' | 'calculator' | 'success') => {
    if (!submitted && reason !== 'success') {
      try { window.localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch {}
      trackEvent('lead_popup_close', { page_path: pathname, reason });
    }
    setOpen(false);
    window.setTimeout(() => previousFocus.current?.focus(), 0);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    setStatus('');
    setSubmitting(true);
    trackEvent('lead_popup_submit_attempt', { page_path: pathname, project_type: form.projectType });

    try {
      const attribution = leadAttributionFields();
      const requirements = [
        'Quick website lead popup',
        'Requested a useful first conversation about scope, cost and next steps.',
        leadAttributionSummary(),
      ].filter(Boolean).join(' | ');

      const response = await fetch('/api/website-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Website – Lead Popup',
          name: form.name,
          phone: form.phone,
          email: '',
          projectType: form.projectType,
          location: form.location,
          stage: '',
          builtUpArea: '',
          budget: '',
          timeline: '',
          requirements,
          package: '',
          pdfDownloaded: 'No',
          pageUrl: attributedPageUrl(),
          ...attribution,
          website: form.website,
        }),
        signal: AbortSignal.timeout(20000),
      });

      const result = await response.json().catch(() => ({ ok: false }));
      if (!response.ok || !result.ok) throw new Error('Lead capture failed');

      try { window.localStorage.setItem(SUBMITTED_KEY, String(Date.now())); } catch {}
      setSubmitted(true);
      trackEvent('lead_popup_success', { page_path: pathname, project_type: form.projectType });
    } catch {
      setStatus('We could not confirm your enquiry. Please retry, or use the full project brief.');
      trackEvent('lead_popup_error', { page_path: pathname });
    } finally {
      setSubmitting(false);
    }
  };

  if (!open || !eligiblePath) return null;

  return <div className="leadPopupBackdrop" role="presentation" onMouseDown={event => {
    if (event.target === event.currentTarget) close('backdrop');
  }}>
    <div ref={dialog} className="leadPopup" role="dialog" aria-modal="true" aria-labelledby="lead-popup-title" aria-describedby="lead-popup-copy">
      <button ref={closeButton} type="button" className="leadPopupClose" onClick={() => close('button')} aria-label="Close project enquiry">×</button>

      <section className="leadPopupStory">
        <span className="leadPopupEyebrow">Bind Builds · Architect-led construction</span>
        <h2 id="lead-popup-title">Build with clarity.<br/><span>Before you commit.</span></h2>
        <p id="lead-popup-copy">Tell us where you are building. We’ll help you understand the right next step for scope, cost and timeline.</p>
        <div className="leadPopupSignals" aria-label="Why speak with Bind Builds">
          <div><span>01</span><strong>Architect-led</strong><small>Design and execution considered together.</small></div>
          <div><span>02</span><strong>Scope first</strong><small>Useful clarity before a project-specific proposal.</small></div>
          <div><span>03</span><strong>Chennai + Coimbatore</strong><small>Project fit is reviewed before we promise a visit.</small></div>
        </div>
      </section>

      <section className="leadPopupFormPanel">
        {submitted ? <div className="leadPopupSuccess" aria-live="polite">
          <span className="leadPopupSuccessMark" aria-hidden="true">✓</span>
          <span className="leadPopupEyebrow">Enquiry received</span>
          <h3>We have your details.</h3>
          <p>Our team will first review your location and project type, then contact you with the most useful next step.</p>
          <button type="button" className="cta primary" onClick={() => close('success')}>Continue exploring →</button>
        </div> : <form onSubmit={submit}>
          <span className="leadPopupEyebrow">Start with four details</span>
          <h3>Tell us what you’re planning.</h3>
          <div className="leadPopupFields">
            <label>Full name<input required autoComplete="name" maxLength={100} value={form.name} onChange={event => update('name', event.target.value)} placeholder="Your name" /></label>
            <label>Mobile number<input required autoComplete="tel" inputMode="tel" maxLength={20} value={form.phone} onChange={event => update('phone', event.target.value)} placeholder="+91 98765 43210" /></label>
            <label>Site location<input required autoComplete="address-level2" maxLength={120} value={form.location} onChange={event => update('location', event.target.value)} placeholder="Porur, ECR, Coimbatore…" /></label>
            <label>Project type<select value={form.projectType} onChange={event => update('projectType', event.target.value)}>
              {['New home','Demolition & rebuild','Rental / multi-family building','Commercial / healthcare','Interiors / other'].map(value => <option key={value}>{value}</option>)}
            </select></label>
            <label className="leadPopupHoneypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={event => update('website', event.target.value)} /></label>
          </div>
          <button className="cta primary leadPopupSubmit" type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Discuss my project →'}</button>
          <p className="leadPopupPrivacy">No commitment to proceed. Your details are used only for enquiry follow-up. <Link href="/privacy">Privacy details</Link>.</p>
          {status && <p className="leadPopupError" role="alert">{status}</p>}
          <div className="leadPopupResearch">
            <span>Still researching?</span>
            <Link href="/cost-calculator" onClick={() => close('calculator')}>Calculate construction cost instead →</Link>
          </div>
        </form>}
      </section>
    </div>
  </div>;
}
