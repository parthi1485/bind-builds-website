'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

export default function PageScroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    // Explicit section links keep their destination; normal route changes start at the header.
    if (window.location.hash) return;

    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      scrollToTop();
      secondFrame = requestAnimationFrame(scrollToTop);
    });
    const timer = window.setTimeout(scrollToTop, 80);

    scrollToTop();

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scrollToTop);
    };
    const onPageShow = () => { if (!window.location.hash) reset(); };
    const onPopState = () => { if (!window.location.hash) reset(); };
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(link instanceof HTMLAnchorElement) || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const destination = new URL(link.href);
      // A same-page menu tap does not change usePathname, so reset it explicitly.
      if (
        destination.origin === window.location.origin &&
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search &&
        !destination.hash
      ) reset();
    };
    document.addEventListener('click', onClick);
    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('popstate', onPopState);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', onClick);
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return null;
}
