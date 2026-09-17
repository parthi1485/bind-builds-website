'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export default function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (preference.matches) return;
      const elements = [...document.querySelectorAll<HTMLElement>('.reveal')];
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('inView'); observer.unobserve(entry.target); }
      }), { threshold: 0.08 });
      elements.forEach(element => observer.observe(element));
      const hero = document.querySelector<HTMLElement>('.heroMedia');
      const progress = document.querySelector<HTMLElement>('.readingProgress');
      const desktop = window.matchMedia('(min-width: 900px) and (pointer: fine)').matches;
      let frame = 0;
      const paint = () => {
        frame = 0;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        if (progress) progress.style.transform = 'scaleX(' + (height > 0 ? Math.min(1, window.scrollY / height) : 0) + ')';
        if (desktop && hero) hero.style.transform = 'translateY(' + Math.min(window.scrollY, window.innerHeight) * 0.16 + 'px) scale(1.04)';
      };
      const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(paint); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      cleanup = () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); if (hero) hero.style.transform = ''; if (progress) progress.style.transform = ''; };
    };
    setup();
    preference.addEventListener('change', setup);
    return () => { cleanup(); preference.removeEventListener('change', setup); };
  }, [pathname]);
  return <div className="readingProgress" aria-hidden="true" />;
}
