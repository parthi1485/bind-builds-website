import { ImageResponse } from 'next/og';

export const alt = 'Bind Builds — Architect-led construction in Chennai';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden', background: '#0678e8', color: 'white', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', opacity: 0.14, backgroundImage: 'linear-gradient(rgba(255,255,255,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.45) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
      <div style={{ position: 'absolute', width: 580, height: 580, right: -90, bottom: -260, border: '2px solid rgba(255,255,255,.35)', borderRadius: 290, display: 'flex' }} />
      <div style={{ width: '100%', padding: '58px 68px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: -3 }}>BIND</div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 11, marginTop: -4 }}>BUILDS</div>
          </div>
          <div style={{ display: 'flex', fontSize: 18, letterSpacing: 2, textTransform: 'uppercase' }}>Chennai · Tamil Nadu</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 900 }}>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 22 }}>Architect-led construction</div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 88, lineHeight: 0.96, fontWeight: 800, letterSpacing: -5 }}><span>Your home.</span><span>Thought through.</span></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderTop: '1px solid rgba(255,255,255,.5)', paddingTop: 24, fontSize: 20 }}>
          <div style={{ display: 'flex' }}>Plan · Build · Deliver</div>
          <div style={{ display: 'flex', fontWeight: 700 }}>www.bindbuilds.com</div>
        </div>
      </div>
    </div>,
    size,
  );
}
