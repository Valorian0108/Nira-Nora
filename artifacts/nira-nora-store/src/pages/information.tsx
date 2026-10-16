import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Label } from '../components/store-ui';

type InfoKind = 'about' | 'delivery' | 'contact';

const infoContent = {
  about: {
    kicker: 'THE STUDIO / 01',
    label: 'OUR APPROACH',
    title: <>A good find<br/><em>is a practice.</em></>,
    intro: 'Nira & Nora is a clothing-sourcing studio concept for people who want well-chosen clothes without the guesswork.',
    sections: [
      ['A considered edit', 'We bring forward a small, evolving set of clothing references. Every product shown here is demonstration content, not a promise of stock.'],
      ['Clear paths, by design', 'Ready to order means a product may be added to a demo bag. Sourced on request starts an enquiry. Special request is enquiry-only. None of these preview actions places an order.'],
      ['A few details remain open', 'Business address, operating hours, sourcing regions, supplier relationships, and the people behind the studio are not confirmed. We’ll keep those details visibly marked until they are.'],
    ],
  },
  delivery: {
    kicker: 'THE PRACTICALS / 02',
    label: 'DELIVERY',
    title: <>The details<br/><em>we don’t know yet.</em></>,
    intro: 'We have not confirmed delivery coverage, charges, timing, or delivery partners. We won’t fill those gaps with a guess.',
    sections: [
      ['Delivery area', 'Not yet confirmed. Placeholder for the locations served.'],
      ['Charges & timing', 'Not yet confirmed. Any costs and estimated timelines will need to be shared before an actual order is accepted.'],
      ['Order status', 'This prototype does not accept real orders or payments. A product enquiry is not a confirmed order.'],
    ],
  },
  contact: {
    kicker: 'SAY HELLO / 03',
    label: 'CONTACT',
    title: <>A line to us<br/><em>is coming soon.</em></>,
    intro: 'Contact channels have not been confirmed. Until they are, you can explore the demo request form without sending anything.',
    sections: [
      ['Email', 'Not yet provided.'],
      ['Phone / messaging', 'Not yet provided.'],
      ['Studio location & hours', 'Not yet provided.'],
    ],
  },
};

export function InformationPage({ page }: { page: InfoKind }) {
  const content = infoContent[page];
  return <div className="info-page section-wrap">
    <div className="page-kicker"><span className="mono">{content.kicker}</span><Label>{content.label}</Label></div>
    <header className="info-head"><h1 className="serif">{content.title}</h1><p>{content.intro}</p></header>
    <div className="info-body">{content.sections.map(([title, body], index) => <article className="info-row" key={title}><span className="mono">0{index + 1}</span><h2 className="serif">{title}</h2><p>{body}</p></article>)}</div>
    {page === 'contact' && <Link href="/request" className="button button-dark">Make a demo request <ArrowRight size={15}/></Link>}
  </div>;
}
