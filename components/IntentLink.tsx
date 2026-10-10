'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentProps } from 'react';

/** Avoid downloading whole routes until a visitor shows intent to navigate. */
export default function IntentLink({ href, onMouseEnter, onFocus, onTouchStart, ...props }: ComponentProps<typeof Link>) {
  const router = useRouter();
  const prepare = () => {
    if (typeof href === 'string' && href.startsWith('/')) router.prefetch(href);
  };
  return <Link href={href} prefetch={false} {...props}
    onMouseEnter={event => { prepare(); onMouseEnter?.(event); }}
    onFocus={event => { prepare(); onFocus?.(event); }}
    onTouchStart={event => { prepare(); onTouchStart?.(event); }}
  />;
}
