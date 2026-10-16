import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Check } from 'lucide-react';
import { Label, Field } from '../components/store-ui';

type RequestValues = {
  item: string; size: string; colour: string; quantity: string; budget: string;
  url: string; name: string; email: string; phone: string; notes: string;
};

const emptyRequest: RequestValues = {
  item: '', size: '', colour: '', quantity: '', budget: '', url: '',
  name: '', email: '', phone: '', notes: '',
};

function validateRequest(form: RequestValues): string[] {
  const errors: string[] = [];
  if (!form.item.trim()) errors.push('Tell us what item or style you are looking for.');
  if (!form.name.trim()) errors.push('Add your name.');
  if (!form.email.trim() && !form.phone.trim()) errors.push('Add an email address or phone number so we know how you prefer to be contacted.');
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.push('Enter a valid email address.');
  if (form.quantity && (!Number.isInteger(Number(form.quantity)) || Number(form.quantity) < 1)) errors.push('Quantity must be a whole number of at least 1.');
  if (form.budget && (!Number.isFinite(Number(form.budget)) || Number(form.budget) < 0)) errors.push('Budget must be a non-negative amount in NGN.');
  if (form.url) {
    try { new URL(form.url); } catch { errors.push('Enter a valid reference URL, including https://.'); }
  }
  return errors;
}

export function RequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<RequestValues>(emptyRequest);
  const [errors, setErrors] = useState<string[]>([]);
  useEffect(() => {
    const item = new URLSearchParams(window.location.search).get('item');
    if (item) setForm(current => ({ ...current, item }));
  }, []);

  const change = (key: keyof RequestValues, value: string) => setForm(current => ({ ...current, [key]: value }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validateRequest(form);
    setErrors(nextErrors);
    if (!nextErrors.length) setSubmitted(true);
  };

  if (submitted) return <div className="request-success section-wrap">
    <div className="success-mark"><Check size={25}/></div><Label tone="accent">DEMO PREVIEW / NOT SENT</Label><h1 className="serif">Your note is<br/><em>ready for review.</em></h1>
    <p>This is a prototype preview. No message was sent, no supplier was contacted, and no order was placed.</p>
    <div className="success-summary"><span className="mono">REQUEST PREVIEW</span><strong>{form.item}</strong>{form.size && <span>Size preference: {form.size}</span>}{form.name && <span>Contact name: {form.name}</span>}</div>
    <div className="success-actions"><button className="button button-dark" onClick={() => { setSubmitted(false); setErrors([]); }}>Edit request</button><Link href="/shop" className="text-link">Back to the edit <ArrowRight size={14}/></Link></div>
  </div>;

  return <div className="request-page section-wrap">
    <div className="request-intro"><span className="mono">N&N / YOUR BRIEF</span><Label tone="accent">SPECIAL REQUESTS</Label><h1 className="serif">Tell us what<br/><em>you’re after.</em></h1><p>One piece, a reference, a feeling. Share whatever helps describe it. This form is a local demo only; it won’t send your details anywhere.</p><div className="request-aside"><span className="mono">A NOTE BEFORE YOU BEGIN</span><p>An enquiry is not an order. We don’t yet have confirmed sourcing, delivery, or response details to promise.</p></div></div>
    <form className="request-form" onSubmit={submit} noValidate>
      <div className="form-heading"><span className="mono">A FEW USEFUL DETAILS</span><span>Fields marked * are required</span></div>
      {errors.length > 0 && <div className="form-error" role="alert"><strong>Please check your request.</strong><ul>{errors.map(error => <li key={error}>{error}</li>)}</ul></div>}
      <Field label="Item or style *"><input value={form.item} onChange={event => change('item', event.target.value)} placeholder="A linen shirt, a particular silhouette…" data-testid="input-request-item"/></Field>
      <div className="form-two"><Field label="Size preference"><input value={form.size} onChange={event => change('size', event.target.value)} placeholder="e.g. M, UK 12"/></Field><Field label="Colour"><input value={form.colour} onChange={event => change('colour', event.target.value)} placeholder="Any colour notes"/></Field></div>
      <div className="form-two"><Field label="Quantity"><input type="number" min="1" value={form.quantity} onChange={event => change('quantity', event.target.value)} placeholder="Optional"/></Field><Field label="Budget in NGN"><input inputMode="numeric" value={form.budget} onChange={event => change('budget', event.target.value)} placeholder="Optional / NGN"/></Field></div>
      <Field label="Reference URL"><input type="url" value={form.url} onChange={event => change('url', event.target.value)} placeholder="https://… (optional)"/></Field>
      <div className="form-rule"/><p className="contact-label">HOW SHOULD WE REACH YOU? <span>Provide at least one *</span></p>
      <Field label="Your name *"><input value={form.name} onChange={event => change('name', event.target.value)} placeholder="Name" data-testid="input-request-name"/></Field>
      <div className="form-two"><Field label="Email address"><input type="email" value={form.email} onChange={event => change('email', event.target.value)} placeholder="you@example.com"/></Field><Field label="Phone"><input type="tel" value={form.phone} onChange={event => change('phone', event.target.value)} placeholder="Phone number"/></Field></div>
      <Field label="Anything else?"><textarea rows={4} value={form.notes} onChange={event => change('notes', event.target.value)} placeholder="Helpful context, timing preferences, or details…"/></Field>
      <button className="button button-dark full-button" type="submit" data-testid="button-submit-request">Review request preview <ArrowRight size={16}/></button><p className="form-fineprint">Submitting only displays a local preview. Your information is not transmitted or stored outside this browser.</p>
    </form>
  </div>;
}
