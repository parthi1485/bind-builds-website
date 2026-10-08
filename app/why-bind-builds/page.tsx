import Link from 'next/link';
import { Page } from '@/components/Site';
import StructuredData from '@/components/StructuredData';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata=pageMetadata(
 'Why Bind Builds | Architect-Led Home Construction in Chennai',
 'Understand the Bind Builds architect-led model: architecture, structural engineering, MEP, project management, site supervision and quantity surveying coordinated through one point of contact.',
 '/why-bind-builds'
);

const roles=[
 {
  no:'01',
  title:'Architect',
  lead:'Starts with how you want to live.',
  copy:'The architect turns your family needs, site conditions, movement, light, ventilation, privacy, future requirements and budget into a coherent plan. The architect also coordinates the design intent so the home is not reduced to rooms arranged around a structural grid.'
 },
 {
  no:'02',
  title:'Structural engineer',
  lead:'Makes the design stand safely and efficiently.',
  copy:'The structural engineer develops the foundation, columns, beams, slabs and structural system based on loads, spans, soil information and the architectural design. Architecture decides the spatial intent; structural engineering makes that intent structurally workable.'
 },
 {
  no:'03',
  title:'MEP engineer',
  lead:'Plans what runs inside the building.',
  copy:'Electrical, plumbing, drainage, water storage, pumps, service routes and other building systems need coordination before they reach site. MEP planning reduces clashes, late chases, awkward service routes and avoidable site improvisation.'
 },
 {
  no:'04',
  title:'Project manager',
  lead:'Connects decisions, people and time.',
  copy:'The project manager keeps drawings, approvals, procurement, programme, decisions, dependencies and site priorities moving in one direction. The job is not only to chase progress, but to make sure the right information reaches the right person before work starts.'
 },
 {
  no:'05',
  title:'Site engineer / supervisor',
  lead:'Turns drawings into daily execution.',
  copy:'The site team checks dimensions, levels, sequencing, workmanship and stage requirements against the issued drawings and agreed scope. Day-to-day supervision is where design intent and construction quality are protected during execution.'
 },
 {
  no:'06',
  title:'Quantity surveyor',
  lead:'Brings discipline to quantities and cost.',
  copy:'The quantity surveyor works with measurements, quantities, BOQ logic, rate analysis, billing checks and variations. This helps separate a planned scope change from an accidental cost surprise and gives the team a clearer basis for commercial decisions.'
 }
];

const usps=[
 ['Architecture before execution','We begin by understanding the site, the people and the brief before treating construction as a square-foot product.'],
 ['One coordinated team','Architecture, structure, MEP, project management, quantity and site execution are connected through one project process.'],
 ['One point of contact','You do not have to independently chase every consultant, vendor and site person for coordination. Bind Builds keeps the project conversation connected.'],
 ['Scope you can read','Packages, allowances, exclusions and project-specific scope are made visible before they become site assumptions.'],
 ['Decisions before they become rework','The goal of coordination is to resolve important design and engineering decisions on drawings and schedules before labour and material are committed on site.'],
 ['Progress you can follow','Site coordination, documentation and agreed review points make the construction journey easier for the client to understand.']
];

const faqs=[
 ['Why should I meet an architect before choosing a contractor?','Because the first major decisions are about what should be built: the plan, orientation, circulation, room relationships, light, ventilation, structure strategy and project priorities. Those decisions influence both your quality of life and the construction cost that follows.'],
 ['Can a builder or contractor design my house?','Some construction companies have qualified architects and engineers in their team, and that can work well. The important question is not the label on the company; it is who is actually responsible for architecture and engineering. Construction experience alone does not replace project-specific architectural planning.'],
 ['What does “one point of contact” mean?','Bind Builds coordinates the project team so you do not have to manage each discipline separately. You can still participate in specialist discussions when needed, but drawings, decisions and site communication are coordinated through one project route.'],
 ['Why are so many specialists needed for one house?','A house combines spatial design, structure, electrical systems, plumbing, drainage, quantities, procurement and site execution. Each discipline solves a different problem. Coordination is what turns those individual inputs into one buildable home.'],
 ['Does an architect make construction more expensive?','An architect does not make every project cheaper. The value is in making deliberate decisions earlier: planning the right area, coordinating systems, selecting appropriate specifications and reducing avoidable conflicts or rework.']
];

export default function WhyBindBuilds(){
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([question,answer])=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))};
 return <Page kicker="WHY BIND BUILDS" title="One home. Many specialists. One point of contact.">
  <StructuredData data={[breadcrumbSchema('Why Bind Builds','/why-bind-builds'),faqSchema]}/>

  <section className="section whyIntro">
   <div className="whyIntroGrid">
    <span className="eyebrow">THE IDEA</span>
    <div>
     <h2 className="lead">You should not have to coordinate your home like a full-time job.</h2>
     <p className="bigCopy">A well-built home needs more than a contractor and a set of floor plans. Architecture, structural engineering, services, quantities, planning and site execution all affect one another. Bind Builds brings those decisions into one coordinated construction process.</p>
     <p className="whyLeadNote"><strong>Your role:</strong> make the important client decisions. <strong>Our role:</strong> connect the people, drawings and execution needed to carry them through.</p>
    </div>
   </div>
  </section>

  <section className="section dark whyArchitectFirst">
   <div className="whyArchitectGrid">
    <div>
     <span className="eyebrow">START WITH THE ARCHITECT</span>
     <h2 className="lead">Before asking “Who will build it?” ask “What should we build?”</h2>
    </div>
    <div className="whyArchitectCopy">
     <p>Your first construction meeting should not begin only with a square-foot rate. Start with an architect who can understand your site, family, lifestyle, priorities and budget — and turn those inputs into a project that is worth pricing and building.</p>
     <blockquote>Construction experience is valuable. But having built hundreds of houses does not automatically mean every house was individually planned for its site, family and long-term use.</blockquote>
     <p>A capable contractor is essential for execution. A capable architect is essential for planning. The strongest projects respect both roles instead of expecting one to substitute for the other.</p>
    </div>
   </div>
  </section>

  <section className="section whyRoles" aria-labelledby="why-roles-title">
   <div className="whySectionHead">
    <span className="eyebrow">WHO DOES WHAT</span>
    <div><h2 id="why-roles-title" className="lead">Different expertise.<br/>One coordinated home.</h2><p className="bigCopy">Each professional protects a different part of the project. The value comes from connecting those roles before decisions reach site.</p></div>
   </div>
   <div className="whyRoleGrid">{roles.map(role=><article className="whyRoleCard" key={role.no}><div className="whyRoleTop"><span>{role.no}</span><i aria-hidden="true"/></div><h3>{role.title}</h3><strong>{role.lead}</strong><p>{role.copy}</p></article>)}</div>
  </section>

  <section className="section whyContactBand">
   <div className="whyContactDiagram" aria-label="One coordinated point of contact">
    <div className="whyClientNode"><small>YOU</small><strong>Client</strong><span>Priorities · decisions · approvals</span></div>
    <div className="whyConnector" aria-hidden="true"><span>↔</span></div>
    <div className="whyBindNode"><small>ONE POINT OF CONTACT</small><strong>Bind Builds</strong><span>Plan · coordinate · build · document</span></div>
    <div className="whyConnector" aria-hidden="true"><span>↔</span></div>
    <div className="whyTeamNode"><small>COORDINATED TEAM</small><strong>Specialists + site</strong><span>Architect · Structure · MEP · PM · QS · Supervisor</span></div>
   </div>
   <p className="whyContactNote">You should not need six separate coordination chains. Specialist responsibility remains specialist responsibility; the project communication is brought together through one coordinated route.</p>
  </section>

  <section className="section whyExecution">
   <div className="whySectionHead">
    <span className="eyebrow">DESIGN + BUILD</span>
    <div><h2 className="lead">Execution answers “how”.<br/>Architecture asks “why” first.</h2><p className="bigCopy">A builder or contractor can be excellent at labour, sequencing, methods, procurement and execution. Those skills matter. But your home should not be designed only around what is easiest to construct.</p></div>
   </div>
   <div className="whyCompare">
    <article><span>01</span><h3>Plan the life.</h3><p>Who uses the home? How do they move? Where is privacy needed? What should receive morning light? What changes in ten years?</p></article>
    <article><span>02</span><h3>Engineer the building.</h3><p>Resolve structure and services around the design so important systems are coordinated instead of being improvised after walls come up.</p></article>
    <article><span>03</span><h3>Then execute it well.</h3><p>Only after the direction is clear should materials, labour, sequencing and workmanship turn the coordinated information into the physical home.</p></article>
   </div>
  </section>

  <section className="section whyUsp">
   <div className="whySectionHead">
    <span className="eyebrow">THE BIND BUILDS DIFFERENCE</span>
    <div><h2 className="lead">Not just one contractor.<br/>One connected process.</h2></div>
   </div>
   <div className="whyUspGrid">{usps.map(([title,copy],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
  </section>

  <section className="section whyQuestions">
   <div className="whySectionHead">
    <span className="eyebrow">COMMON QUESTIONS</span>
    <div><h2 className="lead">Understand the team<br/>before you appoint the team.</h2></div>
   </div>
   <div className="whyFaq">{faqs.map(([question,answer])=><details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
  </section>

  <section className="section blue whyFinal">
   <div>
    <span className="eyebrow">START IN THE RIGHT ORDER</span>
    <h2 className="lead">Site. Brief. Architect.<br/>Then the build.</h2>
    <p>Tell us what you are planning. We will help you understand the appropriate next step before construction decisions become site decisions.</p>
    <div className="whyActions"><Link className="cta" href="/start-a-project">Plan my home ↗</Link><Link className="whyTextLink" href="/process">See our process →</Link></div>
   </div>
   <div className="whyFinalLinks"><Link href="/packages">Compare packages →</Link><Link href="/cost-calculator">Calculate construction cost →</Link><Link href="/project-evidence">Review project evidence →</Link><a href={site.portfolio} target="_blank" rel="noopener noreferrer">See Studio Bind Architects ↗</a></div>
  </section>
 </Page>;
}
