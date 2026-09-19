import Link from 'next/link';
import { approvalSlabs } from '@/lib/approval-fees';

export default function ApprovalFeeGuide() {
  return <div className="approvalFeeGuide" id="fee-slabs">
    <span className="productEyebrow">Approval fee / Planning reference</span>
    <h3>Your location.<br/>Your fee category.</h3>
    <p>For a first budget, multiply the chargeable built-up area by the applicable local-body rate. Confirm the category, self-certification eligibility and current demand with your registered professional before payment.</p>
    <div className="approvalFeeExample"><span>Illustration · Grade I / II Municipality</span><strong>1,000 sq.ft × ₹70 = ₹70,000</strong><p>Slab amount only. Separately payable authority charges and professional fees are not included.</p></div>
    <details className="guideDisclosure"><summary>View local-body fee slabs · ₹ per sq.ft</summary><p className="guideSmall">Transcribed from the supplied Archipedia approval guide, page 6. These reference rates have not been independently verified against a current government fee notification.</p><div className="approvalSlabTable"><table><caption>Self-certification planning rates — subject to verification</caption><thead><tr><th scope="col">Local-body category</th><th scope="col">₹ / sq.ft</th></tr></thead><tbody>{approvalSlabs.map(item => <tr key={item.id}><th scope="row">{item.label}</th><td>₹{item.rate}</td></tr>)}</tbody></table></div><p className="guideSmall">Village A–D are local-body categories, not Chennai zones. The earlier flat ₹37 village figure shown in one reference image is not used here. Confirm your village’s classification.</p></details>
    <p><strong>Chennai zones:</strong> the reference gives one Greater Chennai Corporation rate of ₹100/sq.ft, with no zone-specific fee differences. The calculator records the zone without applying a surcharge. Other corporations and municipalities need their own confirmed category.</p>
    <p><strong>Keep charges separate:</strong> check whether scrutiny, development, welfare-fund, processing and other charges are included in the authority’s demand. Add only separately payable amounts. Architect, drawing and submission services need an agreed professional fee.</p>
    <div className="guideActions"><Link className="cta primary" href="/cost-calculator">Plan construction + approval costs →</Link><Link className="productTextLink" href="/start-a-project">Discuss my approval route →</Link></div>
  </div>;
}
