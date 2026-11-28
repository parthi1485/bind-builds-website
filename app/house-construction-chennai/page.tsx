import Link from 'next/link';
import { Page } from '@/components/Site';
import PriorityAreaLinks from '@/components/PriorityAreaLinks';
import StructuredData from '@/components/StructuredData';
import { money } from '@/lib/calculator';
import { packageMetrics } from '@/lib/calculator-options';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { packages, site, whatsappUrl } from '@/lib/site';

const path = '/house-construction-chennai';
const title = 'House Construction in Chennai';
const description = `Architect-led house construction in Chennai from ${money(packages[0].rate)}/sq.ft. Compare specifications, see residential project work and discuss your plot with Bind Builds.`;
export const metadata = pageMetadata(title, description, path);

const exampleArea = 2000;
const exampleCalculatorUrl = '/cost-calculator?' + new URLSearchParams({
  package: packages[0].name,
  area: String(exampleArea),
});

const siteChecks = [
  ['Rain and drainage', 'Where does rainwater go today? Look at the road level, neighbouring plots and available drainage before setting the ground-floor level.'],
  ['Daylight and privacy', 'Check which windows face a neighbour’s wall. Use the open sides of the plot to bring light and air into the rooms you use most.'],
  ['Access and ground conditions', 'Can material deliveries reach the plot? Record the approach road and agree what soil information the structural engineer needs before pricing foundations.'],
  ['Parking and future floors', 'Mark the route from the gate to the stairs. If you want to add a floor later, discuss that with the architect and structural engineer during the first design review.'],
];

const questions = [
  ['What should I bring to the first meeting?', 'A plot sketch with dimensions, the road width if known, your budget and a short list of who will live in the house. Existing drawings or approvals help us identify what is already settled. You can start with the details you have.'],
  ['How do I compare two construction quotes?', 'Give both teams the same drawings and floor-area schedule. Compare the tile and fittings allowances, supervision, payment stages and separately priced items. Ask each team to identify its role in a similar project.'],
  ['Can you work with my existing drawings?', 'We can review your architectural, structural and services drawings with you and check their approval status. We agree the scope of any additional design or coordination before preparing a construction proposal.'],
  ['Does the square-foot rate cover building approvals?', 'Building-plan approval is priced separately. Ask which drawings your package includes and request a separate breakdown of application work, authority charges and any investigations.'],
  ['When will I receive a floor plan and construction schedule?', 'We prepare project-specific floor plans as part of the agreed design engagement. Once the drawings, approvals, site access and scope are clear, we can set out the construction sequence and payment milestones for your home.'],
];

export default function ChennaiConstruction() {
  return (
    <Page kicker="BIND BUILDS / RESIDENTIAL CONSTRUCTION" title="House construction in Chennai">
      <article className="guidePage">
        <nav className="guideBreadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span><span>House construction in Chennai</span>
        </nav>
        <header className="guideIntro">
          <h2>Build your home with an architect from the first sketch.</h2>
          <p>Bind Builds is an architect-led construction studio in Ramapuram, Chennai. We design and build independent houses, from the first floor plan to work on site. Packages start at {money(packages[0].rate)}/sq.ft of agreed construction area. Your written proposal sets out materials, allowances, exclusions and payment stages.</p>
          <div className="guideActions">
            <Link className="cta primary" href="/start-a-project">Discuss my home ↗</Link>
            <a className="productTextLink" href="#construction-packages">Compare construction packages ↓</a>
          </div>
        </header>

        <section className="guideSection" id="residential-projects">
          <h2>Two family homes in the Chennai region.</h2>
          <div className="guideCards">
            <article>
              <span className="productEyebrow">Bind Builds · Pre-construction</span>
              <h3>A 17-foot frontage in Pallikaranai</h3>
              <p>The brief calls for a ground-floor home and parking for the parents, with an independent home for each son upstairs. On a 17 × 44 ft east-facing plot, the first design question is how each household reaches its front door while the parents keep their privacy.</p>
              <Link href="/projects/pallikaranai-family-home">Explore the Pallikaranai planning brief →</Link>
            </article>
            <article>
              <span className="productEyebrow">Studio Bind Architects · Under construction</span>
              <h3>A 6,519 sq.ft home in Sunguvarchathiram</h3>
              <p>The project’s 52-page drawing set includes dimensioned floor plans, stairs and building sections. On site, the team checked masonry openings against those drawings before roof work. The project record traces the sequence from footings to the roof slab.</p>
              <Link href="/projects/sunguvarchathiram-multigenerational-home">See the drawings summary and site milestones →</Link>
            </article>
          </div>
          <p>Ar. Parthiban Moorthy founded Studio Bind Architects in 2019 and launched Bind Builds in 2026.</p>
          <div className="guideActions">
            <Link className="productTextLink" href="/about">Meet the practice →</Link>
            <Link className="productTextLink" href="/project-evidence">Browse the project records →</Link>
          </div>
        </section>

        <section className="guideSection" id="construction-packages">
          <h2>What does it cost to build a house in Chennai?</h2>
          <p>Start with the area you plan to build on each floor. Then compare what the same area buys in each package. Flooring and bathroom fittings are two allowances you can check side by side.</p>
          <div className="serviceRates">
            {packages.map((item, index) => (
              <article key={item.key}>
                <h3>{item.name}</h3>
                <strong>{money(item.rate)}<small> / sq.ft, starting rate</small></strong>
                <p>Main flooring up to {money(packageMetrics[index].flooring)}/sq.ft. Fittings up to {money(packageMetrics[index].bathroom)} per bathroom.</p>
                <Link href={'/packages#' + item.key}>View the {item.name} specification →</Link>
              </article>
            ))}
          </div>
          <div className="constructionExample">
            <div>
              <span className="productEyebrow">Worked example</span>
              <h3>One plot. Two floors.</h3>
              <p>Suppose the agreed drawings show 1,000 sq.ft on the ground floor and 1,000 sq.ft upstairs. The base price uses all {exampleArea.toLocaleString('en-IN')} sq.ft. Multiply that area by each package rate to compare the three estimates.</p>
            </div>
            <dl>
              {packages.map(item => (
                <div key={item.key}><dt>{item.name}</dt><dd>{money(exampleArea * item.rate)}</dd></div>
              ))}
            </dl>
          </div>
          <p className="guideSmall">These base estimates exclude land, taxes, approvals, site-specific work, external works and fit-out outside the agreed specification. Before comparing quotes, check how each team measures parking, stairs and terrace headroom.</p>
          <div className="guideActions">
            <Link href={exampleCalculatorUrl} className="productTextLink">Open the 2,000 sq.ft example in the calculator →</Link>
            <Link href="/construction-cost-chennai" className="productTextLink">Read the Chennai construction cost guide →</Link>
          </div>
        </section>

        <section className="guideSection" id="plot-planning">
          <h2>What to check on your Chennai plot.</h2>
          <div className="documentGrid">
            {siteChecks.map(([heading, detail]) => (
              <article key={heading}><div><h3>{heading}</h3><p>{detail}</p></div></article>
            ))}
          </div>
          <div className="guideActions">
            <Link className="productTextLink" href="/building-plan-approval-chennai">Check the Chennai approval documents →</Link>
            <Link className="productTextLink" href="/individual-house-construction-chennai">Plan an independent house →</Link>
          </div>
        </section>

        <section className="guideSection" id="service-areas">
          <h2>Find your Chennai neighbourhood.</h2>
          <p>Choose the area nearest your plot for local guidance on road access, parking and site planning.</p>
          <PriorityAreaLinks city="Chennai" />
          <div className="guideActions">
            <Link className="productTextLink" href="/house-construction-west-chennai">Explore the West Chennai corridor →</Link>
          </div>
        </section>

        <section className="guideSection guideFaq">
          <h2>Before you choose a construction team.</h2>
          {questions.map(([question, answer]) => (
            <details key={question}><summary>{question}</summary><p>{answer}</p></details>
          ))}
        </section>

        <section className="guideClosing">
          <h2>Talk to an architect about your plot.</h2>
          <p>Share your location, the space your family needs and the budget you have in mind.</p>
          <div className="guideActions">
            <Link className="cta primary" href="/start-a-project">Plan my home ↗</Link>
            <a className="productTextLink" href={whatsappUrl('Hello Bind Builds, I would like to discuss architect-led house construction in Chennai.')} target="_blank" rel="noopener noreferrer">Talk on WhatsApp ↗</a>
          </div>
          <p className="guideSmall">Ramapuram, Chennai · English and Tamil · Studio discussions and site visits by appointment</p>
        </section>
      </article>
      <StructuredData data={[breadcrumbSchema('House construction in Chennai', path), {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: title,
        description,
        serviceType: 'Architect-led house construction',
        url: site.url + path,
        provider: { '@type': 'Organization', '@id': site.url + '/#organization', name: site.name, url: site.url },
        areaServed: { '@type': 'City', name: 'Chennai' },
      }]} />
    </Page>
  );
}
