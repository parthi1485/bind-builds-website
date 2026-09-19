'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

export default function PageScroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Explicit section links keep their destination; normal pages start at the header.
    if (window.location.hash) return;
    scrollToTop();
    const frame = requestAnimationFrame(scrollToTop);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scrollToTop);
    };
    const onPageShow = () => { if (!window.location.hash) reset(); };
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(link instanceof HTMLAnchorElement) || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const destination = new URL(link.href);
      // A link to the current page does not change usePathname (e.g. tapping its menu item again).
      if (destination.origin === window.location.origin && destination.pathname === window.location.pathname && destination.search === window.location.search && !destination.hash) reset();
    };
    document.addEventListener('click', onClick);
    window.addEventListener('pageshow', onPageShow);
    return () => {
      cancelAnimationFrame(frame);
      window.history.scrollRestoration = previous;
      document.removeEventListener('click', onClick);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  return null;
}
