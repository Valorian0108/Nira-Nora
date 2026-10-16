import { Link } from 'wouter';
import { ArrowRight, Plus } from 'lucide-react';
import { Label } from '../components/store-ui';

const questions = [
  ['What does “Ready to order” mean?', 'It means the demonstration listing may be added to your demo bag. It does not confirm supplier stock or make a real purchase available.'],
  ['What happens when I enquire about a sourced-on-request piece?', 'You can complete a prefilled enquiry preview. In a live service, availability would need to be confirmed before any order. This prototype sends no message.'],
  ['Is a special request an order?', 'No. It is an enquiry-only path. Submitting the form in this prototype only displays a local preview.'],
  ['Are these products and prices real?', 'No. Every product and any listed price are explicitly demonstration content in this prototype.'],
  ['Do I need an account?', 'No account is required to browse or use the demo request flow.'],
  ['How much is delivery and how long does it take?', 'Delivery price, coverage, and timelines are not confirmed. We will show a placeholder rather than invent a policy.'],
  ['Can I pay here?', 'No. Checkout is a simulated preview for ready-to-order demonstration products. No payment was taken.'],
];

export function FAQPage() {
  return <div className="faq-page section-wrap">
    <div className="page-kicker"><span className="mono">THE SMALL PRINT / 04</span><Label>FREQUENT QUESTIONS</Label></div>
    <div className="faq-layout"><div className="faq-intro"><h1 className="serif">Clear answers.<br/><em>Clear next steps.</em></h1><p>We’d rather mark an unknown than make a promise we can’t keep.</p><Link href="/request" className="text-link">Still have a question? <ArrowRight size={14}/></Link></div>
      <div className="faq-list">{questions.map(([question, answer], index) => <details className="faq-item" key={question}><summary><span className="mono">0{index + 1}</span><strong>{question}</strong><Plus size={16}/></summary><p>{answer}</p></details>)}</div>
    </div>
  </div>;
}
