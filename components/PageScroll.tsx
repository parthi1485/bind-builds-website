'use client';

import { useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const prefix = 'bindbuilds:scroll:';
const route = () => window.location.pathname + window.location.search;
const jump = (top: number) => window.scrollTo({ top, left: 0, behavior: 'instant' });

function storedScroll(path: string): number {
  try {
    const value = Number(window.sessionStorage.getItem(prefix + path));
    return Number.isFinite(value) && value >= 0 ? value : 0;
  } catch { return 0; }
}

function saveScroll(path: string, top: number) {
  try { window.sessionStorage.setItem(prefix + path, String(Math.max(0, Math.round(top)))); } catch {}
}

export default function PageScroll() {
  const pathname = usePathname();
  const activeRoute = useRef('');
  const backTarget = useRef<number | null>(null);
  const navigating = useRef(false);
  const initialized = useRef(false);

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    activeRoute.current = route();
    // Only persist at navigation and page exit: sessionStorage writes are synchronous.
    const save = () => {
      if (!navigating.current && activeRoute.current) saveScroll(activeRoute.current, window.scrollY);
    };
    const onPopState = () => {
      saveScroll(activeRoute.current, window.scrollY);
      backTarget.current = storedScroll(route());
      navigating.current = true;
    };
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(link instanceof HTMLAnchorElement) || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const destination = new URL(link.href);
      if (destination.origin !== location.origin) return;
      // Preserve native scrolling for deep links to sections on the same page.
      if (destination.hash) return;
      if (destination.pathname === location.pathname && destination.search === location.search) {
        jump(0);
        return;
      }
      save();
      navigating.current = true;
    };
    window.addEventListener('popstate', onPopState);
    window.addEventListener('pagehide', save);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('pagehide', save);
      document.removeEventListener('click', onClick);
      window.history.scrollRestoration = previous;
    };
  }, []);

  useLayoutEffect(() => {
    // Initial hydration must not unexpectedly move someone who reloaded a page.
    if (!initialized.current) { initialized.current = true; return; }
    if (window.location.hash) { navigating.current = false; backTarget.current = null; return; }
    const target = backTarget.current ?? 0;
    backTarget.current = null;
    activeRoute.current = route();
    navigating.current = true;

    let second = 0;
    const first = requestAnimationFrame(() => {
      jump(target);
      second = requestAnimationFrame(() => { jump(target); navigating.current = false; });
    });
    jump(target);
    const settle = window.setTimeout(() => { jump(target); navigating.current = false; }, 120);
    return () => { cancelAnimationFrame(first); cancelAnimationFrame(second); clearTimeout(settle); };
  }, [pathname]);
  return null;
}
