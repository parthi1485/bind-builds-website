'use client';

import { useState } from 'react';

type AssuranceKind = 'engineer' | 'timeline' | 'payment' | 'construction' | 'quality' | 'updates';

const assurance: Array<{
  kind: AssuranceKind;
  short: string;
  eyebrow: string;
  title: string;
  copy: string;
  note: string;
}> = [
  {
    kind: 'engineer',
    short: 'Site engineer',
    eyebrow: 'Site coordination',
    title: 'Dedicated engineering oversight.',
    copy: 'A project engineer coordinates site activity, checks stage requirements and keeps the execution team aligned with the issued drawings.',
    note: 'Supervision frequency and site staffing follow the final project scope and agreement.',
  },
  {
    kind: 'timeline',
    short: 'Timeline',
    eyebrow: 'Planned milestones',
    title: 'A structured project timeline.',
    copy: 'Your build is organised around clear stages, dependencies and review points so you can understand what is happening now and what comes next.',
    note: 'Timelines are project-specific and are updated for approvals, selections, site conditions and agreed changes.',
  },
  {
    kind: 'payment',
    short: 'Payments',
    eyebrow: 'Stage-wise visibility',
    title: 'Payments linked to progress.',
    copy: 'The commercial schedule is broken into agreed milestones. You can see the stage, amount and next payment trigger instead of working with an unclear lump sum.',
    note: 'The signed proposal and construction agreement remain the final commercial reference.',
  },
  {
    kind: 'construction',
    short: 'Construction',
    eyebrow: 'One coordinated route',
    title: 'From drawings to handover.',
    copy: 'Architecture, engineering, procurement coordination, construction and finishing are connected through one architect-led process.',
    note: 'Specialist works, statutory services and client-selected items are handled as defined in the project scope.',
  },
  {
    kind: 'quality',
    short: 'Quality',
    eyebrow: 'Specification control',
    title: 'Materials checked against the scope.',
    copy: 'Approved brands, grades and project specifications are reviewed at procurement and installation stages, with relevant site checks documented along the way.',
    note: 'Final brand, model and grade depend on the selected package, availability and approved project specification.',
  },
  {
    kind: 'updates',
    short: 'Updates',
    eyebrow: 'Progress you can follow',
    title: 'Site updates that keep you connected.',
    copy: 'Progress photos, videos, stage notes and key decisions help you follow the build even when you cannot be at site every day.',
    note: 'Update frequency follows the selected package and project communication plan.',
  },
];

function FeatureIcon({ kind }: { kind: AssuranceKind }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return <svg viewBox="0 0 32 32" aria-hidden="true">
    {kind === 'engineer' && <g {...common}><circle cx="16" cy="10" r="4"/><path d="M8 27v-3.2c0-4.8 3.6-7.8 8-7.8s8 3 8 7.8V27"/><path d="M11.5 8.3c.5-3 2.3-4.5 4.5-4.5s4 1.5 4.5 4.5"/></g>}
    {kind === 'timeline' && <g {...common}><rect x="5" y="7" width="22" height="20" rx="4"/><path d="M9 4v6M23 4v6M5 12h22M10 17h4M18 17h4M10 22h4"/></g>}
    {kind === 'payment' && <g {...common}><circle cx="16" cy="16" r="11"/><path d="M12 10h8M12 14h8M13 10c3.8 0 6 1.5 6 4.2 0 2.5-2.1 4.1-6 4.1h-1l7 4.2"/></g>}
    {kind === 'construction' && <g {...common}><path d="M4 15.5 16 5l12 10.5"/><path d="M7.5 14v13h17V14M12 27v-8h8v8"/><path d="M5 10.5 16 1l11 9.5"/></g>}
    {kind === 'quality' && <g {...common}><path d="M16 3 26 7v7c0 7.1-4.1 12.1-10 15-5.9-2.9-10-7.9-10-15V7l10-4Z"/><path d="m11 16 3.2 3.2L21 12.4"/></g>}
    {kind === 'updates' && <g {...common}><path d="M8 7.5A12 12 0 0 0 8 24.5M24 7.5a12 12 0 0 1 0 17M11.5 11a7 7 0 0 0 0 10M20.5 11a7 7 0 0 1 0 10"/><circle cx="16" cy="16" r="2.5"/></g>}
  </svg>;
}

function AssuranceVisual({ kind }: { kind: AssuranceKind }) {
  return <div className={'assuranceVisual visual-' + kind} aria-hidden="true">
    <div className="visualOrb"/>
    {kind === 'engineer' && <svg viewBox="0 0 520 390">
      <path className="avLine" d="M82 335h356M129 335v-75h262v75M184 260v-48h152v48"/>
      <circle className="avSoft" cx="260" cy="145" r="57"/>
      <path className="avStrong" d="M205 137c5-44 27-67 55-67s50 23 55 67M194 137h132"/>
      <path className="avStrong" d="M217 164c9 25 25 38 43 38s34-13 43-38M166 335v-33c0-58 42-94 94-94s94 36 94 94v33"/>
      <path className="avAccent" d="M230 229 260 272l30-43"/>
    </svg>}
    {kind === 'timeline' && <svg viewBox="0 0 520 390">
      <path className="avLine" d="M88 198h344"/>
      {[110,185,260,335,410].map((x,i)=><g key={x}><circle className={i<3?'avAccentFill':'avSoft'} cx={x} cy="198" r="18"/><circle className="avPaper" cx={x} cy="198" r="6"/><path className="avLine" d={'M'+x+' 225v46'}/><rect className="avSoft" x={x-35} y="280" width="70" height="10" rx="5"/><rect className="avSoft" x={x-24} y="300" width="48" height="7" rx="4"/></g>)}
      <path className="avAccent" d="M110 150h150"/>
    </svg>}
    {kind === 'payment' && <svg viewBox="0 0 520 390">
      <rect className="avPaper avStroke" x="98" y="73" width="324" height="244" rx="24"/>
      <circle className="avAccentFill" cx="151" cy="127" r="26"/><path className="avWhite" d="M139 119h24M139 128h24M143 119c12 0 18 4 18 10s-6 10-18 10h-3l20 19"/>
      {[186,222,258].map((y,i)=><g key={y}><rect className={i<2?'avAccentFill':'avSoft'} x="151" y={y} width={i===0?190:i===1?142:86} height="12" rx="6"/><circle className={i<2?'avAccentFill':'avSoft'} cx="126" cy={y+6} r="7"/></g>)}
    </svg>}
    {kind === 'construction' && <svg viewBox="0 0 520 390">
      <path className="avLine" d="m90 256 168-140 172 140M126 233v102h266V233"/>
      <path className="avStrong" d="M169 335v-90h86v90M293 258h60v54h-60z"/>
      <path className="avAccent" d="M77 224 258 73l184 151"/>
      <path className="avSoftFill" d="M111 335h298v18H111z"/>
    </svg>}
    {kind === 'quality' && <svg viewBox="0 0 520 390">
      <path className="avSoftFill" d="M94 270h116v64H94zM220 230h98v104h-98zM328 252h96v82h-96z"/>
      <path className="avStrong" d="m260 66 91 34v64c0 72-36 125-91 158-55-33-91-86-91-158v-64l91-34Z"/>
      <path className="avAccent" d="m217 184 30 30 60-69"/>
      <path className="avLine" d="M73 334h374"/>
    </svg>}
    {kind === 'updates' && <svg viewBox="0 0 520 390">
      <rect className="avPaper avStroke" x="154" y="42" width="212" height="310" rx="30"/>
      <rect className="avSoftFill" x="180" y="83" width="160" height="82" rx="14"/>
      <path className="avStrong" d="M197 145v-24l25-20 24 20v24M219 145v-16h9v16"/>
      <rect className="avSoft" x="180" y="190" width="94" height="10" rx="5"/>
      <rect className="avSoft" x="180" y="213" width="140" height="8" rx="4"/>
      <rect className="avAccentFill" x="180" y="251" width="160" height="54" rx="15"/>
      <path className="avWhite" d="m205 278 12 12 24-26M260 270h55M260 288h39"/>
    </svg>}
  </div>;
}

export function BuildAssurance() {
  const [active, setActive] = useState(0);
  const item = assurance[active];

  return <section className="productSection assuranceSection" id="build-assurance">
    <div className="productSectionHeader reveal">
      <span className="productEyebrow">The build, made easier to follow</span>
      <h2>Clarity at every<br/><span>stage of construction.</span></h2>
      <p>Six parts of the experience that keep your project coordinated, visible and easier to understand.</p>
    </div>

    <div className="assuranceExperience reveal">
      <div className="assuranceTabs" role="tablist" aria-label="Construction experience">
        {assurance.map((feature, index) => <button
          key={feature.kind}
          type="button"
          role="tab"
          aria-selected={active === index}
          aria-controls="assurance-panel"
          onClick={() => setActive(index)}
        >
          <span className="assuranceTabIcon"><FeatureIcon kind={feature.kind}/></span>
          <span>{feature.short}</span>
          <small>0{index + 1}</small>
        </button>)}
      </div>

      <article className="assurancePanel" id="assurance-panel" role="tabpanel" aria-live="polite">
        <div className="assuranceCopy">
          <span className="productEyebrow">{item.eyebrow}</span>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
          <div className="assuranceNote"><span>i</span><p>{item.note}</p></div>
        </div>
        <AssuranceVisual kind={item.kind}/>
      </article>
    </div>
  </section>;
}


type BrandLogo = { key: string; name: string; src: string };

const uploadedVendorStrip = "data:image/webp;base64,UklGRlJGAABXRUJQVlA4WAoAAAAQAAAAMwgAUwAAQUxQSIQAAAABDzD/ERGCbQBETjCXP4Kj6qiOYJm9lg7MEf03kLZNbqAGPgEYgrgOgN6ejRGF4p6gJOjt6Tkt9PYMnA56e0ZOQG6PDyZSprdnIxWQ22ODg9RAbs/VIEgJcnt+//3++/33RcqG3/CrwdWwImLDtM7FsDdlwwibDZN8Ngw0+jDX6cJ4KwBWUDggqEUAANAXAZ0BKjQIVAA+iT6aSiUjIqSmtTqAoBEJYm78HLANIDhDLA9wT//lac6yHllH+QO/Ohb+MfgB5R4QD+Magttf+VB/wHiL4sc5v5b+3/s94/HQPB/1z9x/aG476/vRH2v9g/4P9vfmH3R9j+U1zJ/0P75/iv2n+Yn+F/6H+T/ynwO/Tv/V/yHwCfqj+T/tq+pv/Ff9L1C/1P/F/+r/M+7b/tP2790v9i/235afIP/O/8J/6/bI/63sX/5j/xf//3DP2f/+3rufuJ8Lf9o/5n7j+05/9vYA///tl/wD//9ZP5f/U/71+THhB/i/yu9Efxf53/Bf3r9wf8T7k+Qvru/2/Rz+Yfb/83/g/3h/yHth/tPy9/vHpD81v878s/gF/K/5n/mPze9DnZdcB/x/QF9ufrP/A/w35UfFP87/l/Q37Kf9f3Af5j/Yf+n5UvhCfkP+B+yXwA/zb/G/9v/Vf3z3Ev/b/ff7P1Mfo3+2/aX4F/6D/euvB6NxbETbuJFsL3XXUEWsqyEvEPOxzM4+IWALJ2Qb3irKbFL+mTGpkXaNfRBI1QQy2F7Tb1FQ87HM345/X7Pqoh/A8BdfEi2F7rrqCLWVZCXiHpI6RUw/GOT+yJWQZhkSlhL1kMG1KwLL30M6YJqL6BEovQAaI0KjU/SVFYY1TaQSEtXeTXEL+9dN2a9aq08aHQGAyJRegA0RoVGp+kqKwxqm3Oqp/JQ8SJ5Ay+RNuM/G0gGwv9lsL+0rLjG0sBEpcQiyBl0vFC0Shy8WgYZzz/Cs9KVUkFKgBkjgkhPufTODDmL4lKAznzKFXVcIlhN2r2wub0EcanDIzkwpc9nPrc5Jdj9vqbrWcnoNyZj3EpHhicyXw39t83VN23Sg6YpRIKAvae/ACCt1XNXp7N4m27BOXvVBrffQggoP9nCUVuPHiZSaCIhXHCh6y1H7aJSgtyP2WZWJalRfMCeeqgyxkpTiNRWGFP2lGVV8kIwFVX3N1a+Jkn7hYlecCuM41oTGu0DpzmFuD1NYX+Rk0Yjn+1Zc+xIV9wawIeJxOGdZOTxI7Y+/7XCpow5jM0Oo4Sf3AHz/+GOPzrPXdo8GwGzi+6nPcftFVOr53zXHdV5als+0l3ffHCkQ3mYrBgf/D5IuLe0m+oJdVo7zKN6S/Q7x6fDH5evHOJTcXUqkQ3sTyg8wlPjHHaRxLDAmAkIjW9YZcEdr+sXCSjJ6DCsqfXatKNmp2VYaed+8V/9BYgiWUbYRF/+uDt8KB4doYdDAGyg5iTN3rr+AszjuxXnfxeKma2uS2jwXjjd5JWIVwxFgHKCJubwZsWeyag6+3WRjMBPs3UmgoofvEyYxxFjyd3YzobHzEpZJPZGBsaslFsGCdQ4xkvZBva3+kV/8OXCniMSrKS7oXMTFFCT8k/vfR1Ii4r+l820BuLsiMqkDeIgz71GZpGOXmcPAiKrfrQAf/tG23UhuEpf1vkcRCYNaJLBg2tmV19Fs/ZRu0ZogoT9zbEperqJ5rL+uTkYwJFVZWPIcDEytU40elUNOs0QM01CQnQcCQiYD3ZZ4Ss+oQt2SWOfzrT/c7Ahh+aCuYNQlTijqXjtk52A2fl27j+tFmimPzIKF66Cbd+ixi8TaXSpGxmer4t9nqjEd+EGWBKUIe66QWzJm/5Ot77c7draybiO2yINDm51QWJzIAkzQf38bgkiIzdkblV+H+AfDiqqPCa05yi0D9tzdRPNbrSS37xUJHS3gYBPel/qVU+Ce0x7Y1qrF3Q+tz21k02dRn6OZD2ENQb0w2H7ZiV4QGeYmbKWQaQ+dF7KstIKutzEaB9kYSydds6up1RmrgyTCKqPCdntBiSivVLDx3PMxqQVNW/VJX/PfplX5O9B5A6OdJyFpzCLdjTLWz+H/fk9PKwUIVWGXKvl+mucvVd9ve6N5Ch5WC7gnCsYxi7+fWgSt2I0u5pH1LjxEuMUL0eCrzRfjh83JKUeqi5H1n8MldWMPrwReBALD6bQaVOYo7HY2ubKUUEOcWOb1cNrgrJvDojkwa0SgvL9nDSbjmXRpWH0+Jfp4hN72NbpNzMZ5il33Egcj9eh12zYSo58wtEUmzn8YaG+Ox359grctzJf0uugKP7k2lc3Wqt/gK3igpq1AJpaUZUqy38eDjh4Nk2Z5JZQ0z9U0P1xlgoEvU8ArLBR8N0kuXz0F2X+wi2c5ToOzIAVT/BwDJA1np3AtwYQqm9UqrPEsru6VI37XXwYWoiPPcfWsk9nRscQ9oIR51eY4hDo/UbfpwGdr9FSwdcPMJ8os0KHqgF7WBkc7M4aT+LZt9uBXI1Sl0zfluqy07q7rRd2LODPFEG/v4gc0iCAkE/V3srX4PYuKvX5IWcZ8BJzYGf7hrJYQCdufhX99p7TdKVoSFrvOaJ5CWd6/0lYrMSQkHE5KgqhISsnmUhZZcYQ8aTxhSWTzPFdsik6iWlKBKjDz3wnHjjjGv9Dnvxfd9mqCPXvKS2pptZn773Umh4rTBwZYhVG7787qG/xU4/bRrOJjpN0+M2mTh8aKWBEb8+XsktKXDNSKdLMqEWfIvxG/Pl7JLSlwzHgI0x+vzqcb8nxhVNrM/fe6k0PFaWPmt6ZXw+orrLw+wo40FIFtWqnDTFuZSLokj2m8rwjhoeIgXkfSt68is4ENgzivBC3zIEl2VwLH1a6m+oIYufzSJ9tv4XNp8QuCtuTZxJzqJAZfsaXJ2cunyEEGr0+9SejOJy67474PpJIBy1veyKyrNeQ4BoZ0ECyqgNVwZPNGnOvPkIcGXDBQQSn7khOl21MQ5DEt3jYlD+77K+JFsNyxtjR1AP9Pl+qBW//9I5cgCdbLhYfWqIEuCWNwAqYJdEFYGV8SLYXxZ3r38VHNNdfFI8R/iJ9Nxxj7ogrAyviRbC+LO9e/io5povQkWw3LG2NH+c7mjKBKibdxELw0Y3GKjmfbPiR5RpDcl1EQ3t3WaleG9UAK9I5chCIDLhYff5QUuCWNwAfMAAD+YcpKRXYpbbEqbS5hnv3zFp94zW5Z6sfIBjp1yqMDlTohV9S3Gf7oGVckrmbGnfRZx8Zc0dBggaxOUe4oClI9SRTH0ldjdGlBFhEcqRSxGc4JbImXD7YgBJRUEO4d1ovyvFanHCacBULSlcGdW4HleohX5Lz5UeF6EjPfeko5Md79BVsZ4Ni6cDdUooG6OrZYilmqsTw1AgCw8szzCo4loILhjXyxl3lFQiq4bOb11H+hZWMkxxBOxSBiCIW5+uFQhaDfinDbKyPQ5t4AHEqPHAj+Chc3mM8dNKHyQtrVk2NO+izkFLTQXNHQYIGsTlHuKApSPUkUx9JXY3RpOrovRT7ThJze52fEPm3l+Ylfn90hHyQCeRxQ2cAcBnV7WyRGkfIig3dMVybiu3V6Suvtpsad9FnHxlzR0GCBrE5R7igKUj1JFMfSV2N0aUEUByK74lWQUdd2pcalBP1AUZFk82NO+izj4y5o6DBA1ico9xQFKR6kimPpK7G6NKCLDn6HwUGBWnsTr2rJDj5CiwFvAMa7y/LJh0QHBzpVN8tHjCN01AMU9r+Cc29gpiPRkWTzY076LOPmOc3bcZj16yrvPyvF+EQkmz473IuQ3+4fa96y+X+ma+aL8AALQn/wgV8uT6AyZyKH9q5qbR7n/PnWpihQxiFNjTvos4+MuaOgwQNYnKPcUBSkepIpj6SuxujSZwhN8Vv9hdvb8RjedVrnKXVZduz5go9Bvar/Nc9sT7HRjh/K0yxCoEL1vIRdphvCVlbnWkLrx+Z086Hhc/InTypAAUFe6P+rVk2NO+izj5m1N/to1WYyFWWGDqPkzAV4UlzcmGuIMEM/E2wLhN4xuKSxSpthVFwnSPGEbpqAYp7X8E5t7AFsjIsnmxp30WceOY9MOmb5X28ZZapsGwzJqVEc3uoY2mhbnQztueEJYxB6laljQjaUzcuzrMwDifK5OB7xOt5cnRgMXURP+U+VIrgsUu/qFWSHAFsY3gwP4wQO2oSBItwJDNjTvos4+Y5zdtxmPXrKu8/K8X4V+WEAoga29JQ1QYOUQD+bctLVKY+lyh4YWHfl2q1C67TrQ2aYL1PWFNHgvp+oStpYyx4Z5Khv4WUzmxp30WcfGXNHQYIGsTlHuKApVEMyalRHN7qGNqINKuofV0ptOn/+vmFPh6Pw2fBmQ4HHhk2GdxExK11ObeMWUsMHNHdjUYhwzxHCoxlMv/xJHXibtIubGnfRZyFEjYVEUePf9Cfx/Kb7av+zcvwc/kBZqqKmc6G6czqVHR17bSiXEWgFdVneQuEekvsfn4WYd07Q+ntEnaCgYbA4X4V/jruEJ9xdNZMimePOhrrcByXTIgXxmsmrFvjHVs0s+UENsINNkXyczBOYYN/cro278Pq/gP/UV3HokseZJ81edOFi1O1fZL9GQDpDv4XnMHU/L8WenLUlaUqdrBrarpketN1F/3or/ST3sBSLJDBtWoYLWe+utIUueD4+RfXvuWwodYFh5O2ke3v3Ey/YvaekjKnGYi76nyCkOy2HVdPO4XsE9MRu7rM9gF+SMIqlXp63g9DCFUN9s9fjM2d5wPUFaxnJ99B4nndWn0RtApDKA+coAG5eQi10XNdQ+/BovG9SfPfAlc8kdjq2ILlLaidQlBMh2m6NAxDPzgbRJTlx28pZ6SGbBoxXP4J7d/KrG6zZpGj0ge+ZnTT9NO3wU4lXPt6DpOVTkEPbSP+QbC7P/R5kUB7F9JZPKF6d2CwBJNGJk4+jiVH9ydOEon/IuP0Cc6DWFfrhArFfuw46ruqxQjtoM92/DjQBbAcyUYtMNaaElZ0/In7q3AmP28THhf1sPIQ+ddCU2icAE//jD26JhVJ4eKxKeWQcfqP6en4d18jeA6YkO/jwBeN5sbljYH1rxN3HnUPLXcZPHbGv8qR7lJLCgqRFnkqqTgY99ztYa4ADnrQaZhYeT696pKoeyHRzZTSpfT8B52OVJ5ZDAV7FDuE/8SgBKWhsEI52JMlPDLURnRx3G9i02jxJrlcT0wmhsdlFdCMUl0f6N0AQLc69DgUh8Ep9I9A29KZm03vvoCcPT9FfayHlsjZXC27HoxK95oWNTnQnb0tm7sJpIqeLyUXsc0bMqoO7E80Pj2yZ98fxRMVEBYf+cx2eLV4rjN3b7MzK9Ks1iyNip+Q827w27TY98OEHp9NuqpYtnCdsFq/qohPkUc6v+AxK1zRHko/zLlOFcsbRnHR8V4upYuy9kTUYAg4dogipTMBcN/GWzA/hk9om49dgke+3L1oY2qpKHK20uRzgmUA2/zwOwjky6hzZHaI8OnmueSJcIkX5q3fDhfqRPyOFqrc6COWIzxd1m2dI8ikqPBQc1UeCSxE5WaBXpjQcfSdHLa0Q3UuTIZwL+8yBh3SzbteOb9L/3v8vmpD9leIn0dqJrPy6ZYO0AMrtJygNQ7r+aEmO4LEopAcdfjJIziyohM3vpWSqjzKXFj+onSIUlErfZYBVRkMG65RY6yGbQnUibV1BHxeWpoLHhzejfJUc+/2kX2NevKNNB9EYzds6anDUPU8bzso59gbdCKwg3nisuBcekPSz4VkX3i4Xe2OwCvmdZxWGn7laWiG7fM46u2BjJemTORz8DcID1TZqxfQ+lzD22kLMoUyynjBTSXL51AN48KpAPwtQNZMwYuEgDz+zJFCBTSmKfCjjOR3pz6WoLSaCiQvZG4cSnbbDt5lemucpQlNznQFnAutI6e3hby1xjw4ev5IbckFatoBwTo3hwrGF4zgzTr5q54pIYfwscBDFKLHoe7iJuhBsx3ULiXyoLGQJhjoVUr0i9hKpAwH/EFRF79IC8vtscmqG0pigA9cX3Ju5risv2fek4cuxtL/wwfQKyMPJGS6f9rSwL39z+nWInudtgAUmL0HbKgtCN8AyPALbzfo3H5ZQhWe7UGF8hXPNPsTDYgffM7RS0vewh4a4IrOXeMoe5dgs7ebX6r3iLXNwdu8Yo/bIB7t2mCdPLfVeAvUDZlslcwV4pJDFlOKCFkIRh27CMGEjCo6igoLsGLLhNiJ3Y9ox7Rjef1z04PLQZHGcpgkA28cANI4NVbTBT1+GMYUldhd7nygbfiJMr+fo7Uz7mI6U8inMFpYY6rdD8z76v58Tfrq89m7oDWSCDdUIbbsbr5y9OErPT239vQ1PjlRQArCsOQHhW2oxGf+d+ssL7Jlk8NbWzT1oQeKR/aPxokNxZw/zYIofWPKHs4dkKxm2EsHb4omC5ZUbiOtekHD4XabgnxPKwag5+3weno4IR7cyNSs8q3ILPC/nQCp5bi+uP0N8OVZ+kg4RXwUxjHTF5QF5Yzd0dCSLEJ9Zm+Cga5BSqBcJ7tnXbLYbTwGdisaEPfEP/YCMbCkNTaGEayn1JQq4Oa/Q2klQ2L6RuIrDsELjjI+LbKybVj7PnFRLQ9W6gW3Uk7sH13Di5bL1/ripljukSC9Dhl5B9jNl3TCRfWZXk8U04FJT/ZADWuLcUPeWDgQOhuf01ozWiAAKc30g4DMZyFhyHz2GeyCTAKy1njrfNswSfK/FzWGVW972atjvijVqfQZgkyx4kXMnTs8cUsyjmEnLulp0DH4RKBaI3ZQZ038RL+d66IxqmZjV6R2VptNrZAe25TwVdWk0NFFvA4rBbrUzKgnkXHkao5LMJcuB9GyWkDwhSkRcQWue5oCfofBQggfkFXBqr1IpWiMZD9xb8HUp++EQ/zoPg6lP3whHTP3/O0OzhQcRnjzikZWrMSuAZQNF10JWtHb+injDOx24zMflhmHqOzAtdNO8sO7zXtPHc7mf0lIYMn+pvan36eR2zSwe8Q0H2uTbYKkrx7i8uGhreGQutZHYU/mmF+MzXSFoToBhpOColPs5Av3XVivKmOuj6lFdoxmu2lTez8TFo6uo2pfZ9aHIzP1OgIqoAMVPOXXpGwXXCuWW9qSayNd0IjS5f2142oYYCduyGrl1sarRpI4F+vqBJeQ5MaiV/v5W4lU/TcxJZTLjyQBrJaJCF5UGBkXk6fDJO0/E6SpOJBFcr+I4QnLsRqxRfVo8wbNhzEnPQSpk8XQcap4KOGPvPCBg2f0Pg6rw5P49RT/mm6pRpn4uQ+kqCFc5NaeETKNZgvBn+hIVk2QeqOSrOuqV7gwl8CBC4s1SFnhBacWX84bIYR0xdWUwqxJCXB7shpy15g5GAM8sDOESD8CiTUc3I6qG6GbVqO6/xzSyCeiiacGOVryR3EFa11PoGwe0DhoLcDJf5fNiPmsGnPyGbBKYXfQeeq6nkEl5PfELdKdXRoXkph7rgjeX5Iub8u+8MErRFx1mBUJJjDvH0b6jCub0VP62q4h3cJ6iu6JNTI9bboY8I2BQYUV6Nr3p1q55L5JduzFmmb9paXRguzeGVTFoPYyAZLhw7naLebsbtdxUhCiIJw7UkADn7cp/t8LfCSofHA37tRwZlRCXuwlqbpRMYl/utYxB1hsIQ+1Bz5kOjgiXXse5Iskmm8KjBXRvJCexAmx0PMv+ZaARfygcsgWV4GLkXgMSbJFZExK/Sk6TVNK/1a4nsmySJsnibWQfSHOPfXbu+Zlks69RLPB0HXXlVkwMUdaUwXHZhzDFpCg8RkV9WRRSRW51Om25snLdtUNtUE7CDmeH1eU1WJaYbUKBIytk9IR2xLgbINQILV8q6Xu3gW0COlYX67vxzFlUuJC7wf9aM/arrnjnBuNlCwH/rwCVbEzz51ngOy7TO/B7A8vIJkPhhDXdLJXJ1DTo6u2daiuqzWHYcD3ojJEpBzKgAH42ccXpS8yzsrVllIIu4QVeZ+k73Q2u73QElXXkeAqzCE+Pk5OJ5J1MYxFPoum3/wKXqzGadQqxmSwOoN1bxm8pYW7OGZCOBZkiV1FCDFpEbtEGV1F4DgoPxsSyxGnZTom3lkp7GhnaSE3RDhanXAVTyQP4lD7vwU5rgLMCVUWYq2kgj2RN22VZ9GboExDZ2rJUwXGXUkDmAbV6ik57CAOt+Dwf45FQ0XRMwH+JxoSrq1jFWvi0wqAfmPU+9tkrDJyXuQrr0G2ptexFChnQKdvcS0mvl/DvkqnW3sVJAd+GJj756n9n0bSIqWJeQcgy6sFu5+VFwV6WdFvvukKRzbW4l/xMQAp8syMPaJh7Exng0zb2ZIh8mkQ9ISnneEgl3qDxYboD0wdJyx8LmeE316yPXMRWfu/LEenGioUCFSqTcZs8/t/znwBJDPxddRjkrvAP4mRa0bMcRGF6hrcmxHsbwsV/RtQBuEQEAlGPe4loYSYiHK8RqZYNZNY4ggNwRULVbkPVWEz/oT2fLA5UM9X1gqfnqqW7FGGCAE4CAPJroqgyQpgQ/Rh2w8yYlQhoq9V7Awr+apN47UY36Rxkp0w0Tz5FBk4R6HENJNrcRExmyy7L/Up7FuKQl/dnEm9F161HC65dT+igOd+pBayv+waRq7kmyhHfNjt8df/xbfbz8tbqp7SjQhvf160wP+rkUWYyQaVq904PRx8l2W7b6eBWZvNzfRQ72lhS9qFLaVhnOPSIy5x2pmahSwJ5jTxNB02NTbtMNAJZz51ghUfW3tEY9O+zls23u6Zfe6TAmV5sbaMThQaZxJnCymMEy0jW4tTGl/fIja59U3pta69uMYsqcCEHmTqUtFWHpLO32e43DfydBna8gJfsoiOsyvuPXzcH3HAN7RC+vP0AqtvopC1/dq8Fi92sGShSs0p3FFhxxAVW9graafOPWe/BgjmaGb9/9KwJnz2rWxqn0P24N0qepoCgAmjIgmYMbme8APFHK9F5QpcdjKSxcnEFTB2ytB1FIupYsG+Cm2mHNw+x1KNUZUO9TCr0ztXB2sltwIdfkLbctY3Ho339knWoZEEunpMBq4//RWmFAp2mSV9FMd++NrRlszuD4dW6hXapG03taXTdys0U1Vus0XzFm14Jv+XKY0i7grjzMS+R3y0UdbNWUOwgedZfDD8w3i2zDDy/hwdYOe26ttKFgKLY4twt3EIuRK7NBcRQF9Ld3SU+pOReWbR7u4Cs/GrNWRay/wldMzASr5JqXbV7IrZAQh8bgMNo48uDS8GwqSKMYgwwNSI1bqEC7Xr5oxP3dLnqjO+IZKGaU4IzCdm+MYre98UOq88uBBwrN5bnmhSIQ9365OQrenneGsff8AN6Ear88B5wGDz4gDOlU8v23GyAihmMbFFRoIztBYd3yZo1b5+mej0I1Z6Lr6XXR00ayIGB8sszZcPxxEI4W3IS1BXsBGuMO5w98zNYU00vuaAcC5AKPgcQpkRTwwu0DHncqo9SKBzVdmLHdI64lKoJsc1B7VqHKJ+s996/GRaty8LramTbU10KJgRkj8GQqYuhtXKP4bjaMandklNAcir8Ifn7WBAFpjDtYghcQHwqvTKy860f5C/VlsExjhE1xqJz79YpJvtmHoPO+gUk9/cLHC8YB28eCLzHp3sfhwOPMAxw4HNrlv1ZFlG3C8CAn8c921v75wnk/prtyo2UnWfcQtzdkzzJZ9WPnV4GAaRQNTE+tDr7TcNvCgnIAX5dBUp8UKuBOMbtkdgwz+qof1KjfuUP1HDJzN/5uR+qiZNDkl/4pYRn4MYbTR7zhHTGKRR6rS739W7DL1ZbM+im+iD2X4MrrZT9srrpWFKSmbcvMvyHncDdgrWNUPqj/Z19fc/JnvXluT/W8dDDCEaeG4jY5XycF/q7s9lJjleO56OaMsN32qJ2CpKVILDZFVhPmRhRhokII5cQwdlMdBSEE6U[...snip...]";
const uploadedVendorNames = ['Legrand','ARS / CRS Steel','Orbit','Nippon Paint','Parryware','Kohler','Astral','GM Switches','Sintex','KAG Tiles','Ashirvad'];

const materialBrands: BrandLogo[] = [
  { key: 'ultratech', name: 'UltraTech Cement', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/UltraTech_logo.jpg' },
  { key: 'jsw', name: 'JSW Steel', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/JSW_Group_logo.svg' },
  { key: 'tata', name: 'Tata Tiscon / Tata Steel', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Tata_Steel_Logo.svg' },
  { key: 'asian-paints', name: 'Asian Paints', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Asian_Paints_Logo.svg' },
  { key: 'jaquar', name: 'Jaquar', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Official_Jaquar_Group_Logo.png' },
  { key: 'kajaria', name: 'Kajaria', src: 'https://www.kajariaceramics.com/assets/images/logo.svg' },
  { key: 'finolex', name: 'Finolex', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Finolex_Logo.svg' },
];

const lenders: BrandLogo[] = [
  { key: 'sbi', name: 'State Bank of India', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/State_Bank_of_India.svg' },
  { key: 'hdfc', name: 'HDFC Bank', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/HDFC_Bank_Logo.svg' },
  { key: 'icici', name: 'ICICI Bank', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/ICICI_Bank_Logo.svg' },
  { key: 'axis', name: 'Axis Bank', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Axis_Bank_logo.svg' },
  { key: 'bob', name: 'Bank of Baroda', src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Bank_of_Baroda_logo.svg' },
];

function LogoCard({ brand }: { brand: BrandLogo }) {
  return <span className={'brandWordmark brand-' + brand.key}>
    <img src={brand.src} alt={brand.name} loading="lazy" decoding="async" referrerPolicy="no-referrer"/>
  </span>;
}

function VendorMarquee() {
  const label = [...uploadedVendorNames, ...materialBrands.map(item => item.name)].join(', ');
  return <div className="brandMarquee vendorMarquee" aria-label={label}>
    <div className="brandMarqueeTrack">
      {[0,1].map(copy => <div className="vendorSequence" aria-hidden={copy === 1} key={copy}>
        <img className="uploadedVendorStrip" src={uploadedVendorStrip} alt={copy === 0 ? uploadedVendorNames.join(', ') : ''}/>
        {materialBrands.map(brand => <LogoCard brand={brand} key={copy + brand.key}/>)}
      </div>)}
    </div>
  </div>;
}

function BankMarquee() {
  const repeated = [...lenders, ...lenders];
  return <div className="brandMarquee reverse" aria-label={lenders.map(item => item.name).join(', ')}>
    <div className="brandMarqueeTrack">
      {repeated.map((brand,index)=><LogoCard brand={brand} key={brand.key+index}/>)}
    </div>
  </div>;
}

export function BrandEcosystem() {
  return <section className="productSection ecosystemSection">
    <div className="ecosystemIntro reveal">
      <div>
        <span className="productEyebrow">Project ecosystem</span>
        <h2>Trusted vendors.<br/><span>Banking partners.</span></h2>
      </div>
      <p>Reference brands and financial institutions commonly considered while planning, specifying and delivering residential construction projects.</p>
    </div>

    <div className="ecosystemBlock reveal">
      <div className="ecosystemLabel"><span>01</span><div><strong>Trusted vendors</strong><small>Materials, fittings, paint, piping, steel, switches, tiles, tanks and sanitaryware considered across project specifications.</small></div></div>
      <VendorMarquee/>
    </div>

    <div className="ecosystemBlock reveal">
      <div className="ecosystemLabel"><span>02</span><div><strong>Banking partners</strong><small>Major lenders homeowners may explore for construction finance and home-loan support.</small></div></div>
      <BankMarquee/>
    </div>

    <p className="ecosystemDisclaimer">Brand and lender selection depend on the final specification, project scope, local availability, client approval, eligibility and lender terms. Displayed names are reference ecosystems and do not imply an exclusive partnership or endorsement.</p>
  </section>;
}
