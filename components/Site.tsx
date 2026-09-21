'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { site, whatsappUrl } from '@/lib/site';

const navigation = [['Projects', site.portfolio], ['Packages', '/packages'], ['Calculator', '/cost-calculator'], ['Process', '/process'], ['Approvals', '/building-plan-approval-chennai'], ['About', '/about'], ['FAQs', '/faq'], ['Contact', '/contact']];
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menu.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
      if (event.key !== 'Tab') return;
      const links = menu.current?.querySelectorAll<HTMLElement>('a,button');
      if (!links?.length) return;
      const first = links[0];
      const last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const onResize = () => { if (window.innerWidth >= 1100) setOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, [open]);
  return <>
    <a className="skipLink" href="#main-content">Skip to content</a>
    <header className={`nav ${scrolled || pathname !== '/' || open ? 'navScrolled' : ''}`}>
      <Link href="/" className="brandImage" aria-label="Bind Builds home"><Image src="/bind-builds-logo.svg" alt="Bind Builds" width={190} height={66} priority /></Link>
      <nav className="links" aria-label="Main navigation">{navigation.map(([name, href]) => href.startsWith('http') ? <a key={href} href={href} target="_blank" rel="noopener noreferrer">{name}</a> : <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>{name}</Link>)}</nav>
      <Link className="cta navCta" href="/start-a-project" aria-current={pathname === '/start-a-project' ? 'page' : undefined}>Plan my home <span aria-hidden="true">↗</span></Link>
      <button ref={toggle} type="button" className="menuButton" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}<span aria-hidden="true">{open ? '−' : '+'}</span></button>
    </header>
    <div ref={menu} id="mobile-menu" className="mobileMenu" hidden={!open} aria-label="Site navigation">
      <p className="eyebrow">Architecture. Engineering. Construction.</p>
      <nav aria-label="Mobile navigation">{navigation.map(([name, href], i) => href.startsWith('http') ? <a href={href} key={href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}><small>0{i + 1}</small><span>{name}</span><span aria-hidden="true">↗</span></a> : <Link href={href} key={href} onClick={() => setOpen(false)} aria-current={pathname === href ? 'page' : undefined}><small>0{i + 1}</small><span>{name}</span><span aria-hidden="true">↗</span></Link>)}</nav>
      <Link className="cta primary" href="/start-a-project" onClick={() => setOpen(false)}>Plan my home ↗</Link>
      <a className="menuPhone" href={`tel:${site.telephone}`}>{site.phone}</a>
    </div>
    {pathname !== '/start-a-project' && pathname !== '/cost-calculator' && <div className="mobileProjectBar"><a href={`tel:${site.telephone}`}>Call the studio</a><Link href="/start-a-project">Plan my home ↗</Link></div>}
  </>;
}
export function Footer() {
  const guideLinks = [
    ['House construction', '/house-construction-chennai'],
    ['Construction cost 2026', '/construction-cost-chennai'],
    ['Turnkey construction', '/turnkey-house-construction-chennai'],
    ['Building approvals', '/building-plan-approval-chennai'],
    ['Service areas', '/service-areas-chennai'],
    ['Demolition + rebuild', '/demolition-rebuild-house-chennai'],
  ];
  return <footer className="footer">
    <div className="footerIdentity"><Link href="/" className="brandImage" aria-label="Bind Builds home"><Image src="/bind-builds-logo.svg" alt="Bind Builds" width={190} height={66} /></Link><p>Architect-led construction.<br />Chennai, Tamil Nadu.</p><Link className="footerPrimaryLink" href="/start-a-project">Plan my home ↗</Link></div>
    <div className="footerSitemap">
      <div><span className="footerLabel">Explore</span><nav className="footerLinks" aria-label="Footer navigation">{navigation.map(([name, href]) => href.startsWith('http') ? <a href={href} key={href} target="_blank" rel="noopener noreferrer">{name}</a> : <Link href={href} key={href}>{name}</Link>)}</nav></div>
      <div><span className="footerLabel">Chennai guides</span><nav className="footerLinks footerGuideLinks" aria-label="Chennai construction guides">{guideLinks.map(([name,href])=><Link className="footerGuideLink" href={href} key={href}>{name}</Link>)}</nav></div>
    </div>
    <div className="footerContact"><span className="footerLabel">Contact</span><a href={`tel:${site.telephone}`}>{site.phone}</a><a href={`mailto:${site.email}`}>{site.email}</a><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp ↗</a><a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a></div>
    <div className="footerBottom"><span>© {new Date().getFullYear()} Bind Builds</span><span>Plan • Build • Deliver</span><Link href="/privacy">Privacy</Link></div>
  </footer>;
}
export function Page({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return <><Nav /><main id="main-content"><header className="pageHero"><span className="eyebrow">{kicker}</span><h1>{title}</h1></header>{children}</main><Footer /></>;
}
