import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: 'bind-builds-website',
      commit: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
      environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown',
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  );
}
