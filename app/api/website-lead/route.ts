import { NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxsCulnUR0HQUOU50iMy__7SDVgSY4rl5h9GfGTHB6e9hs1YqF1ZkvcRGOFed_LTR1m/exec';
const allowedSources = new Set(['Website – Estimate PDF', 'Website – Project Enquiry', 'Website – Contact Form']);

const fields = [
  'source','name','phone','email','projectType','location','stage','builtUpArea','budget','timeline','requirements',
  'package','configuration','plotArea','calculatedArea','packageRate','estimateTotal','headroomArea','headroomPricing',
  'parkingArea','parkingPricing','additionalItems','pdfDownloaded','pageUrl',
  'firstSource','firstMedium','firstCampaign','firstContent','firstTerm','firstLandingPath','referrer'
] as const;

function clean(value: unknown, max = 2000) {
  if (value === undefined || value === null) return '';
  return String(value).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
}

export async function POST(request: Request) {
  try {
    const length = Number(request.headers.get('content-length') || 0);
    if (length > 65536) return NextResponse.json({ ok: false, error: 'Request too large' }, { status: 413 });

    const raw = await request.json() as Record<string, unknown>;
    if (clean(raw.website, 100)) return NextResponse.json({ ok: true });

    const payload: Record<string, string> = {};
    for (const field of fields) payload[field] = clean(raw[field], field === 'requirements' || field === 'additionalItems' ? 4000 : 500);

    if (!allowedSources.has(payload.source)) return NextResponse.json({ ok: false, error: 'Invalid source' }, { status: 400 });
    if (payload.name.length < 2) return NextResponse.json({ ok: false, error: 'Name is required' }, { status: 400 });

    const digits = payload.phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) return NextResponse.json({ ok: false, error: 'Valid phone number is required' }, { status: 400 });

    if (payload.source === 'Website – Estimate PDF' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return NextResponse.json({ ok: false, error: 'Valid email is required' }, { status: 400 });
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
      cache: 'no-store',
    });

    const text = await response.text();
    let result: { ok?: boolean; error?: string } = {};
    try { result = JSON.parse(text); } catch {}

    if (!response.ok || result.ok !== true) {
      console.error('Lead capture failed', response.status, text.slice(0, 500));
      return NextResponse.json({ ok: false, error: 'Lead capture unavailable' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Lead capture error', error);
    return NextResponse.json({ ok: false, error: 'Lead capture unavailable' }, { status: 500 });
  }
}
