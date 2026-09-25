import { approvalSources } from '@/lib/approval-guide';

const localBody = 'https://onlineppa.tn.gov.in/index.php/know-your-local-body';
const landUse = 'https://www.cmdachennai.gov.in/LUMaps/Index';
const landRecords = 'https://eservices.tn.gov.in/eservicesnew/index.html';
const approvalRecords = 'https://cmdachennai.gov.in/ppapprovaldetails.html';

export default function KnowYourSite() {
  return <section className="knowSite guideSection" id="know-your-site" aria-labelledby="know-site-title">
    <header className="knowSiteIntro">
      <span className="productEyebrow">Know your site / Official starting points</span>
      <h2 id="know-site-title">Your plot.<br/><span>Your possibilities.</span></h2>
      <p>Find the right office, understand the building rules and prepare for a site-specific review.</p>
    </header>
    <div className="knowSiteRows">
      <article className="knowSiteRow">
        <span className="knowSiteNumber">01</span>
        <div><h3>Find your authority.</h3><p>Select your district, taluk and revenue village in the official lookup to find the local-body name, type and address. Keep those details for your review.</p>
          <div className="knowSiteLinks"><a href={localBody} target="_blank" rel="noopener noreferrer">Find my local body ↗</a><a href={landUse} target="_blank" rel="noopener noreferrer">View CMDA land-use maps ↗</a></div>
          <details className="guideDisclosure"><summary>Planning authority or local body?</summary><p>The planning authority checks development and land use. The local body handles the building-permit route applicable to your proposal. Within the Chennai Metropolitan Area, some planning powers are delegated to local bodies. The local-body lookup alone does not confirm your planning jurisdiction or permission.</p><p>A postal address or map pin is a starting point. Confirm the revenue village, survey/subdivision and current jurisdiction against the site records.</p><a href={approvalSources.cmda} target="_blank" rel="noopener noreferrer">Read CMDA planning guidance ↗</a></details>
        </div>
      </article>
      <article className="knowSiteRow">
        <span className="knowSiteNumber">02</span>
        <div><h3>Understand your building limits.</h3><p>FSI describes floor area relative to plot area. Setbacks are the spaces between the building and plot boundaries. Your road width, plot dimensions, proposed use and height help determine the applicable requirements.</p>
          <div className="knowSiteDiagram">
            <figure>
              <svg viewBox="0 0 360 300" role="img" aria-labelledby="site-diagram-title site-diagram-description">
                <title id="site-diagram-title">Illustration of setbacks around a building</title>
                <desc id="site-diagram-description">A building sits inside the plot boundary with front, rear and side spaces. A road runs along the front. This is a conceptual diagram with no prescribed dimensions.</desc>
                <rect x="26" y="18" width="308" height="218" rx="8" fill="#f3f7fc" stroke="#8497ac" strokeDasharray="5 5"/>
                <rect x="100" y="76" width="160" height="106" rx="6" fill="#e0edfc" stroke="#0071e3"/>
                <g fill="#46586d" fontFamily="system-ui,sans-serif" fontSize="13" textAnchor="middle">
                  <text x="180" y="49">Rear setback</text>
                  <text x="62" y="126">Side</text><text x="62" y="144">setback</text>
                  <text x="296" y="126">Side</text><text x="296" y="144">setback</text>
                  <text x="180" y="133" fill="#0059b3" fontSize="16">Building</text>
                  <text x="180" y="214">Front setback</text>
                </g>
                <rect x="26" y="252" width="308" height="36" rx="6" fill="#e9ecef"/>
                <text x="180" y="275" fill="#46586d" fontFamily="system-ui,sans-serif" fontSize="14" textAnchor="middle">Adjoining road</text>
              </svg>
              <figcaption>Concept only · Not to scale · No setback dimensions prescribed.</figcaption>
            </figure>
            <div className="knowSiteRule"><span className="productEyebrow">Understanding FSI</span><p className="knowSiteFormula">FSI = counted floor area ÷ plot area</p><p>“Counted floor area” means the area included under the applicable rules, across all floors. It can differ from the area used for a construction estimate.</p><p><strong>Exact limits: needs site review.</strong><br/>Permitted FSI, front/side/rear setbacks, height and any special restrictions are confirmed against current rules and amendments.</p><a href="https://onlineppa.tn.gov.in/sites/default/files/2023-12/TNCDBR-2019.pdf" target="_blank" rel="noopener noreferrer">Building rules (2019 base text) ↗</a><small>Read with subsequent amendments; the base text alone is not the complete current rule set.</small></div>
          </div>
        </div>
      </article>
      <article className="knowSiteRow">
        <span className="knowSiteNumber">03</span>
        <div><h3>Keep approval costs visible.</h3><p>Start with the confirmed local-body category and chargeable area. Our existing slab guide is an indicative budgeting reference; it does not determine your category or final demand.</p>
          <ul className="knowSiteCosts"><li><strong>Government charges</strong><span>Applicable slab and any separately payable authority charges.</span></li><li><strong>Professional fees</strong><span>Drawing preparation, submission and coordination as agreed.</span></li><li><strong>Other applicable costs</strong><span>Survey, investigations or specialist inputs required for your site.</span></li></ul>
          <div className="knowSiteLinks"><a href="#fee-slabs">Explore indicative fee slabs ↓</a><a href={approvalSources.portal} target="_blank" rel="noopener noreferrer">Open the official planning portal ↗</a></div>
          <p className="guideSmall">Use the authority’s current demand for payment. Do not add a charge twice if it is already included.</p>
        </div>
      </article>
      <article className="knowSiteRow">
        <span className="knowSiteNumber">04</span>
        <div><h3>Find your site records.</h3><p>Open the official service and enter your details there. Save available records for review; this website does not retrieve or certify government documents.</p>
          <div className="knowSiteRecords">
            <details className="guideDisclosure"><summary>Patta / Chitta, FMB and TSLR</summary><p>Use Tamil Nadu Land Records e-Services. Choose the relevant rural or urban service. Keep the district, taluk/village or town/ward/block and survey/subdivision details ready. Follow the portal’s verification steps and save the available extract or sketch.</p><a href={landRecords} target="_blank" rel="noopener noreferrer">Open official land records ↗</a></details>
            <details className="guideDisclosure"><summary>CMDA land-use maps</summary><p>Select local-body type, local-body name and village to view or download an available masterplan map. Match the site records to the map with your professional; a village map alone does not establish a plot-specific development entitlement.</p><a href={landUse} target="_blank" rel="noopener noreferrer">Open official land-use maps ↗</a></details>
            <details className="guideDisclosure"><summary>Layout, building approval and permit records</summary><p>Keep the approval or application reference and year ready. Check available public approval lists, or sign in to your own planning-portal account to access documents available for your application. Older records may require a request to the issuing office.</p><div className="knowSiteLinks"><a href={approvalRecords} target="_blank" rel="noopener noreferrer">CMDA approval records ↗</a><a href="https://tcp.tn.gov.in/layout" target="_blank" rel="noopener noreferrer">DTCP layout links ↗</a><a href={approvalSources.portal} target="_blank" rel="noopener noreferrer">Planning portal ↗</a></div></details>
          </div>
          <p className="guideSmall">Complete any login or CAPTCHA on the official portal. Keep passwords, identity documents and deeds out of the public enquiry form.</p>
        </div>
      </article>
    </div>
    <div className="knowSiteCta"><div><h3>Bring the site. We’ll clarify the next step.</h3><p>Share what you know. We’ll discuss the information needed and agree the scope and fee for a site-specific review.</p></div><a className="cta primary" href="#prepare">Check my site’s building potential ↓</a></div>
    <p className="guideSmall">Official service references checked 25 September 2026. Guided lookups only; no automated jurisdiction, eligibility or fee determination.</p>
  </section>;
}
