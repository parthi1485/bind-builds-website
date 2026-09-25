import './process.css';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { Page } from '@/components/Site';
import QualityStageTabs, { type QualityStage } from '@/components/QualityStageTabs';

export const metadata=pageMetadata(
  'Home Construction Process in Chennai',
  'Understand the Bind Builds process from design and approvals through stage-wise quality checks, variation control, snag closure and handover in Chennai.',
  '/process'
);

const milestones=[
  {no:'01',title:'DISCOVERY MEETING + REQUIREMENT FREEZE',body:'We begin with a discovery meeting with the users to understand the family, lifestyle, priorities, site context, expectations and project needs.',output:'Understanding the users + finalized project requirements / design brief.'},
  {no:'02',title:'SCHEMATIC FLOOR PLANNING',body:'Initial floor plan concepts are prepared from the finalized requirements, site conditions and lifestyle needs.',output:'Shortlisted 1–2 schematic floor plan options for discussion.'},
  {no:'03',title:'DESIGN DEVELOPMENT',body:'The shortlisted plan is refined through design discussion and feedback. The architectural character and facade are developed in parallel.',output:'Revised floor plan • Facade concept • Exterior 3D design presentation.'},
  {no:'04',title:'DESIGN FREEZE + CLIENT SIGN-OFF',body:'The floor plan, spatial planning and facade direction are finalized and formally frozen.',output:'Client-signed confirmation of the finalized floor plan + 3D facade elevation.'},
  {no:'05',title:'FINAL AREA + CONSTRUCTION AGREEMENT',body:'The finalized design establishes the confirmed construction area and agreed project scope.',output:'Construction Agreement based on built-up area, specifications, commercial terms and construction scope.'},
  {no:'06',title:'SOIL INVESTIGATION',body:'Soil testing establishes bearing capacity, soil strata, ground conditions and foundation recommendations.',output:'Soil investigation report as a key input for structural design.'},
  {no:'07',title:'PLANNING / BUILDING APPROVAL DRAWINGS',body:'The finalized architectural design is converted into the required approval drawing set for submission to the concerned authority / consultant.',output:'Approval drawing and documentation set prepared for submission.'},
  {no:'08',title:'STRUCTURAL DESIGN',body:'Once the soil report and finalized architectural drawings are available, the design package is issued to the Structural Consultant.',output:'Foundation • Columns • Beams • Slabs • Staircase • Structural details.'},
  {no:'09',title:'CONSTRUCTION GFC DRAWING SET',body:'Architecture, structure and building services are coordinated into Good For Construction drawings for execution.',output:'Architectural • Structural • MEP • Approved facade / 3D design references.'},
  {no:'10',title:'BHOOMI POOJA + CONSTRUCTION COMMENCEMENT',body:'With applicable approvals received, the site ready, and structural inputs and commencement drawings in place, the project formally transitions from pre-construction to site execution.',output:'Project ready for site mobilisation and construction commencement.'}
];

const qualityStages: QualityStage[]=[
  {no:'01',title:'Foundation — before pour',note:'Once the concrete is in, everything below is permanent. This is the most expensive checklist to skip on the whole job.',checks:[
    ['Excavation depth and width','As per foundation drawing',true],
    ['Soil at founding level','Matches the strata assumed in the soil report — call the structural engineer if it does not',true],
    ['PCC laid, level and set','75mm, M10, cured',false],
    ['Footing position and centre lines','Cross-check against the setting-out plan and the boundary',true],
    ['Reinforcement — bar diameter, spacing, numbers','Count and measure against the structural drawing, do not eyeball',true],
    ['Lap length and staggering','As per drawing; laps not all in one plane',true],
    ['Cover blocks — bottom and sides','50mm for footings, tied not loose',true],
    ['Column starter bars — position, plumb, projection','Measured from grid lines; projection as per drawing',true],
    ['Shuttering — line, plumb, joints tight','No gaps that will leak slurry',false],
    ['Anti-termite treatment at founding level','Applied and recorded',false],
    ['Concrete grade confirmed with supplier','Delivery challan matches the specified grade',true],
    ['Slump test taken and recorded','Within the specified range; reject the load if not',true]
  ]},
  {no:'02',title:'Plinth beam — before pour',note:'The last chance to get levels and service sleeves right before the superstructure locks them in.',checks:[
    ['Beam size and centre line','Per drawing',true],
    ['Reinforcement — main bars and stirrups','Diameter, spacing, numbers per drawing',true],
    ['Cover maintained all round','25mm, cover blocks tied',true],
    ['Shuttering level and line','String line and level checked end to end',false],
    ['Finished floor level marked and agreed','Against road level and neighbouring plots',true],
    ['Plumbing sleeves and conduits placed','All wall and floor crossings in position before pour',true],
    ['Anti-termite at plinth filling','Applied and recorded',false],
    ['Filling compacted in layers','Not dumped in one go; watered and rammed',false]
  ]},
  {no:'03',title:'Column & slab reinforcement — before pour',note:'A hold point in the truest sense. Nothing about this stage is correctable afterwards.',checks:[
    ['Column verticality','Plumb bob on all faces, every column',true],
    ['Column reinforcement — bars, ties, spacing','Per drawing; ties at reduced spacing near joints',true],
    ['Beam reinforcement — top, bottom, stirrups','Extra bars at supports as detailed',true],
    ['Slab mesh — bar spacing and chairs','Chairs at specified spacing so the top mesh stays up',true],
    ['Cover maintained — slab, beam, column','Blocks everywhere, none missing',true],
    ['Electrical conduits laid and secured','Before pour; junction boxes fixed',true],
    ['Plumbing sleeves and slab openings','Toilet, shaft, duct openings boxed out',true],
    ['Staircase and duct cutouts formed','Per drawing',false],
    ['Props, shuttering level and camber','Props on firm base, not on loose soil',true],
    ['Slab thickness gauge marked','Marked on props or bars so the pour depth is visible',false],
    ['Concrete grade and slump','Challan checked, slump within range',true],
    ['Curing arrangement ready','Water, ponding bunds or curing compound on site',false]
  ]},
  {no:'04',title:'Block work / brickwork',note:'Cheap to correct today, expensive once plastered.',checks:[
    ['Wall line, level and plumb','Every wall, every lift',false],
    ['Wall thickness as per drawing','9" and 4.5" walls where shown',false],
    ['Door and window openings — size and position','Measured against the drawing, not assumed',true],
    ['Lintel level, bearing and reinforcement','Minimum bearing each side as detailed',true],
    ['Joints staggered and fully filled','No continuous vertical joints; no hollow joints',false],
    ['Mortar mix as specified','CM 1:6 for 9", 1:5 for 4.5" unless stated otherwise',false],
    ['Height built per day within limit','Not more than about 1m for block work',false],
    ['Curing done','Minimum 7 days',false],
    ['Chases and cutouts not cut after','Provisions built in, not hacked later',false]
  ]},
  {no:'05',title:'Pre-plaster',note:'Plaster hides everything under it. Anything unfinished behind this line stays unfinished.',checks:[
    ['All electrical conduits complete and pulled','Wire pulled and continuity checked before plaster',true],
    ['All plumbing lines complete and pressure tested','Test held and recorded — no exceptions',true],
    ['Chases filled with mortar','Not left open or loosely packed',false],
    ['Chicken mesh at all junctions','Wall–column, wall–beam, and over every chase',true],
    ['Surface cleaned, raked and wetted','Loose mortar removed, wall thoroughly wetted',false],
    ['Level dots and screeds fixed','Both directions, so plaster runs true',false],
    ['Openings squared and plumb','Frames will not sit true otherwise',false],
    ['Grooves and bands marked','Where shown on the elevation',false]
  ]},
  {no:'06',title:'Waterproofing & pre-flooring',note:'The single most common source of a call two years after handover.',checks:[
    ['Sunk area cleaned of all debris','No mortar droppings, no cut-offs, no wrappers',true],
    ['Plumbing lines pressure tested and held','Before any covering — test recorded',true],
    ['Waterproofing coats as specified','Number of coats, direction crossed, corners coved',true],
    ['Ponding test held 48 hours','Water level marked; check ceiling below for damp',true],
    ['No seepage seen at the ceiling below','Inspected after the ponding period',true],
    ['Slope towards drain verified with water','Poured water runs to the trap, not away from it',true],
    ['Sunk filling material as specified','Not construction debris',false],
    ['Floor level marked all rooms','Single datum carried through the floor',false]
  ]},
  {no:'07',title:'Electrical concealing',note:'Heights and positions are agreed with the client here, not argued about at handover.',checks:[
    ['Conduit routing follows the drawing','No diagonal runs across walls',false],
    ['Switch and socket heights confirmed with client','In writing — record it in the site report',true],
    ['Points counted against the drawing room by room','Missing points are cheapest to add now',true],
    ['Junction boxes accessible, not buried','Behind furniture positions checked',false],
    ['Earthing provision and pit location','As per drawing',false],
    ['No conduit run through structural members','Without written approval from the structural engineer',true],
    ['Wire drawn and continuity tested','Before plaster or false ceiling closes it in',true],
    ['DB position and load schedule','Confirmed against the connected load',false]
  ]},
  {no:'08',title:'Plumbing',note:'Pressure tests are the whole checklist. Everything else is arrangement.',checks:[
    ['Line layout follows the drawing','Hot and cold routed as designed',false],
    ['Pressure test held one hour','At the specified pressure, no drop — recorded',true],
    ['Waste line slopes verified','Water runs, does not stand',true],
    ['Traps and vents provided','Every fixture',false],
    ['CP fitting points — height and spacing','Confirmed against the fitting being supplied',true],
    ['Concealed valves accessible','Access provision made where needed',false],
    ['Overhead tank and sump connections','Inlet, outlet, overflow, washout',false],
    ['Pipe supports and clamping','Not resting on reinforcement',false]
  ]},
  {no:'09',title:'Pre-painting',note:'Paint magnifies whatever is under it. Check the wall, not the paint.',checks:[
    ['Putty surface checked with a lamp','Held flat against the wall — undulations show as shadow',true],
    ['Surface sanded and dust free','Wiped down before primer',false],
    ['Corners and edges true','No rounded or wavy arrises',false],
    ['Primer coat uniform, no patches','Full coverage before the first finish coat',false],
    ['Shade approved by client in writing','Sample patch approved on site, recorded',true],
    ['Brand and product match the specification','Check the tins on site against the package spec',true],
    ['Frames, fittings and floor masked','Before any coat',false],
    ['Ceiling and wall junction line straight','Cut line checked',false]
  ]}
];

const variationSteps=[
  ['01','Identify the change','Record who requested it, when it was raised, the reason and the stage currently at site.'],
  ['02','Describe what changes','State the original scope, the revised requirement and any site work already affected.'],
  ['03','Price the impact','List extra and omitted work separately with quantity, unit, rate and amount.'],
  ['04','Update the contract value','Show the net variation and the revised contract value so future milestones refer to one number.'],
  ['05','Show the time impact','Record any extension of time, revised completion implication and when the changed work can start.'],
  ['06','Approve before execution','The variation is signed before the changed work begins; until then the original scope stands.']
];

const handoverDocuments=[
  'Completion / statutory close-out documents applicable to the project',
  'As-built architectural drawings — print / PDF as agreed',
  'Structural drawings and relevant design records',
  'Electrical layout / wiring information',
  'Plumbing layout / line information',
  'Waterproofing and treatment warranties where applicable',
  'Paint shade and product record',
  'Sanitary / CP fitting warranty cards where supplied',
  'Utility connection / meter information available for the project',
  'Final measurement / area statement',
  'Key sets and access items',
  'Vendor / contractor service contact list'
];

export default function Process(){
  return <Page kicker="OUR PROCESS / PLAN · BUILD · DELIVER" title="Clear steps. Confident decisions.">
    <div className="processRefined">
    <section className="section">
      <div className="sectionHeading">
        <span className="eyebrow">Before construction</span>
        <h2 className="lead">From your first idea.<br/><span className="muted">To a plan we can build.</span></h2>
        <p>We explain the next decision and what it produces. Project-specific design begins after the design scope, fee and advance are agreed.</p>
      </div>
      <div className="milestones">{milestones.map((m,i)=><details className="milestone" key={m.no} open={i===0}>
        <summary><small>{m.no}</small><strong>{m.title}</strong><span aria-hidden="true">+</span></summary>
        <div className="milestoneContent"><p>{m.body}</p><div className="milestoneOutput"><span className="eyebrow">What you receive</span><strong>{m.output}</strong></div></div>
      </details>)}</div>
      <p className="processNote">The sequence is coordinated for your site. Feasibility and approval requirements are reviewed early; work starts only after applicable approvals and the drawings needed for that stage are in place. Existing-building demolition, if needed, is separately scoped and scheduled.</p>
    </section>

    <section className="section dark">
      <div className="grid"><span className="eyebrow">During construction</span><div>
        <h2 className="lead">One coordinated team.<br/><span className="muted">Stage by stage.</span></h2>
        <div className="flow">{['Site mobilisation & setting out','Foundation & structure','Services & finishes','Quality gates & documentation','Snag closure & handover'].map((text,i)=><div key={text}><small>0{i+1}</small><span>{text}</span><span aria-hidden="true">↓</span></div>)}</div>
        <p className="bigCopy">The project agreement defines the scope, payment milestones, supervision and reporting arrangements. Quality checks happen before work is covered up. Design changes are reviewed for cost and time impact before execution. Handover follows joint snag review and close-out.</p>
      </div></div>
    </section>

    <section className="section processControlSection" id="quality-control">
      <div className="processControlIntro">
        <div><span className="eyebrow">01 / Stage quality control</span><h2 className="lead">Check it before<br/><span className="muted">it disappears.</span></h2></div>
        <div><p>Quality control is most useful before concrete is poured, services are concealed or finishes cover the work. Each stage below has normal checks and <strong>HOLD</strong> points.</p><p className="processControlRule"><strong>HOLD means stop.</strong> The next activity is not released until that check is passed and recorded.</p></div>
      </div>
      <QualityStageTabs stages={qualityStages} />
      <p className="processSourceNote">The exact checklist is adjusted to the project drawings, structural design, specification, site conditions and agreed scope. The stage gate is a control process—not a substitute for project-specific consultant instructions.</p>
    </section>

    <section className="section processVariationSection" id="change-order">
      <div className="processControlIntro">
        <div><span className="eyebrow">02 / Change order + variation control</span><h2 className="lead">A change should never<br/><span className="muted">become a surprise bill.</span></h2></div>
        <div><p>Extra work, omitted work and client-requested revisions are recorded as a variation before execution. The note connects the change back to the agreement, shows cost and time impact, and records approval.</p></div>
      </div>
      <div className="variationFlow">{variationSteps.map(([n,h,p])=><article key={n}><span>{n}</span><h3>{h}</h3><p>{p}</p></article>)}</div>
      <div className="variationLedger">
        <div><span className="eyebrow">Cost impact</span><strong>EXTRA + OMIT</strong><p>Added and omitted work are shown separately. Quantities may be measured or estimated at the time of the note, with final billing based on actual measurement where the agreement provides for it.</p></div>
        <div><span className="eyebrow">Time impact</span><strong>PROGRAMME</strong><p>The note records any extension of time, revised completion implication and the earliest point the changed work can proceed.</p></div>
        <div className="variationApproval"><span className="eyebrow">Approval gate</span><strong>SIGN BEFORE START</strong><p>Changed work begins after the variation is approved. All unaffected terms continue under the referenced agreement.</p></div>
      </div>
    </section>

    <section className="section processSnagSection" id="snag-handover">
      <div className="processControlIntro">
        <div><span className="eyebrow">03 / Snag review + handover</span><h2 className="lead">Inspect. Rectify.<br/><span className="muted">Verify. Hand over.</span></h2></div>
        <div><p>A joint inspection turns the final walk-through into an accountable list. Each observation is tied to an area, trade, responsibility, target date and status.</p></div>
      </div>

      <div className="snagStatusFlow" aria-label="Snag status flow">
        {['Open','In progress','Rectified','Closed'].map((status,i)=><div key={status}><span>0{i+1}</span><strong>{status}</strong>{i<3&&<b aria-hidden="true">→</b>}</div>)}
      </div>

      <div className="snagGrid">
        <article>
          <span className="eyebrow">Joint inspection register</span>
          <h3>Every snag has an owner.</h3>
          <div className="snagFields">{['Area / room','Observation','Trade','Responsibility','Target date','Status'].map(x=><span key={x}>{x}</span>)}</div>
          <p>A snag is treated as closed only after rectification is jointly verified. The status sequence keeps open work visible instead of burying it in messages.</p>
        </article>
        <article>
          <span className="eyebrow">Handover pack</span>
          <h3>Close the work. Close the information.</h3>
          <ul className="handoverDocumentList">{handoverDocuments.map(item=><li key={item}>{item}</li>)}</ul>
        </article>
      </div>

      <div className="handoverGate">
        <span className="handoverGateMark">✓</span>
        <div><span className="eyebrow">Handover gate</span><h3>Handover follows snag closure.</h3><p>The working snag template keeps the handover certificate blocked while snags remain open. Defects-liability and warranty periods, where applicable, are recorded against the signed project agreement and handover documents.</p></div>
      </div>

      <div className="processEndCta">
        <div><span className="eyebrow">Plan • Build • Deliver</span><h2>More control before<br/><span className="muted">more construction.</span></h2></div>
        <div><p>For your project, the detailed checklist, variation format, reporting cadence and handover requirements are aligned to the drawings, specification and agreement.</p><Link className="cta primary" href="/start-a-project">Discuss your project ↗</Link></div>
      </div>
    </section>
    </div>
  </Page>;
}
