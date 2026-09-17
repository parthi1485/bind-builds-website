import Image from 'next/image';
import Link from 'next/link';
import { Nav, Footer } from '@/components/Site';
import { packages, whatsappUrl } from '@/lib/site';
const benefits = [
  ['01', 'A home that fits your life.', 'Your family, daily routines, daylight and ventilation shape the plan before the work starts.'],
  ['02', 'Clarity before commitment.', 'Review the design, material specifications, inclusions and exclusions before agreeing to construction.'],
  ['03', 'One coordinated team.', 'Architecture, engineering and execution connected through a clear point of contact.'],
];
export default function Home() {
  return <><Nav /><main id="main-content">
    <section className="hero">
      <div className="heroMedia"><Image src="https://amazingarchitecture.com/storage/files/1742/architecture-projects/cubism-architects/n-cube-villa/n_cube_villa_cubism_architects_and_interiors_india-13.jpg" alt="Contemporary home entrance framed by a landscaped courtyard" fill priority sizes="100vw" unoptimized /></div>
      <div className="heroContent"><p className="eyebrow">Chennai · Architect-led construction</p><h1>Your home.<br />Thoughtfully planned.<br /><em>Precisely built.</em></h1><p className="heroStatement">From the first floor plan to the final handover.<br className="desktopBreak" /> One team to bring your home together.</p><div className="heroActions"><Link className="cta primary" href="/start-a-project">Let’s discuss your home <span aria-hidden="true">↗</span></Link><Link className="quietLink" href="/process">Explore our process <span aria-hidden="true">↓</span></Link></div></div>
      <div className="heroFoot"><span>DESIGN FIRST. BUILD WITH CLARITY.</span><span className="imageCredit">Architectural inspiration · N Cube Villa<br />Cubism Architects & Interiors</span></div>
    </section>
    <div className="trustStrip"><span>Design practice since <strong>2019</strong></span><span>Led by <strong>Ar. Parthiban Moorthy</strong></span><span>Built around <strong>your site, family & budget</strong></span></div>
    <section className="section introSection">
      <div className="sectionHeading reveal"><span className="eyebrow">01 / The Bind Builds difference</span><h2 className="lead">A beautiful home.<br /><span className="muted">A clearer way to build it.</span></h2><p>You should enjoy imagining your home. We bring the planning, technical coordination and site decisions together, so you can move forward with confidence.</p></div>
      <div className="benefitGrid">{benefits.map(([number, title, copy]) => <article className="benefit reveal" key={number}><span className="index">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
    <section className="section dark journeySection">
      <div className="sectionHeading reveal"><span className="eyebrow">02 / From your idea to your keys</span><h2 className="lead">You always know<br /><span className="muted">what comes next.</span></h2></div>
      <div className="journeySteps">{[
        ['01', 'Let’s understand.', 'Share your location, requirements and budget. We discuss your priorities and the right next step.', 'Your project brief'],
        ['02', 'Let’s plan.', 'After design engagement, we develop the plans and facade, coordinate engineering and define the construction scope.', 'Your agreed design & scope'],
        ['03', 'Let’s build.', 'Construction follows the agreed drawings and specifications, with stage reviews, progress updates and handover checks.', 'Your home, brought together'],
      ].map(([number, title, text, outcome]) => <article className="journeyStep reveal" key={number}><span className="stepNumber">{number}</span><h3>{title}</h3><p>{text}</p><span className="stepOutcome">{outcome}</span></article>)}</div>
      <div className="sectionTail"><p>Design is a professional, paid engagement.<br />We explain its scope and fee before you begin.</p><Link className="textLink" href="/process">See the complete process ↗</Link></div>
    </section>
    <section className="section budgetSection">
      <div className="sectionHeading reveal"><span className="eyebrow">03 / Start with a sensible budget</span><h2 className="lead">Your priorities.<br /><span className="muted">The right specification.</span></h2><p>Three starting points for materials and finishes. Each built around an architect-led process and a project-specific agreement.</p></div>
      <div className="priceGrid">{packages.map((tier, i) => <Link key={tier.key} className={`priceCard reveal ${i === 1 ? 'highlight' : ''}`} href={`/packages#${tier.key}`}><span className="eyebrow">0{i + 1} / {tier.name}</span><h3>{tier.name}</h3><p>{tier.description}</p><div className="price"><strong>₹{tier.rate.toLocaleString('en-IN')}</strong><span>/ sq.ft*</span></div><span className="cardLink">Explore specification <span aria-hidden="true">↗</span></span></Link>)}</div>
      <p className="smallPrint">*Indicative base construction rates. Final pricing depends on design, area, site conditions and scope. Confirm taxes, approvals, external works and all exclusions in your proposal.</p><Link className="textLink" href="/packages#budget-planner">Explore your indicative construction budget ↗</Link>
    </section>
    <section className="section foundationSection">
      <div className="foundationYears reveal" aria-label="Studio Bind Architects founded in 2019; Bind Builds launched in 2026"><span>2019</span><div className="yearConnector" aria-hidden="true" /><span>2026</span><p>DESIGN EXPERIENCE.<br />A CONSTRUCTION CHAPTER.</p></div>
      <div className="reveal"><span className="eyebrow">04 / Meet the practice behind the promise</span><h2 className="lead">Architectural thinking.<br /><span className="muted">From day one.</span></h2><p className="bigCopy">Bind Builds brings the design and site experience of Studio Bind Architects into a coordinated construction service.</p><p>Led by Ar. Parthiban Moorthy, our approach connects how a space looks with how it works, how it is detailed and how it is built.</p><Link className="textLink" href="/about">Meet the founder & our story ↗</Link></div>
    </section>
    <section className="section homeFaq">
      <div className="sectionHeading reveal"><span className="eyebrow">05 / Building in Chennai?</span><h2 className="lead">Good questions.<br /><span className="muted">Clear answers.</span></h2></div>
      <div className="faqPreview">{[
        ['What should I have ready for the first conversation?', 'Your site location, approximate plot size, the rooms or floors you need and a comfortable budget range. It is fine if some decisions are still open.'],
        ['Can I compare builders only by the square-foot rate?', 'The rate is only a starting point. Compare the area measurement, material allowances, structural scope, external works, taxes, supervision and exclusions together.'],
        ['Do I need approvals before construction?', 'The permissions required depend on your site and proposed building. The applicable authority and approval route need to be confirmed for your plot before starting work.'],
      ].map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      <Link className="textLink" href="/faq">Read the Chennai construction FAQs ↗</Link>
    </section>
    <section className="section invitation"><span className="eyebrow">Your next step</span><h2 className="lead">Tell us about<br />the home you imagine.</h2><div><p>Share a few details. Let’s discuss your site, your priorities and how to move forward.</p><div className="homeActions"><Link className="cta primary" href="/start-a-project">Discuss your project ↗</Link><a className="textLink" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Prefer WhatsApp? ↗</a></div><span className="smallPrint">Conversations in English or Tamil.</span></div></section>
  </main><Footer /></>;
}
