import { useState, type FormEvent } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { formatNgn } from '../data/products';
import { Field } from '../components/store-ui';
import { getCartTotal, getProduct, getReadyCartLines, type CartLine } from '../lib/store';

type ContactFields = { name: string; email: string; phone: string; address: string };
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CheckoutPage({ lines, onClear, onComplete }: {
  lines: CartLine[];
  onClear: () => void;
  onComplete: (lines: CartLine[], amount: number) => void;
}) {
  const [, setLocation] = useLocation();
  const readyLines = getReadyCartLines(lines);
  const [form, setForm] = useState<ContactFields>({ name: '', email: '', phone: '', address: '' });
  const [error, setError] = useState('');

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!readyLines.length) { setError('There are no ready-to-order demo pieces in your bag.'); return; }
    if (!form.name.trim() || (!form.email.trim() && !form.phone.trim()) || !form.address.trim()) {
      setError('Add your name, an email or phone number, and an address to continue.');
      return;
    }
    if (form.email && !validEmail.test(form.email)) { setError('Enter a valid email address.'); return; }
    onComplete(readyLines, getCartTotal(readyLines));
    onClear();
    setLocation('/confirmation');
  };

  return <div className="checkout-page section-wrap">
    <Link href="/cart" className="back-link"><ArrowLeft size={15}/> Return to bag</Link>
    <div className="checkout-head"><div><span className="mono">DEMO PREVIEW / NO PAYMENT</span><h1 className="serif">A checkout<br/><em>that stops here.</em></h1><p>This is a simulated checkout for ready-to-order demo items only. No payment provider is connected.</p></div><div className="checkout-total"><span>DEMO TOTAL</span><strong>{formatNgn(getCartTotal(readyLines))}</strong><small>NGN · demonstration price</small></div></div>
    {error && <div className="form-error" role="alert">{error}</div>}
    <form className="checkout-form" onSubmit={submit}>
      <div className="checkout-fields"><h2>Contact & delivery details</h2><p>Details are used only to show the preview confirmation; they are not sent or saved to a service.</p>
        <Field label="Name *"><input value={form.name} onChange={event => setForm({ ...form, name: event.target.value })}/></Field>
        <div className="form-two"><Field label="Email"><input type="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })}/></Field><Field label="Phone"><input type="tel" value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })}/></Field></div>
        <Field label="Delivery address *"><textarea rows={3} value={form.address} onChange={event => setForm({ ...form, address: event.target.value })} placeholder="Address for this demo preview"/></Field>
        <div className="form-error subtle"><strong>Important:</strong> Delivery cost, delivery timing, and payment details are not available. This preview does not place an order.</div>
        <button className="button button-dark full-button" type="submit" disabled={!readyLines.length} data-testid="button-simulate-checkout">Continue to preview confirmation <ArrowRight size={15}/></button>
      </div>
      <aside className="checkout-items"><span className="mono">YOUR DEMO ITEMS</span>{readyLines.map(line => {
        const product = getProduct(line.productId);
        return product ? <div className="checkout-item" key={`${line.productId}-${line.size}`}><span>{product.name} × {line.quantity}<small>Size {line.size} · Demo price</small></span><strong>{formatNgn((product.price || 0) * line.quantity)}</strong></div> : null;
      })}
        {!readyLines.length && <p>Your bag has no ready-to-order items.</p>}
        <div className="checkout-item checkout-subtotal"><span>Subtotal / demonstration</span><strong>{formatNgn(getCartTotal(readyLines))}</strong></div>
        <button className="remove-link" type="button" onClick={() => { onClear(); setError('Your demo bag was cleared.'); }}>Clear demo bag</button>
      </aside>
    </form>
  </div>;
}
