import { Link } from 'wouter';
import { ArrowRight, Check } from 'lucide-react';
import { formatNgn } from '../data/products';
import type { CheckoutPreview } from '../lib/store';

export function ConfirmationPage({ data }: { data: CheckoutPreview }) {
  return <div className="confirmation-page section-wrap"><div className="success-mark"><Check size={24}/></div><span className="mono">DEMO PREVIEW / NO ORDER PLACED</span><h1 className="serif">This is where<br/><em>the preview ends.</em></h1><p>Your simulated checkout appears only in this browser preview. No personal details were stored, no payment was taken, no message was sent, and no order was placed.</p>
    {data && <div className="success-summary"><span className="mono">PREVIEW SUMMARY</span><strong>{data.lines.length} demo line item{data.lines.length === 1 ? '' : 's'}</strong><span>Preview total: {formatNgn(data.total)} (demonstration price)</span></div>}
    <div className="confirmation-actions"><Link href="/shop" className="button button-dark">Back to the edit <ArrowRight size={15}/></Link><Link href="/faq" className="text-link">Understand the paths <ArrowRight size={14}/></Link></div>
  </div>;
}
